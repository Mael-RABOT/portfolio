import { createTheme, ThemeOptions } from '@mui/material/styles';

const techThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FF41', // Highlight
      light: '#00FF41',
      dark: '#00CC34', // Hover
      contrastText: '#000000',
    },
    secondary: {
      main: '#B7B7B7', // Neutral
      contrastText: '#000000',
    },
    error: {
      main: '#FF0000',
    },
    background: {
      default: '#000000', // Page Background
      paper: '#141414',   // Component BG
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B7B7B7', // Neutral Text
      disabled: '#3F3F3F',
    },
    divider: '#3F3F3F', // Border
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 500, // Medium
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400, // Regular
      color: '#B7B7B7',
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#B7B7B7',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#3F3F3F',
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0, // Strict 0px
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: 'none',
        },
        containedPrimary: {
          backgroundColor: '#00FF41',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#00CC34',
          },
          '&.Mui-disabled': {
            backgroundColor: '#141414',
            color: '#3F3F3F',
            border: '1px solid #3F3F3F',
          },
        },
        containedSecondary: {
          backgroundColor: '#B7B7B7',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#A0A0A0', // slightly darker for hover
          },
          '&.Mui-disabled': {
            backgroundColor: '#141414',
            color: '#3F3F3F',
            border: '1px solid #3F3F3F',
          },
        },
        outlined: {
          border: '1px solid #3F3F3F',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #3F3F3F',
          backgroundColor: '#B7B7B7',
          color: '#000000',
          '&.Mui-selected': {
            backgroundColor: '#00FF41',
            color: '#000000',
            border: '1px solid #3F3F3F',
            '&:hover': {
              backgroundColor: '#00CC34',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          border: '1px solid #3F3F3F',
          borderRadius: 0,
          backgroundImage: 'none', // Remove MUI dark mode overlay
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          backgroundImage: 'none', // Remove MUI dark mode overlay
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          borderBottom: '1px solid #3F3F3F',
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          borderRadius: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#3F3F3F',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B7B7B7',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00FF41',
            borderWidth: '1px',
            boxShadow: '0px 0px 5px #00FF41',
          },
        },
        input: {
          color: '#FFFFFF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
        },
      },
    },
  },
};

// We enforce this dark tech theme for both to ensure it consistently shows the same design
export const lightTheme = createTheme(techThemeOptions);
export const darkTheme = createTheme(techThemeOptions);
