import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, registerUser, updateUser} from "../api/accountApi.ts";
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
            .addCase(updateUser.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
    }
})

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
