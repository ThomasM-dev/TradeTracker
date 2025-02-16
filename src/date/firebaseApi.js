import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), 
  endpoints: (builder) => ({
    getStats: builder.query({
      queryFn: async (userId) => {
        try {
          const statsRef = ref(db, `users/${userId}/stats`);
          const snapshot = await get(statsRef);
          const stats = snapshot.val();
          return { data: stats };
        } catch (error) {
          return { error: { status: "Firebase Error", data: error.message } };
        }
      },
    }),
    saveStats: builder.mutation({
      queryFn: async ({ userId, stats }) => {
        try {
          const statsRef = ref(db, `users/${userId}/stats`);
          await set(statsRef, stats);
          return { data: "Datos guardados correctamente" };
        } catch (error) {
          return { error: { status: "Firebase Error", data: error.message } };
        }
      },
    }),
    updateStats: builder.mutation({
      queryFn: async ({ userId, stats }) => {
        try {
          const statsRef = ref(db, `users/${userId}/stats`);
          await update(statsRef, stats);
          return { data: "Datos actualizados correctamente" };
        } catch (error) {
          return { error: { status: "Firebase Error", data: error.message } };
        }
      },
    }),
  }),
});

export const { useGetStatsQuery, useSaveStatsMutation, useUpdateStatsMutation } = firebaseApi;