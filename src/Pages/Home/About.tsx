import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import { SectionHeader, SplitSection } from '../../Components/Section/Section';
import { cssColors } from '../../theme/theme.const';

interface Fact {
  title: string;
  text: string;
}

const About: React.FC = () => {
  const { t } = useTranslation('home');
  const facts = t('about.facts', { returnObjects: true }) as Fact[];

  return (
    <SplitSection
      variant="even"
      sticky={false}
      label={t('about.eyebrow')}
      aside={
        <SectionHeader eyebrow={t('about.eyebrow')} title={t('about.title')}>
          <Typography sx={{ mt: 3 }}>{t('about.p1')}</Typography>
          <Typography className="muted" sx={{ mt: 2 }}>{t('about.p2')}</Typography>
        </SectionHeader>
      }
    >
      <ol className="stack facts">
        {Array.isArray(facts) && facts.map((fact, i) => (
          <Reveal key={fact.title} as="li" delay={i * 0.1} from="right">
            <Card sx={{ '&:hover': { '--chamfer-border': cssColors.accent } }}>
              <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'baseline' }}>
                <span className="facts__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <Typography variant="h6" component="h3">{fact.title}</Typography>
                  <Typography className="muted" sx={{ mt: 0.5, fontSize: 'var(--size-sm)' }}>{fact.text}</Typography>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </ol>
    </SplitSection>
  );
};

export default About;
