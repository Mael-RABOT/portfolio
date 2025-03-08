import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../../public/locales/en/en.json';
import frTranslations from '../../public/locales/fr/fr.json';
import enResume from '../../public/locales/en/resume.en.json';
import frResume from '../../public/locales/fr/resume.fr.json';

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
