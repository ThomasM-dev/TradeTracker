import React, { useEffect, useState } from "react";
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

const PieCharts = () => {
  const { data: stats = {}, error, isLoading } = useGetStatsQuery();

  // Estado para almacenar las operaciones filtradas por período
  const [operations, setOperations] = useState({
    daily: [],
    monthly: [],
    yearly: [],
  });

  // Estado para el capital inicial
  const [capitalInicial, setCapitalInicial] = useState(1000); // Valor por defecto de 1000
  const [capitalFinal, setCapitalFinal] = useState(1000); // Capital final
  const [rendimientoCapital, setRendimientoCapital] = useState(0); // Rendimiento en porcentaje

  // Función para generar los datos del gráfico
  const generateChartData = (operations) => {
    if (operations.length === 0) {
      return {
        labels: ["No hay operaciones"],
        datasets: [
          {
            data: [1], // Un solo valor para mostrar un gráfico vacío
            backgroundColor: ["#CCCCCC"], // Gris claro para indicar ausencia de datos
            hoverBackgroundColor: ["#CCCCCC"],
          },
        ],
      };
    }

    // Calcular el total de ganancias y pérdidas
    const totalGains = operations
      .filter((op) => parseFloat(op.gananciaPerdida) > 0)
      .reduce((sum, op) => sum + parseFloat(op.gananciaPerdida), 0);

    const totalLosses = operations
      .filter((op) => parseFloat(op.gananciaPerdida) < 0)
      .reduce((sum, op) => sum + Math.abs(parseFloat(op.gananciaPerdida)), 0);

    // Calcular el total absoluto
    const totalAbsolute = totalGains + totalLosses;

    // Calcular los porcentajes
    const gainPercentage = totalAbsolute > 0 ? (totalGains / totalAbsolute) * 100 : 0;
    const lossPercentage = totalAbsolute > 0 ? (totalLosses / totalAbsolute) * 100 : 0;

    return {
      labels: [`Ganancias (${gainPercentage.toFixed(2)}%)`, `Pérdidas (${lossPercentage.toFixed(2)}%)`],
      datasets: [
        {
          data: [gainPercentage, lossPercentage], // Porcentajes de ganancias y pérdidas
          backgroundColor: ["#33FF57", "#FF5733"], // Verde para ganancias, Rojo para pérdidas
          hoverBackgroundColor: ["#33FF57", "#FF5733"],
        },
      ],
    };
  };

  // Filtrar operaciones por período (diario, mensual, anual)
  const filterOperations = (stats, period) => {
    if (!stats || !stats[`${period}Stats`]) {
      return [];
    }

    const dateFormat = {
      daily: "yyyy-MM-dd",
      monthly: "yyyy-MM",
      yearly: "yyyy",
    };

    const currentPeriod = DateTime.local().toFormat(dateFormat[period]);
    return stats[`${period}Stats`].flatMap((stat) => {
      const statPeriod = DateTime.fromISO(stat.date || stat.month || stat.year).toFormat(dateFormat[period]);
      return statPeriod === currentPeriod ? stat.operations : [];
    });
  };

  // Calcular rendimiento basado en el capital
  const calcularRendimientoCapital = (initial, final) => {
    const rendimiento = ((final - initial) / initial) * 100;
    return rendimiento.toFixed(2);
  };

  // Actualizar el estado cuando los datos cambien
  useEffect(() => {
    if (
      stats &&
      (stats.dailyStats || stats.monthlyStats || stats.yearlyStats)
    ) {
      setOperations({
        daily: filterOperations(stats, "daily"),
        monthly: filterOperations(stats, "monthly"),
        yearly: filterOperations(stats, "yearly"),
      });

      // Calcular el capital final basándonos en las operaciones
      const capitalFinalCalculado = operations.monthly.reduce((capital, op) => capital + parseFloat(op.gananciaPerdida), capitalInicial);
      setCapitalFinal(capitalFinalCalculado);

      // Calcular el rendimiento en base al capital
      const rendimiento = calcularRendimientoCapital(capitalInicial, capitalFinalCalculado);
      setRendimientoCapital(rendimiento);
    }
  }, [stats, capitalInicial, operations]);

  // Mostrar mensaje de carga o error
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pie-charts container">
      <CRow>
        {/* Campo de input para el capital inicial */}
        <CCol sm="12">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label htmlFor="capitalInicial">Capital Inicial: </label>
            <input
              id="capitalInicial"
              type="number"
              value={capitalInicial}
              onChange={(e) => setCapitalInicial(Number(e.target.value))}
              style={{ width: "150px", padding: "5px", marginLeft: "10px" }}
            />
          </div>
        </CCol>

        {/* Gráfico Diario */}
        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <h4
              style={{
                color: "#df0136",
                backgroundColor: "#0a161d",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Rendimiento Diario
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.daily)} />
              {operations.daily.length === 0 && (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No hay operaciones en el día de hoy.
                </p>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        {/* Gráfico Mensual */}
        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <h4
              style={{
                color: "#df0136",
                backgroundColor: "#0a161d",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Rendimiento Mensual
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.monthly)} />
              {operations.monthly.length === 0 && (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No hay operaciones en el mes actual.
                </p>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        {/* Gráfico Anual */}
        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <h4
              style={{
                color: "#df0136",
                backgroundColor: "#0a161d",
                textAlign: "center",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Rendimiento Anual
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.yearly)} />
              {operations.yearly.length === 0 && (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No hay operaciones en el año actual.
                </p>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        {/* Mostrar el rendimiento basado en el capital */}
        <CCol sm="12">
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h4>Rendimiento basado en el capital</h4>
            <p>
              Capital Inicial: {capitalInicial} <br />
              Capital Final: {capitalFinal} <br />
              Rendimiento: {rendimientoCapital}%
            </p>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default PieCharts;