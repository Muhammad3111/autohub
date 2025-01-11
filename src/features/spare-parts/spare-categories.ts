import { apiSlice } from "../../app/api/apiSlice";

export type Categories = {
  id: string;
  title_uz: string;
  title_ru?: string;
};

export const spateCatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCat: builder.mutation({
      query: (carData: Categories) => ({
        url: "/commons/categories",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),

    getCats: builder.query({
      query: () => ({
        url: "/commons/categories",
        method: "GET",
      }),
      providesTags: ["SPARE_CATEGORIES"],
    }),

    updateCat: builder.mutation({
      query: ({ id, catData }: { id: string; catData: Categories }) => ({
        url: `/commons/categories/${id}`,
        method: "PATCH",
        body: catData,
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),

    deleteCat: builder.mutation({
      query: (id: string) => ({
        url: `/commons/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SPARE_CATEGORIES"],
    }),
  }),
});

export const {
  useAddCatMutation,
  useGetCatsQuery,
  useUpdateCatMutation,
  useDeleteCatMutation,
} = spateCatApi;
