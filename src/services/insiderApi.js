import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const insiderApiHeaders = {
  "x-rapidapi-host": "yh-finance.p.rapidapi.com",
  "x-rapidapi-key": "20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1",
};

const baseUrl = "https://yh-finance.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: insiderApiHeaders });

export const insiderApi = createApi({
  reducerPath: "stocks",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getInsiders: builder.query({
      query: (ticker, region) =>
        createRequest(
          `/stock/v2/get-insider-roster?symbol=${ticker}&region=${region}`
        ),
    }),
  }),
});

export const { useGetInsidersQuery } = insiderApi;
