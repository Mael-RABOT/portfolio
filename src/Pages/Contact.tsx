import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Reveal } from "../Components/Motion/Reveal";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { CONTACT } from "../data/contact.data";
import "./Pages.css";

const Contact: React.FC = () => {
    const { t } = useTranslation('contact');
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${CONTACT.email}`;
        }
    };

    const channels = [
        {
            key: 'email',
            value: CONTACT.email,
            actions: (
                <>
                    <Button variant="contained" href={`mailto:${CONTACT.email}`}>{t('channels.email.send')}</Button>
                    <Button variant="outlined" onClick={handleCopyEmail} aria-label={t('channels.email.copyLabel')}>
                        <span aria-live="polite">{copied ? t('channels.email.copied') : t('channels.email.copy')}</span>
                    </Button>
                </>
            ),
        },
        {
            key: 'linkedin',
            value: CONTACT.linkedin.replace('https://', ''),
            actions: (
                <Button variant="outlined" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                    {t('channels.linkedin.action')} ↗
                </Button>
            ),
        },
        {
            key: 'github',
            value: CONTACT.github.replace('https://', ''),
            actions: (
                <Button variant="outlined" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                    {t('channels.github.action')} ↗
                </Button>
            ),
        },
    ];

    return (
        <SplitSection
            tight
            label={t('header.eyebrow')}
            aside={
                <SectionHeader level="h1" eyebrow={t('header.eyebrow')} title={t('header.title')} intro={t('header.intro')}>
                    <ul className="availability" style={{ listStyle: 'none' }}>
                        <li style={{ color: 'var(--color-text)' }}>
                            <span className="availability__dot" aria-hidden="true" />
                            {t('availability.open')}
                        </li>
                        <li>{t('availability.response')}</li>
                        <li>{t('availability.location')}</li>
                        <li>{t('availability.scope')}</li>
                    </ul>
                </SectionHeader>
            }
        >
            <ul className="stack" style={{ listStyle: 'none' }} aria-label={t('channels.label')}>
                {channels.map((channel, i) => (
                    <Reveal as="li" key={channel.key} from="right" delay={i * 0.1}>
                        <div className={`channel chamfer ${i === 0 ? 'chamfer--active' : ''}`}>
                            <div>
                                <div className="channel__label">{t(`channels.${channel.key}.label`)}</div>
                                <div className="channel__value">{channel.value}</div>
                            </div>
                            <div className="channel__actions">{channel.actions}</div>
                        </div>
                    </Reveal>
                ))}
            </ul>
        </SplitSection>
    );
};

export default Contact;
