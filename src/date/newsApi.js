import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import https from "https";

const API_KEY = "5b9dcb4581f449c0993c6bc545ca9eba";
const CACHE_LIFETIME = 15 * 60;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
    agent: new https.Agent({
      minVersion: "TLSv1.2",
    }),
  }),
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

export const { useGetCryptoNewsQuery, useGetStockNewsQuery } = newsApi;