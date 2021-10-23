import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fearAndGreedApiHeaders = {
    'x-rapidapi-host': 'fear-and-greed-index.p.rapidapi.com',
    'x-rapidapi-key': '20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1'
};

const baseUrl = "https://fear-and-greed-index.p.rapidapi.com/v1/fgi";

const createRequest = (url) => ({ url, headers: fearAndGreedApiHeaders });

export const fearAndGreedApi = createApi({
  reducerPath: "fearandgreed",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFearAndGreed: builder.query({
      query: () =>
        createRequest(
          ''
        ),
    }),
  }),
});

export const { useGetFearAndGreedQuery } = fearAndGreedApi;
