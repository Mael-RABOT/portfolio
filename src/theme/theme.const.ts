/**
 * Theme Configuration Constants
 * 
 * Strict 60-30-10 Color System:
 * - 60% Dominant (Main Background & Surfaces): #141414 (Dark Theme)
 * - 30% Secondary (Structure, Borders, Secondary Actions, Panels): #41658A
 * - 10% Highlight (Accent, Active States, Key Terminal Cues): #00FF41
 * 
 * Typography:
 * - Body & Everything: 'IBM Plex Mono', monospace
 * - Titles (Bolded): 'Orbitron', sans-serif
 * - All font sizes and weights (greases) centralized below.
 * 
 * Layout:
 * - Uniform spacing controlled by single constant (SPACING_BASE).
 */

// ============================================================================
// 1. SPACING CONSTANT (Controls layout spacing globally)
// ============================================================================
export const SPACING_BASE = 16; // base spacing in px (1rem)

export const spacing = {
  unit: SPACING_BASE,
  none: 0,
  xxs: `${SPACING_BASE * 0.25}px`, // 4px
  xs: `${SPACING_BASE * 0.5}px`,   // 8px
  sm: `${SPACING_BASE * 0.75}px`,  // 12px
  md: `${SPACING_BASE}px`,         // 16px (standard spacing)
  lg: `${SPACING_BASE * 1.5}px`,   // 24px
  xl: `${SPACING_BASE * 2}px`,     // 32px
  xxl: `${SPACING_BASE * 3}px`,    // 48px
  layout: `${SPACING_BASE}px`,     // Unified layout spacing
} as const;

// ============================================================================
// 2. COLOR PALETTE - THE SINGLE SOURCE OF TRUTH FOR ALL COLORS IN THE APP
// ============================================================================
// Edit these main colors to retheme the entire application:
export const MAIN_COLOR = '#141414';        // 60% Dominant (Dark background & surfaces)
export const SECONDARY_COLOR = '#41658A';   // 30% Secondary (Structure, borders, framing)
export const THEME_COLOR = '#00FF41';       // 10% Highlight / Theme (Terminal green, active states)
export const TEXT_COLOR = '#F7F1E5';        // Main readable text (Warm parchment)
export const MUTED_COLOR = '#52677F';       // Muted / secondary text
export const ERROR_COLOR = '#FF4343';       // Error / alert status
export const WARNING_COLOR = '#FFAA00';     // Warning status

// Helper functions to derive shades and alpha transparencies dynamically
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  return {
    r: parseInt(clean.substring(0, 2), 16) || 0,
    g: parseInt(clean.substring(2, 4), 16) || 0,
    b: parseInt(clean.substring(4, 6), 16) || 0,
  };
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (c: number) => Math.min(255, Math.max(0, Math.round(c + (255 * percent) / 100)));
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
}

export const colors = {
  // Direct shortcuts
  mainColor: MAIN_COLOR,
  secondaryColor: SECONDARY_COLOR,
  themeColor: THEME_COLOR,

  // 60% Main - Dark Backgrounds & Main Canvas
  main: {
    base: MAIN_COLOR,
    surface: MAIN_COLOR,
    elevated: adjustBrightness(MAIN_COLOR, 3),
    deep: adjustBrightness(MAIN_COLOR, -3),
    contrastText: TEXT_COLOR,
  },

  // 30% Secondary - Structure, Frame, Table Headers, Borders, Secondary Actions
  secondary: {
    base: SECONDARY_COLOR,
    light: adjustBrightness(SECONDARY_COLOR, 15),
    dark: adjustBrightness(SECONDARY_COLOR, -15),
    border: SECONDARY_COLOR,
    subtleBorder: rgba(SECONDARY_COLOR, 0.35),
    panel: MAIN_COLOR,
    hover: adjustBrightness(MAIN_COLOR, 5),
    contrastText: TEXT_COLOR,
    text: TEXT_COLOR,
  },

  // 10% Highlight / Theme Accent - Active links, Primary CTA, Prompts, Terminal Green Focus
  highlight: {
    base: THEME_COLOR,
    light: adjustBrightness(THEME_COLOR, 20),
    dark: adjustBrightness(THEME_COLOR, -20),
    glow: rgba(THEME_COLOR, 0.2),
    glowHover: rgba(THEME_COLOR, 0.4),
    contrastText: MAIN_COLOR,
  },

  // Alias for 'theme' color
  theme: {
    base: THEME_COLOR,
    light: adjustBrightness(THEME_COLOR, 20),
    dark: adjustBrightness(THEME_COLOR, -20),
    glow: rgba(THEME_COLOR, 0.2),
    glowHover: rgba(THEME_COLOR, 0.4),
    contrastText: MAIN_COLOR,
  },

  // Functional & Semantic Colors
  text: {
    primary: TEXT_COLOR,
    secondary: TEXT_COLOR,
    muted: MUTED_COLOR,
    inverse: MAIN_COLOR,
  },

  status: {
    active: THEME_COLOR,
    completed: THEME_COLOR,
    pending: SECONDARY_COLOR,
    error: ERROR_COLOR,
    warning: WARNING_COLOR,
  },

  decorations: {
    matrixGreen: THEME_COLOR,
    matrixFade: rgba(MAIN_COLOR, 0.08),
    matrixOpacity: 0.18,
    divider: rgba(SECONDARY_COLOR, 0.3),
    scanlineOpacity: 0.015,
  },
} as const;

/**
 * Automatically inject CSS custom properties to the document root (:root)
 * Ensures that CSS files never define hardcoded colors; theme.const.ts is the sole source of truth.
 */
export const injectThemeVariables = (): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.style.setProperty('--color-main', colors.main.base);
  root.style.setProperty('--color-main-surface', colors.main.surface);
  root.style.setProperty('--color-main-elevated', colors.main.elevated);
  root.style.setProperty('--color-main-deep', colors.main.deep);

  root.style.setProperty('--color-secondary', colors.secondary.base);
  root.style.setProperty('--color-secondary-light', colors.secondary.light);
  root.style.setProperty('--color-secondary-dark', colors.secondary.dark);
  root.style.setProperty('--color-secondary-border', colors.secondary.border);
  root.style.setProperty('--color-secondary-subtle', colors.secondary.subtleBorder);
  root.style.setProperty('--color-secondary-panel', colors.secondary.panel);
  root.style.setProperty('--color-secondary-hover', colors.secondary.hover);
  root.style.setProperty('--color-secondary-text', colors.secondary.text);

  root.style.setProperty('--color-highlight', colors.highlight.base);
  root.style.setProperty('--color-highlight-light', colors.highlight.light);
  root.style.setProperty('--color-highlight-dark', colors.highlight.dark);
  root.style.setProperty('--color-highlight-glow', colors.highlight.glow);
  root.style.setProperty('--color-highlight-glow-hover', colors.highlight.glowHover);

  root.style.setProperty('--color-text-primary', colors.text.primary);
  root.style.setProperty('--color-text-secondary', colors.text.secondary);
  root.style.setProperty('--color-text-muted', colors.text.muted);
  root.style.setProperty('--color-alert', colors.status.error);
  root.style.setProperty('--color-alert-subtle', rgba(ERROR_COLOR, 0.1));
  root.style.setProperty('--color-warning', colors.status.warning);
};

// Auto-inject immediately upon load in the browser
if (typeof document !== 'undefined') {
  injectThemeVariables();
}

// ============================================================================
// 3. TYPOGRAPHY (Fonts, Sizes, Weights / Greases)
// ============================================================================
export const fonts = {
  // IBM Plex Mono for everything
  mono: "'IBM Plex Mono', 'Courier New', monospace",
  // Orbitron for titles
  title: "'Orbitron', 'IBM Plex Mono', sans-serif",
} as const;

// Weights ("Greases")
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

// Font Sizes
export const fontSizes = {
  xxs: '10px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  h4: '22px',
  h3: '26px',
  h2: '32px',
  h1: '40px',
  display: '48px',
} as const;

// Line Heights
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

// Letter Spacing
export const letterSpacing = {
  tight: '-0.5px',
  normal: '0px',
  wide: '0.5px',
  wider: '1px',
  title: '1.5px',
} as const;

// ============================================================================
// 4. BORDERS & SHAPES
// ============================================================================
export const borders = {
  radius: 0, // Strict crisp technical 0px
  width: '1px',
  standard: `1px solid ${colors.secondary.border}`,
  subtle: `1px solid ${colors.secondary.subtleBorder}`,
  active: `1px solid ${colors.highlight.base}`,
  header: `1px solid ${colors.secondary.border}`,
} as const;

// ============================================================================
// 5. UNIFIED THEME EXPORT
// ============================================================================
export const THEME_CONFIG = {
  spacing,
  spacingUnit: SPACING_BASE,
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  borders,
} as const;

export default THEME_CONFIG;
