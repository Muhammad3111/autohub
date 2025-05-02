import { apiSlice } from "../../app/api/apiSlice";

type DealerType = {
    metadata: {
        total_count: number;
        total_pages: number;
        current_page: number;
    };
    items: DealersType[];
};

type DealerCarsType = {
    metadata: {
        total_count: number;
        total_pages: number;
        current_page: number;
    };
    items: CarObject[];
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data: AuthSendOtp) => ({
                url: "/register/send-otp",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["AUTH"]
        }),
        verifyOtp: builder.mutation({
            query: (data: AuthVerifyOtp) => ({
                url: "/register/verify-otp",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["AUTH"]
        }),
        register: builder.mutation({
            query: (data: AuthRegister) => ({
                url: "/register/complete-registration",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["AUTH"]
        }),
        authDetail: builder.query<null, { token: string | null }>({
            query: ({ token }) => ({
                url: "/auth/details",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ["AUTH"]
        }),

        getDealers: builder.query({
            query: ({
                page = 1,
                staff_type
            }: {
                page: number;
                staff_type?: "service" | "dealer";
            }) => `/auth/staff?staff_type=${staff_type}&page=${page}`,
            providesTags: ["DEALERS"],
            transformResponse: (data: DealerType) => data.items
        }),

        getDealerCars: builder.query({
            query: ({
                page = 1
            }: {
                page: number;
                staff_type?: "service" | "dealer";
            }) => `/vehicles/filters/dealers/my-vehicles?page=${page}`,
            providesTags: ["DEALERS"],
            transformResponse: (data: DealerCarsType) => data.items
        }),

        getDealerCarByDealerId: builder.query({
            query: ({
                page = 1,
                dealer_id
            }: {
                page: number;
                dealer_id: string;
            }) =>
                `/vehicles/filters/dealers/vehicles/${dealer_id}?page=${page}`,
            providesTags: ["DEALERS"],
            transformResponse: (data: DealerCarsType) => data.items
        }),

        updateProfile: builder.mutation({
            query: (data: UpdateAuth) => ({
                url: "/auth/update",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["AUTH"]
        })
    })
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useRegisterMutation,
    useLazyAuthDetailQuery,
    useAuthDetailQuery,
    useGetDealersQuery,
    useGetDealerCarsQuery,
    useGetDealerCarByDealerIdQuery,
    useUpdateProfileMutation
} = authApi;
