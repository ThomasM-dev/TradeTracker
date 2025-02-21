import React, { useState, useEffect, useCallback } from 'react';
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CryptoCarousel.css'; // Archivo CSS personalizado para estilos adicionales

// Componente CryptoCard optimizado
const CryptoCard = React.memo(({ name, symbol, logo, updateInterval }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
      );
      const newPrice = response.data[symbol]?.usd;
      if (newPrice !== undefined) {
        setPrice(newPrice);
        setError(null);
      } else {
        throw new Error(`Precio no disponible para ${name}`);
      }
    } catch (err) {
      console.error(`Error fetching ${name} price:`, err);
      setError(`Error al cargar el precio de ${name}. Inténtalo de nuevo más tarde.`);
    } finally {
      setLoading(false);
    }
  }, [symbol, name]);

  useEffect(() => {
    fetchPrice();
    const intervalId = setInterval(fetchPrice, updateInterval); // Intervalo dinámico
    return () => clearInterval(intervalId);
  }, [fetchPrice, updateInterval]);

  return (
    <CCard
      style={{
        width: '18rem',
        textAlign: 'center',
        padding: '1rem',
        flexShrink: 0,
        backgroundColor: 'transparent',
      }}
      aria-label={`Información de criptomoneda ${name}`}
    >
      <img src={logo} alt={`${name} logo`} style={{ width: '50px', margin: '0 auto' }} />
      <CCardBody>
        <CCardTitle style={{ color: '#df0136' }}>{name}</CCardTitle>
        <CCardText>
          {loading
            ? 'Cargando...'
            : error
            ? error
            : `$${price?.toFixed(2) || 'N/A'}`}
        </CCardText>
      </CCardBody>
    </CCard>
  );
});

const CryptoCarousel = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026", updateInterval: 60000 },
    { name: "Ethereum", symbol: "ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026", updateInterval: 60000 }, 
    { name: "Solana", symbol: "solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=026", updateInterval: 60000 }, 
    { name: "Cardano", symbol: "cardano", logo: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=026", updateInterval: 180000 },
    { name: "Polkadot", symbol: "polkadot", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=026", updateInterval: 180000 },
  ];

  const settings = {
    dots: false, 
    infinite: true,
    speed: 400, 
    slidesToShow: 4, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000,
    cssEase: 'linear', 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {cryptos.map((crypto, index) => (
          <div key={`${crypto.symbol}-${index}`} style={{ padding: '0 10px' }}>
            <CryptoCard {...crypto} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CryptoCarousel;