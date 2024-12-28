import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getNewAccessToken = async (
    refreshToken: string
): Promise<string | null> => {
    try {
        const res = await axios.get(`${BASE_URL}/auth/refresh`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        return res?.data?.access_token ?? null;
    } catch (error) {
        console.error("Refresh token error:", error);
        return null;
    }
};

const customFetchBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return headers;
    },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
    let result = await customFetchBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
            try {
                const newToken = await getNewAccessToken(refreshToken);

                if (newToken) {
                    localStorage.setItem("access_token", newToken);

                    result = await customFetchBaseQuery(
                        args,
                        api,
                        extraOptions
                    );
                } else {
                    handleUnauthorizedAccess();
                }
            } catch (err) {
                console.error("Tokenni yangilashda xatolik:", err);
                handleUnauthorizedAccess();
            }
        } else {
            handleUnauthorizedAccess();
        }
    }

    return result;
};

const handleUnauthorizedAccess = (): void => {
    window.location.replace("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: customBaseQuery,
    tagTypes: ["AUTH"],
    endpoints: () => ({}),
});
