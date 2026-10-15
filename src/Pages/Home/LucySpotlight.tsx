import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import { SectionHeader } from '../../Components/Section/Section';
import { LUCY_LINKS } from '../../data/contact.data';
import LucyDiagram from './LucyDiagram';

const LINK_KEYS = ['site', 'docs', 'github', 'discord'] as const;

const LucySpotlight: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  return (
    <section id="lucy" className="section" aria-labelledby="lucy-title">
      <div className="container split split--reverse">
        <Reveal from="left">
          <LucyDiagram />
        </Reveal>

        <div>
          <SectionHeader
            eyebrow={t('lucy.eyebrow')}
            title={<span id="lucy-title">{t('lucy.title')}</span>}
            intro={t('lucy.subtitle')}
          >
            <Chip label={`● ${t('lucy.status')}`} color="primary" size="small" sx={{ mt: 2.5 }} />
            <Typography sx={{ mt: 2.5 }}>{t('lucy.description')}</Typography>
          </SectionHeader>

          <Reveal delay={0.15}>
            <ul className="link-grid">
              {LINK_KEYS.map((key) => (
                <li key={key}>
                  <a
                    className="link-card chamfer chamfer--sm chamfer--interactive"
                    href={LUCY_LINKS[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-card__title">
                      {t(`lucy.links.${key}`)} <span aria-hidden="true">↗</span>
                    </span>
                    <span className="link-card__desc">{t(`lucy.links.${key}Desc`)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate('/projects', { state: { selectedProjectId: 'lucy' } })}
            >
              {t('lucy.cta')} →
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LucySpotlight;
