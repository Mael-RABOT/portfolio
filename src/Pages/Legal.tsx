import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@mui/material";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { Reveal } from "../Components/Motion/Reveal";
import { CONTACT, HOSTING } from "../data/contact.data";
import "./Pages.css";

const DATA_ITEMS = ['controller', 'collected', 'logs', 'email', 'transfers', 'rights'] as const;
const STORAGE_ITEMS = ['theme', 'language'] as const;

const Legal: React.FC = () => {
    const { t } = useTranslation('legal');
    const email = <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>;

    return (
        <SplitSection
            tight
            label={t('title')}
            aside={<SectionHeader level="h1" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />}
        >
            <Reveal from="right">
                <article className="prose">
                    <h2>{t('editor.title')}</h2>
                    <p>{t('editor.description')}</p>
                    <p style={{ marginTop: 'var(--space-sm)' }}>{t('editor.contact')} · {email}</p>

                    <h2>{t('director.title')}</h2>
                    <p>{t('director.description')}</p>

                    <h2>{t('hosting.title')}</h2>
                    <p>
                        {HOSTING.name}<br />
                        {HOSTING.address}<br />
                        {HOSTING.phone} · <Link href={HOSTING.website} target="_blank" rel="noopener noreferrer">{HOSTING.website.replace('https://', '')}</Link>
                    </p>

                    <h2>{t('ip.title')}</h2>
                    <p>{t('ip.description')}</p>

                    <h2>{t('data.title')}</h2>
                    <ul className="dash-list" style={{ marginTop: 'var(--space-md)' }}>
                        {DATA_ITEMS.map((key) => <li key={key}>{t(`data.${key}`)}</li>)}
                    </ul>
                    <p style={{ marginTop: 'var(--space-sm)' }}>{t('data.contact')} · {email}</p>

                    <h2>{t('storage.title')}</h2>
                    <p>{t('storage.intro')}</p>
                    <ul className="dash-list" style={{ marginTop: 'var(--space-md)' }}>
                        {STORAGE_ITEMS.map((key) => <li key={key}>{t(`storage.${key}`)}</li>)}
                    </ul>
                    <p style={{ marginTop: 'var(--space-sm)' }}>{t('storage.clear')}</p>

                    <h2>{t('links.title')}</h2>
                    <p>{t('links.description')}</p>

                    <p className="muted" style={{ marginTop: 'var(--space-lg)' }}>{t('updated')}</p>
                </article>
            </Reveal>
        </SplitSection>
    );
};

export default Legal;
