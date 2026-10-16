import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { themes } from './theme';
import { DEFAULT_THEME, THEME_STORAGE_KEY, palettes, type ThemeMode } from './theme.const';

interface ThemeModeContext {
  mode: ThemeMode;
  toggleMode: () => void;
}

const Context = createContext<ThemeModeContext>({ mode: DEFAULT_THEME, toggleMode: () => {} });

export const useThemeMode = () => useContext(Context);

// The inline script in index.html already applied the saved theme to <html>
const initialMode = (): ThemeMode => {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

/**
 * Dark by default; the visitor's choice is saved in localStorage.
 * Colours switch through <html data-theme> (CSS variables), MUI through its theme object.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  // index.html painted a temporary background to avoid a flash; CSS variables take over now
  useEffect(() => {
    document.documentElement.style.removeProperty('background-color');
  }, []);

  // layout effect: applied inside the theme View Transition's update, before the new snapshot
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palettes[mode].bg);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((current) => {
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // storage blocked (private mode…): the choice simply lasts for this visit
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <Context.Provider value={value}>
      <MUIThemeProvider theme={themes[mode]}>{children}</MUIThemeProvider>
    </Context.Provider>
  );
};
