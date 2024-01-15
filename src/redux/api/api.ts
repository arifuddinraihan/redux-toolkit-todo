import { TTodoUpdate } from "@/components/todo/TodoCards";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000` }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priorityFilter) => {
        const params = new URLSearchParams();

        if (
          priorityFilter === "High" ||
          priorityFilter === "Medium" ||
          priorityFilter === "Low"
        ) {
          params.append("priority", priorityFilter);
        }

        return {
          url: `/tasks`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Tasks"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: `/task`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getSingleTodo: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
    }),
    deleteSingleTodo: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateSingleTodo: builder.mutation({
      query: (options: TTodoUpdate) => ({
        url: `/task/${options.id}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useGetSingleTodoQuery,
  useUpdateSingleTodoMutation,
  useDeleteSingleTodoMutation,
} = baseApi;
