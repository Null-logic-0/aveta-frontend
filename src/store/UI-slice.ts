import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { active: null, isSidebarOpen: false, selectedImage: "" },
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

    selectImage(state, action) {
      state.selectedImage = action.payload;
    },

    clearSelectedImage(state) {
      state.selectedImage = "";
    },
  },
});

export const {
  open,
  close,
  openSideBar,
  closeSideBar,
  selectImage,
  clearSelectedImage,
} = uiSlice.actions;

export default uiSlice;
