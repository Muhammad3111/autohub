import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getFromLocalStorage } from "../../hooks/useGetFromLocalStorage";

const updateLocalStorage = (key: string, value: any) => {
    if (value !== null && value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key);
    }
};

const initialState: AuthState = {
    userData: getFromLocalStorage<UserDataType | null>("user_data"),
    accessToken: getFromLocalStorage<string | null>("access_token"),
    refreshToken: getFromLocalStorage<string | null>("refresh_token"),
    language: getFromLocalStorage("language", "uz"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                userData?: UserDataType;
                accessToken?: string | null;
                refreshToken?: string | null;
            }>
        ) => {
            const { userData, accessToken, refreshToken } = action.payload;

            state.userData = userData ?? state.userData;
            state.accessToken = accessToken ?? state.accessToken;
            state.refreshToken = refreshToken ?? state.refreshToken;

            updateLocalStorage("user_data", userData);
            updateLocalStorage("access_token", accessToken);
            updateLocalStorage("refresh_token", refreshToken);
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            updateLocalStorage("language", action.payload);
        },
        logOut: (state) => {
            Object.assign(state, {
                userData: null,
                accessToken: null,
                refreshToken: null,
            });

            ["user_data", "access_token", "refresh_token", "language"].forEach(
                (key) => localStorage.removeItem(key)
            );
        },
    },
});

export const { setCredentials, logOut, changeLanguage } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserData = (state: { auth: AuthState }) =>
    state.auth.userData;
export const selectCurrentAccessToken = (state: { auth: AuthState }) =>
    state.auth.accessToken;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) =>
    state.auth.refreshToken;
export const selectCurrentLanguage = (state: { auth: AuthState }) =>
    state.auth.language;
