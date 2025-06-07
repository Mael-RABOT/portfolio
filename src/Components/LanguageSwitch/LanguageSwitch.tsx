import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation('navigation');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switch">
      <span className="language-label">{t('languageSwitch.title')}:</span>
      <button
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('languageSwitch.en')}
      </button>
      <span className="language-separator">|</span>
      <button
        className={`language-btn ${i18n.language === 'fr' ? 'active' : ''}`}
        onClick={() => changeLanguage('fr')}
      >
        {t('languageSwitch.fr')}
      </button>
    </div>
  );
};

export default LanguageSwitch;