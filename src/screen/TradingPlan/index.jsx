import React, { useState } from 'react';
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
} from '@coreui/react';

const TradingPlan = () => {
  const [capital, setCapital] = useState(200);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [stopLoss, setStopLoss] = useState(0.5);
  const [takeProfit, setTakeProfit] = useState(1.0);

  // Función para calcular el riesgo por operación
  const calculateRiskPerTrade = () => {
    return (capital * riskPercentage) / 100;
  };

  // Función para calcular el tamaño de la posición
  const calculatePositionSize = () => {
    if (stopLoss === 0) return 0; // Evitar división por cero
    return calculateRiskPerTrade() / stopLoss;
  };

  // Función para calcular el beneficio esperado
  const calculateProfitPerTrade = () => {
    return calculatePositionSize() * takeProfit;
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

  return (
    <CContainer
      className="mt-5"
      style={{
        backgroundColor: '#0a161d',
        color: '#fff',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      {/* Estilo global para <p> */}
      <style>{`
        p {
          color: #fff;
        }
      `}</style>

      <CRow>
        <CCol xs={12} sm={6} lg={4}>
          <CCard style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h4 style={{ color: '#e20138' }}>Plan de Trading</h4>
            </CCardHeader>
            <CCardBody style={{color: "white"}}>
              <div>
                <label>Capital Inicial: </label>
                <CFormInput
                  type="number"
                  value={capital}
                  onChange={handleCapitalChange}
                  step="1"
                  className="mb-3"
                  style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}
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
                  style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}
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
                  style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}
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
                  style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}
                />
              </div>
              <h5 style={{ color: '#e20138' }}>Detalles de la Operación</h5>
              <ul>
                <li>
                  <strong>Riesgo por operación:</strong> {calculateRiskPerTrade().toFixed(2)}$ (
                  {riskPercentage}% de {capital}$)
                </li>
                <li>
                  <strong>Tamaño de la Posición:</strong> {calculatePositionSize().toFixed(0)} acciones
                </li>
                <li>
                  <strong>Stop Loss:</strong> {stopLoss}$ por acción
                </li>
                <li>
                  <strong>Take Profit:</strong> {takeProfit}$ por acción
                </li>
                <li>
                  <strong>Beneficio Esperado:</strong> {calculateProfitPerTrade().toFixed(2)}$ (2:1
                  riesgo-beneficio)
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={6} lg={8}>
          <CCard style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h5 style={{ color: '#e20138' }}>Estrategia de Trading</h5>
            </CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}>
                  Objetivo: Generar ingresos consistentes a través de operaciones a corto plazo.
                </CListGroupItem>
                <CListGroupItem style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}>
                  Objetivo de ganancia diaria:{' '}
                  <CBadge color="success" style={{ backgroundColor: '#e20138' }}>
                    {calculateProfitPerTrade().toFixed(2)}$
                  </CBadge>
                </CListGroupItem>
                <CListGroupItem style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}>
                  Riesgo-beneficio: 2:1
                </CListGroupItem>
                <CListGroupItem style={{ backgroundColor: '#0a161d', color: '#fff', border: '1px solid #e20138' }}>
                  Utilizar el **Ultimate Oscillator** para validar tendencias y el **retroceso de Fibonacci** para
                  detectar puntos de entrada y salida.
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard className="mt-4" style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h5 style={{ color: '#e20138' }}>Gestión de Riesgos</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{color: "white"}}>
                <li>
                  Establecer un límite de pérdida diaria de **{calculateRiskPerTrade().toFixed(2)}$** o **1%** del
                  capital.
                </li>
                <li>Utilizar el tamaño de posición adecuado arriesgando **{riskPercentage}%** por operación.</li>
                <li>Colocar **Stop-Loss** a una distancia de **{stopLoss}$** de la entrada.</li>
              </ul>
            </CCardBody>
          </CCard>

          <CCard className="mt-4" style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h5 style={{ color: '#e20138' }}>Criterios de Entrada y Salida</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{color: "white"}}>
                <li>
                  Entrar cuando los patrones de precio (por ejemplo, **banderas**, **triángulos**) se alineen con la
                  tendencia.
                </li>
                <li>Confirmar señales con indicadores técnicos (**RSI**, **MACD**, **MA**).</li>
                <li>Buscar ruptura de niveles de **soporte** y **resistencia** importantes.</li>
                <li>
                  Establecer objetivos de ganancia del **{((takeProfit / stopLoss) * 100).toFixed(0)}%** o **{takeProfit}$**
                  por encima de la entrada.
                </li>
                <li>Salir si se alcanza el objetivo de ganancia o el **Stop-Loss**.</li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol xs={12}>
          <CCard style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h5 style={{ color: '#e20138' }}>Revisión y Adaptación</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{color: "white"}}>
                <li>Revisar las operaciones al final del día, analizar victorias y pérdidas.</li>
                <li>Integrar lecciones aprendidas en futuras operaciones.</li>
                <li>Mantener un diario de trading para documentar resultados.</li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-4">
        <CCol xs={12}>
          <CCard style={{ backgroundColor: '#0a161d', border: '1px solid #e20138' }}>
            <CCardHeader style={{ backgroundColor: '#0a161d', borderBottom: '1px solid #e20138' }}>
              <h5 style={{ color: '#e20138' }}>Gestión Emocional</h5>
            </CCardHeader>
            <CCardBody>
              <ul style={{color: "white"}}>
                <li>No operar cuando se esté emocional, cansado o distraído.</li>
                <li>Mantener la disciplina y ceñirse a las reglas del plan.</li>
                <li>Ejercitar paciencia y esperar configuraciones de alta probabilidad.</li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default TradingPlan;