'use client';

import { createContext, useContext } from 'react';

export const ThemeModeContext = createContext<{
  mode: 'light' | 'dark';
  toggle: () => void;
}>({
  mode: 'light',
  toggle: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);
