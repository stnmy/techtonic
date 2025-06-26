
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/User";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/routes";
import { registerSchema } from "../../lib/schemas/registerSchema";
import { toast } from "react-toastify";


export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<void, loginSchema>({
            query: (creds) => {
                return {
                    url: 'account/login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<void, registerSchema>({
            query: (creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration Successful - You can now log in');
                    router.navigate("/login");
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(['UserInfo']))
                router.navigate('/')
            }
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useLazyUserInfoQuery,
    useUserInfoQuery } = accountApi;