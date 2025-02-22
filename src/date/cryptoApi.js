import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.binance.com/api/v3/' }),
  endpoints: (builder) => ({
    getAllCryptoPrices: builder.query({
      async queryFn(_) {
        const cryptos = [
          { symbol: 'BTC', name: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
          { symbol: 'ETH', name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
          { symbol: 'SOL', name: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
          { symbol: 'ADA', name: 'Cardano', logo: 'https://assets.coingecko.com/coins/images/975/large/cardano.png' },
          { symbol: 'DOT', name: 'Polkadot', logo: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png' },
          { symbol: 'BNB', name: 'Binance Coin', logo: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
          { symbol: 'LTC', name: 'Litecoin', logo: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png' },
          { symbol: 'XRP', name: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
        ];

        const fetchCrypto = async (crypto) => {
          try {
            const response = await fetch(
              `https://api.binance.com/api/v3/ticker/24hr?symbol=${crypto.symbol.toUpperCase()}USDT`
            );
            const data = await response.json();

            if (!data.lastPrice) throw new Error(`No data for ${crypto.symbol}`);

            return {
              symbol: crypto.symbol,
              name: crypto.name,
              logo: crypto.logo,
              price: parseFloat(data.lastPrice).toFixed(2),
              change: parseFloat(data.priceChangePercent).toFixed(2),
              volume: parseFloat(data.quoteVolume),
            };
          } catch (error) {
            console.error(`Error fetching ${crypto.symbol}:`, error);
            return { symbol: crypto.symbol, name: crypto.name, logo: crypto.logo, price: 'N/A', change: 'N/A', volume: 'N/A' };
          }
        };

        const results = await Promise.all(cryptos.map(fetchCrypto));
        return { data: results };
      },
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 3600, 
    }),
  }),
});

export const { useGetAllCryptoPricesQuery } = cryptoApi;