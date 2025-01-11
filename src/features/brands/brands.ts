import { apiSlice } from "../../app/api/apiSlice";

export type BrandData = {
  id?: number;
  name: string;
  image: string;
};

type UrlsData = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  brands: BrandData[];
};

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (brandData: BrandData) => ({
        url: "/brands",
        method: "POST",
        body: brandData,
      }),
      invalidatesTags: ["BRANDS"],
    }),

    getBrands: builder.query<UrlsData, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 12 }) => ({
        url: "/brands",
        method: "GET",
        params: { page, limit },
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
      query: ({ id, brandData }: { id: number; brandData: BrandData }) => ({
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
