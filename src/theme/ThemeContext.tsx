import React, { createContext, useContext } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { darkTheme } from './theme';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// The new design enforces a single high-contrast dark theme.
// We'll keep the context structure to avoid breaking components that use it,
// but the theme will always be dark and the toggle will do nothing.
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // We always use the darkTheme as per the new design system.
  // The lightTheme and darkTheme exports from theme.ts are identical.
  const theme = darkTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: () => {} }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
