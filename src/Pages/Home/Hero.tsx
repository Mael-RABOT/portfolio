import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useLocalePath } from '../../i18n/locale';

const Hero: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const lp = useLocalePath();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <span className="eyebrow">{t('hero.eyebrow')}</span>
        <h1 id="hero-title" className="hero__title">{t('hero.name')}</h1>
        <p className="hero__tagline">
          <Trans t={t} i18nKey="hero.tagline" components={[<strong key="epitech" className="mark" />, <strong key="lucy" className="mark" />]} />
        </p>
        <div className="hero__actions">
          <Button variant="contained" onClick={() => navigate(lp('/projects'))}>
            {t('hero.ctaWork')}
          </Button>
          <Button variant="outlined" onClick={() => navigate(lp('/contact'))}>
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
