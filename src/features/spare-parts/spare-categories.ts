import { apiSlice } from "../../app/api/apiSlice";

export const spateCatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSpareCat: builder.mutation({
      query: (carData: SpareCategories) => ({
        url: "/commons/categories",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),

    getSpareCats: builder.query({
      query: () => ({
        url: "/commons/categories",
        method: "GET",
      }),
      providesTags: ["SPARE_CATEGORIES"],
    }),

    updateSpareCat: builder.mutation({
      query: ({
        id,
        catData,
      }: {
        id: number | null;
        catData: SpareCategories;
      }) => ({
        url: `/commons/categories/${id}`,
        method: "PATCH",
        body: catData,
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),

    deleteSpareCat: builder.mutation({
      query: (id: number | null) => ({
        url: `/commons/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),
  }),
});

export const {
  useAddSpareCatMutation,
  useGetSpareCatsQuery,
  useUpdateSpareCatMutation,
  useDeleteSpareCatMutation,
} = spateCatApi;
