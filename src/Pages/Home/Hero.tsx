import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

// Staggered CSS entrance (see `.enter` in App.css)
const enter = (delay: number) => ({
  className: 'enter',
  style: { '--enter-delay': `${delay}s` } as React.CSSProperties,
});

const Hero: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <span {...enter(0.1)}>
          <span className="eyebrow">{t('hero.eyebrow')}</span>
        </span>
        <h1 id="hero-title" {...enter(0.2)} className="enter hero__title">
          {t('hero.name')}
        </h1>
        <p {...enter(0.35)} className="enter hero__tagline">
          <Trans t={t} i18nKey="hero.tagline" components={[<strong key="epitech" />, <strong key="lucy" />]} />
        </p>
        <div {...enter(0.5)} className="enter hero__actions">
          <Button variant="contained" onClick={() => navigate('/projects')}>
            {t('hero.ctaWork')}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/contact')}>
            {t('hero.ctaContact')}
          </Button>
        </div>
      </div>
      <a href="#today" className="hero__scroll" aria-label={t('hero.scroll')}>
        <span>{t('hero.scroll')}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
