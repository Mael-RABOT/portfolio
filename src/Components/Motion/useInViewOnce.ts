import { useEffect, useRef, useState } from 'react';

/**
 * Becomes `true` the first time the element enters the viewport, then stays true.
 *
 * Reveal animations are driven by a CSS class toggled from this hook rather than
 * by framer-motion's `whileInView`: in Firefox, elements that only flashed through
 * the viewport during a fast scroll could keep `opacity: 0` forever.
 */
export function useInViewOnce<T extends Element>(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return [ref, visible] as const;
}
