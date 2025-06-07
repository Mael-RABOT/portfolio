import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import enTranslations from '../locales/en/en.json';
import frTranslations from '../locales/fr/fr.json';
import enHome from '../locales/en/home.json';
import frHome from '../locales/fr/home.json';
import enProjects from '../locales/en/projects.json';
import frProjects from '../locales/fr/projects.json';
import enContact from '../locales/en/contact.json';
import frContact from '../locales/fr/contact.json';
import enResume from '../locales/en/resume.json';
import frResume from '../locales/fr/resume.json';
import enNavigation from '../locales/en/navigation.json';
import frNavigation from '../locales/fr/navigation.json';
import enData from '../locales/en/data.json';
import frData from '../locales/fr/data.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
        home: enHome,
        projects: enProjects,
        contact: enContact,
        resume: enResume,
        navigation: enNavigation,
        data: enData
      },
      fr: {
        translation: frTranslations,
        home: frHome,
        projects: frProjects,
        contact: frContact,
        resume: frResume,
        navigation: frNavigation,
        data: frData
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
