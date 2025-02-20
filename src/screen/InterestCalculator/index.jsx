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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InterestCalculator = () => {
  const [formData, setFormData] = useState({
    aportacionInicial: 0,
    aportacionMensual: 0,
    anios: 0,
    interesAnual: 0,
  });
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const calcularInteresCompuesto = () => {
    const { aportacionInicial, aportacionMensual, anios, interesAnual } =
      formData;
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

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor("#e0003d");
    doc.text("Resultados de la Calculadora de Interés Compuesto", 10, 10);
    doc.setFontSize(12);

    const capitalInvertido =
      formData.aportacionInicial +
      formData.aportacionMensual * 12 * formData.anios;
    const capitalGenerado =
      resultados.length > 0
        ? parseFloat(resultados[resultados.length - 1].capitalFinal)
        : 0;
    const diferencia = capitalGenerado - capitalInvertido;

    doc.text(
      `Aportación Inicial: $${formData.aportacionInicial.toFixed(2)}`,
      10,
      20
    );
    doc.text(
      `Aportación Mensual: $${formData.aportacionMensual.toFixed(2)}`,
      10,
      30
    );
    doc.text(`Años: ${formData.anios}`, 10, 40);
    doc.text(`Interés Anual: ${formData.interesAnual.toFixed(2)}%`, 10, 50);
    doc.text(`Capital Invertido: $${capitalInvertido.toFixed(2)}`, 10, 60);
    doc.text(`Capital Generado: $${capitalGenerado.toFixed(2)}`, 10, 70);
    doc.text(`Diferencia: $${diferencia.toFixed(2)}`, 10, 80);

    const headers = [
      "Año",
      "Aportación Anual",
      "Capital Inicio",
      "Interés Acumulado",
      "Capital Final",
    ];
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
      headStyles: {
        fillColor: "#e0003d",
        textColor: "#0c161c",
        fontSize: 10,
      },
      bodyStyles: {
        textColor: "#e0003d",
        fillColor: "#e0003d",
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: "#0c161c",
      },
    });
    doc.save("resultados_interes_compuesto.pdf");
  };

  const datosGrafica = {
    labels: resultados.map((item) => item.anio),
    datasets: [
      {
        label: "Capital Final",
        data: resultados.map((item) => item.capitalFinal),
        fill: false,
        borderColor: "#e0003d",
        tension: 0.1,
      },
      {
        label: "Aportación Anual",
        data: resultados.map((item) => item.aportacionAnual),
        fill: false,
        borderColor: "#0c161c",
        tension: 0.1,
      },
    ],
  };

  const opcionesGrafica = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparación Capital Final vs Aportación Anual",
      },
    },
  };

  const capitalInvertido =
    formData.aportacionInicial +
    formData.aportacionMensual * 12 * formData.anios;
  const capitalGenerado =
    resultados.length > 0
      ? parseFloat(resultados[resultados.length - 1].capitalFinal)
      : 0;
  const diferencia = capitalGenerado - capitalInvertido;

  return (
    <CContainer
      id="interes-compuesto"
      style={{ backgroundColor: "#0c161c", color: "#e0003d", padding: "20px" }}
    >
      <CRow className="justify-content-center mt-5">
        <CCol md="8">
          <h3 className="text-center" style={{ color: "#e0003d" }}>
            Calculadora de Interés Compuesto
          </h3>
          <CCard style={{ backgroundColor: "#0c161c", borderColor: "#e0003d" }}>
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel style={{color: "#e0003d"}}>Aportación Inicial</CFormLabel>
                  <CFormInput
                    type="number"
                    name="aportacionInicial"
                    value={formData.aportacionInicial}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0c161c",
                      color: "#e0003d",
                      borderColor: "#e0003d",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel style={{color: "#e0003d"}}>Aportación Mensual</CFormLabel>
                  <CFormInput
                    type="number"
                    name="aportacionMensual"
                    value={formData.aportacionMensual}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0c161c",
                      color: "#e0003d",
                      borderColor: "#e0003d",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel style={{color: "#e0003d"}}>Años a Invertir</CFormLabel>
                  <CFormInput
                    type="number"
                    name="anios"
                    value={formData.anios}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0c161c",
                      color: "#e0003d",
                      borderColor: "#e0003d",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel style={{color: "#e0003d"}}>Interés Anual (%)</CFormLabel>
                  <CFormInput
                    type="number"
                    name="interesAnual"
                    value={formData.interesAnual}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#0c161c",
                      color: "#e0003d",
                      borderColor: "#e0003d",
                    }}
                  />
                </div>
                <CButton
                  onClick={calcularInteresCompuesto}
                  style={{
                    backgroundColor: "#e0003d",
                    color: "#fff",
                    borderColor: "#e0003d",
                  }}
                >
                  Calcular
                </CButton>
                <CButton
                  onClick={generarPDF}
                  style={{
                    backgroundColor: "#e0003d",
                    color: "#fff",
                    borderColor: "#e0003d",
                    marginLeft: "10px",
                  }}
                >
                  Descargar PDF
                </CButton>
              </CForm>

              {resultados.length > 0 && (
                <div className="mt-4">
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "#e0003d" }}>Resumen Financiero</h4>
                    <p style={{ color: "#e0003d" }}>
                      Capital Invertido: ${capitalInvertido.toFixed(2)}
                    </p>
                    <p style={{ color: "#e0003d" }}>
                      Capital Generado: ${capitalGenerado.toFixed(2)}
                    </p>
                    <p style={{ color: "#e0003d" }}>
                      Diferencia: ${diferencia.toFixed(2)}
                    </p>
                  </div>

                  <h4 style={{ color: "#e0003d" }}>Resultados Detallados</h4>
                  <CTable
                    striped
                    hover
                    responsive
                    style={{ color: "#e0003d", backgroundColor: "#0c161c" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>Año</th>
                        <th style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>Aportación Anual</th>
                        <th style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>Capital Inicio</th>
                        <th style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>Interés Acumulado</th>
                        <th style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>Capital Final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.map((item, index) => (
                        <tr key={index}>
                          <td style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>{item.anio}</td>
                          <td style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>${item.aportacionAnual}</td>
                          <td style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>${item.capitalInicio}</td>
                          <td style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>${item.interesAcumulado}</td>
                          <td style={{ color: "#e0003d", backgroundColor: "#0c161c" }}>${item.capitalFinal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </CTable>

                  <div className="mt-4">
                    <h4 style={{ color: "#e0003d" }}>
                      Gráfica de Capital vs Aportación
                    </h4>
                    <Line data={datosGrafica} options={opcionesGrafica} />
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default InterestCalculator;
