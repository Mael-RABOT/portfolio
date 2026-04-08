import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';

const is_french_enabled = false; // Disabled for now

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation('navigation');

  const currentLanguage = (i18n.resolvedLanguage || i18n.language || 'en').startsWith('fr') ? 'fr' : 'en';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switch">
      <span className="language-label">{t('languageSwitch.title')}:</span>
      <button
        className={`language-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('languageSwitch.en')}
      </button>
        { is_french_enabled && (
            <div>
                <span className="language-separator">|</span>
                <button
                className={`language-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
                    onClick={() => changeLanguage('fr')}
                >
                    {t('languageSwitch.fr')}
                </button>
            </div>
        )}
    </div>
  );
};

export default LanguageSwitch;
