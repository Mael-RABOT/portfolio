import React from 'react';

interface GlitchTextProps {
  text: string;
  /** Play once on mount, after `delay` seconds. Otherwise only on hover. */
  onLoad?: boolean;
  delay?: number;
}

/**
 * Text with a short CSS micro-glitch (see `.glitch` in App.css).
 * The slices are `::before`/`::after` copies of `data-text`: the text stays once in the DOM.
 */
export const GlitchText: React.FC<GlitchTextProps> = ({ text, onLoad = false, delay = 0 }) => (
  <span
    className={`glitch ${onLoad ? 'glitch--load' : ''}`}
    data-text={text}
    style={onLoad ? ({ '--glitch-delay': `${delay}s` } as React.CSSProperties) : undefined}
  >
    {text}
  </span>
);
