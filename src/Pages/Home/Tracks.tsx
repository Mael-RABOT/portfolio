import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalePath } from '../../i18n/locale';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import { SectionHeader, SplitSection } from '../../Components/Section/Section';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const TrackCard: React.FC<{ track: 'mentoring' | 'building'; onLink: () => void; delay: number }> = ({ track, onLink, delay }) => {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);
  const stats = t(`tracks.${track}.stats`, { returnObjects: true }) as Stat[];
  const points = t(`tracks.${track}.points`, { returnObjects: true }) as string[];
  const detailsId = `track-${track}-details`;

  return (
    <Reveal delay={delay}>
      <Card component="article">
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="overline" component="p">
            {t(`tracks.${track}.label`)}
          </Typography>
          <Typography variant="h3" sx={{ mt: 1 }}>{t(`tracks.${track}.role`)}</Typography>
          <Typography className="muted" sx={{ mt: 0.5, fontSize: 'var(--size-sm)' }}>{t(`tracks.${track}.org`)}</Typography>
          <Typography sx={{ mt: 2.5 }}>{t(`tracks.${track}.summary`)}</Typography>

          <dl className="stats">
            {Array.isArray(stats) && stats.map((stat) => (
              <div key={stat.label} className="stats__item">
                <dt className="stats__label">{stat.label}</dt>
                <dd className="stats__value">{stat.value}{stat.suffix}</dd>
              </div>
            ))}
          </dl>

          {/* CSS height transition; hidden content leaves the a11y tree via visibility */}
          <div id={detailsId} className={`collapse ${open ? 'is-open' : ''}`}>
            <ul className="collapse__inner track__points">
              {Array.isArray(points) && points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>

          <div className="track__actions">
            <Button variant="text" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={detailsId} sx={{ px: 0 }}>
              {open ? `− ${t('tracks.less')}` : `+ ${t('tracks.more')}`}
            </Button>
            <Button variant="outlined" onClick={onLink}>
              {t(`tracks.${track}.link`)} →
            </Button>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
};

const Tracks: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const lp = useLocalePath();

  return (
    <SplitSection
      id="today"
      label={t('tracks.eyebrow')}
      aside={<SectionHeader eyebrow={t('tracks.eyebrow')} title={t('tracks.title')} intro={t('tracks.intro')} />}
    >
      <div className="stack">
        <TrackCard track="mentoring" delay={0} onLink={() => navigate(lp('/resume'))} />
        <TrackCard track="building" delay={0.08} onLink={() => document.getElementById('lucy')?.scrollIntoView()} />
      </div>
    </SplitSection>
  );
};

export default Tracks;
