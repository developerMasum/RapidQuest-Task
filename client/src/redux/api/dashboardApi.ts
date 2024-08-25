import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellsOverTime: build.query({
      query: (view) => ({
        url: `/orders?interval=${view}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getSellsGrowthRate: build.query({
      query: () => ({
        url: "/orders/growth",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getCustomerGrowthOverTime: build.query({
      query: (view) => ({
        url: `/customers?interval=${view}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getRepeatingCustomers: build.query({
      query: (view) => ({
        url: `/customers/repeat?interval=${view}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getCustomerGeography: build.query({
      query: () => ({
        url: "/customers/location",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getCorotLifeTimeValues: build.query({
      query: () => ({
        url: "/customers/cohort",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSellsOverTimeQuery,
  useGetSellsGrowthRateQuery,
  useGetCustomerGrowthOverTimeQuery,
  useGetRepeatingCustomersQuery,
  useGetCustomerGeographyQuery,
  useGetCorotLifeTimeValuesQuery,
} = dashboardApi;
