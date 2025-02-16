import { configureStore } from '@reduxjs/toolkit';
import statsReducer from "./statsSlice";
import { firebaseApi } from "./firebaseApi";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});


