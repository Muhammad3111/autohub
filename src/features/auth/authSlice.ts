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
  isLogin: getFromLocalStorage("isLogin", false),
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
        isLogin?: boolean | null;
      }>
    ) => {
      const { userData, accessToken, refreshToken, isLogin } = action.payload;

      state.userData = userData ?? state.userData;
      state.accessToken = accessToken ?? state.accessToken;
      state.refreshToken = refreshToken ?? state.refreshToken;
      state.isLogin = isLogin ?? state.isLogin;

      updateLocalStorage("user_data", userData);
      updateLocalStorage("access_token", accessToken);
      updateLocalStorage("refresh_token", refreshToken);
      updateLocalStorage("isLogin", isLogin);
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
        isLogin: false,
      });

      [
        "user_data",
        "access_token",
        "refresh_token",
        "language",
        "isLogin",
      ].forEach((key) => localStorage.removeItem(key));
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
export const selectCurrentIsLogin = (state: { auth: AuthState }) =>
  state.auth.isLogin;
