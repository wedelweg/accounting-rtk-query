import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, registerUser} from "../api/accountApi.ts";
import type {UserProfile} from "../../utils/types";

const userSlice = createSlice({
    name: 'user',
    initialState: {} as UserProfile,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload)
    }
})

export default userSlice.reducer;
