import { apiSlice } from "../../app/api/apiSlice";

type SearchDataType = {
    query: string;
    type?: "article" | "dealer" | "service" | "vehicle" | "spare_part" | null;
    page: number;
};

type SearchDataResponseData = {
    type: string;
    data: {
        metadata: {
            total_count: number;
            total_pages: number;
            current_page: number;
        } | null;
        items: Record<string, any>[];
        type: string;
    };
};

export const searchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSearchData: builder.query({
            query: ({ query, type, page }: SearchDataType) => {
                let url = `/search?query=${query}&page=${page}`;
                if (type) {
                    url += `&_type=${type}`;
                }

                return {
                    url,
                    method: "GET",
                };
            },
            transformResponse: (response: SearchDataResponseData[]) => {
                const allItems: unknown[] = [];
                const metadataByType: Record<string, number> = {};

                response.forEach(({ type: responseType, data }) => {
                    if (data.items) {
                        const typedItems = data.items
                            .filter(
                                (item): item is Record<string, any> =>
                                    item !== null
                            )
                            .map((item) => ({
                                ...item,
                                type: responseType,
                            }));
                        allItems.push(...typedItems);
                    }
                    if (data.metadata?.total_count !== undefined) {
                        metadataByType[responseType] =
                            data.metadata.total_count;
                    }
                });

                return {
                    items: allItems,
                    metadata: metadataByType, // endi object: { vehicle: 12, dealer: 3, ... }
                };
            },
        }),
    }),
});

export const { useLazyGetSearchDataQuery, useGetSearchDataQuery } = searchApi;
