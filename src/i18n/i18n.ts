import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
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
import enAccessibility from '../locales/en/accessibility.json';
import frAccessibility from '../locales/fr/accessibility.json';
import enLegal from '../locales/en/legal.json';
import frLegal from '../locales/fr/legal.json';

const LANGUAGE_STORAGE_KEY = 'i18nextLng';

/** Remembers an explicit language choice (the switch), for the next visit */
export const saveLanguage = (lng: string) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {
    // storage blocked (private mode…): the URL still carries the language
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'navigation',
    resources: {
      en: {
        home: enHome,
        projects: enProjects,
        contact: enContact,
        resume: enResume,
        navigation: enNavigation,
        accessibility: enAccessibility,
        legal: enLegal
      },
      fr: {
        home: frHome,
        projects: frProjects,
        contact: frContact,
        resume: frResume,
        navigation: frNavigation,
        accessibility: frAccessibility,
        legal: frLegal
      }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    load: 'languageOnly',
    // The URL decides (/fr/...), see LangSync in App.tsx. On an English URL, a saved choice
    // or a French browser sends the first visit to /fr. Old ?lang= links still work.
    // No automatic caching: only the language switch saves a choice (saveLanguage below).
    detection: {
      order: ['path', 'querystring', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupQuerystring: 'lang',
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: [],
    },
    interpolation: {
      escapeValue: false
    }
  });

// Keep document lang attribute in sync with current i18n language for accessibility (WCAG 3.1.1)
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'en';
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;