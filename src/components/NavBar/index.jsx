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
import "./NavBar.css";

export const NavBar = ({ refs }) => {
  const [visible, setVisible] = useState(false);

  const sections = [
    { name: "Home", ref: refs.home },
    {name: "Portafolio Diversificado", ref: refs.portafoliodiversificado},
    { name: "Operaciones", ref: refs.tradingTable },
    { name: "Gráficos", ref: refs.pieCharts },
    { name: "Inversión por Operación", ref: refs.investmentCalculator },
    { name: "Ratio", ref: refs.ratioCalculator },
    { name: "Interés Compuesto", ref: refs.interestCalculator },
    { name: "ROI", ref: refs.roiCalculator },
    {name: "EMA Exponencial", ref: refs. emaExponencial},
    { name: "Herramientas de Mercado", ref: refs.marketToolsTable },
    { name: "Patrones Gráficos", ref: refs.graphicPatterns },
    { name: "Horarios del Mercado", ref: refs.marketPrices },
    {name: "Rutina de Mercado", ref: refs.MarketRoutine}
  ];

  const handleScroll = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
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
        <CNavbarBrand href="#" className="navbar-brand-custom">
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
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(section.ref);
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
