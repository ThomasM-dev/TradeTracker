import React, { useState } from "react";
import { CContainer, CRow, CCol, CCard, CCardBody, CForm, CFormInput, CButton, CCardHeader } from '@coreui/react';

const InvestmentCalculator = () => {
  const [capital, setCapital] = useState("");
  const [porcentaje, setPorcentaje] = useState(1);
  const [inversion, setInversion] = useState(null);

  const calcularInversion = () => {
    const capitalNum = parseFloat(capital);
    if (isNaN(capitalNum) || capitalNum <= 0) {
      alert("Por favor ingresa un capital válido.");
      return;
    }
    const inversionCalculada = capitalNum * (porcentaje / 100);
    setInversion(inversionCalculada);
  };

  return (
    <CContainer className="mt-5 mb-5">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CCard style={{ backgroundColor: '#0c161c', color: '#df0136' }}>
              <h3 className="text-center" >Calculadora de Inversión por Operación</h3>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <CFormInput
                      type="number"
                      label="Capital Total"
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      placeholder="Ingresa tu capital total"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                  <CCol>
                    <CFormInput
                      type="number"
                      label="Porcentaje de Inversión"
                      value={porcentaje}
                      onChange={(e) => setPorcentaje(e.target.value)}
                      placeholder="Porcentaje (por ej., 1 o 0.5)"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                </CRow>
                <CButton style={{ backgroundColor: '#df0136', borderColor: '#df0136', color: '#ffffff', marginTop: 25 }} onClick={calcularInversion}>Calcular Inversión</CButton>
              </CForm>
              {inversion !== null && (
                <div className="mt-3">
                  <h5 style={{ color: '#df0136' }}>Resultado:</h5>
                  <p><strong>Inversión por operación:</strong> ${inversion.toFixed(2)}</p>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default InvestmentCalculator;
