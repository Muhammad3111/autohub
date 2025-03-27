// import { apiSlice } from "../../app/api/apiSlice";

// type UserData = {
//     username: string;
//     password: string;
// };

// type RegisterData = {
//     username: string;
//     password: string;
//     role: "user" | "dealer";
//     phone_number: string;
// };

// type VerifyData = {
//     username: string;
//     code: string;
// };

// type DealerData = {
//     workplace_name: string;
//     region: string;
//     city: string;
//     address: string;
//     contact_number: string;
//     info: string;
//     working_hours: string;
// };

// export const authApi = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         // AUTH
//         login: builder.mutation({
//             query: (userData: UserData) => ({
//                 url: "/auth/refresh",
//                 method: "POST",
//                 body: userData,
//             }),
//             invalidatesTags: ["AUTH"],
//         }),
//         authDetail: builder.query<null, { token: string | null }>({
//             query: ({ token }) => ({
//                 url: "/auth/details",
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }),
//             providesTags: ["AUTH"],
//         }),

//         // REGISTER
//         register: builder.mutation({
//             query: (data: RegisterData) => ({
//                 url: "/register/collect-details",
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: ["AUTH"],
//         }),

//         verify: builder.mutation({
//             query: (data: VerifyData) => ({
//                 url: "/register/verify",
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: ["AUTH"],
//         }),

//         dealerRegister: builder.mutation({
//             query: (data: DealerData) => ({
//                 url: "/register/dealer",
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: ["AUTH"],
//         }),
//     }),
// });

// export const {
//     useLoginMutation,
//     useLazyAuthDetailQuery,
//     useRegisterMutation,
//     useVerifyMutation,
//     useDealerRegisterMutation,
// } = authApi;

import { apiSlice } from "../../app/api/apiSlice";

type DealerType = {
    metadata: {
        total_count: number;
        total_pages: number;
        current_page: number;
    };
    items: DealersType[];
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data: AuthSendOtp) => ({
                url: "/register/send-otp",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),
        verifyOtp: builder.mutation({
            query: (data: AuthVerifyOtp) => ({
                url: "/register/verify-otp",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),
        register: builder.mutation({
            query: (data: AuthRegister) => ({
                url: "/register/complete-registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),
        authDetail: builder.query<null, { token: string | null }>({
            query: ({ token }) => ({
                url: "/auth/details",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["AUTH"],
        }),

        getDealers: builder.query({
            query: ({ page = 1 }: { page: number }) =>
                `/auth/dealers?page=${page}`,
            providesTags: ["DEALERS"],
            transformResponse: (data: DealerType) => data.items,
        }),

        updateProfile: builder.mutation({
            query: (data: AuthRegister) => ({
                url: "/auth/update-profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),
    }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useRegisterMutation,
    useLazyAuthDetailQuery,
    useAuthDetailQuery,
    useGetDealersQuery,
} = authApi;
