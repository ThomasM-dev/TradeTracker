import React from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const tableStyles = {
  backgroundColor: '#0c161c',
  color: '#df0136',
};

const MarketToolsTable = () => {
  return (
    <>
    <h3 className='text-center' style={tableStyles}>Tabla de Herramientas de Mercado</h3>
    <CTable className='container mb-5' id='herramientas'>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell style={tableStyles}>Nombre</CTableHeaderCell>
          <CTableHeaderCell style={tableStyles}>Descripción</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableDataCell style={tableStyles}>Herramienta 1</CTableDataCell>
          <CTableDataCell style={tableStyles}>Descripción de la herramienta 1</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell style={tableStyles}>Herramienta 2</CTableDataCell>
          <CTableDataCell style={tableStyles}>Descripción de la herramienta 2</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell style={tableStyles}>Herramienta 3</CTableDataCell>
          <CTableDataCell style={tableStyles}>Descripción de la herramienta 3</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell style={tableStyles}>Herramienta 4</CTableDataCell>
          <CTableDataCell style={tableStyles}>Descripción de la herramienta 4</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell style={tableStyles}>Herramienta 5</CTableDataCell>
          <CTableDataCell style={tableStyles}>Descripción de la herramienta 5</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    </>
  );
};

export default MarketToolsTable;
