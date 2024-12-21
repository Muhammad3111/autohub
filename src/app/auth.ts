import { api } from "./api";

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

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // AUTH
        login: builder.mutation({
            query: (userData: UserData) => ({
                url: "/auth/token",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["AUTH"],
        }),
        authDetail: builder.query({
            query: () => ({
                url: "/auth/details",
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
            invalidatesTags: ["REGISTER"],
        }),

        verify: builder.mutation({
            query: (data: VerifyData) => ({
                url: "/register/verify",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["REGISTER"],
        }),

        dealerRegister: builder.mutation({
            query: (data: DealerData) => ({
                url: "/register/dealer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["REGISTER"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useAuthDetailQuery,
    useRegisterMutation,
    useVerifyMutation,
    useDealerRegisterMutation,
} = authApi;
