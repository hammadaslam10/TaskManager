import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getTokenFromCookies = () => {
  return Cookies.get("token");
};

export const taskmanagementApi = createApi({
  reducerPath: "taskmanagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["TaskManagement"],
  endpoints: (builder) => ({
    getTaskManagement: builder.query({
      query: () => `/api/tasks`,
      providesTags: ["TaskManagement"],
    }),
    getSingleTaskManagement: builder.query({
      query: ({ id }) => `/api/tasks/${id}`,
    }),
    createTaskManagement: builder.mutation({
      query: (values) => ({
        url: "/api/tasks",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["TaskManagement"],
    }),
    deleteTaskManagement: builder.mutation({
      query: ({ id }) => ({
        url: `/api/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskManagement"],
    }),
    updateTaskManagement: builder.mutation({
      query: ({ id, values }) => ({
        url: `/api/tasks/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["TaskManagement"],
    }),
  }),
});

export const {
  useGetTaskManagementQuery,
  useGetSingleTaskManagementQuery,
  useCreateTaskManagementMutation,
  useDeleteTaskManagementMutation,
  useUpdateTaskManagementMutation,
} = taskmanagementApi;
