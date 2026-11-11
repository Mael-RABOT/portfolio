import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalePath } from '../../i18n/locale';
import { Button, Typography } from '@mui/material';
import { Reveal } from '../../Components/Motion/Reveal';
import { RESUME_PDF } from '../../data/contact.data';

const ContactCta: React.FC = () => {
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate();
  const lp = useLocalePath();
  const resume = RESUME_PDF[i18n.language?.startsWith('fr') ? 'fr' : 'en'];

  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta chamfer">
          <div>
            <Typography id="cta-title" variant="h2">{t('cta.title')}</Typography>
            <Typography className="muted" sx={{ mt: 1.5 }}>{t('cta.text')}</Typography>
          </div>
          <div className="cta__actions">
            <Button variant="contained" onClick={() => navigate(lp('/contact'))}>{t('cta.contact')}</Button>
            <Button variant="outlined" href={resume.href} download={resume.fileName}>{t('cta.resume')}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCta;
