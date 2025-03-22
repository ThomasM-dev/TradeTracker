import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';

const API_URLS = {
  Binance: "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=50",
  Coinbase: "https://api.exchange.coinbase.com/products/BTC-USD/book?level=2",
  Kraken: "https://api.kraken.com/0/public/Depth?pair=XBTUSD&count=50",
};

const OrderBook = () => {
  const [orderBooks, setOrderBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef(null);
  const wsRef = useRef(null);

  const cardStyle = {
    backgroundColor: '#0c161c',
    color: '#e0003d',
    border: '1px solid #e0003d',
  };

  const fetchRestOrderBooks = useCallback(async () => {
    try {
      const responses = await Promise.all(
        Object.entries(API_URLS).map(async ([exchange, url]) => {
          const response = await axios.get(url);
          let data = response.data;

          if (exchange === "Coinbase") {
            data = { asks: data.asks, bids: data.bids };
          } else if (exchange === "Kraken") {
            data = data.result?.XBTUSD || { asks: [], bids: [] };
          }

          return { name: exchange, data };
        })
      );
      return responses;
    } catch (err) {
      console.error("Error fetching REST order books:", err);
      throw new Error(`Fallo al obtener datos: ${err.message}`);
    }
  }, []);

  const setupHyperliquidWebSocket = useCallback(() => {
    wsRef.current = new WebSocket("wss://api.hyperliquid.xyz/ws");

    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({
        method: "subscribe",
        subscription: { type: "l2Book", coin: "BTC" }
      }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "l2Book" && data.coin === "BTC") {
        const hyperliquidData = {
          name: "Hyperliquid",
          data: { asks: data.data.asks, bids: data.data.bids }
        };
        setOrderBooks((prev) => {
          const others = prev.filter((book) => book.name !== "Hyperliquid");
          return [...others, hyperliquidData];
        });
      }
    };

    wsRef.current.onerror = () => {
      setError("Error en la conexión WebSocket de Hyperliquid.");
    };
  }, []);

  const fetchOrderBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const restData = await fetchRestOrderBooks();
      setOrderBooks((prev) => {
        const hyperliquid = prev.find((book) => book.name === "Hyperliquid");
        return [...restData, ...(hyperliquid ? [hyperliquid] : [])];
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRestOrderBooks]);

  const startOrderBooks = useCallback(() => {
    if (!isStarted) {
      setIsStarted(true);
      fetchOrderBooks();
      setupHyperliquidWebSocket();
      intervalRef.current = setInterval(fetchOrderBooks, 30000);
    }
  }, [isStarted, fetchOrderBooks, setupHyperliquidWebSocket]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const MIN_QUANTITY = 1; // Cantidad mínima en BTC
  const MAX_ORDERS = 30; // Máximo de órdenes por tabla

  // Procesar asks y bids
  const allAsks = orderBooks
    .flatMap((exchange) =>
      exchange.data.asks?.map((ask) => ({
        exchange: exchange.name,
        price: parseFloat(ask[0] || ask.price),
        quantity: parseFloat(ask[1] || ask.size || ask.qty)
      })).filter((ask) => ask.quantity >= MIN_QUANTITY) || []
    )
    .sort((a, b) => a.price - b.price)
    .slice(0, MAX_ORDERS);

  const allBids = orderBooks
    .flatMap((exchange) =>
      exchange.data.bids?.map((bid) => ({
        exchange: exchange.name,
        price: parseFloat(bid[0] || bid.price),
        quantity: parseFloat(bid[1] || bid.size || bid.qty)
      })).filter((bid) => bid.quantity >= MIN_QUANTITY) || []
    )
    .sort((a, b) => b.price - a.price)
    .slice(0, MAX_ORDERS);

  // Calcular soporte y resistencia
  const calculateSupportResistance = () => {
    // Agrupar por precio y sumar cantidades
    const asksByPrice = allAsks.reduce((acc, order) => {
      acc[order.price] = (acc[order.price] || 0) + order.quantity;
      return acc;
    }, {});

    const bidsByPrice = allBids.reduce((acc, order) => {
      acc[order.price] = (acc[order.price] || 0) + order.quantity;
      return acc;
    }, {});

    // Encontrar el precio con mayor volumen
    const resistance = Object.entries(asksByPrice).reduce(
      (max, [price, qty]) => (qty > max.qty ? { price: parseFloat(price), qty } : max),
      { price: 0, qty: 0 }
    );

    const support = Object.entries(bidsByPrice).reduce(
      (max, [price, qty]) => (qty > max.qty ? { price: parseFloat(price), qty } : max),
      { price: 0, qty: 0 }
    );

    return { support, resistance };
  };

  const { support, resistance } = calculateSupportResistance();

  return (
    <div className="p-4">
      <h2 className="text-center" style={{ ...cardStyle, border: 'none' }}>
        Libro de Órdenes Límite Consolidado (≥ {MIN_QUANTITY} BTC)
      </h2>

      <div className="text-center mb-3">
        <CButton
          style={{ backgroundColor: "#e0003d", color: "white", padding: "10px" }}
          className={isStarted ? "d-none" : ""}
          onClick={startOrderBooks}
          disabled={isStarted}
        >
          Iniciar Libro de Órdenes
        </CButton>
      </div>

      {loading && <CSpinner color="primary" className="d-block mx-auto" />}

      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && orderBooks.length > 0 && (
        <>
          {/* Mostrar soporte y resistencia */}
          <div className="text-center mb-4">
            <p style={{ color: "green", fontSize: "1.2em" }}>
              <strong>Soporte:</strong> {support.price.toFixed(2)} USD ({support.qty.toFixed(4)} BTC)
            </p>
            <p style={{ color: "red", fontSize: "1.2em" }}>
              <strong>Resistencia:</strong> {resistance.price.toFixed(2)} USD ({resistance.qty.toFixed(4)} BTC)
            </p>
          </div>

          <div className="row">
            {/* Tabla de Asks */}
            <div className="col-md-6">
              <h3 className="text-center" style={{ color: "red" }}>Asks (Órdenes de Venta)</h3>
              <CTable striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={cardStyle}>Exchange</CTableHeaderCell>
                    <CTableHeaderCell style={cardStyle}>Precio (USD)</CTableHeaderCell>
                    <CTableHeaderCell style={cardStyle}>Cantidad (BTC)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allAsks.map((order, index) => (
                    <CTableRow key={index} style={order.price === resistance.price ? { backgroundColor: "#ffcccc" } : {}}>
                      <CTableDataCell style={{ color: "red", backgroundColor: "#0c161c", border: "none" }}>
                        {order.exchange}
                      </CTableDataCell>
                      <CTableDataCell style={{ color: "red", backgroundColor: "#0c161c", border: "none" }}>
                        {order.price.toFixed(2)}
                      </CTableDataCell>
                      <CTableDataCell style={{ color: "red", backgroundColor: "#0c161c", border: "none" }}>
                        {order.quantity.toFixed(4)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {allAsks.length === 0 && (
                <p className="text-center" style={{ color: "red" }}>
                  No hay asks con cantidades ≥ {MIN_QUANTITY} BTC.
                </p>
              )}
            </div>

            {/* Tabla de Bids */}
            <div className="col-md-6">
              <h3 className="text-center" style={{ color: "green" }}>Bids (Órdenes de Compra)</h3>
              <CTable striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={cardStyle}>Exchange</CTableHeaderCell>
                    <CTableHeaderCell style={cardStyle}>Precio (USD)</CTableHeaderCell>
                    <CTableHeaderCell style={cardStyle}>Cantidad (BTC)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allBids.map((order, index) => (
                    <CTableRow key={index} style={order.price === support.price ? { backgroundColor: "#ccffcc" } : {}}>
                      <CTableDataCell style={{ color: "green", backgroundColor: "#0c161c", border: "none" }}>
                        {order.exchange}
                      </CTableDataCell>
                      <CTableDataCell style={{ color: "green", backgroundColor: "#0c161c", border: "none" }}>
                        {order.price.toFixed(2)}
                      </CTableDataCell>
                      <CTableDataCell style={{ color: "green", backgroundColor: "#0c161c", border: "none" }}>
                        {order.quantity.toFixed(4)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {allBids.length === 0 && (
                <p className="text-center" style={{ color: "green" }}>
                  No hay bids con cantidades ≥ {MIN_QUANTITY} BTC.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderBook;