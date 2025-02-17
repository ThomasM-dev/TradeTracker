import React, { useEffect, useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { CCard, CCardBody, CRow, CCol } from "@coreui/react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { DateTime } from "luxon";
import "./PieCharts.css";
import { useGetStatsQuery } from "../../date/firebaseApi";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChartCard = ({ title, data, noDataMessage }) => (
  <CCol sm="12" md="4">
    <CCard className="mb-4">
      <h4
        style={{
          color: "#e0003d",
          backgroundColor: "#0c161c",
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {title}
      </h4>
      <CCardBody>
        <Pie data={data} />
        {data.datasets[0].data.every(value => value === 0) && (
          <p style={{ textAlign: "center", color: "#888" }}>{noDataMessage}</p>
        )}
      </CCardBody>
    </CCard>
  </CCol>
);

const PieCharts = () => {
  const { data: stats = {}, error, isLoading } = useGetStatsQuery();
  const [capitalInicial, setCapitalInicial] = useState(100);
  const [showResults, setShowResults] = useState(false);

  // Estados para almacenar los rendimientos y capitales finales
  const [rendimientoDiario, setRendimientoDiario] = useState(0);
  const [capitalFinalDiario, setCapitalFinalDiario] = useState(100);

  const [rendimientoMensual, setRendimientoMensual] = useState(0);
  const [capitalFinalMensual, setCapitalFinalMensual] = useState(100);

  const [rendimientoAnual, setRendimientoAnual] = useState(0);
  const [capitalFinalAnual, setCapitalFinalAnual] = useState(100);

  // Función para generar los datos del gráfico
  const generateChartData = (operations) => {
    if (!operations.length) {
      return {
        labels: ["No hay operaciones"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#CCCCCC"],
            hoverBackgroundColor: ["#CCCCCC"],
          },
        ],
      };
    }
    const totalGains = operations
      .filter((op) => parseFloat(op.gananciaPerdida) > 0)
      .reduce((sum, op) => sum + parseFloat(op.gananciaPerdida), 0);
    const totalLosses = operations
      .filter((op) => parseFloat(op.gananciaPerdida) < 0)
      .reduce((sum, op) => sum + Math.abs(parseFloat(op.gananciaPerdida)), 0);
    const totalAbsolute = totalGains + totalLosses;
    const gainPercentage = totalAbsolute > 0 ? (totalGains / totalAbsolute) * 100 : 0;
    const lossPercentage = totalAbsolute > 0 ? (totalLosses / totalAbsolute) * 100 : 0;
    return {
      labels: [`Ganancias (${gainPercentage.toFixed(2)}%)`, `Pérdidas (${lossPercentage.toFixed(2)}%)`],
      datasets: [
        {
          data: [gainPercentage, lossPercentage],
          backgroundColor: ["#33FF57", "#FF5733"],
          hoverBackgroundColor: ["#33FF57", "#FF5733"],
        },
      ],
    };
  };

  // Filtrar operaciones por período (diario, mensual, anual)
  const filterOperations = useMemo(() => (period) => {
    const dateFormat = {
      daily: "yyyy-MM-dd",
      monthly: "yyyy-MM",
      yearly: "yyyy",
    };
    const currentPeriod = DateTime.local().toFormat(dateFormat[period]);
    return stats[`${period}Stats`] ? stats[`${period}Stats`].flatMap((stat) => {
      const statPeriod = DateTime.fromISO(stat.date || stat.month || stat.year).toFormat(dateFormat[period]);
      return statPeriod === currentPeriod ? stat.operations : [];
    }) : [];
  }, [stats]);

  // Calcular rendimiento y capital final basado en el capital inicial y las operaciones
  const calcularRendimientoYCapitalFinal = (initial, operations) => {
    const finalCapital = operations.reduce(
      (capital, op) => capital + parseFloat(op.gananciaPerdida),
      initial
    );
    const rendimiento = ((finalCapital - initial) / initial) * 100;
    return {
      rendimiento: rendimiento.toFixed(2),
      capitalFinal: finalCapital.toFixed(2),
    };
  };

  // Actualizar el estado cuando los datos cambien
  useEffect(() => {
    if (stats) {
      const dailyOps = filterOperations("daily");
      const monthlyOps = filterOperations("monthly");
      const yearlyOps = filterOperations("yearly");

      // Calcular rendimientos y capitales finales para cada período
      const resultadoDiario = calcularRendimientoYCapitalFinal(capitalInicial, dailyOps);
      const resultadoMensual = calcularRendimientoYCapitalFinal(capitalInicial, monthlyOps);
      const resultadoAnual = calcularRendimientoYCapitalFinal(capitalInicial, yearlyOps);

      setRendimientoDiario(resultadoDiario.rendimiento);
      setCapitalFinalDiario(resultadoDiario.capitalFinal);

      setRendimientoMensual(resultadoMensual.rendimiento);
      setCapitalFinalMensual(resultadoMensual.capitalFinal);

      setRendimientoAnual(resultadoAnual.rendimiento);
      setCapitalFinalAnual(resultadoAnual.capitalFinal);
    }
  }, [stats, capitalInicial, filterOperations]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pie-charts container mb-5">
      <CRow>
        <h3 className="text-center mt-5 titleComponents">Panel de Rendimiento y Análisis de Operaciones</h3>
        <CCol sm="12">
          <div style={{ textAlign: "center", marginBottom: "20px", color: "#e0003d" }}>
            <label htmlFor="capitalInicial">Capital Inicial: </label>
            <input
              id="capitalInicial"
              type="number"
              value={capitalInicial}
              onChange={(e) => {
                const value = e.target.value.trim() === "" ? 100 : Number(e.target.value);
                setCapitalInicial(value);
              }}
              style={{ width: "150px", padding: "5px", marginLeft: "10px", color: "#e0003d" }}
            />
          </div>
        </CCol>
        <CCol sm="12" style={{ textAlign: "center" }}>
          <button
            onClick={() => setShowResults(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e0003d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Mostrar Resultados
          </button>
        </CCol>
        {showResults && (
          <>
            <PieChartCard
              title="Rendimiento Diario"
              data={generateChartData(filterOperations("daily"))}
              noDataMessage="No hay operaciones en el día de hoy."
            />
            <PieChartCard
              title="Rendimiento Mensual"
              data={generateChartData(filterOperations("monthly"))}
              noDataMessage="No hay operaciones en el mes actual."
            />
            <PieChartCard
              title="Rendimiento Anual"
              data={generateChartData(filterOperations("yearly"))}
              noDataMessage="No hay operaciones en el año actual."
            />
            <CCol sm="12">
              <div style={{ textAlign: "center", marginTop: "20px", color: "#e1003a" }}>
                <h4>Rendimiento basado en el capital</h4>
                <p style={{color: "#e1003a"}}>
                  Capital Inicial: {capitalInicial} <br />
                  <strong>Diario:</strong> <br />
                  &nbsp;&nbsp;Capital Final: {capitalFinalDiario} <br />
                  &nbsp;&nbsp;Rendimiento: {rendimientoDiario}% <br />
                  <strong>Mensual:</strong> <br />
                  &nbsp;&nbsp;Capital Final: {capitalFinalMensual} <br />
                  &nbsp;&nbsp;Rendimiento: {rendimientoMensual}% <br />
                  <strong>Anual:</strong> <br />
                  &nbsp;&nbsp;Capital Final: {capitalFinalAnual} <br />
                  &nbsp;&nbsp;Rendimiento: {rendimientoAnual}%
                </p>
              </div>
            </CCol>
          </>
        )}
      </CRow>
    </div>
  );
};

export default PieCharts;