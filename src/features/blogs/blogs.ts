import { apiSlice } from "../../app/api/apiSlice";

export type Blogs = {
  title_uz: string;
  title_ru?: string;
  content_uz: string;
  content_ru?: string;
  video_link: string;
  category: string;
  id?: string;
  author_id: string;
  view_count?: number;
  cover_image: string;
  images: string[];
  vehicle_id: string;
};

type UrlsData = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  articles: Blogs[];
};

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (blogData: Blogs) => ({
        url: "/articles/create",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["BLOGS"],
    }),

    getBlogs: builder.query<UrlsData, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 12 }) => ({
        url: "/articles/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["BLOGS"],
    }),
    getBlogById: builder.query({
      query: (id: string) => ({
        url: `/articles/details/${id}`,
        method: "GET",
      }),
      providesTags: ["BLOGS"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, blogData }: { id: string; blogData: Blogs }) => ({
        url: `/articles/update/${id}`,
        method: "PUT",
        body: blogData,
      }),
      invalidatesTags: ["BLOGS"],
    }),

    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/articles/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BLOGS"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = carsApi;
