import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';

const LANGUAGES = ['en', 'fr'] as const;

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation('navigation');
  const current = (i18n.resolvedLanguage || i18n.language || 'en').startsWith('fr') ? 'fr' : 'en';

  return (
    <div className="language-switch" role="group" aria-label={t('languageSwitch.title')}>
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`language-switch__btn ${current === lng ? 'is-active' : ''}`}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          lang={lng}
          aria-label={t(`languageSwitch.${lng}Label`)}
        >
          {t(`languageSwitch.${lng}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
