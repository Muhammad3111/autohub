import { apiSlice } from "../../app/api/apiSlice";

type UrlsData = {
  total: number;
  page: number;
  per_page: number;
  urls: string[];
};

export const urlsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUrls: builder.query<UrlsData, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 100 }) => ({
        url: `/media/uploads`,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: ["MEDIA"],
    }),

    addUrl: builder.mutation<{ success: boolean }, FormData>({
      query: (formData: FormData) => ({
        url: `/media/uploads`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MEDIA"],
    }),

    deleteUrl: builder.mutation<{ success: boolean }, string>({
      query: (id: string) => ({
        url: `http://89.223.126.64:8080${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MEDIA"],
    }),
  }),
});

export const { useGetUrlsQuery, useAddUrlMutation, useDeleteUrlMutation } =
  urlsApi;
