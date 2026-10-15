import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { motion } from '../../theme/theme.const';
import { useInViewOnce } from './useInViewOnce';

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

/** Counts up from 0 to `value` the first time it becomes visible. */
export const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: motion.ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
      // never leave the counter on an intermediate value if the animation is interrupted
      onComplete: () => setDisplay(value),
    });
    return () => {
      controls.stop();
      setDisplay(value);
    };
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};
