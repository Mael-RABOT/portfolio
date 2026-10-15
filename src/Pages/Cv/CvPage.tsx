import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CV, CV_CONTACT, type CvEntry } from '../../data/cv.data';
import { RESUME_PDF } from '../../data/contact.data';
import type { Language } from '../../data/types';
import './Cv.css';

const TOOLBAR: Record<Language, { back: string; download: string; other: string }> = {
  en: { back: '← Back to the website', download: '↓ Download PDF', other: 'Version française' },
  fr: { back: '← Retour au site', download: '↓ Télécharger le PDF', other: 'English version' },
};

const Entry: React.FC<{ entry: CvEntry; compact?: boolean }> = ({ entry, compact }) => (
  <article className={`cv-entry ${compact ? 'cv-entry--compact' : ''}`}>
    <h3 className="cv-entry__title">
      {entry.title}
      {entry.org && (
        <>
          {' '}
          <span className="cv-entry__org">
            <span className="cv-entry__sep">{'· '}</span>
            {entry.url ? <a href={entry.url}>{entry.org}</a> : entry.org}
          </span>
        </>
      )}
    </h3>
    <p className="cv-entry__meta">{entry.meta}</p>
    {entry.summary && <p className="cv-entry__summary">{entry.summary}</p>}
    {entry.bullets.length > 0 && (
      <ul className="cv-entry__bullets">
        {entry.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    )}
  </article>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="cv-section">
    <h2 className="cv-section__title">{title}</h2>
    {children}
  </section>
);

/**
 * Printable CV: an A4 sheet rendered from `src/data/cv.data.ts`.
 * `npm run cv:pdf` prints this page to `public/resume_en.pdf` / `public/resume.pdf`.
 */
const CvPage: React.FC = () => {
  const { lang } = useParams();
  const language: Language | null = lang === 'en' || lang === 'fr' ? lang : null;

  useEffect(() => {
    if (!language) return;
    const previous = document.title;
    document.title = language === 'fr' ? 'Maël Rabot · CV' : 'Maël Rabot · Resume';
    return () => { document.title = previous; };
  }, [language]);

  if (!language) return <Navigate to="/cv/en" replace />;

  const cv = CV[language];
  const other: Language = language === 'en' ? 'fr' : 'en';
  const pdf = RESUME_PDF[language];
  const ui = TOOLBAR[language];

  return (
    <div className="cv-screen">
      <nav className="cv-toolbar" aria-label="CV">
        <Link to="/resume">{ui.back}</Link>
        <div className="cv-toolbar__right">
          <Link to={`/cv/${other}`} lang={other}>{ui.other}</Link>
          <a className="cv-toolbar__download" href={pdf.href} download={pdf.fileName}>{ui.download}</a>
        </div>
      </nav>

      <article className="cv-sheet" lang={language}>
        <header className="cv-header">
          <div>
            <h1 className="cv-header__name">
              <span className="cv-header__mark" aria-hidden="true" />
              {cv.name}
            </h1>
            <p className="cv-header__headline">{cv.headline}</p>
          </div>
          <ul className="cv-header__contact">
            <li>{cv.location}</li>
            <li><a href={`mailto:${CV_CONTACT.email}`}>{CV_CONTACT.email}</a></li>
            <li><a href={`https://${CV_CONTACT.website}`}>{CV_CONTACT.website}</a></li>
            <li><a href={`https://${CV_CONTACT.linkedin}`}>{CV_CONTACT.linkedin}</a></li>
            <li><a href={`https://${CV_CONTACT.github}`}>{CV_CONTACT.github}</a></li>
          </ul>
        </header>

        <div className="cv-body">
          <div className="cv-main">
            <Section title={cv.labels.profile}>
              <p className="cv-profile">{cv.profile}</p>
            </Section>
            <Section title={cv.labels.experience}>
              {cv.experience.map((e) => <Entry key={e.title + e.org} entry={e} />)}
            </Section>
            {cv.projectsPlacement === 'main' && (
              <Section title={cv.labels.projects}>
                {cv.projects.map((e) => <Entry key={e.title} entry={e} />)}
              </Section>
            )}
          </div>

          <aside className="cv-side">
            <Section title={cv.labels.skills}>
              <dl className="cv-skills">
                {cv.skills.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.items}</dd>
                  </div>
                ))}
              </dl>
            </Section>
            <Section title={cv.labels.education}>
              {cv.education.map((e) => <Entry key={e.title} entry={e} compact />)}
            </Section>
            <Section title={cv.labels.languages}>
              <ul className="cv-languages">
                {cv.languages.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </Section>
          </aside>
        </div>

        {/* Continuation page: full width, no side column */}
        {cv.projectsPlacement === 'nextPage' && (
          <div className="cv-continuation">
            <Section title={cv.labels.projects}>
              {cv.projects.map((e) => <Entry key={e.title} entry={e} />)}
            </Section>
            {cv.extra?.map((section) => (
              <Section key={section.title} title={section.title}>
                {section.entries?.map((e) => <Entry key={e.title + e.org} entry={e} />)}
                {section.items && <p className="cv-inline-list">{section.items.join(' · ')}</p>}
              </Section>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default CvPage;
