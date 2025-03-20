import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import { Chart as ChartJS, Title, Tooltip } from "chart.js";
import { DateTime } from "luxon";
import "./PieCharts.css";
import { useGetStatsQuery } from "../../date/firebaseApi";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip);

const PieCharts = () => {
  const { data: stats = {}, error, isLoading } = useGetStatsQuery();

  // Estado para almacenar las operaciones filtradas por período
  const [operations, setOperations] = useState({
    daily: [],
    monthly: [],
    yearly: [],
  });

  // Función para generar los datos del gráfico
  const generateChartData = (operations) => {
    if (operations.length === 0) {
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
          backgroundColor: ["#33FF57", "#e00138"],
          hoverBackgroundColor: ["#163f10", "#650822"],
        },
      ],
    };
  };

  // Filtrar operaciones por período (diario, mensual, anual)
  const filterOperations = (stats, period) => {
    if (!stats || !stats[`${period}Stats`]) return [];

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

  // Actualizar el estado cuando los datos cambien
  useEffect(() => {
    if (stats) {
      setOperations({
        daily: filterOperations(stats, "daily"),
        monthly: filterOperations(stats, "monthly"),
        yearly: filterOperations(stats, "yearly"),
      });
    }
  }, [stats]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pie-charts container">
      <CRow>
        {["daily", "monthly", "yearly"].map((period, index) => (
          <CCol sm="12" md="4" key={index}>
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
                Rendimiento {period === "daily" ? "Diario" : period === "monthly" ? "Mensual" : "Anual"}
              </h4>
              <CCardBody>
                <Pie data={generateChartData(operations[period])} />
                {operations[period].length === 0 && (
                  <p style={{ textAlign: "center", color: "#888" }}>
                    No hay operaciones en este período.
                  </p>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default PieCharts;