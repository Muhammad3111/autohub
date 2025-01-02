import { apiSlice } from "../../app/api/apiSlice";

type UserData = {
    username: string;
    password: string;
};

type RegisterData = {
    username: string;
    password: string;
    role: "user" | "dealer";
    phone_number: string;
};

type VerifyData = {
    username: string;
    code: string;
};

type DealerData = {
    workplace_name: string;
    region: string;
    city: string;
    address: string;
    contact_number: string;
    info: string;
    working_hours: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // AUTH
        login: builder.mutation({
            query: (userData: UserData) => ({
                url: "/auth/refresh",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["AUTH"],
        }),
        authDetail: builder.query<void, { token: string | null }>({
            query: ({ token = "" }) => ({
                url: "/auth/details",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["AUTH"],
        }),

        getAccessToken: builder.query({
            query: () => ({
                url: "/auth/access",
                method: "GET",
            }),
            providesTags: ["AUTH"],
        }),

        // REGISTER
        register: builder.mutation({
            query: (data: RegisterData) => ({
                url: "/register/collect-details",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),

        verify: builder.mutation({
            query: (data: VerifyData) => ({
                url: "/register/verify",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),

        dealerRegister: builder.mutation({
            query: (data: DealerData) => ({
                url: "/register/dealer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AUTH"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLazyAuthDetailQuery,
    useRegisterMutation,
    useVerifyMutation,
    useDealerRegisterMutation,
} = authApi;
