import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URI}/api/v1` });

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    // Assuming the refresh token is stored in local storage or a similar place
    // const refreshToken = localStorage.getItem('refreshToken');
    const refreshResult = await baseQuery({
      url: 'refresh-token',
      method: 'GET',
      credentials: 'include' as const
    }, api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // refreshToken: builder.query({
    //   query: () => ({
    //     url: 'refresh-token',
    //     method: 'GET',
    //     credentials: 'include' as const
    //   })
    // }),
    // loadUser: builder.query({
    //   query: () => ({
    //     url: 'get-user-by-id',
    //     method: 'GET',
    //     credentials: 'include' as const
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled
    //       dispatch(
    //         userLoggedIn({
    //           accessToken: result.data.accessToken,
    //           user: result.data.user
    //         })
    //       )
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // })
  })
})

// export const { useLoadUserQuery, useRefreshTokenQuery } = apiSlice
// export const { useLoadUserQuery} = apiSlice
