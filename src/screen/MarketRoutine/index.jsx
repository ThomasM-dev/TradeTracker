import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const MarketRoutine = () => {
  const weeklyRoutine = [
    {
      day: 'Lunes',
      activities: 'Acciones - DXY (Índice del dólar), Noticias X',
    },
    {
      day: 'Martes',
      activities: 'Airdrops - Nuevos tokens cripto',
    },
    {
      day: 'Miércoles',
      activities: 'Acciones - DXY - Cripto',
    },
    {
      day: 'Jueves',
      activities: 'Acciones argentinas y japonesas',
    },
    {
      day: 'Viernes',
      activities: 'Análisis semanal de acciones y criptomonedas',
    },
    {
      day: 'Sábado',
      activities: 'Programación con React Native - React',
    },
    {
      day: 'Domingo',
      activities: 'Análisis de la próxima semana y calendario económico de EE.UU.',
    },
  ];

  const cardStyle = {
    backgroundColor: '#0c161c',
    color: '#e0003d',
    border: '1px solid #e0003d',
  };

  const tableStyle = {
    backgroundColor: '#0c161c',
    '--cui-table-color': '#e0003d',
    '--cui-table-bg': '#0c161c',
    '--cui-table-hover-bg': '#1a2529',
    '--cui-table-border-color': '#e0003d',
    '--cui-table-striped-bg': '#0c161c',
  };

  const headerStyle = {
    backgroundColor: '#0c161c',
    color: '#e0003d',
    borderBottom: '2px solid #e0003d',
  };

  const cellStyle = {
    backgroundColor: '#0c161c',
    color: '#e0003d',
    border: 'none',
  };

  return (
    <CCard style={cardStyle} className="mb-4 container">
      <CCardHeader style={headerStyle}>
        <h4 style={{ margin: 0, textAlign: 'center' }}>Rutina Semanal de Mercado</h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive style={tableStyle}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={cellStyle}>Día</CTableHeaderCell>
              <CTableHeaderCell style={cellStyle}>Actividades</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {weeklyRoutine.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell style={cellStyle}>{item.day}</CTableDataCell>
                <CTableDataCell style={cellStyle}>{item.activities}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default MarketRoutine;
