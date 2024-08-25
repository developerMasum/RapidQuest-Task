import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellsOverTime: build.query({
      query: (view) => ({
        url: `/orders?interval=${view}`, // Assuming the backend accepts a 'view' query parameter
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSellsOverTimeQuery } = dashboardApi;
