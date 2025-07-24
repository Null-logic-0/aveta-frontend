import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./UI-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, ui: uiSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
