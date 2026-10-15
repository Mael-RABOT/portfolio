import React from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../theme/ThemeContext';
import './ThemeSwitch.css';

/** Sun / moon button switching between the dark (default) and light themes. */
const ThemeSwitch: React.FC = () => {
  const { t } = useTranslation('navigation');
  const { mode, toggleMode } = useThemeMode();
  const label = t(mode === 'dark' ? 'themeSwitch.toLight' : 'themeSwitch.toDark');

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      aria-pressed={mode === 'light'}
    >
      {mode === 'dark' ? (
        // sun: switch to light
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        // moon: switch to dark
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitch;
