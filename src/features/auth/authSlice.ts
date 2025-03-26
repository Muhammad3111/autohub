import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getFromLocalStorage } from "../../hooks/useGetFromLocalStorage";
import { apiSlice } from "../../app/api/apiSlice";

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
        updateUserLikes: (
            state,
            {
                payload,
            }: PayloadAction<{ postId: string; type: "like" | "dislike" }>
        ) => {
            if (!state.userData) return;

            const { postId, type } = payload;

            if (type === "like") {
                if (!state.userData.likes.includes(postId)) {
                    state.userData.likes.push(postId);
                }
                state.userData.dislikes = state.userData.dislikes.filter(
                    (id) => id !== postId
                );
            } else if (type === "dislike") {
                if (!state.userData.dislikes.includes(postId)) {
                    state.userData.dislikes.push(postId);
                }
                state.userData.likes = state.userData.likes.filter(
                    (id) => id !== postId
                );
            }

            updateLocalStorage("user_data", state.userData);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authSlice.actions.logOut, (_state) => {
            apiSlice.util.resetApiState();
        });

        builder.addCase(authSlice.actions.updateUserLikes, (_state) => {
            apiSlice.util.invalidateTags(["BLOGS"]);
        });
    },
});

export const { setCredentials, logOut, changeLanguage, updateUserLikes } =
    authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserData = (state: { auth: AuthState }) =>
    state.auth.userData;
export const selectCurrentAccessToken = (state: { auth: AuthState }) =>
    state.auth.accessToken;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) =>
    state.auth.refreshToken;
export const selectCurrentLanguage = (state: { auth: AuthState }) =>
    state.auth.language;
