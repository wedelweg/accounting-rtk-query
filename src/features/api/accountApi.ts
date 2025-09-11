import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserRegister} from "../../utils/types";
import {base_url} from "../../utils/constants.ts";


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
        return await response.json();
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
        // if (response.status === 409) {
        //     throw new Error(`User ${user.login} already exists`);
        // }
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }
        return await response.json();
    }
)

