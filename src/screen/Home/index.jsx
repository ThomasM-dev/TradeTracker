import React from 'react';
import { CContainer, CRow, CCol} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import "./Home.css"
export const Home = () => {
  return (
    <div className="home-introduction">
      <CContainer className="mt-5">
        <CRow className="align-items-center">
          <CCol lg={6}>
            <h2 className="text-center text-light">Bienvenido a TradeTracker</h2>
            <p className="text-center text-light">
              ¡Hola! Soy Thomas, y este sitio es mi herramienta personal para llevar un control más eficiente de mis operaciones de trading. Aquí registro todas mis transacciones, analizo mis ganancias y pérdidas, y visualizo gráficos para tomar decisiones más informadas.
            </p>
            <p className="text-center text-light">
              TradeTracker me ayuda a mantenerme organizado, ver cómo van mis inversiones y saber cuándo es el momento adecuado para actuar. Puedes ver todas las operaciones que he realizado, consultar mis planes de trading y ver gráficos que me ayudan a analizar los datos con más claridad.
            </p>
          </CCol>
          <CCol lg={6}>
            <img
              src="https://via.placeholder.com/500x300"
              alt="Imagen de Introducción"
              className="img-fluid rounded"
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
