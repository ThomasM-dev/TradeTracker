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
    if (prices.length < period) return []; 

    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;

    const emaValues = [ema];

    for (let i = period; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema;
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

    
    setEmaValues(calculateEMA(updatedPrices));

    setCurrentPrice(""); 
  };

  return (
    <CContainer className="my-4 mb-5">
      <h2 style={{color: "#e0003d", textAlign: "center"}}>Calculadora de EMA (20 períodos)</h2>
      <div className="mb-3">
        <CFormInput
          type="number"
          step="0.01"
          placeholder="Ingresa el precio actual"
          value={currentPrice}
          style={{backgroundColor: "#0c161c", color: "#e0003d", borderColor: "#e0003d"}}
          onChange={(e) => setCurrentPrice(e.target.value)}
        />
        <CButton style={{backgroundColor:  "#e0003d", color: "white"}} className="mt-5 mb-3" onClick={handleCloseCandle}>
          Cerrar Vela
        </CButton>
      </div>

      <CTable responsive striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>#</CTableHeaderCell>
            <CTableHeaderCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>Precio de Cierre</CTableHeaderCell>
            <CTableHeaderCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>EMA (20)</CTableHeaderCell>
            <CTableHeaderCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>Tendencia</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {prices.map((price, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>{index + 1}</CTableDataCell>
              <CTableDataCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>{price.toFixed(2)}</CTableDataCell>
              <CTableDataCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}>
                {emaValues[index] ? emaValues[index].toFixed(2) : "-"}
              </CTableDataCell>
              <CTableDataCell style={{backgroundColor: "#0c161c", color: "#e0003d"}}> 
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
