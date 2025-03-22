import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';

const API_URLS = {
  Binance: "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=50",
  Coinbase: "https://api.exchange.coinbase.com/products/BTC-USD/book?level=2",
  Kraken: "https://api.kraken.com/0/public/Depth?pair=XBTUSD&count=50",
};

const OrderBook = () => {
 

};

export default OrderBook;