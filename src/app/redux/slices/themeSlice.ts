import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: Appearance.getColorScheme() ?? 'light', 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setDeviceTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    updateThemeToSystem: (state) => {
      state.theme = Appearance.getColorScheme() ?? 'light'; 
    },
  },
});

export const { toggleTheme, setDeviceTheme, updateThemeToSystem } = themeSlice.actions;
export default themeSlice.reducer;