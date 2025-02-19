import React, { useState } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import { Pie } from "react-chartjs-2";

const DCA_Calculator = () => {
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState("monthly");
  const [periodType, setPeriodType] = useState("years");
  const [periodValue, setPeriodValue] = useState(1);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [totalValue, setTotalValue] = useState(null);
  const [investmentData, setInvestmentData] = useState([]);

  const frequencyOptions = {
    monthly: 12,
    weekly: 52,
    daily: 365,
    biweekly: 26,
  };

  const calculateDCA = () => {
    let periodsPerYear = frequencyOptions[frequency];
    let totalPeriods =
      periodType === "years" ? periodsPerYear * periodValue : periodValue;

    const investmentPerPeriod = Number(amount);
    const ratePerPeriod = Number(rateOfReturn) / 100 / periodsPerYear;

    let accumulatedValue = 0;
    let dataPoints = [];

    for (let i = 1; i <= totalPeriods; i++) {
      accumulatedValue =
        (accumulatedValue + investmentPerPeriod) * (1 + ratePerPeriod);
      dataPoints.push({ x: i, y: accumulatedValue });
    }

    setTotalValue(accumulatedValue);
    setInvestmentData(dataPoints);
  };

  const pieChartData = {
    labels: ["Inversión Total", "Valor Final"],
    datasets: [
      {
        data: [amount * investmentData.length, totalValue || 0],
        backgroundColor: ["#df0136", "#0a161d"],
        hoverBackgroundColor: ["#df0136", "#0a161d"],
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
      
    >
      <h2 style={{ color: "#df0136", textAlign: "center" }} id="Rentabilidad_DCA">Calculadora de Rentabilidad DCA</h2>
      <CCard
        style={{ backgroundColor: "#0a161d"}}
      >
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
                Monto de inversión:
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
                Frecuencia de inversión:
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
                <option value="monthly">Mensual</option>
                <option value="weekly">Semanal</option>
                <option value="biweekly">Quincenal</option>
                <option value="daily">Diario</option>
              </select>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <label
                htmlFor="periodValue"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Valor del periodo:
              </label>
              <input
                type="number"
                id="periodValue"
                value={periodValue}
                onChange={(e) => setPeriodValue(Number(e.target.value))}
                placeholder="Número de años, meses o semanas"
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
                htmlFor="periodType"
                style={{
                  color: "#df0136",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Tipo de periodo:
              </label>
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
                id="periodType"
                style={{
                  color: "#df0136",
                  backgroundColor: "#0a161d",
                  border: "1px solid #df0136",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <option value="years">Años</option>
                <option value="months">Meses</option>
                <option value="weeks">Semanas</option>
              </select>
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
                placeholder="Ej. 8"
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
            onClick={calculateDCA}
            style={{
              backgroundColor: "#df0136",
              borderColor: "#df0136",
              color: "#fff",
              marginTop: "10px",
            }}
          >
            Calcular
          </CButton>

          {totalValue !== null && (
            <div>
              <h3 style={{ color: "#df0136" }}>
                Valor final estimado: ${totalValue.toFixed(2)}
              </h3>
              <Pie data={pieChartData} />
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default DCA_Calculator;
