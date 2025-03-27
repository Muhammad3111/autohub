import { apiSlice } from "../../app/api/apiSlice";

type UrlsData = {
  metadata: {
    total_count: number;
    current_page: number;
    total_pages: number;
  };
  items: Brand[];
};

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (brandData: Brand) => ({
        url: "/brands",
        method: "POST",
        body: brandData,
      }),
      invalidatesTags: ["BRANDS"],
    }),

    getBrands: builder.query<UrlsData, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: "/brands",
        method: "GET",
        params: { page },
      }),
      providesTags: ["BRANDS"],
    }),

    getBrandyId: builder.query({
      query: (id: number) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: ["BRANDS"],
    }),

    updateBrand: builder.mutation({
      query: ({ id, brandData }: { id: number; brandData: Brand }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: brandData,
      }),
      invalidatesTags: ["BRANDS"],
    }),

    deleteBrand: builder.mutation({
      query: (id: number) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BRANDS"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandsQuery,
  useGetBrandyIdQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
