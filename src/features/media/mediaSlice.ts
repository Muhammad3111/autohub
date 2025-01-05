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

    addUrl: builder.mutation<{ success: boolean }, string>({
      query: (url: string) => ({
        url: `/media/uploads`,
        method: "POST",
        body: { url },
      }),
      invalidatesTags: ["MEDIA"],
    }),

    deleteUrl: builder.mutation<{ success: boolean }, string>({
      query: (url: string) => ({
        url: `/media/uploads`,
        method: "DELETE",
        body: { url },
      }),
      invalidatesTags: ["MEDIA"],
    }),
  }),
});

export const { useGetUrlsQuery, useAddUrlMutation, useDeleteUrlMutation } =
  urlsApi;
