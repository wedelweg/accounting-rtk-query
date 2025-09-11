import {createSlice} from "@reduxjs/toolkit";


const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        setToken: (_state, action) => action.payload,
        clearToken: () => ""
    },
})

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;