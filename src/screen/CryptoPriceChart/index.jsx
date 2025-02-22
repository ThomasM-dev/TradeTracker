import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CryptoCarousel.css';
import CryptoCard from '../../components/CryptoCard';
import {useGetAllCryptoPricesQuery} from "../../date/cryptoApi"
const CryptoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { data, error, isLoading, dataUpdatedAt } = useGetAllCryptoPricesQuery();
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !isPaused,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="carousel-container-crypto"
      id="home"
      style={{ backgroundColor: '#0d0d0d', padding: '2rem 0' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Slider {...settings}>
        {isLoading && !data ? (
          Array(8).fill().map((_, index) => (
            <div key={`loading-${index}`} style={{ padding: '0 15px' }}>
              <CryptoCard
                name="Cargando..."
                symbol=""
                price="N/A"
                change="N/A"
                volume="N/A"
                isLoading={true}
                error={null}
                lastUpdated={null}
              />
            </div>
          ))
        ) : error ? (
          <div style={{ color: '#ff3333', textAlign: 'center', padding: '20px' }}>
            Error al cargar los datos del mercado.
          </div>
        ) : (
          data?.map((crypto) => (
            <div key={crypto.symbol} style={{ padding: '0 15px' }}>
              <CryptoCard
                name={crypto.name}
                symbol={crypto.symbol}
                logo={crypto.logo}
                price={crypto.price}
                change={crypto.change}
                volume={crypto.volume}
                isLoading={isLoading}
                error={error ? `No se pudo cargar datos de ${crypto.name}` : null}
                lastUpdated={lastUpdated}
              />
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default CryptoCarousel;