import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // can be 'light', 'dark', or 'system'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      // Only allow 'light', 'dark', or 'system'
      if (['light', 'dark', 'system'].includes(action.payload)) {
        state.mode = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;