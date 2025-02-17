import React, { useState } from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CFormLabel, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState(1);
  const [n, setN] = useState(12);
  const [results, setResults] = useState({ year1: 0, year2: 0, year3: 0, months: [] });

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const nValue = parseInt(n);
    let timePeriod = parseInt(time);

    if (!p || !r || !timePeriod) {
      alert("Por favor ingresa valores válidos.");
      return;
    }

    const calculateAmount = (timePeriod) => {
      return p * Math.pow(1 + r / nValue, nValue * timePeriod);
    };

    const calculateMonthly = () => {
      const months = [];
      for (let i = 1; i <= 36; i++) {
        const monthlyAmount = calculateAmount(i / 12).toFixed(2);
        months.push({ month: i, amount: monthlyAmount - p });
      }
      return months;
    };

    const year1 = calculateAmount(1).toFixed(2);
    const year2 = calculateAmount(2).toFixed(2);
    const year3 = calculateAmount(3).toFixed(2);

    setResults({
      year1: year1 - p,
      year2: year2 - p,
      year3: year3 - p,
      months: calculateMonthly()
    });
  };

  return (
    <CContainer className="mt-5">
      <CRow className="justify-content-center">
        <CCol lg={6}>
          <CCard style={{ backgroundColor: '#0c161c', color: '#df0136' }}>
              <h3 className='text-center'>Calculadora de Interés Compuesto</h3>
            <CCardBody>
              <CForm>
                <CRow className="mb-3">
                  <CCol xs={12}>
                    <CFormLabel htmlFor="principal">Capital Inicial</CFormLabel>
                    <CFormInput
                      type="number"
                      id="principal"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="Ingresa el capital inicial"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol xs={12}>
                    <CFormLabel htmlFor="rate">Tasa de Interés Anual (%)</CFormLabel>
                    <CFormInput
                      type="number"
                      id="rate"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="Ingresa la tasa de interés"
                      style={{ backgroundColor: '#0c161c', color: '#df0136', border: '1px solid #df0136' }}
                    />
                  </CCol>
                </CRow>

                <CButton style={{ backgroundColor: '#df0136', borderColor: '#df0136', color: '#ffffff' }} onClick={calculateInterest}>Calcular</CButton>
              </CForm>

              <div className="mt-4">
                <h5 style={{ color: '#df0136' }}>Ganancias por año:</h5>
                <ul>
                  <li><strong>Año 1:</strong> ${results.year1}</li>
                  <li><strong>Año 2:</strong> ${results.year2}</li>
                  <li><strong>Año 3:</strong> ${results.year3}</li>
                </ul>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default InterestCalculator;
