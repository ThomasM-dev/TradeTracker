import { createApi } from "@reduxjs/toolkit/query/react";
import { ref, get, set, update } from "firebase/database";
import { db } from "./firebaseConfig"; 

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: () => ({ data: {} }), 
  endpoints: (builder) => ({
    getStats: builder.query({
      queryFn: async () => {
        try {
          const statsRef = ref(db, "stats");
          const snapshot = await get(statsRef);
          const stats = snapshot.val();
          return { data: stats || {} }; 
        } catch (error) {
          return { error: { status: "Firebase Error", message: error.message } };
        }
      },
    }),

    saveStats: builder.mutation({
      queryFn: async (stats) => {
        try {
          const statsRef = ref(db, "stats");
          await set(statsRef, stats);
          return { data: "Datos guardados correctamente" };
        } catch (error) {
          return { error: { status: "Firebase Error", message: error.message } };
        }
      },
    }),

    updateStats: builder.mutation({
      queryFn: async (stats) => {
        try {
          const statsRef = ref(db, "stats");
          await update(statsRef, stats);
          return { data: "Datos actualizados correctamente" };
        } catch (error) {
          return { error: { status: "Firebase Error", message: error.message } };
        }
      },
    }),
  }),
});

// Exportar hooks generados automáticamente
export const { useGetStatsQuery, useSaveStatsMutation, useUpdateStatsMutation } = firebaseApi;