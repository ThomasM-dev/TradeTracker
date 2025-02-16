import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const getCurrentDate = () => {
  return DateTime.now();
};

const isNewDay = (lastSavedDate) => {
  const now = getCurrentDate();
  const lastDate = DateTime.fromISO(lastSavedDate);
  return !lastDate.hasSame(now, "day");
};

const isNewMonth = (lastSavedDate) => {
  const now = getCurrentDate();
  const lastDate = DateTime.fromISO(lastSavedDate);
  return !lastDate.hasSame(now, "month");
};

const initialState = {
  dailyStats: [],
  monthlyStats: [],
  yearlyStats: [],
  lastSavedDate: getCurrentDate().toISO(),
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setDailyStats: (state, action) => {
      const now = getCurrentDate();
      if (isNewDay(state.lastSavedDate)) {
        state.dailyStats = []; 
      }
      state.dailyStats = action.payload; 
      state.lastSavedDate = now.toISO();
    },
    setMonthlyStats: (state, action) => {
      const now = getCurrentDate();
      if (isNewMonth(state.lastSavedDate)) {
        state.monthlyStats = []; 
      }
      state.monthlyStats = action.payload; 
      state.lastSavedDate = now.toISO();
    },
    setYearlyStats: (state, action) => {
      state.yearlyStats = action.payload; 
    },
  },
});

export const { setDailyStats, setMonthlyStats, setYearlyStats } = statsSlice.actions;

export default statsSlice.reducer;