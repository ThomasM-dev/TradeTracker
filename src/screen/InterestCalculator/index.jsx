import React, { useState } from "react";
import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CTable,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from "@coreui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InterestCalculator = () => {
  const [formData, setFormData] = useState({
    aportacionInicial: 0,
    aportacionMensual: 0,
    anios: 0,
    interesAnual: 0,
  });
  const [resultados, setResultados] = useState([]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0; // Asegurar que el valor sea numérico
    setFormData({ ...formData, [name]: numericValue });
  };

  // Calcular el interés compuesto
  const calcularInteresCompuesto = () => {
    const { aportacionInicial, aportacionMensual, anios, interesAnual } = formData;

    if (aportacionInicial < 0 || aportacionMensual < 0 || anios <= 0 || interesAnual <= 0) {
      alert("Por favor, ingresa valores válidos mayores que cero.");
      return;
    }

    const aportacionAnual = aportacionMensual * 12;
    const tasaInteres = interesAnual / 100;
    let capitalInicio = aportacionInicial;
    const resultadosTemp = [];

    for (let i = 1; i <= anios; i++) {
      const interesAcumulado = capitalInicio * tasaInteres;
      const capitalFinal = capitalInicio + interesAcumulado + aportacionAnual;
      resultadosTemp.push({
        anio: i,
        aportacionAnual: aportacionAnual.toFixed(2),
        capitalInicio: capitalInicio.toFixed(2),
        interesAcumulado: interesAcumulado.toFixed(2),
        capitalFinal: capitalFinal.toFixed(2),
      });
      capitalInicio = capitalFinal;
    }

    setResultados(resultadosTemp);
  };

  // Descargar resultados como PDF
  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor("#e0003d");
    doc.text("Resultados de la Calculadora de Interés Compuesto", 10, 10);
    doc.setFontSize(12);

    const capitalInvertido =
      formData.aportacionInicial + formData.aportacionMensual * 12 * formData.anios;
    const capitalGenerado =
      resultados.length > 0 ? parseFloat(resultados[resultados.length - 1].capitalFinal) : 0;
    const diferencia = capitalGenerado - capitalInvertido;

    doc.text(`Aportación Inicial: $${formData.aportacionInicial.toFixed(2)}`, 10, 20);
    doc.text(`Aportación Mensual: $${formData.aportacionMensual.toFixed(2)}`, 10, 30);
    doc.text(`Años: ${formData.anios}`, 10, 40);
    doc.text(`Interés Anual: ${formData.interesAnual.toFixed(2)}%`, 10, 50);
    doc.text(`Capital Invertido: $${capitalInvertido.toFixed(2)}`, 10, 60);
    doc.text(`Capital Generado: $${capitalGenerado.toFixed(2)}`, 10, 70);
    doc.text(`Diferencia: $${diferencia.toFixed(2)}`, 10, 80);

    const headers = ["Año", "Aportación Anual", "Capital Inicio", "Interés Acumulado", "Capital Final"];
    const data = resultados.map((item) => [
      item.anio,
      `$${item.aportacionAnual}`,
      `$${item.capitalInicio}`,
      `$${item.interesAcumulado}`,
      `$${item.capitalFinal}`,
    ]);

    doc.autoTable({
      startY: 90,
      head: [headers],
      body: data,
      theme: "grid",
      headStyles: { fillColor: "#e0003d", textColor: "#fff", fontSize: 10 },
      bodyStyles: { textColor: "#000", fontSize: 10 },
      alternateRowStyles: { fillColor: "#f2f2f2" },
    });

    doc.save("resultados_interes_compuesto.pdf");
  };

  const datosGrafica = {
    labels: resultados.map((item) => item.anio),
    datasets: [
      {
        label: "Capital Final",
        data: resultados.map((item) => parseFloat(item.capitalFinal)),
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
      {
        label: "Aportación Inicial Anual",
        data: resultados.map((item) => parseFloat(item.capitalInicio)),
        fill: false,
        borderColor: "#e0003d",
        tension: 0.1,
      },
    ],
  };

  const opcionesGrafica = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Comparación Capital Final vs Aportación Inicial Anual" },
    },
  };

  const capitalInvertido =
    formData.aportacionInicial + formData.aportacionMensual * 12 * formData.anios;
  const capitalGenerado =
    resultados.length > 0 ? parseFloat(resultados[resultados.length - 1].capitalFinal) : 0;
  const diferencia = capitalGenerado - capitalInvertido;

  return (
    <CContainer>
      <h2 className="text-center my-4" style={{color: "#e0003d"}}>Calculadora de Interés Compuesto</h2>
      <CForm>
        <CRow>
          <CCol md={3}>
            <CFormLabel style={{color: "#e0003d"}}>Aportación Inicial ($)</CFormLabel>
            <CFormInput
              type="number"
              name="aportacionInicial"
              value={formData.aportacionInicial}
              onChange={handleChange}
              style={{color: "#e0003d", backgroundColor: "#0a161d", borderColor: "#e0003d"}}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel style={{color: "#e0003d"}}>Aportación Mensual ($)</CFormLabel>
            <CFormInput
              type="number"
              name="aportacionMensual"
              value={formData.aportacionMensual}
              onChange={handleChange}
              style={{color: "#e0003d", backgroundColor: "#0a161d", borderColor: "#e0003d"}}

            />
          </CCol>
          <CCol md={3}>
            <CFormLabel style={{color: "#e0003d"}}>Años a Invertir</CFormLabel>
            <CFormInput
              type="number"
              name="anios"
              value={formData.anios}
              onChange={handleChange}
              style={{color: "#e0003d", backgroundColor: "#0a161d", borderColor: "#e0003d"}}

            />
          </CCol>
          <CCol md={3}>
            <CFormLabel style={{color: "#e0003d"}}>Interés Anual (%)</CFormLabel>
            <CFormInput
              type="number"
              name="interesAnual"
              value={formData.interesAnual}
              onChange={handleChange}
              style={{color: "#e0003d", backgroundColor: "#0a161d", borderColor: "#e0003d"}}
            />
          </CCol>
        </CRow>
        <div className="text-center mt-4">
          <CButton style={{backgroundColor: "#e0003d", color: "white"}} onClick={calcularInteresCompuesto}>
            Calcular
          </CButton>
          <CButton
            className="ms-2"
            style={{ display: resultados.length > 0 ? "inline" : "none" , backgroundColor: "#e0003d", color:"white"}}
            onClick={descargarPDF}
          >
            Descargar PDF
          </CButton>
        </div>
      </CForm>

      {resultados.length > 0 && (
        <>
          <CCard className="mt-4">
            <CCardBody style={{color: "#e0003d"}}>
              <h4>Resumen Financiero</h4>
              <p style={{color: "#e0003d"}}>Capital Invertido: ${capitalInvertido.toFixed(2)}</p>
              <p style={{color: "#e0003d"}}>Capital Generado: ${capitalGenerado.toFixed(2)}</p>
              <p style={{color: "#e0003d"}}>Diferencia: ${diferencia.toFixed(2)}</p>
            </CCardBody>
          </CCard>

          <CCard className="mt-4">
            <CCardBody>
              <h4 style={{color: "#e0003d"}}>Resultados Detallados</h4>
              <CTable striped hover>
                <thead>
                  <tr>
                    <th style={{color: "#e0003d"}}>Año</th>
                    <th style={{color: "#e0003d"}}>Aportación Anual</th>
                    <th style={{color: "#e0003d"}}>Capital Inicio</th>
                    <th style={{color: "#e0003d"}}>Interés Acumulado</th>
                    <th style={{color: "#e0003d"}}>Capital Final</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((item, index) => (
                    <tr key={index}>
                      <td style={{color: "#e0003d"}}>{item.anio}</td>
                      <td style={{color: "#e0003d"}}>${item.aportacionAnual}</td>
                      <td style={{color: "#e0003d"}}>${item.capitalInicio}</td>
                      <td style={{color: "#e0003d"}}>${item.interesAcumulado}</td>
                      <td style={{color: "#e0003d"}}>${item.capitalFinal}</td>
                    </tr>
                  ))}
                </tbody>
              </CTable>
            </CCardBody>
          </CCard>

          <CCard className="mt-4">
            <CCardBody>
              <h4 style={{color: "#e0003d"}}>Gráfica de Capital vs Aportación Inicial Anual</h4>
              <Line data={datosGrafica} options={opcionesGrafica} />
            </CCardBody>
          </CCard>
        </>
      )}
    </CContainer>
  );
};

export default InterestCalculator;