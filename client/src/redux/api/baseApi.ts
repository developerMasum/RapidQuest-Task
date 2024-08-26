import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rapid-quist-task.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
