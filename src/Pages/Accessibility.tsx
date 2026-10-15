import React from "react";
import { useTranslation } from "react-i18next";
import { Chip, Link } from "@mui/material";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { Reveal } from "../Components/Motion/Reveal";
import { CONTACT } from "../data/contact.data";
import "./Pages.css";

const MEASURES = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const;

const Accessibility: React.FC = () => {
    const { t } = useTranslation('accessibility');

    return (
        <SplitSection
            tight
            label={t('title')}
            aside={
                <SectionHeader level="h1" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
                    <Chip label="WCAG 2.1 AA · RGAA" color="primary" size="small" sx={{ mt: 3 }} />
                </SectionHeader>
            }
        >
            <Reveal from="right">
                <article className="prose">
                    <h2>{t('compliance_status.title')}</h2>
                    <p>{t('compliance_status.description')}</p>

                    <h2>{t('measures.title')}</h2>
                    <p>{t('measures.intro')}</p>
                    <ul className="dash-list" style={{ marginTop: 'var(--space-md)' }}>
                        {MEASURES.map((key) => <li key={key}>{t(`measures.${key}`)}</li>)}
                    </ul>

                    <h2>{t('non_accessible.title')}</h2>
                    <p>{t('non_accessible.description')}</p>

                    <h2>{t('feedback.title')}</h2>
                    <p>{t('feedback.description')}</p>
                    <p style={{ marginTop: 'var(--space-sm)' }}>
                        {t('feedback.email')} · <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>
                    </p>

                    <h2>{t('enforcement.title')}</h2>
                    <p>{t('enforcement.description')}</p>
                </article>
            </Reveal>
        </SplitSection>
    );
};

export default Accessibility;
