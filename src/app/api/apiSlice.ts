import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setCredentials } from "../../features/auth/authSlice";

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

    const state = api.getState() as RootState;
    const refreshToken = state.auth?.refreshToken;

    if (result.error && result.error.status === 401) {
        if (refreshToken) {
            const refreshHeaders = new Headers();
            refreshHeaders.set("Authorization", refreshToken);

            const refreshResult: any = await fetchBaseQuery({
                baseUrl: BASE_URL,
            })(
                {
                    url: "/auth/access",
                    method: "GET",
                    headers: refreshHeaders,
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const { access_token } = refreshResult.data;

                const userHeaders = new Headers();
                userHeaders.set("Authorization", `Bearer ${access_token}`);

                const userResult: any = await fetchBaseQuery({
                    baseUrl: BASE_URL,
                })(
                    {
                        url: "/auth/details",
                        method: "GET",
                        headers: userHeaders,
                    },
                    api,
                    extraOptions
                );

                api.dispatch(
                    setCredentials({
                        accessToken: access_token,
                        refreshToken: refreshToken,
                        userData: userResult.data,
                    })
                );

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
            }
        } else {
            api.dispatch(logOut());
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
        "TEST_DRIVE",
        "DEALERS",
    ],
    endpoints: () => ({}),
});
