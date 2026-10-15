import { createTheme } from '@mui/material/styles';
import type { CSSObject } from '@mui/material/styles';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import {
  cssColors,
  palettes,
  type ThemeMode,
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
  '--chamfer-border': cssColors.line,
  '--chamfer-bg': cssColors.surface,
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
  color: cssColors.text,
});

/**
 * MUI theme for one mode. The palette holds real colour values (MUI derives
 * shades from them); every style override uses CSS variables (`cssColors`),
 * so the overrides follow <html data-theme> without rebuilding anything.
 */
export const createAppTheme = (mode: ThemeMode) => {
  const p = palettes[mode];
  return createTheme({
    spacing: SPACING_BASE,
    palette: {
      mode,
      primary: {
        main: p.accent,
        light: p.accentLight,
        dark: p.accentDark,
        contrastText: p.onAccent,
      },
      secondary: {
        main: p.text,
        contrastText: p.bg,
      },
      error: { main: p.error },
      warning: { main: p.warning },
      background: {
        default: p.bg,
        paper: p.surface,
      },
      text: {
        primary: p.text,
        secondary: p.textMuted,
        disabled: p.textSubtle,
      },
      divider: p.line,
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
      subtitle1: { fontSize: fontSizes.lg, lineHeight: lineHeights.normal, color: cssColors.textMuted },
      subtitle2: { fontSize: fontSizes.sm, fontWeight: fontWeights.medium, color: cssColors.textMuted },
      body1: { fontSize: fontSizes.md, lineHeight: lineHeights.relaxed },
      body2: { fontSize: fontSizes.sm, lineHeight: lineHeights.normal },
      caption: { fontSize: fontSizes.xs, color: cssColors.textMuted },
      overline: {
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.medium,
        letterSpacing: letterSpacing.label,
        lineHeight: lineHeights.normal,
        textTransform: 'uppercase',
        color: cssColors.accent,
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
        styleOverrides: { body: { backgroundColor: cssColors.bg } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            ...chamferBox('var(--shape-chamfer-sm)'),
            padding: '10px 20px',
            color: cssColors.text,
            transition: `color ${motion.fast}s ${motion.easing}`,
            // neutralise MUI's own variant backgrounds/borders, the pseudo layers draw everything
            '&, &:hover, &:active': { backgroundColor: 'transparent', border: 'none', boxShadow: 'none' },
            '&:focus-visible': { outline: 'none', '--chamfer-border': cssColors.accent },
            '&.Mui-disabled': { color: cssColors.textSubtle },
          },
          contained: {
            '--chamfer-border': cssColors.accent,
            '--chamfer-bg': cssColors.accent,
            color: cssColors.onAccent,
            '&:hover, &:focus-visible': {
              '--chamfer-border': cssColors.accentLight,
              '--chamfer-bg': cssColors.accentLight,
            },
            '&:focus-visible': { '--chamfer-border': cssColors.text },
          },
          outlined: {
            '--chamfer-border': cssColors.lineStrong,
            '--chamfer-bg': cssColors.bg,
            '&:hover': { '--chamfer-border': cssColors.accent, color: cssColors.accent },
          },
          text: {
            '--chamfer-border': 'transparent',
            '--chamfer-bg': 'transparent',
            '&:hover': { color: cssColors.accent },
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
          subheader: { fontSize: fontSizes.xs, color: cssColors.textMuted, marginTop: 4 },
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
            borderColor: cssColors.line,
            color: cssColors.textMuted,
          },
          filledPrimary: {
            backgroundColor: cssColors.accentSoft,
            color: cssColors.accent,
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: cssColors.line } },
      },
      MuiLink: {
        defaultProps: { underline: 'hover' },
        styleOverrides: {
          root: {
            color: cssColors.accent,
            textUnderlineOffset: '3px',
            '&:hover': { color: cssColors.accentLight },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 0,
            backgroundColor: cssColors.surfaceRaised,
            border: `1px solid ${cssColors.line}`,
            fontSize: fontSizes.xs,
          },
        },
      },
    },
  });
};

export const themes = {
  dark: createAppTheme('dark'),
  light: createAppTheme('light'),
} as const;

export default themes.dark;
