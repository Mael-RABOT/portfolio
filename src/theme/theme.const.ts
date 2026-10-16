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
 *   palettes.*.accentSoft -> --color-accent-soft
 *   layout.navHeight      -> --layout-nav-height
 *
 * Themes: colours have one palette per mode (`palettes.dark` = default, `palettes.light`).
 * Both expose the same --color-* variables, scoped by <html data-theme="dark|light">.
 * In TS/TSX, use `cssColors.x` (a `var(--color-x)` string) so styles follow the theme.
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
// 1. COLORS: one palette per theme (dark is the default)
// ============================================================================
export type ThemeMode = 'dark' | 'light';
export const DEFAULT_THEME: ThemeMode = 'dark';
export const THEME_STORAGE_KEY = 'theme';

const PARCHMENT = '#F7F1E5'; // warm off-white: text in dark mode, background in light mode
const INK = '#1B1A17';       // warm near-black: text in light mode

interface PaletteBase {
  bg: string;            // page canvas
  surface: string;       // boxes / cards
  surfaceRaised: string; // tooltips, hovered rows
  text: string;          // all readable text
  accent: string;        // links, CTAs, active states
  accentHover: string;   // accent on hover
  onAccent: string;      // text on an accent fill
  error: string;
  warning: string;
  gridAlpha: number;     // opacity of the dotted background grid
}

const buildPalette = (b: PaletteBase) => ({
  bg: b.bg,
  surface: b.surface,
  surfaceRaised: b.surfaceRaised,

  text: b.text,
  textMuted: rgba(b.text, 0.68),
  textSubtle: rgba(b.text, 0.45),

  accent: b.accent,
  accentLight: b.accentHover,
  accentDark: adjustBrightness(b.accent, -12),
  accentSoft: rgba(b.accent, 0.12),
  onAccent: b.onAccent,

  line: rgba(b.text, 0.12),
  lineStrong: rgba(b.text, 0.24),

  gridLine: rgba(b.text, b.gridAlpha),
  gridHighlight: rgba(b.accent, 0.55), // grid colour under the cursor spotlight
  gridMarker: rgba(b.accent, 0.5),

  error: b.error,
  warning: b.warning,
});

export type Palette = ReturnType<typeof buildPalette>;

export const palettes: Record<ThemeMode, Palette> = {
  dark: buildPalette({
    bg: '#0E0E0F',
    surface: '#151517',
    surfaceRaised: '#1D1D20',
    text: PARCHMENT,
    accent: '#FF8A3D',      // warm amber
    accentHover: '#FFA061',
    onAccent: '#0E0E0F',
    error: '#FF5C5C',
    warning: '#FFC24B',
    gridAlpha: 0.16,
  }),
  light: buildPalette({
    bg: PARCHMENT,          // off-white, not pure white
    surface: '#FBF8F1',
    surfaceRaised: '#FFFFFF',
    text: INK,
    accent: '#C2560F',      // darker amber: AA contrast on parchment
    accentHover: '#A8480A',
    onAccent: '#FFFDF8',
    error: '#C62828',
    warning: '#9A5B00',
    gridAlpha: 0.14,
  }),
};

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Palette keys as CSS variables (`cssColors.accent` -> `var(--color-accent)`).
 * Use these in `sx` props, inline styles and SVG: they follow the active theme.
 */
export const cssColors = Object.fromEntries(
  Object.keys(palettes.dark).map((key) => [key, `var(--color-${kebab(key)})`])
) as Record<keyof Palette, string>;

// ============================================================================
// 2. TYPOGRAPHY
// ============================================================================
export const fonts = {
  mono: "'IBM Plex Mono', ui-monospace, 'Courier New', monospace",
  // Used by the printable CV only (denser and more readable on paper)
  sans: "'IBM Plex Sans', 'Segoe UI', Arial, sans-serif",
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
  spotlightRadius: 240,   // px (colours live in the palettes: gridLine, gridHighlight, gridMarker)
} as const;

// ============================================================================
// 6. PRINTABLE CV (light "paper" version of the palette)
// ============================================================================
export const cv = {
  paper: '#FFFFFF',
  ink: INK,
  inkMuted: '#5E5A52',
  accent: '#C2560F',        // darker amber: readable on white and in print
  rule: '#E3DCCD',
  tint: PARCHMENT,          // the site's parchment, as a light highlight
  pageWidth: '210mm',
  pageHeight: '297mm',
  pageMargin: '12mm',
} as const;

// ============================================================================
// 7. MOTION
// ============================================================================
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motion = {
  fast: 0.15,     // seconds
  base: 0.35,
  slow: 0.7,
  glitch: 0.28,   // micro-glitch on titles (one-shot)
  draw: 0.9,      // SVG line draw-in (angle frames, grid markers)
  page: 0.3,      // route change (View Transition)
  theme: 0.55,    // circular light/dark reveal (View Transition)
  decode: 0.45,   // eyebrow text scramble
  easing: `cubic-bezier(${EASE.join(', ')})`, // CSS
  revealDistance: 24, // px
} as const;

// ============================================================================
// 8. CSS VARIABLES (generated, do not hand-edit)
// ============================================================================
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

const toVariables = (groups: Record<string, Record<string, unknown>>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(groups).flatMap(([group, values]) =>
      Object.entries(values)
        .map(([key, value]): [string, string | null] => [`--${group}-${kebab(key)}`, toCssValue(group, key, value)])
        .filter((entry): entry is [string, string] => entry[1] !== null)
    )
  );

/** Tokens shared by both themes */
export const cssVariables = toVariables({
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
  cv,
});

/** Colour tokens per theme (same variable names, different values) */
export const themeVariables: Record<ThemeMode, Record<string, string>> = {
  dark: toVariables({ color: palettes.dark }),
  light: toVariables({ color: palettes.light }),
};

const declarations = (vars: Record<string, string>) =>
  Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`).join('\n');

/** Stylesheet: shared tokens on :root, colours scoped by <html data-theme="…">. */
export const themeStylesheet = (): string =>
  [
    `:root {\n${declarations(cssVariables)}\n}`,
    ...(Object.keys(themeVariables) as ThemeMode[]).map(
      (mode) => `:root[data-theme="${mode}"] {\n${declarations(themeVariables[mode])}\n  color-scheme: ${mode};\n}`
    ),
  ].join('\n\n');

/** Writes every token to a <style id="theme-tokens"> in <head>. */
export const injectThemeVariables = (): void => {
  if (typeof document === 'undefined') return;
  let style = document.getElementById('theme-tokens');
  if (!style) {
    style = document.createElement('style');
    style.id = 'theme-tokens';
    document.head.prepend(style);
  }
  style.textContent = themeStylesheet();
  if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = DEFAULT_THEME;
};

if (typeof document !== 'undefined') {
  injectThemeVariables();
}

export const THEME_CONFIG = {
  palettes,
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
