import { configureStore } from '@reduxjs/toolkit';
import statsReducer from "./statsSlice";
import { firebaseApi } from "./firebaseApi";
import { newsApi } from './newsApi';
import { stockApi } from './stockApi';
import { cryptoApi } from './cryptoApi';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware, newsApi.middleware,stockApi.middleware,cryptoApi.middleware),

});


