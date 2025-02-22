import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = "KQQN4O00GU7UKTWN";
const CACHE_LIFETIME = 10 * 60;

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/query' }),
  endpoints: (builder) => ({
    getAllStockPrices: builder.query({
      async queryFn(_) {
        const stocks = [
          { symbol: 'NVDA', name: 'Nvidia', logo: 'https://logo.clearbit.com/nvidia.com' },
          { symbol: 'SPY', name: 'S&P 500', logo: 'https://logo.clearbit.com/spglobal.com' },
          { symbol: 'MSFT', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
          { symbol: 'SONY', name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' },
          { symbol: 'TM', name: 'Toyota', logo: 'https://logo.clearbit.com/toyota.com' },
        ];

        try {
          const requests = stocks.map((stock) =>
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(`Respuesta para ${stock.symbol}:`, data);
                if (!data['Global Quote']) throw new Error(`No data for ${stock.symbol}`);

                const quote = data['Global Quote'];
                return {
                  symbol: stock.symbol,
                  name: stock.name,
                  logo: stock.logo,
                  price: parseFloat(quote['05. price']).toFixed(2),
                  change: quote['10. change percent'],
                  volume: parseFloat(quote['06. volume']),
                };
              })
              .catch((error) => ({
                symbol: stock.symbol,
                name: stock.name,
                logo: stock.logo,
                price: 'N/A',
                change: 'N/A',
                volume: 'N/A',
                error: error.message,
              }))
          );

          const results = await Promise.all(requests);
          return { data: results };
        } catch (error) {
          return { error: { message: 'Error al obtener los datos', details: error.message } };
        }
      },
      keepUnusedDataFor: CACHE_LIFETIME,
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const { useGetAllStockPricesQuery } = stockApi;
