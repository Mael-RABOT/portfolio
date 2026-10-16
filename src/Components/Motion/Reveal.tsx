import React, { useEffect } from 'react';
import { motion } from '../../theme/theme.const';
import { useInViewOnce } from './useInViewOnce';
import { useReducedMotion } from './useReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  /** Seconds */
  delay?: number;
  /** Direction the element comes from */
  from?: 'bottom' | 'left' | 'right';
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

/**
 * Fades/slides its children in once they scroll into view.
 * Pure CSS transition (see `.reveal` in App.css), triggered by an IntersectionObserver.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, from = 'bottom', className = '', as = 'div' }) => {
  const [ref, visible] = useInViewOnce<HTMLElement>();
  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`reveal reveal--${from} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
};

// Ease-out close to the site's cubic-bezier(0.22, 1, 0.36, 1)
const easeOut = (t: number) => 1 - (1 - t) ** 4;

/**
 * Counts up from 0 to `value` the first time it becomes visible.
 * The final value is rendered by React; the animation writes to the DOM directly
 * (no re-render per frame) and always ends on `value`.
 */
export const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const duration = motion.slow * 2 * 1000;
    let start = 0;
    let frame = requestAnimationFrame(function tick(now) {
      start ||= now;
      const t = Math.min((now - start) / duration, 1);
      el.textContent = `${Math.round(easeOut(t) * value)}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = `${value}${suffix}`;
    };
  }, [ref, inView, reduce, value, suffix]);

  return <span ref={ref}>{`${value}${suffix}`}</span>;
};
