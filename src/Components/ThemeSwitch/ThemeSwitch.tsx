import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../theme/ThemeContext';
import { motion } from '../../theme/theme.const';
import { pixelRevealFrames } from '../Motion/pixelReveal';
import { startTransition } from '../Motion/viewTransition';
import './ThemeSwitch.css';

/** Sun / moon button switching between the dark (default) and light themes. */
const ThemeSwitch: React.FC = () => {
  const { t } = useTranslation('navigation');
  const { mode, toggleMode } = useThemeMode();
  // the icon only boots in after a switch, not on page load
  const [switched, setSwitched] = useState(false);
  const label = t(mode === 'dark' ? 'themeSwitch.toLight' : 'themeSwitch.toDark');

  // The new theme dissolves in, grid block by grid block, from the button (see `data-vt="theme"` in App.css)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;

    const update = () => {
      setSwitched(true);
      toggleMode();
    };

    startTransition(update, 'theme')?.ready.then(() => {
      const { next, prev } = pixelRevealFrames(x, y);
      const timing: KeyframeAnimationOptions = { duration: motion.theme * 1000, easing: 'linear', fill: 'forwards' };
      const root = document.documentElement;
      root.animate(next, { ...timing, pseudoElement: '::view-transition-new(root)' });
      root.animate(prev, { ...timing, pseudoElement: '::view-transition-old(root)' });
    });
  };

  return (
    <button
      type="button"
      className={`theme-switch ${switched ? 'is-switched' : ''}`}
      onClick={handleClick}
      aria-label={label}
      title={label}
      aria-pressed={mode === 'light'}
    >
      {mode === 'dark' ? (
        // sun: switch to light (keyed so the CSS boot-in replays on each switch)
        <svg key="sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        // moon: switch to dark
        <svg key="moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitch;
