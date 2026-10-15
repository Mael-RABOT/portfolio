import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { CONTACT } from '../../data/contact.data';
import './Layout.css';

const NAV_ITEMS = [
  { path: '/', key: 'home' },
  { path: '/projects', key: 'projects' },
  { path: '/resume', key: 'resume' },
  { path: '/contact', key: 'contact' },
] as const;

const Navbar: React.FC = () => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`navbar ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label={t('brandLabel')}>
          <span className="navbar__mark" aria-hidden="true" />
          Maël Rabot
        </Link>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`} id="main-navigation" aria-label={t('label')}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {t(`menu.${item.key}`)}
            </NavLink>
          ))}
          <div className="navbar__prefs">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </nav>

        <button
          type="button"
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={t(open ? 'closeMenu' : 'openMenu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  const { t } = useTranslation('navigation');

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="muted">© {new Date().getFullYear()} Maël Rabot</span>
        <nav className="footer__links" aria-label={t('footer.label')}>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${CONTACT.email}`}>{t('footer.email')}</a>
          <Link to="/accessibility">{t('footer.accessibility')}</Link>
        </nav>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation('navigation');
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="layout">
      <a href="#content" className="skip-link">{t('skip')}</a>
      <Navbar />
      <main id="content" className="layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
