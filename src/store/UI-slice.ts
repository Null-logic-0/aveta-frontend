import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { active: null, isSidebarOpen: false },
  reducers: {
    open(state, action) {
      state.active = action.payload;
    },
    close(state) {
      state.active = null;
    },
    openSideBar(state) {
      state.isSidebarOpen = true;
    },
    closeSideBar(state) {
      state.isSidebarOpen = false;
    },
  },
});

export const { open, close, openSideBar, closeSideBar } = uiSlice.actions;

export default uiSlice;
