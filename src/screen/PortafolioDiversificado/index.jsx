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
    setError('');
    setResultados(null);

    const capitalNumerico = parseFloat(capital);
    if (isNaN(capitalNumerico) || capitalNumerico <= 0) {
      setError('Por favor, ingresa un capital válido mayor a 0');
      return;
    }

    const distribucion = {
      criptomonedas: capitalNumerico * 0.5,
      etfs: capitalNumerico * 0.3,
      acciones: capitalNumerico * 0.1,
      tokens: capitalNumerico * 0.1
    };

    setResultados(distribucion);
  };

  return (
    <CCard
      style={{
        backgroundColor: '#0c161c',
        border: 'none',
        padding: '25px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <div
        style={{
          color: '#e0003d',
          marginBottom: '25px',
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Portafolio Diversificado</h3>
      </div>

      <CFormInput
        type="number"
        placeholder="Ingresa el capital a invertir"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
        style={{
          backgroundColor: '#1a2529',
          color: '#ffffff',
          border: '2px solid #e0003d',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          ':hover': {
            borderColor: '#ff3366'
          },
          ':focus': {
            borderColor: '#ff3366',
            boxShadow: '0 0 8px rgba(224, 0, 61, 0.3)'
          }
        }}
      />

      <CButton
        onClick={calcularDistribucion}
        style={{
          backgroundColor: '#e0003d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          fontSize: '1.1rem',
          fontWeight: '500',
          marginBottom: '25px',
          transition: 'all 0.3s ease',
          ':hover': {
            backgroundColor: '#ff3366',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(224, 0, 61, 0.4)'
          }
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
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '0.95rem',
            opacity: 0.9,
            transition: 'all 0.3s ease'
          }}
        >
          {error}
        </CAlert>
      )}

      {resultados && (
        <CListGroup style={{ border: 'none' }}>
          {[
            { label: 'Criptomonedas (50%)', value: resultados.criptomonedas },
            { label: 'ETFs (30%)', value: resultados.etfs },
            { label: 'Acciones (10%)', value: resultados.acciones },
            { label: 'Tokens (10%)', value: resultados.tokens }
          ].map((item, index) => (
            <CListGroupItem
              key={index}
              style={{
                backgroundColor: '#1a2529',
                color: '#e0003d',
                border: 'none',
                padding: '15px',
                marginBottom: '8px',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: '#22333b',
                  transform: 'translateX(5px)'
                }
              }}
            >
              {item.label}: <span style={{ fontWeight: 'bold' }}>
                ${item.value.toFixed(2)}
              </span>
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
    </CCard>
  );
};

export default PortafolioDiversificado;