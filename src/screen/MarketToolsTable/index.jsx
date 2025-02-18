import React from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import {infoTableTrading} from "../../date/infoTableTrading"
import "./MarketToolsTable.css"
const tableStyles = {
  backgroundColor: "#0c161c",
  color: "#df0136",
};

const MarketToolsTable = () => {
  return (
    <div className="market-tools-table">
      <h3 className="text-center" style={tableStyles}>
        Tabla de Herramientas de Mercado
      </h3>
      <CTable className="container mb-5" id="herramientas" aria-label="Tabla de herramientas de mercado">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell style={tableStyles}>Sitio Web</CTableHeaderCell>
            <CTableHeaderCell style={tableStyles}>Descripción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {infoTableTrading.map((row, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={tableStyles}>
                <a href={row.website} target="_blank" rel="noopener noreferrer">
                  {row.website}
                </a>
              </CTableDataCell>
              <CTableDataCell style={tableStyles}>
                {row.description}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default MarketToolsTable;