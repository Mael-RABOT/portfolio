import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

/** `true` when the user asked the OS for reduced motion. Follows live changes. */
export const useReducedMotion = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
