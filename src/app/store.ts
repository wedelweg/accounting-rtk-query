import {configureStore} from '@reduxjs/toolkit'
import user from "../features/user/userSlice.ts";
import token from "../features/token/tokenSlice.ts";


export const store = configureStore({
    reducer: {
        user, token
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch