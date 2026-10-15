import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SITE_URL } from '../../data/contact.data';

// Route → key under `seo` in navigation.json. Unknown paths are the 404 page.
const PAGES: Record<string, string> = {
  '/': 'home',
  '/projects': 'projects',
  '/resume': 'resume',
  '/contact': 'contact',
  '/accessibility': 'accessibility',
  '/legal': 'legal',
};

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

/** Keeps the document title, description, canonical URL and social tags in sync with the route and language. */
const Seo: React.FC = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation('navigation');

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const page = PAGES[path] ?? 'notFound';
    const title = t(`seo.${page}.title`);
    const description = t(`seo.${page}.description`);
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', i18n.language.startsWith('fr') ? 'fr_FR' : 'en_US');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', page === 'notFound' ? 'noindex' : 'index, follow');

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname, t, i18n.language]);

  return null;
};

export default Seo;
