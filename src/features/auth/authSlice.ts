import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    userData?: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    language?: string;
};

const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

const initialState: AuthState = {
    userData: getFromLocalStorage("user_data"),
    accessToken: getFromLocalStorage("access_token"),
    refreshToken: getFromLocalStorage("refresh_token"),
    language: localStorage.getItem("language") || "uz",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                userData?: string | null;
                accessToken: string | null;
                refreshToken: string | null;
            }>
        ) => {
            const { userData, accessToken, refreshToken } = action.payload;

            state.userData = userData;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            if (userData !== undefined) {
                localStorage.setItem("user_data", JSON.stringify(userData));
            }
            localStorage.setItem("access_token", JSON.stringify(accessToken));
            localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;

            localStorage.setItem("language", action.payload);
        },
        logOut: (state) => {
            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;

            localStorage.removeItem("user_data");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
    },
});

export const { setCredentials, logOut, changeLanguage } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUserData = (state: { auth: AuthState }) =>
    state.auth.userData;
export const selectCurrentAccessToken = (state: { auth: AuthState }) =>
    state.auth.accessToken;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) =>
    state.auth.refreshToken;

export const selectCurrentLanguage = (state: { auth: AuthState }) =>
    state.auth.language;
