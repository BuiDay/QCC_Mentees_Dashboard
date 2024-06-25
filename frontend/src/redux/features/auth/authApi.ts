import { apiSlice } from '../api/apiSlice'
import {userLoggedIn, userLoggedOut, userUpdateAvatar } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: 'auth/login-user',
        method: 'POST',
        body: {
          email,
          password
        },
        credentials: 'include' as const
      }),
      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          )
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout-user',
        method: 'GET',
        credentials: 'include' as const
      }),
      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          dispatch(userLoggedOut())
        } catch (error) {
          console.log(error)
        }
      }
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => ({
        url: 'update-user-password',
        method: 'PUT',
        body: {
          oldPassword,
          newPassword
        },
        credentials: 'include' as const
      })
    }),
    updateAvatar: builder.mutation({
      query: (avatar:any) => ({
        url: 'update-user-avatar',
        method: 'POST',
        body: {avatar},
        credentials: 'include' as const
      }),
      async onQueryStarted(arg:any, { queryFulfilled, dispatch }:any) {
        try {
          const result = await queryFulfilled
          dispatch(
            userUpdateAvatar({
              user: result.data.user
            })
          )
        } catch (error) {
          console.log(error)
        }
      }
    }),
  })
})

export const { useLoginMutation,useLogoutMutation, useUpdatePasswordMutation, useUpdateAvatarMutation } = authApi
