import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserData, UserRegister} from "../../utils/types";
import {base_url, createToken} from "../../utils/constants.ts";
import type {RootState} from "../../app/store.ts";


export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/account/user`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        if (response.status === 409) {
            throw new Error(`User ${user.login} already exists`);
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return {user: data, token};
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/account/login`,
            {
                method: 'POST',
                headers: {
                    'Authorization': token
                }
            })
        //TODO
        if (response.status === 401) {
            throw new Error(`login or password is incorrect`);
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }
        const data = await response.json();
        return {user: data, token};
    }
)

export const updateUser = createAsyncThunk<UserData, UserData, { state: RootState }>(
    'user/update',
    async (user, {getState}) => {
        const response = await fetch(`${base_url}/account/user/${getState().user.login}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': getState().token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        if (response.status === 401) {
            throw new Error(`login or password is incorrect`);
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }
        const {firstName, lastName} = await response.json();
        return {firstName, lastName};
    }
)


export const changePassword = createAsyncThunk<string,
    { oldPassword: string, newPassword: string }, { state: RootState }>(
    'user/password',
    async ({oldPassword, newPassword}, {getState}) => {
        const response = await fetch(`${base_url}/account/password`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': createToken(getState().user.login, oldPassword),
                    'X-Password': newPassword
                }
            })
        if (response.status === 401) {
            throw new Error(`login or password is incorrect`);
        }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }

        return createToken(getState().user.login, newPassword);
    }
)