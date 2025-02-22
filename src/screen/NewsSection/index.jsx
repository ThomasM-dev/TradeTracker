import React, { useMemo } from 'react';
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CLink,
  CButton,
  CRow,
  CCol,
} from '@coreui/react';
import { useGetCryptoNewsQuery, useGetStockNewsQuery } from '../../date/newsApi';
import './NewsSection.css';

const NewsSection = React.memo(() => {
  const {
    data: cryptoNews,
    error: cryptoError,
    isLoading: cryptoLoading,
    refetch: refetchCrypto,
  } = useGetCryptoNewsQuery();

  const {
    data: stockNews,
    error: stockError,
    isLoading: stockLoading,
    refetch: refetchStock,
  } = useGetStockNewsQuery();

  
  const cryptoArticles = useMemo(() => {
    return cryptoNews
      ?.slice(0, 20)
      .filter(article => article.source?.name !== 'Yahoo Entertainment') 
      .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  }, [cryptoNews]);

  const stockArticles = useMemo(() => {
    return stockNews
      ?.slice(0, 20)
      .filter(article => article.source?.name !== 'Yahoo Entertainment') 
      .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  }, [stockNews]);

  const renderSkeleton = () => (
    <CListGroup>
      {Array(5)
        .fill()
        .map((_, index) => (
          <CListGroupItem key={index} className="bg-dark text-white">
            <CRow>
              <CCol xs="3">
                <div className="skeleton-image" />
              </CCol>
              <CCol xs="9">
                <div className="skeleton-title" />
                <div className="skeleton-description" />
                <div className="skeleton-source" />
              </CCol>
            </CRow>
          </CListGroupItem>
        ))}
    </CListGroup>
  );

  const renderNewsSection = (title, articles, isLoading, error, refetch) => (
    <CCard className="mb-4 bg-dark text-white shadow-sm container">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0" style={{ color: '#df0136' }}>{title}</h2>
        <CButton
          style={{ backgroundColor: '#0c161c', color: '#df0136' }}
          size="sm"
          onClick={refetch}
          aria-label={`Actualizar ${title}`}
        >
          Actualizar
        </CButton>
      </CCardHeader>
      <CCardBody>
        {isLoading && !articles ? (
          <>
            <CSpinner color="primary" className="mb-3" />
            {renderSkeleton()}
          </>
        ) : error ? (
          <div className="text-danger">
            <p>Error al cargar las noticias: {error.message || 'Desconocido'}</p>
            <CButton color="danger" size="sm" onClick={refetch}>
              Reintentar
            </CButton>
          </div>
        ) : articles?.length > 0 ? (
          <CListGroup>
            {articles.map((news) => (
              <CListGroupItem
                key={news.url}
                className="bg-dark text-white border-0 hover-effect"
              >
                <CLink
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none"
                >
                  <CRow>
                    <CCol xs="3">
                      <img
                        src={news.urlToImage}
                        alt={news.title}
                        className="news-image"
                      />
                    </CCol>
                    <CCol xs="9">
                      <div className="d-flex justify-content-between">
                        <span>{news.title}</span>
                        {news.publishedAt && (
                          <small className="text-muted">
                            {new Date(news.publishedAt).toLocaleDateString()}
                          </small>
                        )}
                      </div>
                      <p className="text-white mt-1 mb-1 news-description">
                        {news.description || 'No hay descripción disponible.'}
                      </p>
                      {news.source?.name && (
                        <small className="text-secondary">
                          Fuente: {news.source.name}
                        </small>
                      )}
                    </CCol>
                  </CRow>
                </CLink>
              </CListGroupItem>
            ))}
          </CListGroup>
        ) : (
          <CListGroupItem className="bg-dark text-white">
            No hay noticias disponibles.
          </CListGroupItem>
        )}
      </CCardBody>
    </CCard>
  );

  return (
    <CContainer fluid className="p-4 bg-dark text-white">
      {renderNewsSection(
        'Noticias de Criptomonedas',
        cryptoArticles,
        cryptoLoading,
        cryptoError,
        refetchCrypto
      )}
      {renderNewsSection(
        'Noticias de Acciones',
        stockArticles,
        stockLoading,
        stockError,
        refetchStock
      )}
    </CContainer>
  );
});

export default NewsSection;