import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = useLocalStorage.getItem({
                key: "token",
                isJson: true,
            });
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["AUTH", "REGISTER"],
    endpoints: () => ({}),
});
