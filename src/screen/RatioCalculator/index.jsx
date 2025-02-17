import React, { useState } from "react";
import { CContainer, CRow, CCol, CCard, CCardBody, CForm, CFormInput, CButton, CCardHeader } from '@coreui/react';

const RatioCalculator = () => {
  const [ganadoras, setGanadoras] = useState("");
  const [perdedoras, setPerdedoras] = useState("");
  const [ratio, setRatio] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const calcularRatio = () => {
    const ganadorasNum = parseInt(ganadoras);
    const perdedorasNum = parseInt(perdedoras);

    if (isNaN(ganadorasNum) || isNaN(perdedorasNum) || perdedorasNum === 0) {
      alert("Por favor ingresa valores válidos.");
      return;
    }

    const ratioCalculado = ganadorasNum / perdedorasNum;
    setRatio(ratioCalculado);

    if (ratioCalculado > 1) {
      setMensaje("¡Tienes más ganancias que pérdidas!");
    } else if (ratioCalculado === 1) {
      setMensaje("Tienes el mismo número de ganancias y pérdidas.");
    } else {
      setMensaje("Tienes más pérdidas que ganancias.");
    }
  };

  return (
    <CContainer style={{ backgroundColor: '#0c161c', padding: '20px', borderRadius: '10px' }} className="mt-5 mb-5">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CCard style={{ backgroundColor: '#0c161c', color: '#df0136' }}>
              <h3 className="text-center">Calculadora de Ratio de Ganancias/Pérdidas</h3>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <CFormInput
                      type="number"
                      label="Operaciones Ganadoras"
                      value={ganadoras}
                      onChange={(e) => setGanadoras(e.target.value)}
                      placeholder="Ingresa las operaciones ganadoras"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                  <CCol>
                    <CFormInput
                      type="number"
                      label="Operaciones Perdedoras"
                      value={perdedoras}
                      onChange={(e) => setPerdedoras(e.target.value)}
                      placeholder="Ingresa las operaciones perdedoras"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                </CRow>
                <CButton style={{ backgroundColor: '#df0136', borderColor: '#df0136', marginTop: '25px', color: "white" }} onClick={calcularRatio}>Calcular Ratio</CButton>
              </CForm>
              {ratio !== null && (
                <div className="mt-3">
                  <h5>Resultado:</h5>
                  <p><strong>Ratio de Ganancias/Pérdidas:</strong> {ratio.toFixed(2)}</p>
                  <p><strong>Interpretación:</strong> {mensaje}</p>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default RatioCalculator;
