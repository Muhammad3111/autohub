import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserDataType } from "../../types";
import { getFromLocalStorage } from "../../hooks/useGetFromLocalStorage";

const initialState: AuthState = {
    userData: getFromLocalStorage<UserDataType | null>("user_data", null),
    accessToken: getFromLocalStorage<string | null>("access_token", null),
    refreshToken: getFromLocalStorage<string | null>("refresh_token", null),
    language: localStorage.getItem("language") || "uz",
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

            state.userData = userData;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            if (userData) {
                localStorage.setItem("user_data", JSON.stringify(userData));
            } else {
                localStorage.removeItem("user_data");
            }

            if (accessToken) {
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(accessToken)
                );
            } else {
                localStorage.removeItem("access_token");
            }

            if (refreshToken) {
                localStorage.setItem(
                    "refresh_token",
                    JSON.stringify(refreshToken)
                );
            } else {
                localStorage.removeItem("refresh_token");
            }
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
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
            localStorage.removeItem("language");
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
