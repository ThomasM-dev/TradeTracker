import React, { useState } from "react";
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from "@coreui/react";
import { v4 as uuidv4 } from "uuid"; 
import { infoTableTrading } from "../../date/infoTableTrading"; 
import "./MarketToolsTable.css"; 

const MarketToolsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = infoTableTrading.items.slice(indexOfFirstRow, indexOfLastRow);

  if (!infoTableTrading.items || infoTableTrading.items.length === 0) {
    return <p style={{ textAlign: "center", color: "#df0136" }}>No hay datos disponibles.</p>;
  }

  return (
    <div className={window.innerWidth <= 768 ? "container-fluid" : "container"}>
      <h3 className="table-header">Tabla de Herramientas de Mercado</h3>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <CTable className="table" id="herramientas" aria-label="Tabla de herramientas de mercado">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{color : "#df0136", backgroundColor: "#0c161c"}} className="text-center">Sitio Web</CTableHeaderCell>
              <CTableHeaderCell  style={{color : "#df0136", backgroundColor: "#0c161c"}} className="text-center">Descripción</CTableHeaderCell>
            </CTableRow> 
          </CTableHead>

          <CTableBody>
            {currentRows.map((row) => (
              <CTableRow key={uuidv4()} className="table-row" >
                <CTableDataCell  data-label="Sitio Web"  style={{color : "#df0136", backgroundColor: "#0c161c"}} className="text-center">
                  <a
                    href={row.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#df0136",
                      textDecoration: "none",
                    }}
                    aria-label={`Visitar ${row.website}`}
                  >
                    {row.website}
                  </a>
                </CTableDataCell>

                <CTableDataCell className="table-cell description-cell" data-label="Descripción"  style={{color : "#df0136", backgroundColor: "#0c161c"}}>
                  {row.description}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(infoTableTrading.items.length / rowsPerPage) }).map((_, index) => (
          <button
            key={uuidv4()}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MarketToolsTable;