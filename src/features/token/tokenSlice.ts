import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, registerUser} from "../api/accountApi.ts";


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
    }
})

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;