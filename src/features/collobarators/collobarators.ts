import { WorkplaceItem } from "../../adminComponents/collaborators/ReadColl";
import { apiSlice } from "../../app/api/apiSlice";

type Collobrators = {
  metadata: {
    total_count: number;
    total_pages: number;
    current_page: number;
  };
  items: WorkplaceItem[];
};

export const collobratorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollaborators: builder.query<
      Collobrators,
      { page: number; staff_type: "service" | "dealer" }
    >({
      query: ({ page = 1, staff_type }) => ({
        url: "/auth/staff",
        method: "GET",
        params: {
          page,
          staff_type,
        },
      }),
      providesTags: ["COLLOBRATORS"],
    }),
  }),
});

export const { useGetCollaboratorsQuery } = collobratorsApi;
