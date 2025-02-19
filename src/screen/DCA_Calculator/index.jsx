import React, { useState } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios de Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState(5); // Valor a invertir
  const [frequency, setFrequency] = useState("weekly"); // Ciclo de repetición
  const [startDate, setStartDate] = useState(""); // Fecha de inicio
  const [endDate, setEndDate] = useState(""); // Fecha de fin
  const [rateOfReturn, setRateOfReturn] = useState(6); // Rentabilidad anual estimada (%)
  const [investmentData, setInvestmentData] = useState([]); // Datos para gráfico
  const [totalInvested, setTotalInvested] = useState(0); // Dinero invertido
  const [portfolioValue, setPortfolioValue] = useState(0); // Valor del portafolio
  const [profit, setProfit] = useState(0); // Ganancia actual
  const [returnPercentage, setReturnPercentage] = useState(0); // Rendimiento del portafolio

  const frequencyOptions = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    monthly: 12,
  };

  const calculateInvestment = () => {
    if (!startDate || !endDate) {
      alert("Por favor, ingresa ambas fechas (inicio y fin).");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }

    // Calcular la diferencia en milisegundos y convertirla a días
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calcular el número total de períodos según la frecuencia seleccionada
    const periodsPerYear = frequencyOptions[frequency];
    const totalPeriods = Math.floor((diffDays / 365) * periodsPerYear);

    const investmentPerPeriod = Number(amount); // Monto por periodo
    const ratePerPeriod = Number(rateOfReturn) / 100 / periodsPerYear; // Rentabilidad por periodo
    let accumulatedValue = 0;
    let dataPoints = [];

    // Cálculo de la acumulación de valor durante todos los periodos
    for (let i = 1; i <= totalPeriods; i++) {
      accumulatedValue =
        (accumulatedValue + investmentPerPeriod) * (1 + ratePerPeriod);
      dataPoints.push({ x: i, y: accumulatedValue });
    }

    // Calculamos el total invertido
    const totalInvestedValue = investmentPerPeriod * totalPeriods;

    // Calculamos la ganancia actual
    const profitValue = accumulatedValue - totalInvestedValue;

    // Calculamos el rendimiento del portafolio en porcentaje
    const returnPercentageValue = (profitValue / totalInvestedValue) * 100;

    // Actualizamos los estados
    setInvestmentData(dataPoints);
    setTotalInvested(totalInvestedValue);
    setPortfolioValue(accumulatedValue);
    setProfit(profitValue);
    setReturnPercentage(returnPercentageValue);
  };

  // Datos para el gráfico de línea
  const lineChartData = {
    labels: investmentData.map((point) => `Semana ${point.x}`),
    datasets: [
      {
        label: "Valor Acumulado",
        data: investmentData.map((point) => point.y),
        borderColor: "#df0136",
        backgroundColor: "rgba(223, 1, 54, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <CContainer
      style={{
        backgroundColor: "#0a161d",
        padding: "20px",
        borderRadius: "10px",
      }}
      id="rentabilidad_inversion"
    >
      <h2 style={{ color: "#df0136", textAlign: "center" }}>
        Calculadora de Inversión
      </h2>
      <CCard style={{ backgroundColor: "#0a161d" }}>
        <CCardBody>
          <CRow>
            <CCol md="6">
              <label
                htmlFor="amount"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Valor a invertir ($):
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Monto en USD"
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </CCol>
            <CCol md="6">
              <label
                htmlFor="frequency"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Ciclo de Repetición:
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                id="frequency"
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <option value="daily">Diariamente</option>
                <option value="weekly">Semanalmente</option>
                <option value="biweekly">Quincenalmente</option>
                <option value="monthly">Mensualmente</option>
              </select>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <label
                htmlFor="startDate"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Fecha de inicio:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </CCol>
            <CCol md="6">
              <label
                htmlFor="endDate"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Fecha de fin:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <label
                htmlFor="rateOfReturn"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Rentabilidad anual estimada (%):
              </label>
              <input
                type="number"
                id="rateOfReturn"
                value={rateOfReturn}
                onChange={(e) => setRateOfReturn(Number(e.target.value))}
                placeholder="Ej. 6"
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </CCol>
          </CRow>
          <CButton
            color="primary"
            onClick={calculateInvestment}
            style={{
              backgroundColor: "#df0136",
              borderColor: "#df0136",
              color: "#fff",
              marginTop: "10px",
            }}
          >
            Calcular
          </CButton>
          {investmentData.length > 0 && (
            <div>
              <h3 style={{ color: "#df0136" }}>Resumen del Portafolio</h3>
              <CRow>
                <CCol md="6">
                  <p style={{ color: "#df0136" }}>
                    <strong>Dinero invertido:</strong> $
                    {totalInvested.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p style={{ color: "#df0136" }}>
                    <strong>Rendimiento del portafolio:</strong>{" "}
                    {returnPercentage.toFixed(2)}%
                  </p>
                </CCol>
                <CCol md="6">
                  <p style={{ color: "#df0136" }}>
                    <strong>Ganancia actual:</strong> $
                    {profit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p style={{ color: "#df0136" }}>
                    <strong>Valor del portafolio:</strong> $
                    {portfolioValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </CCol>
              </CRow>
              <h3 style={{ color: "#df0136" }}>Gráfico de Inversión</h3>
              <Line data={lineChartData} />
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default InvestmentCalculator;