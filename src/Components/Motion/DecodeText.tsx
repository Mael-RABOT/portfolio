import React, { useEffect } from 'react';
import { motion } from '../../theme/theme.const';
import { useInViewOnce } from './useInViewOnce';
import { useReducedMotion } from './useReducedMotion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_';
const KEEP = /[\s·/\-|]/; // separators stay in place, so the label's shape reads immediately
const STEP_MS = 40;       // stepped, not per frame: looks digital, costs less

interface DecodeTextProps {
  text: string;
  /** `view`: first time it scrolls into view. `load`: on mount. */
  trigger?: 'view' | 'load';
  /** Seconds before the scramble starts */
  delay?: number;
}

/**
 * Short "decode" effect: characters scramble, then settle left to right.
 * React renders the real text; the effect only overwrites `textContent` while it
 * runs and always restores it. Meant for monospace, uppercase labels (no width change).
 */
export const DecodeText: React.FC<DecodeTextProps> = ({ text, trigger = 'view', delay = 0.15 }) => {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const active = trigger === 'load' || inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active || reduce) return;
    const chars = [...text];
    const duration = motion.decode * 1000;
    let timer = 0;
    const start = performance.now() + delay * 1000;

    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const settled = Math.ceil(t * chars.length);
      el.textContent = chars
        .map((c, i) => (i < settled || KEEP.test(c) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join('');
      if (t < 1) timer = window.setTimeout(tick, STEP_MS);
    };
    // scrambled right away (the reveal hides it until then), settles after `delay`
    timer = window.setTimeout(tick, 0);

    return () => {
      clearTimeout(timer);
      el.textContent = text;
    };
  }, [ref, active, reduce, text, delay]);

  return <span ref={ref}>{text}</span>;
};
