import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserRegister} from "../../utils/types";
import {base_url, createToken} from "../../utils/constants.ts";


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

