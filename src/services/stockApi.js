import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stockApiHeaders = {
  'x-rapidapi-host': 'wallstreetbets.p.rapidapi.com',
  'x-rapidapi-key': '20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1'
};

const baseUrl = "https://wallstreetbets.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: stockApiHeaders });

export const stocksApi = createApi({
  reducerPath: "stocks",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: (date) => createRequest(`/stock/${date}`),
    }),
  }),
});

export const { useGetStocksQuery } = stocksApi;
