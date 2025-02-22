import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CSpinner, CTooltip } from '@coreui/react';

const StockCard = React.memo(({ name, symbol, logo, price, change, volume, isLoading, error, lastUpdated }) => {
  const formatVolume = (vol) => {
    if (!vol || vol === 'N/A') return 'N/A';
    return vol > 1e6 ? `${(vol / 1e6).toFixed(2)}M` : vol.toLocaleString('en-US');
  };

  return (
    <CCard
      className="stock-card"
      style={{
        width: '18rem',
        textAlign: 'center',
        padding: '1rem',
        flexShrink: 0,
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        transition: 'transform 0.2s',
      }}
    >
      <CTooltip content={`Última actualización: ${lastUpdated?.toLocaleTimeString() || 'N/A'}`}>
        <img
          src={logo}
          alt={`${name} logo`}
          style={{ width: '50px', margin: '0 auto', borderRadius: '50%' }}
        />
      </CTooltip>
      <CCardBody>
        <CCardTitle style={{ color: '#df0136', fontSize: '1.2rem' }}>{name}</CCardTitle>
        {isLoading ? (
          <CSpinner size="sm" color="danger" />
        ) : error ? (
          <CCardText className="text-danger">{error}</CCardText>
        ) : (
          <>
            <CCardText style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${price !== 'N/A' ? parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
            </CCardText>
            <CCardText style={{ color: change >= 0 ? '#00cc00' : '#ff3333', fontWeight: '500' }}>
              {change !== 'N/A' ? `${parseFloat(change).toFixed(2)}% ${change >= 0 ? '↑' : '↓'}` : 'N/A'}
            </CCardText>
            <CCardText style={{ color: '#888', fontSize: '0.9rem' }}>
              Vol: {formatVolume(volume)}
            </CCardText>
          </>
        )}
      </CCardBody>
    </CCard>
  );
});

export default StockCard;