import React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Single dark theme: tokens live in theme.const.ts, MUI mapping in theme.ts.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
);
