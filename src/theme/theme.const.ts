/**
 * Design tokens: the single source of truth for the whole UI.
 *
 * Edit the values below to retheme the site. Every token is:
 *  - consumed by the MUI theme (src/theme/theme.ts), and
 *  - exposed as a CSS custom property on :root (see `cssVariables` at the bottom),
 *    so plain CSS files use `var(--color-accent)`, `var(--shape-chamfer)`, etc.
 *    and never hold literal values.
 *
 * CSS variable naming: `--<group>-<key>` in kebab-case, e.g.
 *   colors.accentSoft   -> --color-accent-soft
 *   layout.navHeight    -> --layout-nav-height
 */

// ============================================================================
// 0. HELPERS
// ============================================================================
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  return {
    r: parseInt(full.substring(0, 2), 16) || 0,
    g: parseInt(full.substring(2, 4), 16) || 0,
    b: parseInt(full.substring(4, 6), 16) || 0,
  };
}

export function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (c: number) => Math.min(255, Math.max(0, Math.round(c + (255 * percent) / 100)));
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
}

// ============================================================================
// 1. BASE COLORS (change these to retheme everything)
// ============================================================================
const BACKGROUND = '#0E0E0F'; // Page canvas
const SURFACE = '#151517';    // Boxes / cards
const TEXT = '#F7F1E5';       // Warm parchment, all readable text
const ACCENT = '#FF8A3D';     // Warm amber, links, CTAs, active states
const ERROR = '#FF5C5C';
const WARNING = '#FFC24B';

export const colors = {
  bg: BACKGROUND,
  surface: SURFACE,
  surfaceRaised: adjustBrightness(SURFACE, 3),

  text: TEXT,
  textMuted: rgba(TEXT, 0.68),
  textSubtle: rgba(TEXT, 0.45),

  accent: ACCENT,
  accentLight: adjustBrightness(ACCENT, 10),
  accentDark: adjustBrightness(ACCENT, -12),
  accentSoft: rgba(ACCENT, 0.12),
  onAccent: BACKGROUND,

  line: rgba(TEXT, 0.12),
  lineStrong: rgba(TEXT, 0.24),

  error: ERROR,
  warning: WARNING,
} as const;

// ============================================================================
// 2. TYPOGRAPHY
// ============================================================================
export const fonts = {
  mono: "'IBM Plex Mono', ui-monospace, 'Courier New', monospace",
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  xxs: '0.6875rem', // 11px
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.375rem',   // 22px
  h3: '1.75rem',    // 28px
  h2: 'clamp(1.75rem, 1.2rem + 2vw, 2.5rem)',
  h1: 'clamp(2.25rem, 1.4rem + 3.2vw, 3.5rem)',
  display: 'clamp(2.75rem, 1.2rem + 6vw, 5.5rem)',
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.6,
  relaxed: 1.75,
} as const;

export const letterSpacing = {
  tight: '-0.03em',
  normal: '0',
  wide: '0.04em',
  label: '0.14em',
} as const;

// ============================================================================
// 3. SPACING & LAYOUT
// ============================================================================
export const SPACING_BASE = 8; // MUI spacing unit: sx={{ p: 2 }} === 16px

export const spacing = {
  xxs: `${SPACING_BASE * 0.5}px`, // 4
  xs: `${SPACING_BASE}px`,        // 8
  sm: `${SPACING_BASE * 1.5}px`,  // 12
  md: `${SPACING_BASE * 2}px`,    // 16
  lg: `${SPACING_BASE * 3}px`,    // 24
  xl: `${SPACING_BASE * 5}px`,    // 40
  xxl: `${SPACING_BASE * 8}px`,   // 64
  section: 'clamp(72px, 10vw, 136px)',
} as const;

export const layout = {
  maxWidth: '1200px',
  gutter: 'clamp(16px, 4vw, 40px)',
  navHeight: '64px',
  columnGap: 'clamp(32px, 6vw, 96px)',
} as const;

// ============================================================================
// 4. SHAPE (chamfered corners: top-right & bottom-left)
// ============================================================================
export const shape = {
  chamfer: '14px',      // Cards, panels
  chamferSm: '8px',     // Buttons, small boxes
  borderWidth: '1px',
  radius: 0,
} as const;

// ============================================================================
// 5. DECORATION (dotted grid background)
// ============================================================================
export const grid = {
  size: 56,               // px between grid lines
  dash: '1 5',            // SVG stroke-dasharray: dotted lines
  color: rgba(TEXT, 0.16),
  highlight: rgba(ACCENT, 0.55), // grid colour under the cursor spotlight
  spotlightRadius: 240,   // px
  markerColor: rgba(ACCENT, 0.5),
  parallax: 0.12,         // background scroll speed relative to page
} as const;

// ============================================================================
// 6. MOTION
// ============================================================================
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motion = {
  fast: 0.15,     // seconds
  base: 0.35,
  slow: 0.7,
  ease: EASE,     // framer-motion
  easing: `cubic-bezier(${EASE.join(', ')})`, // CSS
  revealDistance: 24, // px
} as const;

// ============================================================================
// 7. CSS VARIABLES (generated, do not hand-edit)
// ============================================================================
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const toCssValue = (group: string, key: string, value: unknown): string | null => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') {
    // Unitless numbers stay unitless where CSS expects them, everything else in grid/motion is px/seconds
    if (group === 'motion') return key === 'revealDistance' ? `${value}px` : `${value}s`;
    if (group === 'grid') return key === 'parallax' ? String(value) : `${value}px`;
    return String(value);
  }
  return null;
};

const groups: Record<string, Record<string, unknown>> = {
  color: colors,
  font: fonts,
  weight: fontWeights,
  size: fontSizes,
  leading: lineHeights,
  tracking: letterSpacing,
  space: spacing,
  layout,
  shape,
  grid,
  motion,
};

export const cssVariables: Record<string, string> = Object.fromEntries(
  Object.entries(groups).flatMap(([group, values]) =>
    Object.entries(values)
      .map(([key, value]): [string, string | null] => [`--${group}-${kebab(key)}`, toCssValue(group, key, value)])
      .filter((entry): entry is [string, string] => entry[1] !== null)
  )
);

/** Writes every token to :root as a CSS custom property. */
export const injectThemeVariables = (): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([name, value]) => root.style.setProperty(name, value));
};

if (typeof document !== 'undefined') {
  injectThemeVariables();
}

export const THEME_CONFIG = {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  spacing,
  layout,
  shape,
  grid,
  motion,
} as const;

export default THEME_CONFIG;
