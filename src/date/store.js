import { configureStore } from '@reduxjs/toolkit';
import statsReducer from "./statsSlice";
import { firebaseApi } from "./firebaseApi";
import { cryptoApi } from './cryptoApi';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware,cryptoApi.middleware),

});


