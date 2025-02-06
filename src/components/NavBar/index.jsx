import React, { useState } from 'react'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavLink,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css';

export const NavBar = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="lg" className="bg-black ">
        <CContainer fluid>
          <CNavbarBrand className="text-light"  href="#">TradeTracker</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav as="nav">
              <CNavLink className="text-light"  href="#" active>
                Home
              </CNavLink>
              <CNavLink className="text-light"  href="#">Operaciones</CNavLink>
              <CNavLink  className="text-light" href="#">Gráficos </CNavLink>
              <CNavLink className="text-light"  href="#">Plan de Trading</CNavLink>
              <CNavLink className="text-light"  href="#">Horario de los mercados</CNavLink>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}
