import { apiSlice } from "../../app/api/apiSlice";

export const compareApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComparison: builder.mutation({
      query: (ids: string[]) => ({
        url: "/properties/make-comparison",
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["COMPARE"],
    }),

    getComparisons: builder.query({
      query: () => ({
        url: "/properties/my-comparisons",
        method: "GET",
      }),
      providesTags: ["COMPARE"],
    }),

    deleteComparison: builder.mutation({
      query: (id: string) => ({
        url: `/properties/remove-comparison/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COMPARE"],
    }),
  }),
});

export const {
  useAddComparisonMutation,
  useGetComparisonsQuery,
  useDeleteComparisonMutation,
} = compareApi;
