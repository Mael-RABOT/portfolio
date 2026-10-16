import { useCallback, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom';

type TransitionKind = 'page' | 'theme';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs a React update inside a native View Transition (CSS in App.css, keyed by
 * `html[data-vt=<kind>]`). Without browser support, or with reduced motion,
 * the update simply runs: same behaviour as before, no animation.
 */
export function startTransition(update: () => void, kind: TransitionKind): ViewTransition | null {
  if (typeof document.startViewTransition !== 'function' || reducedMotion()) {
    update();
    return null;
  }
  const root = document.documentElement;
  root.dataset.vt = kind;
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => delete root.dataset.vt);
  return transition;
}

/**
 * `navigate()` with a page transition.
 * React Router's own `viewTransition` option needs a data router; this app uses <BrowserRouter>.
 */
export function useTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      // history moves (-1) land asynchronously, after any snapshot: no transition for them
      if (typeof to === 'number') return void navigate(to);
      startTransition(() => {
        navigate(to, options);
        // instant: Layout's scroll reset would otherwise run smoothly after the snapshot
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 'page');
    },
    [navigate]
  );
}

/** onClick for router links: plain left clicks get the transition, the rest (new tab…) keep the browser default. */
export function useTransitionLink() {
  const go = useTransitionNavigate();

  return useCallback(
    (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      go(to);
    },
    [go]
  );
}
