import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "5b9dcb4581f449c0993c6bc545ca9eba";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `everything?q=crypto&language=en&apiKey=${API_KEY}`,
      transformResponse: (response) => response.articles,
    }),
    getStockNews: builder.query({
      query: () => `everything?q=stock market&language=en&apiKey=${API_KEY}`,
      transformResponse: (response) => response.articles,
    }),
  }),
});

export const { useGetCryptoNewsQuery, useGetStockNewsQuery } = newsApi;