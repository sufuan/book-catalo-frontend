// api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/api/v1/book',
    }),
    getSingleBooks: builder.query({
      query: (id) => `/api/v1/book/${id}`,
    }),
    createBooks: builder.mutation({
      query: (book) => ({
        url: '/api/v1/book',
        method: 'POST',
        body: book,
      }),
    }),

    updateBooks: builder.mutation({
      query: (updatebookData) => {
        const { id, ...data } = updatebookData;
        if (!id) {
          throw new Error('Book ID is undefined');
        }

        return {
          url: `api/v1/book/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),

    deleteBooks: builder.mutation({
      query: (deletebookid) => ({
        url: `api/v1/book/${deletebookid}`,
        method: 'DELETE',
        body: deletebookid,
      }),
    }),

    // deletePost: builder.mutation({
    //   query: (id) => {
    //     console.log('Delete ID:', id);
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    // }),

    createReview: builder.mutation({
      query: (data) => ({
        url: '/api/v1/review',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useCreateBooksMutation,
  useUpdateBooksMutation,
  useDeleteBooksMutation,
  useCreateReviewMutation,
} = api;
