import {
  createApi,
  fetchBaseQuery,
  // FetchBaseQueryError,
  // BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../../features/auth/authSlice";
import { RootState } from "../store";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth = async (
//     args: Parameters<typeof baseQuery>[0],
//     api: BaseQueryApi,
//     extraOptions: Parameters<typeof baseQuery>[2]
// ): Promise<any> => {
//     let result = await baseQuery(args, api, extraOptions);

//     const error = result?.error as FetchBaseQueryError;

//     if (error?.status === 401) {
//         const state = api.getState() as RootState;
//         const refreshToken = state.auth?.refreshToken;

//         if (refreshToken) {
//             const refreshResult = await baseQuery("/auth/access", api, {
//                 ...extraOptions,
//                 headers: {
//                     ...extraOptions?.headers,
//                     Authorization: `Bearer ${refreshToken}`,
//                 },
//             });

//             console.log("Refresh Result:", refreshResult); // Server javobini ko'rsating

//             if (refreshResult?.data && refreshResult?.data.accessToken) {
//                 console.log(
//                     "New Access Token:",
//                     refreshResult.data.accessToken
//                 );
//                 localStorage.setItem(
//                     "accessToken",
//                     refreshResult.data.accessToken
//                 );

//                 result = await baseQuery(args, api, extraOptions);
//             } else {
//                 console.log("Failed to refresh token or invalid response");
//                 api.dispatch(logOut());
//             }
//         } else {
//             console.log("No refresh token available");
//             api.dispatch(logOut());
//         }
//     }

//     return result;
// };

export const apiSlice = createApi({
  baseQuery: baseQuery,
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
