import React, { useState } from "react";
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavLink,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./NavBar.css"
export const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const sections = [
    { name: "Home", id: "home" },
    { name: "Operaciones", id: "operaciones" },
    { name: "Gráficos", id: "graficos" },
    { name: "Inversión por Operación", id: "inversion" },
    { name: "Ratio", id: "ratio" },
    { name: "Interés Compuesto", id: "interes-compuesto" },
    { name: "ROI", id: "roi" },
    { name: "Tabla de Herramientas de Mercado", id: "herramientas" },
    {name: "Patrones Graficos", id: "patrones-graficos"},
    { name: "Horarios del Mercado", id: "horarios" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CNavbar
      expand="lg"
      className="custom-navbar"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#0c161c",
        height: "100px",
        padding: "10px 15px", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
        zIndex: 1000,
      }}
    >
      <CContainer fluid>
        <CNavbarBrand
          href="#"
          className="navbar-brand-custom"
        >
          TradeTracker
        </CNavbarBrand>
        <CNavbarToggler
          aria-label="Toggle navigation"
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
          style={{ borderColor: "#df0136" }}
        />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav as="nav" className="navbar-nav-custom">
            {sections.map((section, index) => (
              <CNavLink
                key={index}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(section.id);
                }}
                className="nav-link-custom"
              >
                {section.name}
              </CNavLink>
            ))}
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};