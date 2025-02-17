import React from "react";
import "./Spinner.css"; 

const Spinner = () => {
  return (
    <div className="spinner-container" style={{ backgroundColor: "#0c161c" }}>
      <div className="spinner" style={{ borderColor: "#e0003d transparent transparent transparent" }}></div>
      <p style={{ color: "#e0003d", marginTop: "10px" }}>Cargando...</p>
    </div>
  );
};

export default Spinner;