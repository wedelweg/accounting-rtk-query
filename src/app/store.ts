import { configureStore } from "@reduxjs/toolkit";
import { accountApi } from "../features/api/accountApi";
import type { UserProfile } from "../utils/types";

export interface AuthState {
    user: UserProfile | null;
    token: string | null;
}

const preloadedState = JSON.parse(localStorage.getItem("state") || "{}") as {
    auth: AuthState;
};

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        auth: (state: AuthState = { user: null, token: null }, action) => {
            switch (action.type) {
                case "auth/setAuth":
                    return { ...(action.payload as AuthState) };
                case "auth/clearAuth":
                    return { user: null, token: null };
                default:
                    return state;
            }
        },
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountApi.middleware),
    preloadedState,
});

store.subscribe(() =>
    localStorage.setItem("state", JSON.stringify(store.getState()))
);

export const setAuth = (payload: AuthState) => ({ type: "auth/setAuth", payload });
export const clearAuth = () => ({ type: "auth/clearAuth" });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
