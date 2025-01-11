import { apiSlice } from "../../app/api/apiSlice";
import { Vehicle } from "../../adminComponents/cars/ReadCars";

type CarData = {
    name_uz: string;
    name_ru: string;
    brand: string;
    model: string;
    year: number;
    transmission: string;
    vehicle_type: string;
    price: number;
    engine_type: string;
    color_uz: string;
    color_ru: string;
    drive_type: string;
    properties: Record<string, string>;
    description_uz: string;
    description_ru: string;
    cover_image?: string;
    images?: string[];
};

type UrlsData = {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    vehicles: Vehicle[];
};

export const carsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCar: builder.mutation({
            query: (carData: CarData) => ({
                url: "/vehicles/create",
                method: "POST",
                body: carData,
            }),
            invalidatesTags: ["CAR"],
        }),

        getCars: builder.query<UrlsData, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 12 }) => ({
                url: "/vehicles",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["CAR"],
        }),

        getCarById: builder.query({
            query: (id: string) => ({
                url: `/vehicles/details/${id}`,
                method: "GET",
            }),
            providesTags: ["CAR"],
        }),

        updateCar: builder.mutation({
            query: ({ id, carData }: { id: string; carData: CarData }) => ({
                url: `/vehicles/${id}`,
                method: "PUT",
                body: carData,
            }),
            invalidatesTags: ["CAR"],
        }),

        deleteCar: builder.mutation({
            query: (id: string) => ({
                url: `/vehicles/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CAR"],
        }),
    }),
});

export const {
    useAddCarMutation,
    useGetCarsQuery,
    useGetCarByIdQuery,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = carsApi;
