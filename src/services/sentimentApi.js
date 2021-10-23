import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const sentimentHeaders = {
    'x-rapidapi-host': 'socialsentiment-io.p.rapidapi.com',
    'x-rapidapi-key': '20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1'
};

const baseUrl = "https://socialsentiment-io.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: sentimentHeaders });

export const sentimentApi = createApi({
  reducerPath: "sentiment",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSentiment: builder.query({
      query: (stock) =>
        createRequest(
          `/stocks/${stock}/sentiment/daily/`
        ),
    }),
  }),
});

export const { useGetSentimentQuery } = sentimentApi;
