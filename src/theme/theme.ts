import { createTheme } from '@mui/material/styles';
import type { CSSObject } from '@mui/material/styles';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  SPACING_BASE,
  shape,
  motion,
} from './theme.const';

/**
 * Polygon cutting the top-right and bottom-left corners.
 * `size` is any CSS length (usually a `var(--shape-chamfer…)`).
 */
export const chamferPath = (size: string): string =>
  `polygon(0 0, calc(100% - ${size}) 0, 100% ${size}, 100% 100%, ${size} 100%, 0 calc(100% - ${size}))`;

/**
 * Chamfered box with a 1px border that also follows the diagonal edges.
 * The border is a `::before` layer clipped to the outer shape, the fill is an
 * `::after` layer inset by the border width. Override `--chamfer-border` /
 * `--chamfer-bg` to recolour (e.g. on hover).
 */
export const chamferBox = (size = 'var(--shape-chamfer)'): CSSObject => ({
  position: 'relative',
  isolation: 'isolate',
  background: 'transparent',
  border: 'none',
  borderRadius: 0,
  clipPath: chamferPath(size),
  '--chamfer-border': colors.line,
  '--chamfer-bg': colors.surface,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    pointerEvents: 'none',
    transition: `background-color ${motion.base}s ${motion.easing}`,
  },
  '&::before': {
    inset: 0,
    zIndex: -2,
    backgroundColor: 'var(--chamfer-border)',
    clipPath: chamferPath(size),
  },
  '&::after': {
    inset: shape.borderWidth,
    zIndex: -1,
    backgroundColor: 'var(--chamfer-bg)',
    // inner cut is ~0.6px smaller so the diagonal border is as thick as the straight ones
    clipPath: chamferPath(`calc(${size} - 0.6px)`),
  },
});

const heading = (fontSize: string): TypographyStyleOptions => ({
  fontFamily: fonts.mono,
  fontSize,
  fontWeight: fontWeights.semiBold,
  lineHeight: lineHeights.tight,
  letterSpacing: letterSpacing.tight,
  color: colors.text,
});

const theme = createTheme({
  spacing: SPACING_BASE,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.accent,
      light: colors.accentLight,
      dark: colors.accentDark,
      contrastText: colors.onAccent,
    },
    secondary: {
      main: colors.text,
      contrastText: colors.bg,
    },
    error: { main: colors.error },
    warning: { main: colors.warning },
    background: {
      default: colors.bg,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
      disabled: colors.textSubtle,
    },
    divider: colors.line,
  },
  shape: { borderRadius: shape.radius },
  typography: {
    fontFamily: fonts.mono,
    h1: heading(fontSizes.h1),
    h2: heading(fontSizes.h2),
    h3: heading(fontSizes.h3),
    h4: heading(fontSizes.xl),
    h5: heading(fontSizes.lg),
    h6: { ...heading(fontSizes.md), letterSpacing: letterSpacing.normal },
    subtitle1: { fontSize: fontSizes.lg, lineHeight: lineHeights.normal, color: colors.textMuted },
    subtitle2: { fontSize: fontSizes.sm, fontWeight: fontWeights.medium, color: colors.textMuted },
    body1: { fontSize: fontSizes.md, lineHeight: lineHeights.relaxed },
    body2: { fontSize: fontSizes.sm, lineHeight: lineHeights.normal },
    caption: { fontSize: fontSizes.xs, color: colors.textMuted },
    overline: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.label,
      lineHeight: lineHeights.normal,
      textTransform: 'uppercase',
      color: colors.accent,
    },
    button: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: colors.bg } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          ...chamferBox('var(--shape-chamfer-sm)'),
          padding: '10px 20px',
          color: colors.text,
          transition: `color ${motion.fast}s ${motion.easing}`,
          // neutralise MUI's own variant backgrounds/borders, the pseudo layers draw everything
          '&, &:hover, &:active': { backgroundColor: 'transparent', border: 'none', boxShadow: 'none' },
          '&:focus-visible': { outline: 'none', '--chamfer-border': colors.accent },
          '&.Mui-disabled': { color: colors.textSubtle },
        },
        contained: {
          '--chamfer-border': colors.accent,
          '--chamfer-bg': colors.accent,
          color: colors.onAccent,
          '&:hover, &:focus-visible': {
            '--chamfer-border': colors.accentLight,
            '--chamfer-bg': colors.accentLight,
          },
          '&:focus-visible': { '--chamfer-border': colors.text },
        },
        outlined: {
          '--chamfer-border': colors.lineStrong,
          '--chamfer-bg': colors.bg,
          '&:hover': { '--chamfer-border': colors.accent, color: colors.accent },
        },
        text: {
          '--chamfer-border': 'transparent',
          '--chamfer-bg': 'transparent',
          '&:hover': { color: colors.accent },
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          ...chamferBox(),
          overflow: 'visible',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: { padding: '20px 24px 0' },
        title: { ...heading(fontSizes.lg), letterSpacing: letterSpacing.normal },
        subheader: { fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 4 },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 24, '&:last-child': { paddingBottom: 24 } },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none', borderRadius: 0 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: fontSizes.xs,
          height: 28,
        },
        outlined: {
          borderColor: colors.line,
          color: colors.textMuted,
        },
        filledPrimary: {
          backgroundColor: colors.accentSoft,
          color: colors.accent,
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: colors.line } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: colors.accent,
          textUnderlineOffset: '3px',
          '&:hover': { color: colors.accentLight },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 0,
          backgroundColor: colors.surfaceRaised,
          border: `1px solid ${colors.line}`,
          fontSize: fontSizes.xs,
        },
      },
    },
  },
});

export default theme;
