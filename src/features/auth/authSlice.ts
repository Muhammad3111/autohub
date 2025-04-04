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

interface AuthState {
    userData: (UserDataType & Partial<Omit<DealersType, "id" | "role">>) | null;
    accessToken: string | null;
    refreshToken: string | null;
    language: string;
}

// LocalStorage'dan olingan ma'lumotni to'g'ri formatga o'tkazish
const initialState: AuthState = {
    userData: getFromLocalStorage<UserDataType | null>("user_data") || null,
    accessToken: getFromLocalStorage<string | null>("access_token") || null,
    refreshToken: getFromLocalStorage<string | null>("refresh_token") || null,
    language: getFromLocalStorage("language") || "uz",
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
                dealerData?: Partial<Omit<DealersType, "id" | "role">>;
            }>
        ) => {
            const { userData, accessToken, refreshToken, dealerData } =
                action.payload;

            if (userData) {
                state.userData = {
                    ...state.userData,
                    ...userData,
                    ...dealerData,
                };
            }

            if (accessToken !== undefined) state.accessToken = accessToken;
            if (refreshToken !== undefined) state.refreshToken = refreshToken;

            updateLocalStorage("user_data", state.userData);
            updateLocalStorage("access_token", state.accessToken);
            updateLocalStorage("refresh_token", state.refreshToken);
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            updateLocalStorage("language", action.payload);
        },
        logOut: (state) => {
            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;

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

            state.userData.likes = state.userData.likes ?? [];
            state.userData.dislikes = state.userData.dislikes ?? [];

            if (type === "like") {
                if (!state.userData.likes.includes(postId)) {
                    state.userData.likes.push(postId);
                }
                state.userData.dislikes = state.userData.dislikes.filter(
                    (id) => id !== postId
                );
            } else {
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
            apiSlice.util.invalidateTags(["AUTH"]);
        });
        builder.addCase(authSlice.actions.updateUserLikes, () => {
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
