import React from 'react';
import { useInViewOnce } from './useInViewOnce';

interface RevealProps {
  children: React.ReactNode;
  /** Seconds */
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}

/**
 * Fades its children up once they scroll into view.
 * Pure CSS transition (see `.reveal` in App.css), triggered by an IntersectionObserver.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const [ref, visible] = useInViewOnce<HTMLElement>();
  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
};
