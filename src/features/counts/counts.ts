import { apiSlice } from "../../app/api/apiSlice";

export const countApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounts: builder.query({
      query: () => ({
        url: "/commons/count",
        method: "GET",
      }),
      providesTags: ["COUNTS"],
    }),
  }),
});

export const { useGetCountsQuery } = countApi;
