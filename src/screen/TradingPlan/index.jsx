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
                  Utilizar la Divergencia del RSI-Volumen Profile -
                  Fibonacci-Accion del Precio-Ondas de Elliot-Mapa de calor
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  La divergencia del RSI ocurre cuando el movimiento del precio
                  de un activo y el valor del RSI (un indicador de momento) no
                  están alineados. Es decir, el precio y el RSI "divergen" en su
                  dirección, lo que puede ser una señal de una posible reversión
                  en la tendencia del precio. El RSI mide la fuerza y la
                  velocidad de los movimientos del precio en una escala de 0 a
                  100, y sus niveles clave suelen ser 70 (sobrecompra) y 30
                  (sobreventa). Hay dos tipos principales de divergencias:
                  Divergencia alcista (Bullish Divergence): Sugiere que el
                  precio podría subir. Divergencia bajista (Bearish Divergence):
                  Sugiere que el precio podría bajar.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  El Volume Profile divide el rango de precios en niveles y mide
                  cuánto volumen se negoció en cada uno. Los conceptos clave
                  son: Point of Control (POC): El nivel de precio con el mayor
                  volumen negociado. Actúa como un "imán" para el precio, ya que
                  es donde los traders han mostrado mayor aceptación. Ejemplo:
                  Si el POC está en $50, el precio tiende a volver a ese nivel.
                  Value Area (VA): El rango de precios donde se negoció el 70%
                  del volumen total (típicamente). Value Area High (VAH): El
                  límite superior. Value Area Low (VAL): El límite inferior.
                  Representa la zona de "aceptación" del precio por parte del
                  mercado. High Volume Nodes (HVN): Zonas de alto volumen dentro
                  del perfil. Indican niveles de fuerte soporte o resistencia
                  porque muchos traders operaron allí. Low Volume Nodes (LVN):
                  Zonas de bajo volumen. Actúan como "vacíos" donde el precio
                  tiende a moverse rápido (poca resistencia o soporte).
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  La acción del precio implica observar patrones, niveles clave
                  (soportes y resistencias), y la estructura del mercado
                  (tendencias, rangos, rupturas) para tomar decisiones de
                  trading. Se enfoca en: Velas japonesas: Forma, tamaño y
                  posición. Patrones: Formaciones recurrentes que indican
                  posibles movimientos. Estructura: Tendencias alcistas,
                  bajistas o consolidaciones. El objetivo es entender el
                  "comportamiento" del precio y la psicología detrás de los
                  movimientos del mercado (oferta y demanda).
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Fibonacci Retracement Definición: Se traza desde un mínimo
                  hasta un máximo (tendencia alcista) o desde un máximo hasta un
                  mínimo (tendencia bajista) para encontrar niveles donde el
                  precio podría retroceder antes de continuar. Niveles clave:
                  23.6%: Retroceso superficial. 38.2%: Retroceso moderado. 50%:
                  Nivel psicológico (no es un Fibonacci puro, pero muy usado).
                  61.8%: "Golden Ratio", nivel fuerte de soporte/resistencia.
                  78.6%: Retroceso profundo.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Fibonacci Extension Definición: Se traza desde un mínimo,
                  máximo y retroceso para proyectar objetivos tras una ruptura.
                  Niveles clave: 100%: Igual al movimiento inicial. 161.8%:
                  Objetivo común tras ruptura. 261.8%: Extensión más agresiva.
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  La Teoría de las Ondas de Elliott, desarrollada por Ralph
                  Nelson Elliott en la década de 1930, propone que los precios
                  se mueven en ciclos predecibles o "ondas" que reflejan el
                  comportamiento humano. Estas ondas se dividen en: Ondas
                  Impulsivas (Motive Waves): Son 5 ondas (numeradas 1, 2, 3, 4,
                  5) que siguen la dirección de la tendencia principal (alcista
                  o bajista). Representan el movimiento principal del mercado.
                  Ondas Correctivas (Corrective Waves): Son 3 ondas (etiquetadas
                  A, B, C) que van en contra de la tendencia principal.
                  Representan correcciones o retrocesos. Estructura básica
                  Tendencia alcista: 5 ondas impulsivas hacia arriba (1-2-3-4-5)
                  seguidas de 3 ondas correctivas hacia abajo (A-B-C). Tendencia
                  bajista: 5 ondas impulsivas hacia abajo (1-2-3-4-5) seguidas
                  de 3 ondas correctivas hacia arriba (A-B-C).
                </CListGroupItem>
                <CListGroupItem
                  style={{
                    backgroundColor: "#0a161d",
                    color: "gray",
                    border: "1px solid #e20138",
                  }}
                >
                  Un mapa de calor es una representación gráfica que usa colores
                  para mostrar la intensidad o densidad de datos en un gráfico o
                  tabla: Colores cálidos (rojo, naranja): Alta actividad o
                  valor. Colores fríos (azul, verde): Baja actividad o valor.
                  Los mapas de calor se aplican de varias formas: Mapa de calor
                  de precios: Muestra dónde se concentra la actividad del precio
                  (similar al Volume Profile). Mapa de calor de volumen: Resalta
                  niveles de precio con mayor volumen negociado.
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
                  Mapa de Calor + Fibonacci + Acción del Precio Qué buscar: Una
                  zona caliente en el mapa de calor (alta densidad de
                  volumen/precio) que coincide con un nivel de retroceso
                  Fibonacci (61.8%, 50%) y un patrón de acción del precio
                  (martillo, estrella fugaz). Cómo funciona: El mapa de calor
                  resalta niveles clave de actividad; Fibonacci define el
                  retroceso exacto; la acción del precio confirma la reversión o
                  continuación.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + RSI + Volume Profile Qué buscar: Una zona
                  caliente en el mapa de calor que se alinea con un HVN (nodo de
                  alto volumen) del Volume Profile y muestra una divergencia en
                  el RSI (alcista o bajista). Cómo funciona: El mapa de calor y
                  Volume Profile identifican niveles clave; el RSI detecta
                  pérdida de momentum para confirmar reversión.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + Ondas de Elliott + Volumen Qué buscar: Una
                  zona caliente que marca el inicio o fin de una onda Elliott
                  (Onda 3 o 5), confirmada por un aumento o disminución de
                  volumen. Cómo funciona: El mapa de calor señala niveles de
                  alta actividad; las Ondas de Elliott dan la estructura; el
                  volumen valida la fuerza.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + Acción del Precio + RSI Qué buscar: Una zona
                  caliente con un patrón de acción del precio (doble suelo,
                  doble techo) y una señal de RSI (sobrecompra/sobreventa o
                  divergencia). Cómo funciona: El mapa de calor ubica el nivel
                  crítico; la acción del precio da la señal; el RSI confirma el
                  momentum.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + Fibonacci + Volume Profile + Ondas de Elliott
                  Qué buscar: Una zona caliente que coincide con un nivel
                  Fibonacci (61.8%), un HVN del Volume Profile, y el inicio/fin
                  de una onda Elliott. Cómo funciona: Máxima confluencia: mapa
                  de calor y Volume Profile señalan el nivel, Fibonacci lo
                  cuantifica, Ondas de Elliott lo contextualizan.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + RSI + Acción del Precio + Ondas de Elliott Qué
                  buscar: Una zona caliente con divergencia en RSI, un patrón de
                  acción del precio, y una onda Elliott específica (Onda 5 o C).
                  Cómo funciona: El mapa de calor y la acción del precio
                  identifican el nivel; RSI y Ondas de Elliott predicen la
                  reversión.
                </li>
                <li style={{ marginBottom: "15px" }}>
                  Mapa de Calor + Volume Profile + Fibonacci + Acción del Precio
                  Qué buscar: Una zona caliente que coincide con un HVN del
                  Volume Profile, un nivel Fibonacci, y un patrón de acción del
                  precio. Cómo funciona: Confluencia máxima para niveles clave;
                  la acción del precio da la señal final.
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
                  <h5 style={{ color: "#e20138" }}>
                    Acciones Principales de Argentina
                  </h5>
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
                  Entrada Larga (Compra): Condición: El precio está en una zona
                  caliente del Mapa de Calor (alta densidad) que coincide con un
                  retroceso Fibonacci (50% o 61.8%) y un HVN del Volume Profile.
                  Acción del Precio muestra un patrón de reversión alcista
                  (martillo, doble suelo, doji con rechazo al alza). RSI indica
                  sobreventa 30 o divergencia alcista (mínimos más altos). Ondas
                  de Elliott: Inicio de Onda 3 tras retroceso de Onda 2,
                  confirmado por volumen creciente.
                </li>
                <li>
                  Entrada Corta (Venta): Condición: El precio está en una zona
                  caliente del Mapa de Calor que coincide con una extensión
                  Fibonacci (161.8%) o resistencia, y un LVN del Volume Profile.
                  Acción del Precio muestra un patrón de reversión bajista
                  (estrella fugaz, doble techo, doji con rechazo a la baja). RSI
                  indica sobrecompra 70 o divergencia bajista (máximos más
                  bajos). Ondas de Elliott: Fin de Onda 5 o inicio de Onda C,
                  confirmado por volumen decreciente.
                </li>
                <li>
                  Salida con Ganancias (Take-Profit): Condición para Compra: El
                  precio alcanza una extensión Fibonacci (161.8% o 261.8%) o una
                  zona caliente del Mapa de Calor con baja densidad (LVN del
                  Volume Profile). Acción del Precio muestra signos de
                  agotamiento (estrella fugaz, doble techo). RSI entra en
                  sobrecompra 70 o muestra divergencia bajista. Ondas de
                  Elliott: Fin de Onda 5.
                </li>
                <li>
                  Condición para Venta: El precio alcanza un retroceso Fibonacci
                  (61.8% o 100%) o una zona caliente del Mapa de Calor con alta
                  densidad (HVN del Volume Profile). Acción del Precio muestra
                  signos de reversión alcista (martillo, doble suelo). RSI entra
                  en sobreventa 30 o muestra divergencia alcista. Ondas de
                  Elliott: Fin de Onda C.
                </li>
                <li>
                  Salida con Pérdidas (Stop-Loss): Condición General: El precio
                  cruza un nivel clave por debajo del soporte (compra) o por
                  encima de la resistencia (venta), definido por el Mapa de
                  Calor, Fibonacci o Volume Profile. Acción del Precio rompe la
                  estructura (mínimo más bajo tras martillo, máximo más alto
                  tras estrella fugaz). RSI confirma ruptura (sale de sobreventa
                  en compra o sobrecompra en venta sin divergencia). Ondas de
                  Elliott: Invalida la estructura (Onda 2 cae más allá del
                  inicio de Onda 1).
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
