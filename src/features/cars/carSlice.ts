import { apiSlice } from "../../app/api/apiSlice";

type UrlsData = {
  metadata: {
    total_count: number;
    current_page: number;
    total_pages: number;
  };
  items: CarObject[];
};

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (carData: CarObject) => ({
        url: "/vehicles",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["CAR"],
    }),

    getCars: builder.query<
      UrlsData,
      {
        page?: number;
        limit?: number;
        name_uz?: string;
        brand?: string;
        model?: string;
        price_gt?: number;
        price_lt?: number;
      }
    >({
      query: ({ page = 1, name_uz, brand, model, price_gt, price_lt }) => ({
        url: "/vehicles/filters",
        method: "GET",
        params: { page, name_uz, brand, model, price_gt, price_lt },
      }),
      providesTags: ["CAR"],
    }),

    getCarById: builder.query({
      query: (id: string) => ({
        url: `/vehicles/filters/details/${id}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    updateCar: builder.mutation({
      query: ({ id, carData }: { id: string; carData: CarObject }) => ({
        url: `/vehicles/${id}`,
        method: "PATCH",
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
