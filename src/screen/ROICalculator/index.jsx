import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CCol,
  CRow,
} from "@coreui/react";

const ROICalculator = () => {
  const [capitalInversion, setCapitalInversion] = useState("");
  const [ganancia, setGanancia] = useState("");
  const [roi, setRoi] = useState(null);
  const [error, setError] = useState("");

  const calcularROI = () => {
    if (!capitalInversion || !ganancia) {
      setError(
        "Por favor ingresa tanto el capital invertido como la ganancia/pérdida."
      );
      return;
    }

    const capital = parseFloat(capitalInversion);
    const gananciaValor = parseFloat(ganancia);

    if (isNaN(capital) || isNaN(gananciaValor)) {
      setError("Por favor ingresa valores numéricos válidos.");
      return;
    }

    if (capital === 0) {
      setError("El capital invertido no puede ser cero.");
      return;
    }

    setError("");
    const resultadoROI = (gananciaValor / capital) * 100;
    setRoi(resultadoROI.toFixed(2));
  };

  return (
    <CRow className="d-flex justify-content-center mb-5 mb-5" id="roi">
      <CCol sm="12" md="6" lg="4">
        <CCard style={{ backgroundColor: "#0c161c", color: "#df0136" }}>
          <h3 className="text-center">Calculadora de ROI</h3>
          <CCardBody>
            {error && <div className="text-danger mb-3">{error}</div>}

            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="capital">Capital Invertido</CFormLabel>
                <CFormInput
                  type="number"
                  id="capital"
                  placeholder="Ingresa tu capital invertido"
                  value={capitalInversion}
                  onChange={(e) => setCapitalInversion(e.target.value)}
                  style={{
                    backgroundColor: "#0c161c",
                    color: "#df0136",
                    border: "1px solid #df0136",
                  }}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="ganancia">Ganancia/Pérdida</CFormLabel>
                <CFormInput
                  type="number"
                  id="ganancia"
                  placeholder="Ingresa la ganancia o pérdida"
                  value={ganancia}
                  onChange={(e) => setGanancia(e.target.value)}
                  style={{
                    backgroundColor: "#0c161c",
                    color: "#df0136",
                    border: "1px solid #df0136",
                  }}
                />
              </div>

              <CButton
                style={{
                  backgroundColor: "#df0136",
                  borderColor: "#df0136",
                  color: "#ffffff",
                }}
                onClick={calcularROI}
              >
                Calcular ROI
              </CButton>
            </CForm>

            {roi !== null && (
              <div className="mt-3">
                <h4 style={{ color: "#df0136" }}>El ROI es: {roi}%</h4>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ROICalculator;
