import React, { useState } from "react";
import {
  CContainer,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

const EmaExponencial = () => {
  const [prices, setPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [emaValues, setEmaValues] = useState([]);

  const calculateEMA = (prices, period = 20) => {
    if (prices.length < period) return Array(prices.length).fill(null);

    const multiplier = 2 / (period + 1); // 0.09523809523809523
    // Promedio simple de los primeros 20 períodos con mayor precisión
    let ema =
      prices.slice(0, period).reduce((sum, price) => sum + parseFloat(price), 0) / period;

    const emaValues = Array(period - 1).fill(null);
    emaValues.push(ema);

    for (let i = period; i < prices.length; i++) {
      ema = prices[i] * multiplier + ema * (1 - multiplier);
      emaValues.push(ema);
    }

    return emaValues;
  };

  const getTrend = (price, ema) => {
    if (!ema) return "-";
    return price > ema ? "Alcista" : "Bajista";
  };

  const handleCloseCandle = () => {
    const parsedPrice = parseFloat(currentPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;

    const updatedPrices = [...prices, parsedPrice];
    setPrices(updatedPrices);

    const newEmaValues = calculateEMA(updatedPrices);
    setEmaValues(newEmaValues);

    console.log("Precios:", updatedPrices);
    console.log("EMA Values:", newEmaValues.map(v => v ? v.toFixed(2) : null));

    setCurrentPrice("");
  };

  return (
    <CContainer className="my-4 mb-5">
      <h2 style={{ color: "#e0003d", textAlign: "center" }}>
        Calculadora de EMA (20 períodos)
      </h2>
      <div className="mb-3">
        <CFormInput
          type="number"
          step="0.01"
          placeholder="Ingresa el precio actual"
          value={currentPrice}
          style={{
            backgroundColor: "#0c161c",
            color: "#e0003d",
            borderColor: "#e0003d",
          }}
          onChange={(e) => setCurrentPrice(e.target.value)}
        />
        <CButton
          style={{ backgroundColor: "#e0003d", color: "white" }}
          className="mt-5 mb-3"
          onClick={handleCloseCandle}
        >
          Cerrar Vela
        </CButton>
      </div>

      <CTable responsive striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>#</CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>Precio de Cierre</CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>EMA (20)</CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>Tendencia</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {prices.map((price, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>{index + 1}</CTableDataCell>
              <CTableDataCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>{price.toFixed(2)}</CTableDataCell>
              <CTableDataCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>
                {emaValues[index] !== null ? emaValues[index].toFixed(2) : "-"}
              </CTableDataCell>
              <CTableDataCell style={{ backgroundColor: "#0c161c", color: "#e0003d" }}>
                {getTrend(price, emaValues[index])}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default EmaExponencial;