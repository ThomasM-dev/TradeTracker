import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
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
  
  const [operations, setOperations] = useState({
    daily: [],
    monthly: [],
    yearly: [],
  });

  const generateChartData = (operations) => {
    if (operations.length === 0) {
      return {
        labels: ["No hay operaciones"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#FF0000"],
            hoverBackgroundColor: ["#FF0000"],
          },
        ],
      };
    }

    const gains = operations.map((op) => op.gananciaPerdida);
    const labels = operations.map(
      (op) => `${op.activo} ($${op.gananciaPerdida})`
    );
    const colors = operations.map(
      () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );

    return {
      labels,
      datasets: [
        {
          data: gains,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  };

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

    return stats[`${period}Stats`].flatMap((stat) =>
      stat[period] === currentPeriod ? stat.operations : []
    );
  };

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
    }
  }, [stats]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pie-charts container">
      <CRow>
        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <h4
              style={{
                color: "#df0136",
                backgroundColor: "#0a161d",
                textAlign: "center",
              }}
            >
              Rendimiento Diario
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.daily)} />
              {operations.daily.length === 0 && (
                <p>No hay operaciones en el día de hoy.</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <h4
              style={{
                color: "#df0136",
                backgroundColor: "#0a161d",
                textAlign: "center",
              }}
            >
              Rendimiento Mensual
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.monthly)} />
              {operations.monthly.length === 0 && (
                <p>No hay operaciones en el mes actual.</p>
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
              }}
            >
              Rendimiento Anual
            </h4>
            <CCardBody>
              <Pie data={generateChartData(operations.yearly)} />
              {operations.yearly.length === 0 && (
                <p>No hay operaciones en el año actual.</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default PieCharts;
