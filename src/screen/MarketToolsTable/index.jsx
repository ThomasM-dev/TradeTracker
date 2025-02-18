import React from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { infoTableTrading } from "../../date/infoTableTrading";
import "./MarketToolsTable.css";

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
      <div className="table-responsive">
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
                <CTableDataCell style={tableStyles} data-label="Sitio Web">
                  <a href={row.website} target="_blank" rel="noopener noreferrer">
                    {row.website}
                  </a>
                </CTableDataCell>
                <CTableDataCell style={tableStyles} data-label="Descripción">
                  {row.description}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
};

export default MarketToolsTable;