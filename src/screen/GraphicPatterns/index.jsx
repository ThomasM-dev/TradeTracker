import React from 'react';
import { CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CRow, CContainer } from '@coreui/react';
import data from "./dataGraphics.json"

const GraphicPatterns = () => {
  return (
    <CContainer className='container' id='patrones-graficos'>
      <h1 className="text-center my-4" style={{color: "#df0136"}}>Patrones Gráficos de Trading</h1>
      <CRow>
        {data.patrones_graficos.map((patron, index) => (
          <CCol key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CCard className="h-100">
              <CCardImage orientation="top" src={patron.imagen} style={{ height: '200px', objectFit: 'cover' }} />
              <CCardHeader style={{backgroundColor: "#0c161c"}}>
                <CCardTitle style={{backgroundColor: "transparent", color:"#e0003d"}}>{patron.nombre}</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CCardText style={{color: patron.tipo === "Alcista" ? "green" : patron.tipo === "Bajista" ? "red" : "orange"}}>
                  <strong>Tipo:</strong> {patron.tipo}
                </CCardText>
                <CCardText style={{color: "#e0003d"}}>
                  {patron.descripcion}
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default GraphicPatterns;