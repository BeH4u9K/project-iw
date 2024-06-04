import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    addMovie: builder.mutation({
      query: (movieData) => ({
        url: 'api/admin/add',
        method: 'POST',
        body: movieData,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (movieData) => ({
        url: 'api/admin/delete',
        method: 'POST',
        body: movieData,
      }),
    }),
    getMovies: builder.query({
      query: () => 'api/movies',
    }),
  }),
});

export const { useLoginMutation, useAddMovieMutation, useDeleteMovieMutation, useGetMoviesQuery } = loginApi;
