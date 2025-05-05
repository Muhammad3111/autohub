import { apiSlice } from "../../app/api/apiSlice";

export const adsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAds: builder.mutation({
      query: (adsData: AdsType) => ({
        url: "/properties/ads",
        method: "POST",
        body: adsData,
      }),
      invalidatesTags: ["ADS"],
    }),
    getAds: builder.query({
      query: () => ({
        url: "/properties/ads",
        method: "GET",
      }),
      providesTags: ["ADS"],
    }),
    deleteAds: builder.mutation({
      query: (id: number) => ({
        url: `/properties/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADS"],
    }),
  }),
});

export const { useAddAdsMutation, useGetAdsQuery, useDeleteAdsMutation } =
  adsApi;
