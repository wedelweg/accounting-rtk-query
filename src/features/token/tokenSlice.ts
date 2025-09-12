import {createSlice} from "@reduxjs/toolkit";
import {changePassword, fetchUser, registerUser} from "../api/accountApi.ts";


const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        setToken: (_state, action) => action.payload,
        clearToken: () => ""
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.token)
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.token)
            .addCase(changePassword.fulfilled, (_state, action) => action.payload)
    }
})

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;