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
// 2. COLOR PALETTE (60% Main / 30% Secondary / 10% Highlight)
// ============================================================================
export const colors = {
  // 60% Main - Dark Backgrounds & Main Canvas
  main: {
    base: '#141414',
    surface: '#141414',
    elevated: '#1a1a1a',
    deep: '#0d0d0d',
    contrastText: '#F7F1E5',
  },

  // 30% Secondary - Structure, Frame, Table Headers, Borders, Secondary Actions
  secondary: {
    base: '#41658A',
    light: '#597fa6',
    dark: '#2d4661',
    border: '#41658A',
    subtleBorder: 'rgba(65, 101, 138, 0.35)',
    panel: '#141414',
    hover: '#1c1c1c',
    contrastText: '#F7F1E5',
    text: '#F7F1E5',
  },

  // 10% Highlight - Active links, Primary CTA, Prompts, Terminal Green Focus
  highlight: {
    base: '#00FF41',
    light: '#33ff67',
    dark: '#00cc34',
    glow: 'rgba(0, 255, 65, 0.2)',
    glowHover: 'rgba(0, 255, 65, 0.4)',
    contrastText: '#141414',
  },

  // Functional & Semantic Colors
  text: {
    primary: '#F7F1E5',
    secondary: '#F7F1E5',
    muted: '#52677F',
    inverse: '#141414',
  },

  status: {
    active: '#00FF41',
    completed: '#00FF41',
    pending: '#41658A',
    error: '#FF4343',
    warning: '#FFAA00',
  },

  decorations: {
    matrixGreen: '#00FF41',
    matrixFade: 'rgba(20, 20, 20, 0.08)',
    matrixOpacity: 0.18, // Toned down, refined background ambience
    divider: 'rgba(65, 101, 138, 0.3)',
    scanlineOpacity: 0.015, // Barely perceptible, clean technical look
  },
} as const;

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
