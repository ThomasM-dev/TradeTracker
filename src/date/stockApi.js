import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

        const results = [];
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        for (const stock of stocks) {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=TU_CLAVE_API`
            );
            const data = await response.json();

            if (!data['Global Quote']) {
              throw new Error(`No quote data for ${stock.symbol}`);
            }

            const quote = data['Global Quote'];
            results.push({
              symbol: stock.symbol,
              name: stock.name,
              logo: stock.logo,
              price: parseFloat(quote['05. price']).toFixed(2),
              change: quote['10. change percent'],
              volume: parseFloat(quote['06. volume']),
            });
          } catch (error) {
            results.push({
              symbol: stock.symbol,
              name: stock.name,
              logo: stock.logo,
              price: 'N/A',
              change: 'N/A',
              volume: 'N/A',
            });
          }
          await delay(13000); 
        }

        return { data: results };
      },
      keepUnusedDataFor: CACHE_LIFETIME, 
      refetchOnMountOrArgChange: false, 
    }),
  }),
});

export const { useGetAllStockPricesQuery } = stockApi;