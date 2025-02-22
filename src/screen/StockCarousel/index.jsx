import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StockCard from '../../components/StockCard';
import { useGetAllStockPricesQuery } from '../../date/stockApi';
import './StockCarousel.css';

const StockCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { data, error, isLoading, dataUpdatedAt } = useGetAllStockPricesQuery();
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
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
      className="carousel-container"
      id="home"
      style={{ backgroundColor: '#0d0d0d', padding: '2rem 0' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Slider {...settings}>
        {isLoading && !data ? (
          Array(5).fill().map((_, index) => (
            <div key={`loading-${index}`} style={{ padding: '0 15px' }}>
              <StockCard
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
          data?.map((stock) => (
            <div key={stock.symbol} style={{ padding: '0 15px' }}>
              <StockCard
                name={stock.name}
                symbol={stock.symbol}
                logo={stock.logo}
                price={stock.price}
                change={stock.change}
                volume={stock.volume}
                isLoading={isLoading}
                error={error ? `No se pudo cargar datos de ${stock.name}` : null}
                lastUpdated={lastUpdated}
              />
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default StockCarousel;