import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveLanguage } from '../../i18n/i18n';
import { useLanguage, withLang } from '../../i18n/locale';
import './LanguageSwitch.css';

const LANGUAGES = ['en', 'fr'] as const;

const LanguageSwitch: React.FC = () => {
  const { t } = useTranslation('navigation');
  const current = useLanguage();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // same page in the other language (/projects <-> /fr/projects); LangSync then switches i18n
  const choose = (lng: (typeof LANGUAGES)[number]) => {
    saveLanguage(lng);
    if (lng !== current) navigate(withLang(pathname, lng) + hash);
  };

  return (
    <div className="language-switch" role="group" aria-label={t('languageSwitch.title')}>
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`language-switch__btn ${current === lng ? 'is-active' : ''}`}
          onClick={() => choose(lng)}
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
