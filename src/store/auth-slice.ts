import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "../util/get-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: getCookie("accessToken") || null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax`;
      document.cookie = `refreshToken=${refreshToken}; path=/; SameSite=Lax`;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;

      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice;
