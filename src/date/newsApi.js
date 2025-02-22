import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "2b4ab0fef5da4c8fb37df0c3176f971e";

const CACHE_LIFETIME = 15 * 60;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `everything?q=crypto&language=en&apiKey=${API_KEY}`,
      keepUnusedDataFor: CACHE_LIFETIME, 
    }),
    getStockNews: builder.query({
      query: () => `everything?q=stock market&language=en&apiKey=${API_KEY}`,
      keepUnusedDataFor: CACHE_LIFETIME,
    }),
  }),
});

export const {
  useGetCryptoNewsQuery,
  useGetStockNewsQuery,
} = newsApi;