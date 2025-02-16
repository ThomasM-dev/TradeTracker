import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './statsSlice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
  },
});
