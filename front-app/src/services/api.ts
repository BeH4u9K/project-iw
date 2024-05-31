import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    recordMovies: builder.mutation({
      query: (recordMovies) => ({
        url: 'api/movies',
        method: 'POST',
        body: recordMovies,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/login',
        method: 'POST',
        body: credentials,
      }), 
    }),
    movies: builder.query({
      query: () => 'api/movies', 
    }),
  }),
});

export const { useLoginMutation, useMoviesQuery, useRecordMoviesMutation } = loginApi;
