import { apiSlice } from "../../app/api/apiSlice";

type CarData = {
  id?: string;
  name_uz: string;
  name_ru: string;
  brand_id: number;
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
      query: (carData: CarData) => ({
        url: "/vehicles/create",
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
