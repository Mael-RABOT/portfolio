import React from 'react';
import { Typography } from '@mui/material';
import { Reveal } from '../Motion/Reveal';
import { DecodeText } from '../Motion/DecodeText';

interface SectionHeaderProps {
  /** Small uppercase label, e.g. "01 / Today" */
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Use h1 for the first header of a page */
  level?: 'h1' | 'h2';
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, intro, level = 'h2', children }) => (
  <Reveal>
    <span className="eyebrow"><DecodeText text={eyebrow} /></span>
    <Typography variant={level} component={level} sx={{ mt: 2, mb: intro ? 2.5 : 0 }}>
      {title}
    </Typography>
    {intro && (
      <Typography className="muted" sx={{ maxWidth: '52ch' }}>
        {intro}
      </Typography>
    )}
    {children}
  </Reveal>
);

interface SplitProps {
  /** Left column (narrow, sticky by default) */
  aside: React.ReactNode;
  children: React.ReactNode;
  sticky?: boolean;
  variant?: 'default' | 'even';
  id?: string;
  label?: string;
  tight?: boolean;
}

/** Page section with the two-part layout: aside on the left, content on the right. */
export const SplitSection: React.FC<SplitProps> = ({ aside, children, sticky = true, variant = 'default', id, label, tight }) => (
  <section id={id} aria-label={label} className={`section ${tight ? 'section--tight' : ''}`}>
    <div className={`container split ${variant === 'even' ? 'split--even' : ''}`}>
      <div className={sticky ? 'split__sticky' : undefined}>{aside}</div>
      <div>{children}</div>
    </div>
  </section>
);
