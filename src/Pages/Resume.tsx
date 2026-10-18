import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardContent, Chip, Link, Typography } from "@mui/material";
import type { Education, Experience } from "../data/types";
import { Reveal } from "../Components/Motion/Reveal";
import { Carousel } from "../Components/Carousel/Carousel";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { CONTACT, RESUME_PDF } from "../data/contact.data";
import "./Pages.css";

type Item = Experience | Education;

interface TimelineEntry {
    item: Item;
    title: string;
    organisation: string;
}

const Details: React.FC<{ item: Item; name: string }> = ({ item, name }) => {
    const { t } = useTranslation('resume');

    return (
        <>
            {item.description && <Typography sx={{ mt: 1.5, whiteSpace: 'pre-line' }}>{item.description}</Typography>}

            {item.highlights && item.highlights.length > 0 && (
                <ul className="dash-list" style={{ marginTop: 'var(--space-lg)' }}>
                    {item.highlights.map((b, i) => <li key={i} className="muted">{b}</li>)}
                </ul>
            )}

            {item.facts && Object.keys(item.facts).length > 0 && (
                <dl className="kv-grid" style={{ marginTop: 'var(--space-lg)' }}>
                    {Object.entries(item.facts).map(([key, value]) => (
                        <div key={key}>
                            <dt>{key}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {item.images && item.images.length > 0 && (
                <Carousel
                    items={item.images}
                    label={t('experience.images', { name })}
                    altFor={(index) => t('experience.image', { index, name })}
                />
            )}

            {item.links && item.links.length > 0 && (
                <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {item.links.map((link) => (
                        <Link key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 'var(--size-sm)' }}>
                            {link.label} ↗
                        </Link>
                    ))}
                </Box>
            )}

            {item.technologies && item.technologies.length > 0 && (
                <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }} role="list" aria-label={t('experience.stack')}>
                    {item.technologies.map((tech) => <Chip role="listitem" key={tech} label={tech} variant="outlined" size="small" />)}
                </Box>
            )}
        </>
    );
};

const Timeline: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => {
    return (
        <ol className="timeline container">
            {entries.map(({ item, title, organisation }) => (
                <Reveal as="li" key={item.id} className="timeline__item">
                    <span className="timeline__marker" aria-hidden="true" />
                    <div className="timeline__meta">
                        <div className="timeline__date">{item.duration}</div>
                        <div className="timeline__org">
                            {'website' in item && item.website ? (
                                <a href={item.website} target="_blank" rel="noopener noreferrer">
                                    {organisation} <span aria-hidden="true">↗</span>
                                </a>
                            ) : organisation}
                        </div>
                        <div className="timeline__place">
                            {[item.location, 'contractType' in item && item.contractType].filter(Boolean).join(' · ')}
                        </div>
                    </div>
                    <div>
                        <Typography variant="h3" component="h3">{title}</Typography>
                        <Details item={item} name={organisation} />
                    </div>
                </Reveal>
            ))}
        </ol>
    );
};

const Resume: React.FC<{ experiences: Experience[], educations: Education[] }> = ({ experiences, educations }) => {
    const { t, i18n } = useTranslation('resume');
    const preferred = i18n.language?.startsWith('fr') ? 'fr' : 'en';
    const downloads = preferred === 'fr' ? (['fr', 'en'] as const) : (['en', 'fr'] as const);

    return (
        <>
            <SplitSection
                tight
                sticky={false}
                label={t('header.eyebrow')}
                aside={<SectionHeader level="h1" eyebrow={t('header.eyebrow')} title={t('header.title')} intro={t('header.intro')} />}
            >
                <Reveal from="right">
                    <Card>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Typography variant="overline" component="h2" sx={{ mb: 2.5 }}>{t('profile.title')}</Typography>
                            <dl className="kv-grid">
                                <div><dt>{t('profile.role')}</dt><dd>{t('profile.roleValue')}</dd></div>
                                <div><dt>{t('profile.focus')}</dt><dd>{t('profile.focusValue')}</dd></div>
                                <div><dt>{t('profile.location')}</dt><dd>{t('profile.locationValue')}</dd></div>
                                <div>
                                    <dt>{t('profile.contact')}</dt>
                                    <dd><Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link></dd>
                                </div>
                            </dl>
                            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 4 }}>
                                {downloads.map((lng, i) => (
                                    <Button
                                        key={lng}
                                        variant={i === 0 ? 'contained' : 'outlined'}
                                        href={RESUME_PDF[lng].href}
                                        download={RESUME_PDF[lng].fileName}
                                    >
                                        ↓ {t(`download.${lng}`)}
                                    </Button>
                                ))}
                            </Box>
                            <Link component={RouterLink} to={`/cv/${preferred}`} sx={{ display: 'inline-block', mt: 2, fontSize: 'var(--size-sm)' }}>
                                {t('download.web')} →
                            </Link>
                        </CardContent>
                    </Card>
                </Reveal>
            </SplitSection>

            <section className="section" aria-labelledby="experience-title" style={{ paddingTop: 0 }}>
                <div className="container" style={{ marginBottom: 'var(--space-xl)' }}>
                    <SectionHeader eyebrow={t('experience.eyebrow')} title={<span id="experience-title">{t('experience.title')}</span>} />
                </div>
                <Timeline
                    entries={experiences.map((item) => ({ item, title: item.position, organisation: item.company }))}
                />
            </section>

            <section className="section" aria-labelledby="education-title" style={{ paddingTop: 0 }}>
                <div className="container" style={{ marginBottom: 'var(--space-xl)' }}>
                    <SectionHeader eyebrow={t('education.eyebrow')} title={<span id="education-title">{t('education.title')}</span>} />
                </div>
                <Timeline
                    entries={educations.map((item) => ({ item, title: item.degree, organisation: item.institution }))}
                />
            </section>
        </>
    );
};

export default Resume;
