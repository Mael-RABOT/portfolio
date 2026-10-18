import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SITE_URL } from '../../data/contact.data';
import type { Language, Project } from '../../data/types';
import { stripLang, toLanguage, withLang } from '../../i18n/locale';

// Route → key under `seo` in navigation.json. Unknown paths are the 404 page.
const PAGES: Record<string, string> = {
  '/': 'home',
  '/projects': 'projects',
  '/resume': 'resume',
  '/contact': 'contact',
  '/accessibility': 'accessibility',
  '/legal': 'legal',
};

const LANGUAGES: Language[] = ['en', 'fr'];

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setAlternate = (hreflang: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = 'alternate';
    el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
};

/** First sentence of a project description, skipping its "> tagline" line */
const summary = (description = '') => {
  const text = description.split('\n').filter((line) => line.trim() && !line.startsWith('>')).join(' ').trim();
  const sentence = text.match(/^.*?[.!?](\s|$)/)?.[0] ?? text;
  return sentence.trim().slice(0, 200);
};

const urlOf = (path: string, lang: Language) => {
  const localized = withLang(path, lang);
  return `${SITE_URL}${localized === '/' ? '/' : localized}`;
};

/**
 * Keeps the document title, description, canonical URL, language alternates and social tags
 * in sync with the route and language. The prerender step (scripts/prerender.mjs) bakes them into each page.
 */
const Seo: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation('navigation');
  const lang = toLanguage(i18n.language);

  useEffect(() => {
    const bare = stripLang(pathname);
    const path = bare.length > 1 ? bare.replace(/\/$/, '') : bare;
    const projectId = path.match(/^\/projects\/([^/]+)$/)?.[1];
    const project = projectId ? projects.find((p) => p.id === projectId && p.featured) : undefined;
    const page = project ? 'project' : PAGES[path] ?? 'notFound';

    const title = project ? t('seo.project.title', { name: project.name }) : t(`seo.${page}.title`);
    const description = project ? summary(project.description) : t(`seo.${page}.description`);
    const url = urlOf(path, lang);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', lang === 'fr' ? 'fr_FR' : 'en_US');
    setMeta('property', 'og:locale:alternate', lang === 'fr' ? 'en_US' : 'fr_FR');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', page === 'notFound' ? 'noindex' : 'index, follow');

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
    LANGUAGES.forEach((lng) => setAlternate(lng, urlOf(path, lng)));
    setAlternate('x-default', urlOf(path, 'en'));
  }, [pathname, t, lang, projects]);

  return null;
};

export default Seo;
