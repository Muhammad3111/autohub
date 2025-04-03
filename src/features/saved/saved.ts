import { apiSlice } from "../../app/api/apiSlice";

type SavedDataType = {
    item_id: string;
    item_type: string;
};

export const savedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSavedItems: builder.mutation({
            query: ({
                item_id,
                item_type
            }: {
                item_id: string;
                item_type: string;
            }) => ({
                url: "/properties/saved-items",
                method: "POST",
                body: { item_id, item_type }
            }),
            invalidatesTags: ["SAVED"]
        }),
        getSavedItems: builder.query<SavedDataType[], void>({
            query: () => "/properties/saved-items",
            providesTags: ["SAVED"]
        }),
        removeSavedItem: builder.mutation({
            query: ({ favorite_id }: { favorite_id: string }) => ({
                url: `/properties/saved-items/${favorite_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["SAVED"]
        })
    })
});

export const {
    useAddSavedItemsMutation,
    useGetSavedItemsQuery,
    useRemoveSavedItemMutation
} = savedApi;
