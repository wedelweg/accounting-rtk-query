import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url, createToken } from "../../utils/constants";
import type { UserProfile, UserRegister, UserData, UserUpdate } from "../../utils/types";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, { getState }) => {
            const state: any = getState();
            const token = state.auth?.token;
            if (token) {
                headers.set("Authorization", token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<{ user: UserProfile; token: string }, UserRegister>({
            query: (user) => ({
                url: "/account/user",
                method: "POST",
                body: user,
            }),
            transformResponse: (response: UserProfile, _, arg) => {
                const token = createToken(arg.login, arg.password);
                return { user: response, token };
            },
        }),

        loginUser: builder.mutation<{ user: UserProfile; token: string }, { login: string; password: string }>({
            query: ({ login, password }) => ({
                url: "/account/login",
                method: "POST",
                headers: { Authorization: createToken(login, password) },
            }),
            transformResponse: (response: UserProfile, _, arg) => {
                const token = createToken(arg.login, arg.password);
                return { user: response, token };
            },
        }),

        updateUser: builder.mutation<UserData, UserUpdate>({
            query: ({ login, firstName, lastName }) => ({
                url: `/account/user/${login}`,
                method: "PATCH",
                body: { firstName, lastName },
            }),
        }),

        changePassword: builder.mutation<string, { login: string; oldPassword: string; newPassword: string }>({
            query: ({ login, oldPassword, newPassword }) => ({
                url: "/account/password",
                method: "PATCH",
                headers: {
                    Authorization: createToken(login, oldPassword),
                    "X-Password": newPassword,
                },
            }),
            transformResponse: (_, __, arg) => createToken(arg.login, arg.newPassword),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useUpdateUserMutation,
    useChangePasswordMutation,
} = accountApi;
