import { createTheme, ThemeOptions } from '@mui/material/styles';
import {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  SPACING_BASE,
  borders,
} from './theme.const';

const techThemeOptions: ThemeOptions = {
  spacing: SPACING_BASE,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.highlight.base,      // Highlight Theme Color
      light: colors.highlight.light,
      dark: colors.highlight.dark,
      contrastText: colors.main.base,
    },
    secondary: {
      main: colors.secondary.base,      // Secondary Structure Color
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.main.contrastText,
    },
    error: {
      main: colors.status.error,
    },
    warning: {
      main: colors.status.warning,
    },
    background: {
      default: colors.main.base,        // Main Canvas Color
      paper: colors.main.surface,       // Main Surface Color
    },
    text: {
      primary: colors.text.primary,     // Primary Text Color
      secondary: colors.text.secondary, // Secondary Text Color
      disabled: colors.text.muted,
    },
    divider: colors.secondary.subtleBorder,
  },
  typography: {
    fontFamily: fonts.mono, // IBM Plex Mono for everything
    h1: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.h1,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.title,
      lineHeight: lineHeights.tight,
    },
    h2: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.h2,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.title,
      lineHeight: lineHeights.tight,
    },
    h3: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.h3,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.wide,
      lineHeight: lineHeights.tight,
    },
    h4: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.h4,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.wide,
    },
    h5: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.wide,
    },
    h6: {
      fontFamily: fonts.title, // Orbitron bold
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: colors.text.primary,
      letterSpacing: letterSpacing.wide,
    },
    subtitle1: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.medium,
      color: colors.text.secondary,
      lineHeight: lineHeights.normal,
    },
    subtitle2: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      color: colors.text.secondary,
    },
    body1: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.regular,
      color: colors.text.primary,
      lineHeight: lineHeights.normal,
    },
    body2: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      color: colors.text.primary,
      lineHeight: lineHeights.normal,
    },
    caption: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.regular,
      color: colors.text.muted,
    },
    overline: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.xxs,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.wider,
      textTransform: 'uppercase',
    },
    button: {
      fontFamily: fonts.mono,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      textTransform: 'none',
      letterSpacing: letterSpacing.wide,
    },
  },
  shape: {
    borderRadius: borders.radius, // 0px
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: fonts.mono,
          fontWeight: fontWeights.semiBold,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          backgroundColor: colors.highlight.base,
          color: colors.main.base,
          border: `1px solid ${colors.highlight.base}`,
          '&:hover': {
            backgroundColor: colors.highlight.dark,
            boxShadow: `0 0 10px ${colors.highlight.glow}`,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.main.base,
            color: colors.text.muted,
            border: `1px solid ${colors.secondary.subtleBorder}`,
          },
        },
        containedSecondary: {
          backgroundColor: colors.main.base,
          color: colors.text.primary,
          border: `1px solid ${colors.secondary.border}`,
          '&:hover': {
            backgroundColor: colors.secondary.base,
            color: colors.text.primary,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.main.base,
            color: colors.text.muted,
            border: `1px solid ${colors.secondary.subtleBorder}`,
          },
        },
        outlined: {
          backgroundColor: colors.main.base,
          border: `1px solid ${colors.secondary.border}`,
          color: colors.text.primary,
          '&:hover': {
            borderColor: colors.highlight.base,
            color: colors.highlight.base,
            backgroundColor: colors.main.base,
            boxShadow: `0 0 8px ${colors.highlight.glow}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          border: `1px solid ${colors.secondary.subtleBorder}`,
          borderRadius: 0,
          backgroundImage: 'none',
          transition: 'border-color 0.2s ease',
          '&:hover': {
            borderColor: colors.secondary.border,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.secondary.subtleBorder}`,
          padding: '12px 16px',
          backgroundColor: colors.main.base,
        },
        title: {
          fontFamily: fonts.title,
          fontWeight: fontWeights.bold,
          fontSize: fontSizes.lg,
          letterSpacing: letterSpacing.wide,
          color: colors.text.primary,
        },
        subheader: {
          fontFamily: fonts.mono,
          fontSize: fontSizes.xs,
          color: colors.secondary.text,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          backgroundImage: 'none',
          borderRadius: 0,
          border: `1px solid ${colors.secondary.subtleBorder}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          borderBottom: `1px solid ${colors.secondary.border}`,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: fonts.mono,
          fontSize: fontSizes.xs,
          height: '26px',
          backgroundColor: colors.main.base,
        },
        outlined: {
          borderColor: colors.secondary.border,
          color: colors.text.primary,
          backgroundColor: colors.main.base,
        },
        colorPrimary: {
          backgroundColor: colors.highlight.base,
          color: colors.main.base,
          fontWeight: fontWeights.bold,
        },
        colorSecondary: {
          backgroundColor: colors.main.base,
          borderColor: colors.secondary.border,
          color: colors.text.primary,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          fontFamily: fonts.mono,
          backgroundColor: colors.main.base,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: fonts.mono,
          borderColor: colors.secondary.subtleBorder,
          color: colors.text.primary,
          backgroundColor: colors.main.base,
          padding: '10px 14px',
          fontSize: fontSizes.sm,
        },
        head: {
          fontFamily: fonts.title,
          fontWeight: fontWeights.bold,
          color: colors.text.primary,
          backgroundColor: colors.main.base,
          fontSize: fontSizes.xs,
          letterSpacing: letterSpacing.wide,
          borderColor: colors.secondary.border,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          '&:hover': {
            backgroundColor: `${colors.main.elevated} !important`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          borderRadius: 0,
          fontFamily: fonts.mono,
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: colors.secondary.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.secondary.light,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.highlight.base,
            borderWidth: '1px',
            boxShadow: `0px 0px 6px ${colors.highlight.glow}`,
          },
        },
        input: {
          color: colors.text.primary,
          fontFamily: fonts.mono,
          fontSize: fontSizes.sm,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: fonts.mono,
          color: colors.secondary.text,
          fontSize: fontSizes.sm,
          '&.Mui-focused': {
            color: colors.highlight.base,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.main.base,
          fontFamily: fonts.mono,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.secondary.subtleBorder,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: fonts.mono,
          color: colors.highlight.base,
          textDecoration: 'none',
          borderBottom: `1px solid ${colors.highlight.glow}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            color: colors.highlight.light,
            borderColor: colors.highlight.base,
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme(techThemeOptions);
export const darkTheme = createTheme(techThemeOptions);

export default darkTheme;
