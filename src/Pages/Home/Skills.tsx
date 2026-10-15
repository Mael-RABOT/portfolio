import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import { SectionHeader, SplitSection } from '../../Components/Section/Section';

const CATEGORIES = ['programmingLanguages', 'tools', 'softSkills', 'languages', 'others'] as const;
type Category = (typeof CATEGORIES)[number];

const Skills: React.FC = () => {
  const { t } = useTranslation('home');
  const [active, setActive] = useState<Category>('programmingLanguages');

  const list = (category: Category): string[] => {
    const value = t(`skills.${category}.list`, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  return (
    <SplitSection
      sticky={false}
      label={t('skills.eyebrow')}
      aside={
        <SectionHeader eyebrow={t('skills.eyebrow')} title={t('skills.title')} intro={t('skills.intro')}>
          <div className="skill-tabs" role="tablist" aria-label={t('skills.title')}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                id={`skill-tab-${category}`}
                aria-selected={active === category}
                aria-controls="skill-panel"
                className={`skill-tabs__tab ${active === category ? 'is-active' : ''}`}
                onClick={() => setActive(category)}
              >
                <span>{t(`skills.${category}.title`)}</span>
                <span className="skill-tabs__count">{String(list(category).length).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </SectionHeader>
      }
    >
      <Reveal from="right">
        <Card>
          <CardContent
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            sx={{ p: { xs: 3, md: 5 }, minHeight: { md: 320 } }}
          >
            <Typography variant="overline" component="p" sx={{ mb: 3 }}>
              {t(`skills.${active}.title`)}
            </Typography>
            {/* re-mounted per category so the CSS stagger replays */}
            <ul key={active} className="skill-cloud">
              {list(active).map((skill, i) => (
                <li
                  key={skill}
                  className="skill-cloud__item chamfer chamfer--sm"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Reveal>
    </SplitSection>
  );
};

export default Skills;
