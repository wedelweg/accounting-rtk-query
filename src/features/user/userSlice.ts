import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, registerUser} from "../api/accountApi.ts";
import type {UserProfile} from "../../utils/types";

const userSlice = createSlice({
    name: 'user',
    initialState: {} as UserProfile,
    reducers: {
        clearUser: () => ({} as UserProfile)
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.user)
    }
})

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
