import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import enTranslations from '../../public/locales/en/en.json';
import frTranslations from '../../public/locales/fr/fr.json';
import enHome from '../../public/locales/en/home.json';
import frHome from '../../public/locales/fr/home.json';
import enProjects from '../../public/locales/en/projects.json';
import frProjects from '../../public/locales/fr/projects.json';
import enContact from '../../public/locales/en/contact.json';
import frContact from '../../public/locales/fr/contact.json';
import enResume from '../../public/locales/en/resume.json';
import frResume from '../../public/locales/fr/resume.json';
import enNavigation from '../../public/locales/en/navigation.json';
import frNavigation from '../../public/locales/fr/navigation.json';
import enData from '../../public/locales/en/data.json';
import frData from '../../public/locales/fr/data.json';

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
