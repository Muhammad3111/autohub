import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { getFromLocalStorage } from "../../hooks/useGetFromLocalStorage";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = getFromLocalStorage<string | null>(
            "refresh_token",
            null
        );

        if (refreshToken) {
            const refreshResult: any = await baseQuery(
                {
                    url: "/auth/access",
                    method: "GET",
                    headers: {
                        Authorization: refreshToken,
                    },
                },
                api,
                extraOptions
            );

            console.log(refreshResult);

            if (refreshResult.data) {
                const { access_token } = refreshResult.data;
                localStorage.setItem("accessToken", access_token);

                api.dispatch({
                    type: "auth/setAccessToken",
                    payload: access_token,
                });

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch({ type: "auth/logout" });
            }
        } else {
            api.dispatch({ type: "auth/logout" });
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "AUTH",
        "CAR",
        "MEDIA",
        "SPARE_PARTS",
        "SPARE_CATEGORIES",
        "BLOG_CATEGORIES",
        "BLOGS",
        "BRANDS",
    ],
    endpoints: () => ({}),
});
