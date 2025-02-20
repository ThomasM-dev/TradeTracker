import React, { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CListGroup,
  CListGroupItem,
  CBadge,
} from "@coreui/react";

const TradingPlan = () => {
  const [capital, setCapital] = useState(200);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [stopLoss, setStopLoss] = useState(0.5);
  const [takeProfit, setTakeProfit] = useState(1.0);
  const [spread, setSpread] = useState(0.1); // Nuevo estado para el spread
  const [commission, setCommission] = useState(0); // Nuevo estado para las comisiones

  // Función para calcular el riesgo por operación
  const calculateRiskPerTrade = () => {
    return (capital * riskPercentage) / 100;
  };

  // Función para calcular el tamaño de la posición
  const calculatePositionSize = () => {
    if (stopLoss === 0) return 0; // Evitar división por cero
    return calculateRiskPerTrade() / (stopLoss + spread + commission);
  };

  // Función para calcular el beneficio esperado
  const calculateProfitPerTrade = () => {
    return calculatePositionSize() * (takeProfit - spread - commission);
  };

  // Manejadores de cambio para los inputs
  const handleCapitalChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setCapital(value);
  };

  const handleRiskPercentageChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setRiskPercentage(value);
  };

  const handleStopLossChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setStopLoss(value);
  };

  const handleTakeProfitChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setTakeProfit(value);
  };

  const handleSpreadChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setSpread(value);
  };

  const handleCommissionChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setCommission(value);
  };

  return (
    <CContainer
      className="mt-5"
      style={{
        backgroundColor: "#0a161d",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <style>{`
        p {
          color: #fff;
        }
      `}</style>

      <CRow>
        <CCol xs={12} sm={6} lg={4}>
          <CCard
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h4 style={{ color: "#e20138" }}>Plan de Trading</h4>
            </CCardHeader>
            <CCardBody style={{ color: "white" }}>
              <div>
                <label>Capital Inicial: </label>
                <CFormInput
                  type="number"
                  value={capital}
                  onChange={handleCapitalChange}
                  step="1"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <div>
                <label>Riesgo por Operación (%): </label>
                <CFormInput
                  type="number"
                  value={riskPercentage}
                  onChange={handleRiskPercentageChange}
                  step="0.1"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <div>
                <label>Stop Loss ($): </label>
                <CFormInput
                  type="number"
                  value={stopLoss}
                  onChange={handleStopLossChange}
                  step="0.01"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <div>
                <label>Take Profit ($): </label>
                <CFormInput
                  type="number"
                  value={takeProfit}
                  onChange={handleTakeProfitChange}
                  step="0.01"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <div>
                <label>Spread ($): </label>
                <CFormInput
                  type="number"
                  value={spread}
                  onChange={handleSpreadChange}
                  step="0.01"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <div>
                <label>Comisiones ($): </label>
                <CFormInput
                  type="number"
                  value={commission}
                  onChange={handleCommissionChange}
                  step="0.01"
                  className="mb-3"
                  style={{
                    backgroundColor: "#0a161d",
                    color: "#fff",
                    border: "1px solid #e20138",
                  }}
                />
              </div>
              <h5 style={{ color: "#e20138" }}>Detalles de la Operación</h5>
              <ul>
                <li>
                  <strong>Riesgo por operación:</strong>{" "}
                  {calculateRiskPerTrade().toFixed(2)}$ ({riskPercentage}% de{" "}
                  {capital}$)
                </li>
                <li>
                  <strong>Tamaño de la Posición:</strong>{" "}
                  {calculatePositionSize().toFixed(0)} acciones
                </li>
                <li>
                  <strong>Stop Loss:</strong> {stopLoss}$ por acción
                </li>
                <li>
                  <strong>Take Profit:</strong> {takeProfit}$ por acción
                </li>
                <li>
                  <strong>Spread:</strong> {spread}$ por acción
                </li>
                <li>
                  <strong>Comisiones:</strong> {commission}$ por operación
                </li>
                <li>
                  <strong>Beneficio Esperado:</strong>{" "}
                  {calculateProfitPerTrade().toFixed(2)}$ (2:1 riesgo-beneficio)
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={6} lg={8}>
          <CCard
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>Estrategia de Trading</h5>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Objetivo de ganancia diaria:{" "}
                  <CBadge
                    color="success"
                    style={{ backgroundColor: "#e20138" }}
                  >
                    $10
                  </CBadge>
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Riesgo-beneficio: 2:1
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Utilizar Ultimate Oscilator en temporalidad de 1 dia para
                  identificar mejores puntos de soporte y resistencia. En
                  temporalidad de 1 hr buscar puntos de compra y venta un valor
                  por encima de 70 indica sobrecompra y un valor por debajo de
                  30 indica sobrecompra. En 15-5 minutos para buscar posbiles
                  reversiones del precio y confimar la tendencia
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Uso de ema 100 para confirmar tendencia en temporalidad de 1
                  dia si el precio esta por debajo significa tendencia bajista y
                  si esta por encima significa tendencia alcista. En
                  temporalidad de 1 hr si el precio esta por encima de la ema 50
                  significa tendencia alcista a corto plazo si esta por debajo
                  de la ema signfica tendencia bajista. Si el precio se
                  encuentra por encima de la EMA de 50 y el UO está mostrando
                  condiciones de sobrecompra 70, podrías considerar salir de la
                  operación o buscar señales de reversión. Si el precio está por
                  debajo de la EMA de 50 y el UO muestra sobreventa 30, es un
                  buen momento para buscar compras. Si la EMA de 50 cruza la EMA
                  de 100 hacia arriba en gráficos de 5-15 minutos, puede indicar
                  un cambio a corto plazo en la dirección de la tendencia y una
                  oportunidad de compra. Si la EMA de 50 cruza la EMA de 100
                  hacia abajo, podría ser una señal de que la tendencia se está
                  volviendo bajista a corto plazo.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  1 día: Usar Fibonacci para obtener una visión global de la
                  tendencia y detectar zonas clave de soporte/resistencia. 1
                  hora: Aplicar Fibonacci para identificar retrocesos dentro de
                  la tendencia a corto plazo y encontrar entradas o salidas más
                  precisas. 5-15 minutos: Utilizar Fibonacci para ajustar
                  entradas rápidas en movimientos de corto plazo, especialmente
                  si el precio retrocede en un pequeño movimiento.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Volumen creciente en una tendencia alcista: Si el volumen
                  aumenta cuando el precio sube, esto indica que la tendencia
                  alcista es fuerte y respaldada por los compradores. Esto
                  refuerza la idea de que el precio podría seguir subiendo.
                  Volumen creciente en una tendencia bajista: Si el volumen
                  aumenta mientras el precio baja, esto sugiere que la tendencia
                  bajista está siendo respaldada por vendedores agresivos, y el
                  precio probablemente continuará cayendo.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Volumen bajo en una tendencia alcista o bajista: Si el precio
                  está subiendo o bajando, pero el volumen es bajo, podría ser
                  una señal de que el movimiento está perdiendo fuerza y podría
                  revertirse. Los traders suelen ver esto como una señal de
                  cautela. Aumento repentino de volumen en una corrección o
                  retroceso: Si el precio está en un retroceso o consolidación,
                  y de repente hay un aumento en el volumen, podría ser una
                  señal de que el movimiento de corrección está terminando y la
                  tendencia principal continuará.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Precio sube y volumen baja: Si el precio está subiendo, pero
                  el volumen disminuye, podría indicar que la tendencia es
                  insostenible y podría haber una reversión. Precio baja y
                  volumen sube: Si el precio está cayendo, pero el volumen
                  aumenta, esto puede sugerir que la presión de venta es fuerte,
                  y el precio puede seguir cayendo.
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard
            className="mt-4"
            style={{
              backgroundColor: "#0a161d",
              border: "1px solid #e20138",
            }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>
                Combinaciones de patrones y indicadores
              </h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{ color: "gray" }}>
                <li style={{ marginBottom: "15px" }}>
                  EMA + Volumen + Acción del Precio Qué busca: Confirmación de
                  la tendencia y validación de la fuerza del movimiento. Cómo
                  funciona: Si el precio está por encima de la EMA de 100 (en
                  gráfico diario) y el volumen aumenta cuando el precio sube, es
                  una señal de que la tendencia alcista es fuerte. Si el precio
                  se acerca a una resistencia clave y forma un patrón de acción
                  del precio como un doble techo o estrella fugaz, con un
                  volumen creciente, esto indica una posible reversión bajista.
                  Si el precio rompe la EMA de 50 en el gráfico de 1 hora y el
                  volumen aumenta significativamente, es una señal de que la
                  ruptura es válida y la tendencia puede continuar en esa
                  dirección.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Ultimate Oscillator (UO) + Fibonacci + Acción del Precio Qué
                  buscar: Confirmación de posibles reversiones en niveles clave
                  y validación de la fuerza del movimiento. Cómo funciona: El UO
                  por encima de 70 indica sobrecompra y por debajo de 30 indica
                  sobreventa. Si el precio está en un nivel de Fibonacci y el UO
                  está en sobrecompra (por encima de 70), y el precio forma un
                  patrón de acción del precio como una estrella fugaz o hombro
                  cabeza hombro, puede ser una señal de venta. Si el UO está por
                  debajo de 30 (sobreventa) y el precio toca un nivel de
                  Fibonacci importante, y forma un patrón de martillo o doble
                  suelo, puede ser una buena señal de compra.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  MA (50 y 100) + Volumen + Breakout Qué buscar: Confirmación de
                  una ruptura válida y fuerza de la tendencia. Cómo funciona: Si
                  el precio rompe una resistencia con volumen alto y está por
                  encima de la EMA de 50 (en gráfico de 1 hora), esto sugiere
                  que la tendencia alcista está tomando fuerza. Si el precio
                  rompe un soporte con volumen alto y está por debajo de la EMA
                  de 50, esto indica una tendencia bajista. Un cruce de la EMA
                  de 50 por encima de la EMA de 100 en 5-15 minutos con volumen
                  creciente puede ser una señal de un cambio en la tendencia a
                  corto plazo y una oportunidad de compra.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Fibonacci + Acción del Precio + Divergencia de Volumen Qué
                  buscar: Identificar posibles puntos de reversión en niveles
                  clave con divergencia de volumen. Cómo funciona: Si el precio
                  llega a un nivel de Fibonacci clave (como 61.8%) y el volumen
                  disminuye mientras el precio sube, puede indicar que la
                  tendencia alcista está perdiendo fuerza. Si hay divergencia
                  entre el precio y el volumen (por ejemplo, el precio hace
                  nuevos máximos, pero el volumen disminuye), puede ser una
                  señal de que el movimiento no tiene apoyo suficiente y podría
                  revertir. Si en el nivel de Fibonacci el precio forma un
                  patrón como un doble techo o pin bar, y el volumen disminuye,
                  esto puede ser una señal de venta.
                </li>
                <li>
                  UO + EMA de 50 + Acción del Precio en 1 Hora Qué buscar:
                  Confirmación de la tendencia y posible entrada en condiciones
                  de sobrecompra o sobreventa. Cómo funciona: Si el UO está en
                  sobrecompra 70 y el precio está por encima de la EMA de 50 en
                  el gráfico de 1 hora, y se forma un patrón de reversión como
                  un doji o estrella fugaz cerca de un nivel de resistencia,
                  puede ser una señal de que es hora de salir de la operación o
                  prepararte para una reversión. Si el UO está en sobreventa 30
                  y el precio está por debajo de la EMA de 50, y forma un patrón
                  como un martillo en un nivel de soporte, puede ser una señal
                  de compra.
                </li>
              </ul>
            </CCardBody>
          </CCard>

          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard
                style={{
                  backgroundColor: "#0a161d",
                  border: "1px solid #e20138",
                }}
              >
                <CCardHeader
                  style={{
                    backgroundColor: "#0a161d",
                    borderBottom: "1px solid #e20138",
                  }}
                >
                  <h5 style={{ color: "#e20138" }}>Análisis Top-Down</h5>
                </CCardHeader>
                <CCardBody>
                  <ul style={{ color: "gray", listStyleType: "none" }}>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/SPX/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/indices/s-and-p-500--big.svg"
                          alt="S&P 500"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        S&P 500
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TVC-DXY/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/indices/u-s-dollar-index--big.svg"
                          alt="DXY"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        DXY (Dollar Index)
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.investing.com/indices/msci-emerging-markets"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="/logoMSCI.png"
                          alt="Mercados Emergentes"
                          width="50"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Mercados Emergentes
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/markets/futures/#quotes"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/metal/gold--big.svg"
                          alt="Commodities"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Commodities
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TVC-US10Y/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/country/US--big.svg"
                          alt="Bonos del Gobierno"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Bonos del Gobierno
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/BTCUSDT/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg"
                          alt="Criptomonedas"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Criptomonedas
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TVC-NI225/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/indices/nikkei-225--big.svg"
                          alt="Criptomonedas"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Nikkei 225
                      </a>
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard
                style={{
                  backgroundColor: "#0a161d",
                  border: "1px solid #e20138",
                }}
              >
                <CCardHeader
                  style={{
                    backgroundColor: "#0a161d",
                    borderBottom: "1px solid #e20138",
                  }}
                >
                  <h5 style={{ color: "#e20138" }}>
                    Acciones Principales de Japón
                  </h5>
                </CCardHeader>
                <CCardBody>
                  <ul style={{ color: "gray", listStyleType: "none" }}>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TSE-7203/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/toyota--big.svg"
                          alt="Toyota"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Toyota Motor Corporation
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TSE-6758/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/sony--big.svg"
                          alt="Sony"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Sony Group Corporation
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TSE-9984/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/softbank--big.svg"
                          alt="SoftBank"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        SoftBank Group Corp.
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TSE-8058/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/mitsubishi--big.svg"
                          alt="Mitsubishi"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Mitsubishi Corporation
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/TSE-7974/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/nintendo--big.svg"
                          alt="Nintendo"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Nintendo Co., Ltd.
                      </a>
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard
                style={{
                  backgroundColor: "#0a161d",
                  border: "1px solid #e20138",
                }}
              >
                <CCardHeader
                  style={{
                    backgroundColor: "#0a161d",
                    borderBottom: "1px solid #e20138",
                  }}
                >
                  <h5 style={{ color: "#e20138" }}>
                    Acciones Principales de Estados Unidos
                  </h5>
                </CCardHeader>
                <CCardBody>
                  <ul style={{ color: "gray", listStyleType: "none" }}>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-AAPL/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/apple--big.svg"
                          alt="Apple"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Apple Inc.
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-MSFT/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/microsoft--big.svg"
                          alt="Microsoft"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Microsoft Corporation
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-AMZN/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/amazon--big.svg"
                          alt="Amazon"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Amazon.com Inc.
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-GOOGL/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/alphabet--big.svg"
                          alt="Alphabet (Google)"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Alphabet Inc. (Google)
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-TSLA/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/tesla--big.svg"
                          alt="Tesla"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                        Tesla Inc.
                      </a>
                    </li>
                    <li style={{ marginBottom: "15px" }}>
                      <a
                        href="https://es.tradingview.com/symbols/NASDAQ-NVDA/"
                        target="_blank"
                        style={{ color: "#e20138", textDecoration: "none" }}
                      >
                        <img
                          src="https://s3-symbol-logo.tradingview.com/nvidia--big.svg"
                          alt="Nvidia"
                          width="20"
                          height="20"
                          style={{ marginRight: "8px" }}
                        />
                       Nvidia
                      </a>
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow className="mt-4">
  <CCol xs={12}>
    <CCard
      style={{
        backgroundColor: "#0a161d",
        border: "1px solid #e20138",
      }}
    >
      <CCardHeader
        style={{
          backgroundColor: "#0a161d",
          borderBottom: "1px solid #e20138",
        }}
      >
        <h5 style={{ color: "#e20138" }}>Acciones Principales de Argentina</h5>
      </CCardHeader>
      <CCardBody>
        <ul style={{ color: "gray", listStyleType: "none" }}>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="https://es.tradingview.com/symbols/BCBA-GGAL/"
              target="_blank"
              style={{ color: "#e20138", textDecoration: "none" }}
            >
              <img
                src="https://s3-symbol-logo.tradingview.com/gpo-fin-galicia--big.svg"
                alt="Grupo Galicia"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              Grupo Financiero Galicia
            </a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="https://es.tradingview.com/symbols/BCBA-PAMP/"
              target="_blank"
              style={{ color: "#e20138", textDecoration: "none" }}
            >
              <img
                src="https://s3-symbol-logo.tradingview.com/pampa-energia--big.svg"
                alt="Pampa Energía"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              Pampa Energía
            </a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="https://es.tradingview.com/symbols/BCBA-YPFD/"
              target="_blank"
              style={{ color: "#e20138", textDecoration: "none" }}
            >
              <img
                src="https://s3-symbol-logo.tradingview.com/ypf--big.svg"
                alt="YPF"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              YPF S.A.
            </a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="https://es.tradingview.com/symbols/BCBA-BBAR/"
              target="_blank"
              style={{ color: "#e20138", textDecoration: "none" }}
            >
              <img
                src="https://s3-symbol-logo.tradingview.com/banco-bilbao-vizcaya-argentaria--big.svg"
                alt="BBVA Argentina"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              BBVA Argentina
            </a>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="https://es.tradingview.com/symbols/BCBA-CEPU/"
              target="_blank"
              style={{ color: "#e20138", textDecoration: "none" }}
            >
              <img
                src="https://s3-symbol-logo.tradingview.com/central-puerto--big.svg"
                alt="Central Puerto"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              Central Puerto
            </a>
          </li>
        </ul>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

          <CCard
            className="mt-4"
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>Gestión de Riesgos</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{ color: "gray" }}>
                <li>
                  Establecer un límite de pérdida diaria de *
                  {calculateRiskPerTrade().toFixed(2)}$* o *1%* del capital.
                </li>
                <li>
                  Utilizar el tamaño de posición adecuado arriesgando *
                  {riskPercentage}%* por operación.
                </li>
                <li>
                  Colocar *Stop-Loss* a una distancia de *{stopLoss}$* de la
                  entrada.
                </li>
              </ul>
            </CCardBody>
          </CCard>

          <CCard
            className="mt-4"
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>
                Criterios de Entrada y Salida
              </h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{ color: "gray" }}>
                <li>
                  Criterios de Entrada: Identificar patrones en conjunto con los
                  indicadores (EMA, UO, Fibonacci, etc.).
                </li>
                <li>
                  Stop Loss: Colocar el stop loss en niveles clave de soporte o
                  resistencia o en zonas de posibles reversiones del precio
                </li>
                <li>
                  Take Profit: Ajustar el take profit según los niveles de
                  Fibonacci o patrones de acción del precio.
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol xs={12}>
          <CCard
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>Revisión y Adaptación</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{ color: "gray" }}>
                <li>
                  Revisar las operaciones al final del día, analizar victorias y
                  pérdidas.
                </li>
                <li>Integrar lecciones aprendidas en futuras operaciones.</li>
                <li>
                  Mantener un diario de trading para documentar resultados.
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol xs={12}>
          <CCard
            style={{ backgroundColor: "#0a161d", border: "1px solid #e20138" }}
          >
            <CCardHeader
              style={{
                backgroundColor: "#0a161d",
                borderBottom: "1px solid #e20138",
              }}
            >
              <h5 style={{ color: "#e20138" }}>Gestión Emocional</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{ color: "gray" }}>
                <li>
                  No operar cuando se esté emocional, cansado o distraído.
                </li>
                <li>Mantener la disciplina y ceñirse a las reglas del plan.</li>
                <li>
                  Ejercitar paciencia y esperar configuraciones de alta
                  probabilidad.
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default TradingPlan;
