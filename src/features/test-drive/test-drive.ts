import { apiSlice } from "../../app/api/apiSlice";

type UrlsData = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  items: TestDrive[];
};

export const testDriveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTestDrive: builder.mutation({
      query: (testDriveData: TestDrive) => ({
        url: "/drive-requests/create",
        method: "POST",
        body: testDriveData,
      }),
      invalidatesTags: ["TEST_DRIVE"],
    }),

    getTestDrive: builder.query<UrlsData, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 12 }) => ({
        url: "/drive-requests/list",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["TEST_DRIVE"],
    }),
    getTestDriveById: builder.query({
      query: (id: string) => ({
        url: `/spares/details/${id}`,
        method: "GET",
      }),
      providesTags: ["TEST_DRIVE"],
    }),

    updateTestDrive: builder.mutation({
      query: ({
        id,
        testDriveData,
      }: {
        id: string;
        testDriveData: TestDrive;
      }) => ({
        url: `/drive-requests/update/${id}`,
        method: "PUT",
        body: testDriveData,
      }),
      invalidatesTags: ["TEST_DRIVE"],
    }),

    deleteTestDrive: builder.mutation({
      query: (id: string) => ({
        url: `/drive-requests/cancel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TEST_DRIVE"],
    }),
  }),
});

export const {
  useAddTestDriveMutation,
  useGetTestDriveQuery,
  useGetTestDriveByIdQuery,
  useUpdateTestDriveMutation,
  useDeleteTestDriveMutation,
} = testDriveApi;
