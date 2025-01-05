import { apiSlice } from "../../app/api/apiSlice";

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
  color: string;
  drive_type: string;
  properties: Record<string, string>;
  description: string;
  cover_image?: string;
  images?: string[];
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

    getCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    getCarById: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    updateCar: builder.mutation({
      query: ({ id, carData }: { id: string; carData: CarData }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: carData,
      }),
      invalidatesTags: ["CAR"],
    }),

    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
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
