import { apiSlice } from "../../app/api/apiSlice";

type UrlsData = {
    metadata: {
        total_count: number;
        total_pages: number;
        current_page: number;
    };
    items: Blogs[];
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
        addComment: builder.mutation({
            query: (commentData: FormData) => ({
                url: "/commons/reviews/create",
                method: "POST",
                body: commentData,
                formdata: true,
            }),
            invalidatesTags: ["BLOGS"],
        }),
        getBlogs: builder.query<UrlsData, { page?: number }>({
            query: ({ page = 1 }) => ({
                url: "/articles",
                method: "GET",
                params: { page },
            }),
            providesTags: ["BLOGS"],
        }),
        getBlogsByCategory: builder.query<
            UrlsData,
            { page?: number; category?: string }
        >({
            query: ({ page = 1, category }) => ({
                url: `/articles/category/${category}`,
                method: "GET",
                params: { page },
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

        updateLike: builder.mutation({
            query: (id: string) => ({
                url: `/articles/like/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["BLOGS", "AUTH"],
        }),

        dislikeBlog: builder.mutation({
            query: (id: string) => ({
                url: `/articles/dislike/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["BLOGS", "AUTH"],
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
    useAddCommentMutation,
    useGetBlogsQuery,
    useLazyGetBlogsByCategoryQuery,
    useGetBlogByIdQuery,
    useUpdateLikeMutation,
    useDislikeBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = carsApi;
