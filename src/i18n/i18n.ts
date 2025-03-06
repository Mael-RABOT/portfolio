import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en/en.json';
import frTranslations from './locales/fr/fr.json';
import enResume from './locales/en/resume.en.json';
import frResume from './locales/fr/resume.fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
        resume: enResume
      },
      fr: {
        translation: frTranslations,
        resume: frResume
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
