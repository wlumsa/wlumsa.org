import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: { displayed: false },
  reducers: {
    showPopup: (state) => {
      state.displayed = true;
    },
    hidePopup: (state) => {
      state.displayed = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;