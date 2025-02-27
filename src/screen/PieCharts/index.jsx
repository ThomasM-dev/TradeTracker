import React, { useState } from 'react';
import {
  CCard,
  CButton,
  CListGroup,
  CListGroupItem,
  CAlert,
  CFormInput
} from '@coreui/react';

const PortafolioDiversificado = () => {
  const [capital, setCapital] = useState('');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState('');

  const calcularDistribucion = () => {
    // Limpiar estados previos
    setError('');
    setResultados(null);

    // Validar entrada
    const capitalNumerico = parseFloat(capital);
    if (isNaN(capitalNumerico) || capitalNumerico <= 0) {
      setError('Por favor, ingresa un capital válido mayor a 0');
      return;
    }

    // Calcular distribución
    const distribucion = {
      criptomonedas: capitalNumerico * 0.5,
      etfs: capitalNumerico * 0.3,
      acciones: capitalNumerico * 0.1,
      tokens: capitalNumerico * 0.1
    };

    setResultados(distribucion);
  };

  return (
    <CCard style={{ 
      backgroundColor: '#0c161c', 
      border: 'none',
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ color: '#e0003d', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Portafolio Diversificado</h3>
      </div>

      <CFormInput
        type="number"
        placeholder="Ingresa el capital a invertir"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
        style={{
          backgroundColor: '#1a2529',
          color: '#ffffff',
          border: '1px solid #e0003d',
          marginBottom: '15px'
        }}
      />

      <CButton
        onClick={calcularDistribucion}
        style={{
          backgroundColor: '#e0003d',
          color: '#ffffff',
          border: 'none',
          width: '100%',
          marginBottom: '20px'
        }}
      >
        Calcular Distribución
      </CButton>

      {error && (
        <CAlert
          style={{
            backgroundColor: '#e0003d',
            color: '#ffffff',
            border: 'none',
            marginBottom: '20px'
          }}
        >
          {error}
        </CAlert>
      )}

      {resultados && (
        <CListGroup style={{ border: 'none' }}>
          <CListGroupItem
            style={{
              backgroundColor: '#0c161c',
              color: '#e0003d',
              border: 'none'
            }}
          >
            Criptomonedas (50%): ${resultados.criptomonedas.toFixed(2)}
          </CListGroupItem>
          <CListGroupItem
            style={{
              backgroundColor: '#0c161c',
              color: '#e0003d',
              border: 'none'
            }}
          >
            ETFs (30%): ${resultados.etfs.toFixed(2)}
          </CListGroupItem>
          <CListGroupItem
            style={{
              backgroundColor: '#0c161c',
              color: '#e0003d',
              border: 'none'
            }}
          >
            Acciones (10%): ${resultados.acciones.toFixed(2)}
          </CListGroupItem>
          <CListGroupItem
            style={{
              backgroundColor: '#0c161c',
              color: '#e0003d',
              border: 'none'
            }}
          >
            Tokens (10%): ${resultados.tokens.toFixed(2)}
          </CListGroupItem>
        </CListGroup>
      )}
    </CCard>
  );
};

export default PortafolioDiversificado;