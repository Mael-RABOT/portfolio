import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTransitionNavigate } from '../../Components/Motion/viewTransition';
import { Button, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import AngleFrame from '../../Components/Decor/AngleFrame';
import { RESUME_PDF } from '../../data/contact.data';

const ContactCta: React.FC = () => {
  const { t, i18n } = useTranslation('home');
  const navigate = useTransitionNavigate();
  const resume = RESUME_PDF[i18n.language?.startsWith('fr') ? 'fr' : 'en'];

  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="angle-host">
          <AngleFrame trigger="reveal" delay={0.3} />
          <div className="cta chamfer">
            <div>
              <Typography id="cta-title" variant="h2">{t('cta.title')}</Typography>
              <Typography className="muted" sx={{ mt: 1.5 }}>{t('cta.text')}</Typography>
            </div>
            <div className="cta__actions">
              <Button variant="contained" onClick={() => navigate('/contact')}>{t('cta.contact')}</Button>
              <Button variant="outlined" href={resume.href} download={resume.fileName}>{t('cta.resume')}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCta;
