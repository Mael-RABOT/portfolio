import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTransitionNavigate } from '../../Components/Motion/viewTransition';
import { Button } from '@mui/material';
import { GlitchText } from '../../Components/Motion/GlitchText';
import { DecodeText } from '../../Components/Motion/DecodeText';
import AngleFrame from '../../Components/Decor/AngleFrame';

// Staggered CSS entrance (see `.enter` in App.css)
const enter = (delay: number) => ({
  className: 'enter',
  style: { '--enter-delay': `${delay}s` } as React.CSSProperties,
});

const Hero: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useTransitionNavigate();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <AngleFrame trigger="load" delay={1.1} />
        <span {...enter(0.1)}>
          <span className="eyebrow"><DecodeText text={t('hero.eyebrow')} trigger="load" delay={0.25} /></span>
        </span>
        <h1 id="hero-title" {...enter(0.2)} className="enter hero__title">
          {/* glitches once the title has landed (enter delay + duration) */}
          <GlitchText text={t('hero.name')} onLoad delay={0.9} />
        </h1>
        <p {...enter(0.35)} className="enter hero__tagline">
          <Trans t={t} i18nKey="hero.tagline" components={[<strong key="epitech" className="mark" />, <strong key="lucy" className="mark" />]} />
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
