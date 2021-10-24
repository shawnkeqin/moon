import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://dashboard.nbshare.io/api/v1/apps/reddit";

const createRequest = (url) => ({ url });

export const stocksApi = createApi({
  reducerPath: "stocks",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => createRequest(``),
    }),
  }),
});

export const { useGetStocksQuery } = stocksApi;
