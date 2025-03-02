import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import { DateTime } from 'luxon'; 
import Flag from 'react-world-flags'; 
import { motion } from 'framer-motion';

const MarketPrices = () => {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState(null); 
  const styles = { backgroundColor: "#0c161c", color: "#e0003d", border: "1px solid #e0003d" };

  useEffect(() => {
    try {
      const marketData = [
        { market: 'New York Stock Exchange', exchangeName: 'NYSE', openTime: '09:30', closeTime: '16:00', timezone: 'America/New_York', countryCode: 'US' },
        { market: 'London Stock Exchange', exchangeName: 'LSE', openTime: '08:00', closeTime: '16:30', timezone: 'Europe/London', countryCode: 'GB' },
        { market: 'Tokyo Stock Exchange', exchangeName: 'TSE', openTime: '09:00', closeTime: '15:00', timezone: 'Asia/Tokyo', countryCode: 'JP' },
        { market: 'Australian Securities Exchange', exchangeName: 'ASX', openTime: '10:00', closeTime: '16:00', timezone: 'Australia/Sydney', countryCode: 'AU' },
        { market: 'Buenos Aires Stock Exchange', exchangeName: 'BCBA', openTime: '11:00', closeTime: '17:00', timezone: 'America/Argentina/Buenos_Aires', countryCode: 'AR' },
        { market: 'Shanghai Stock Exchange', exchangeName: 'SSE', openTime: '09:30', closeTime: '15:00', timezone: 'Asia/Shanghai', countryCode: 'CN' },
        { market: 'Toronto Stock Exchange', exchangeName: 'TSX', openTime: '09:30', closeTime: '16:00', timezone: 'America/Toronto', countryCode: 'CA' },
        { market: 'São Paulo Stock Exchange', exchangeName: 'B3', openTime: '10:00', closeTime: '17:00', timezone: 'America/Sao_Paulo', countryCode: 'BR' },
        { market: 'Frankfurt Stock Exchange', exchangeName: 'FWB', openTime: '08:00', closeTime: '20:00', timezone: 'Europe/Berlin', countryCode: 'DE' },
      ];

      const timeZoneArgentina = 'America/Argentina/Buenos_Aires';
      const formattedMarkets = marketData.map((market) => {
        const openTimeLocal = DateTime.fromFormat(market.openTime, 'HH:mm', { zone: market.timezone }).setZone(timeZoneArgentina).toFormat('HH:mm');
        const closeTimeLocal = DateTime.fromFormat(market.closeTime, 'HH:mm', { zone: market.timezone }).setZone(timeZoneArgentina).toFormat('HH:mm');
        return {
          ...market,
          openTimeLocal,
          closeTimeLocal,
        };
      });

      setMarkets(formattedMarkets);
    } catch (error) {
      console.error('Error fetching market schedules:', error);
      setError('Error al cargar los horarios de los mercados.');
    }
  }, []);

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className='container' id='horarios'>
      <h3 className="text-center mb-4" style={{color: "#e0003d"}}>Horarios de Apertura y Cierre de Mercados</h3>
      <CRow>
        {markets.map((market, index) => (
          <CCol xs={12} md={6} lg={4} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CCard style={styles}>
                <CCardHeader style={{ color: "#e0003d", backgroundColor: "#0c161c", fontSize: "20px" }} className="text-center">
                  <Flag code={market.countryCode} style={{ width: 20, height: 15, marginRight: 10 }} />
                  {market.market} ({market.exchangeName})<br />
                  ({market.openTime} - {market.closeTime} hora local)
                </CCardHeader>
                <CCardBody>
                  <div>
                    <strong>Apertura (Hora Argentina):</strong> {market.openTimeLocal}
                    <br />
                    <strong>Cierre (Hora Argentina):</strong> {market.closeTimeLocal}
                  </div>
                </CCardBody>
              </CCard>
            </motion.div>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default MarketPrices;