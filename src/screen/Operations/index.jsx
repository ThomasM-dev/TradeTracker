import React, { useState } from "react";
import "./Operations.css"; 

const Operations = () => {
  const [operationsFinished, setOperationsFinished] = useState([
    {
      id: "",
      date: "",
      asset: "",
      type: "",
      entryPrice: "",
      exitPrice: "",
      quantity: "",
      totalValue: "",
      commission: "",
      result: "",
      stopLoss: "",
      takeProfit: "",
      notes: "",
    },
  ]);

  const handleSaveOperation = () => {
    // Lógica para guardar una nueva operación
    console.log("Agregar operación");
  };

  return (
    <div className="mt-5 mb-5"> 
    <div className="operations-container">
      <h2 className="text-center text-white">Registros de Operaciones de Trading</h2>
      <div className="table-wrapper">
        <table className="operations-table">
          <thead>
            <tr>
              {[
                "Operación N°",
                "Fecha y Hora",
                "Activo",
                "Tipo de Operación",
                "Precio de Entrada",
                "Precio de Salida",
                "Cantidad",
                "Valor Total",
                "Comisión",
                "Resultado",
                "Stop-Loss",
                "Take-Profit",
                "Notas",
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {operationsFinished.length > 1 ? (
              operationsFinished.map((operation, index) => (
                <tr key={index}>
                  {Object.values(operation).map((value, idx) => (
                    <td key={idx}>{value || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="no-data">
                  No hay Operaciones Registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="add-operation-button" onClick={handleSaveOperation}>
        Agregar Operación
      </button>
    </div>
    </div>
  );
};

export default Operations;
