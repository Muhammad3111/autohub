import { apiSlice } from "../../app/api/apiSlice";

type SearchType = {
    vehicle: string;
    spare_part: string;
    article: string;
};

type SearchDataType = {
    query: string;
    type: SearchType | null;
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
        items: null[];
    };
};

export const searchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSearchData: builder.query({
            query: ({ query, type = null, page = 1 }: SearchDataType) => ({
                url: `/search?query=${query}&type=${type}&page=${page}`,
                method: "GET"
            }),
            transformResponse: (response: SearchDataResponseData[]) => {
                const allItems = response.reduce((acc, { data, type }) => {
                    if (data.items && type === "vehicle") {
                        return acc.concat(data.items);
                    }
                    return acc;
                }, [] as null[]);
                return allItems;
            }
        })
    })
});

export const { useLazyGetSearchDataQuery } = searchApi;
