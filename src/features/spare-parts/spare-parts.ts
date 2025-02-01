import { apiSlice } from "../../app/api/apiSlice";
import { SpareFormInputs } from "../../adminComponents/spareparts/AddSparePart";

type UrlsData = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  items: SpareParts[];
};

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSpare: builder.mutation({
      query: (spareData: SpareFormInputs) => ({
        url: "/spares/create",
        method: "POST",
        body: spareData,
      }),
      invalidatesTags: ["SPARE_PARTS"],
    }),

    getSpares: builder.query<UrlsData, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 12 }) => ({
        url: "/spares/list",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["SPARE_PARTS"],
    }),
    getSpareById: builder.query({
      query: (id: string) => ({
        url: `/spares/details/${id}`,
        method: "GET",
      }),
      providesTags: ["SPARE_PARTS"],
    }),

    updateSpare: builder.mutation({
      query: ({
        id,
        spareData,
      }: {
        id: string;
        spareData: SpareFormInputs;
      }) => ({
        url: `/spares/update/${id}`,
        method: "PUT",
        body: spareData,
      }),
      invalidatesTags: ["SPARE_PARTS"],
    }),

    deleteSpare: builder.mutation({
      query: (id: string) => ({
        url: `/spares/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SPARE_PARTS"],
    }),
  }),
});

export const {
  useAddSpareMutation,
  useGetSparesQuery,
  useGetSpareByIdQuery,
  useUpdateSpareMutation,
  useDeleteSpareMutation,
} = carsApi;
