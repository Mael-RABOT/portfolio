import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../data/types';

/**
 * Language lives in the URL: English at the root (/projects), French under /fr (/fr/projects).
 * Paths in the code are always written without the prefix; these helpers add or remove it.
 */
export const LANG_PREFIX: Record<Language, string> = { en: '', fr: '/fr' };

export const langFromPath = (pathname: string): Language => (/^\/fr(\/|$)/.test(pathname) ? 'fr' : 'en');

/** "/fr/projects/lucy" -> "/projects/lucy", "/fr" -> "/" */
export const stripLang = (pathname: string): string => pathname.replace(/^\/fr(?=\/|$)/, '') || '/';

/** "/projects" + fr -> "/fr/projects", "/" + fr -> "/fr" */
export const withLang = (path: string, lang: Language): string => {
  const bare = stripLang(path);
  if (lang === 'en') return bare;
  return bare === '/' ? LANG_PREFIX.fr : `${LANG_PREFIX.fr}${bare}`;
};

export const toLanguage = (lng?: string): Language => (lng?.startsWith('fr') ? 'fr' : 'en');

export const useLanguage = (): Language => {
  const { i18n } = useTranslation();
  return toLanguage(i18n.resolvedLanguage || i18n.language);
};

/** Prefixes an app path ("/legal") with the current language */
export const useLocalePath = () => {
  const lang = useLanguage();
  return useCallback((path: string) => withLang(path, lang), [lang]);
};
