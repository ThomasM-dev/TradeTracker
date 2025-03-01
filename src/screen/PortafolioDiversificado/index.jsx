import React, { useState } from 'react';
import {
  CCard,
  CButton,
  CListGroup,
  CListGroupItem,
  CAlert,
  CFormInput
} from '@coreui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

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
      criptomonedas: capitalNumerico * 0.30,  // 30%
      acciones: capitalNumerico * 0.20,      // 20%
      etfs: capitalNumerico * 0.15,          // 15%
      tokens: capitalNumerico * 0.05,        // 5%
      trading: capitalNumerico * 0.30        // 30%
    };

    setResultados(distribucion);
  };

  // Datos para el gráfico de torta
  const chartData = resultados ? {
    labels: ['Criptomonedas (30%)', 'Acciones (20%)', 'ETFs (15%)', 'Tokens nuevos (5%)', 'Trading (30%)'],
    datasets: [{
      data: [
        resultados.criptomonedas,
        resultados.acciones,
        resultados.etfs,
        resultados.tokens,
        resultados.trading
      ],
      backgroundColor: [
        '#e0003d', // Rojo para cripto
        '#ff3366', // Rosa para acciones
        '#1a2529', // Gris oscuro para ETFs
        '#ff9999', // Rosa claro para tokens
        '#cc0033'  // Rojo oscuro para trading
      ],
      borderWidth: 1,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${context.label}: $${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <CCard
      style={{
        backgroundColor: '#0c161c',
        border: 'none',
        padding: '25px',
        maxWidth: '600px',
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
          transition: 'all 0.3s ease'
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
          transition: 'all 0.3s ease'
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
            opacity: 0.9
          }}
        >
          {error}
        </CAlert>
      )}

      {resultados && (
        <>
          <CListGroup style={{ border: 'none', marginBottom: '20px' }}>
            {[
              { label: 'Criptomonedas (30%)', value: resultados.criptomonedas },
              { label: 'Acciones (20%)', value: resultados.acciones },
              { label: 'ETFs (15%)', value: resultados.etfs },
              { label: 'Tokens nuevos (5%)', value: resultados.tokens },
              { label: 'Trading (30%)', value: resultados.trading }
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
                  fontSize: '1rem'
                }}
              >
                {item.label}: <span style={{ fontWeight: 'bold' }}>
                  ${item.value.toFixed(2)}
                </span>
              </CListGroupItem>
            ))}
          </CListGroup>

          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </CCard>
  );
};

export default PortafolioDiversificado;