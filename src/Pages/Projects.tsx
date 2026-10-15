import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Card, CardContent, Chip, Link, Typography } from "@mui/material";
import type { Project } from "../data/types";
import { Reveal } from "../Components/Motion/Reveal";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { LUCY_LINKS } from "../data/contact.data";
import { colors } from "../theme/theme.const";
import "./Pages.css";

const isUrl = (text?: string): text is string => {
    if (!text) return false;
    try {
        new URL(text);
        return true;
    } catch {
        return false;
    }
};

const statusKey = (project: Project) => project.status?.toLowerCase() || 'active';

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Box sx={{ mt: 4 }}>
        <Typography variant="overline" component="h3" sx={{ mb: 1.5 }}>{title}</Typography>
        {children}
    </Box>
);

const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => {
    const { t } = useTranslation('projects');
    const repoUrl = project.repository;
    const highlights = project.highlights;

    return (
        <Card component="article" aria-labelledby="project-title">
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip label={t(`status.${statusKey(project)}` as never)} color="primary" size="small" />
                    {project.type && <Chip label={project.type} variant="outlined" size="small" />}
                </Box>
                <Typography id="project-title" variant="h2" component="h2">{project.name}</Typography>
                {project.stack && (
                    <Typography className="muted" sx={{ mt: 1, fontSize: 'var(--size-sm)' }}>{project.stack}</Typography>
                )}

                {(isUrl(repoUrl) || isUrl(project.demo)) && (
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 3 }}>
                        {isUrl(repoUrl) && (
                            <Button variant="contained" href={repoUrl} target="_blank" rel="noopener noreferrer">
                                {t('details.repository')} ↗
                            </Button>
                        )}
                        {isUrl(project.demo) && (
                            <Button variant="outlined" href={project.demo} target="_blank" rel="noopener noreferrer">
                                {t('details.demo')} ↗
                            </Button>
                        )}
                    </Box>
                )}

                {project.images && project.images.length > 0 && (
                    <div className="gallery" role="region" aria-label={t('details.images', { name: project.name })}>
                        {project.images.map((img, i) => (
                            <img key={i} src={img.url} alt={img.alt || t('details.screenshot', { index: i + 1, name: project.name })} />
                        ))}
                    </div>
                )}

                {project.description && (
                    <Block title={t('details.overview')}>
                        <Typography sx={{ whiteSpace: 'pre-line' }}>{project.description}</Typography>
                    </Block>
                )}

                {highlights && highlights.length > 0 && (
                    <Block title={t('details.highlights')}>
                        <ul className="dash-list">
                            {highlights.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </Block>
                )}

                {project.facts && Object.keys(project.facts).length > 0 && (
                    <Block title={t('details.info')}>
                        <dl className="kv-grid">
                            {Object.entries(project.facts).map(([key, value]) => (
                                <div key={key}>
                                    <dt>{key}</dt>
                                    <dd>{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Block>
                )}

                {project.links && project.links.length > 0 && (
                    <Block title={t('details.links')}>
                        <ul className="dash-list">
                            {project.links.map((link) => (
                                <li key={link.url}>
                                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.label} ↗
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Block>
                )}

                {project.technologies && project.technologies.length > 0 && (
                    <Block title={t('details.stack')}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="list">
                            {project.technologies.map((tech) => (
                                <Chip role="listitem" key={tech} label={tech} variant="outlined" />
                            ))}
                        </Box>
                    </Block>
                )}
            </CardContent>
        </Card>
    );
};

const Organizations: React.FC = () => {
    const { t } = useTranslation('projects');

    return (
        <SplitSection
            label={t('organizations.eyebrow')}
            aside={
                <SectionHeader
                    eyebrow={t('organizations.eyebrow')}
                    title={t('organizations.title')}
                    intro={t('organizations.intro')}
                >
                    <Typography variant="caption" component="p" sx={{ mt: 3 }}>{t('organizations.stats')}</Typography>
                </SectionHeader>
            }
        >
            <div className="stack">
                <Reveal from="right">
                    <Card sx={{ '--chamfer-border': colors.lineStrong }}>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Typography variant="h3">{t('organizations.lucyRobotics.title')}</Typography>
                            <Typography sx={{ mt: 2 }}>{t('organizations.lucyRobotics.p1')}</Typography>
                            <Typography className="muted" sx={{ mt: 1.5 }}>{t('organizations.lucyRobotics.p2')}</Typography>

                            <Block title={t('organizations.lucyRobotics.pillars')}>
                                <ul className="dash-list">
                                    <li>
                                        <Link href="https://github.com/Lucy-Robotics/lucy_ws" target="_blank" rel="noopener noreferrer">
                                            {t('organizations.lucyRobotics.lucy')} ↗
                                        </Link>
                                        <Typography className="muted" sx={{ fontSize: 'var(--size-sm)' }}>{t('organizations.lucyRobotics.lucyDesc')}</Typography>
                                    </li>
                                    <li>
                                        <Link href="https://github.com/Lucy-Robotics/HuRI" target="_blank" rel="noopener noreferrer">
                                            {t('organizations.lucyRobotics.huri')} ↗
                                        </Link>
                                        <Typography className="muted" sx={{ fontSize: 'var(--size-sm)' }}>{t('organizations.lucyRobotics.huriDesc')}</Typography>
                                    </li>
                                </ul>
                            </Block>

                            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 4 }}>
                                <Button variant="contained" href={LUCY_LINKS.site} target="_blank" rel="noopener noreferrer">
                                    {t('organizations.lucyRobotics.website')} ↗
                                </Button>
                                <Button variant="outlined" href={LUCY_LINKS.github} target="_blank" rel="noopener noreferrer">
                                    {t('organizations.lucyRobotics.github')} ↗
                                </Button>
                                <Button variant="outlined" href={LUCY_LINKS.discord} target="_blank" rel="noopener noreferrer">
                                    {t('organizations.lucyRobotics.discord')} ↗
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Reveal>

                <Reveal from="right" delay={0.1}>
                    <Card>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Typography variant="h4" component="h3">{t('organizations.asm.title')}</Typography>
                            <Typography className="muted" sx={{ mt: 1.5 }}>{t('organizations.asm.description')}</Typography>
                            <Link href="https://github.com/ASM-Studios/" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-block', mt: 2 }}>
                                {t('organizations.asm.link')} ↗
                            </Link>
                        </CardContent>
                    </Card>
                </Reveal>

                <Reveal from="right" delay={0.2}>
                    <Card>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Typography variant="h4" component="h3">{t('organizations.personal.title')}</Typography>
                            <Typography className="muted" sx={{ mt: 1.5 }}>{t('organizations.personal.description')}</Typography>
                        </CardContent>
                    </Card>
                </Reveal>
            </div>
        </SplitSection>
    );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const location = useLocation();
    const { t } = useTranslation('projects');
    const detailsRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | undefined>(
        () => location.state?.selectedProjectId || projects?.[0]?.id
    );
    const selected = projects?.find((p) => p.id === selectedId) || projects?.[0];

    useEffect(() => {
        if (location.state?.selectedProjectId) setSelectedId(location.state.selectedProjectId);
    }, [location.state]);

    const select = (id: string) => {
        setSelectedId(id);
        // Desktop: back to the top of the page. Mobile: the details sit below the list, so jump to them.
        if (window.matchMedia('(max-width: 900px)').matches) {
            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="section section--tight" aria-labelledby="projects-title">
                <div className="container">
                    <SectionHeader
                        level="h1"
                        eyebrow={t('header.eyebrow')}
                        title={<span id="projects-title">{t('header.title')}</span>}
                        intro={t('header.intro')}
                    />
                </div>

                <div className="container split" style={{ marginTop: 'var(--space-xxl)' }}>
                    <nav className="split__sticky" aria-label={t('list.label')}>
                        <Typography variant="caption" component="p" sx={{ mb: 1.5 }}>
                            {t('list.count', { count: projects?.length || 0 })}
                        </Typography>
                        <ul className="project-list">
                            {projects?.map((project) => {
                                const active = project.id === selected?.id;
                                return (
                                    <li key={project.id}>
                                        <button
                                            type="button"
                                            className={`project-list__item ${active ? 'is-active' : ''}`}
                                            aria-current={active ? 'true' : undefined}
                                            onClick={() => select(project.id)}
                                        >
                                            <span className={`status-dot status-dot--${statusKey(project)}`} aria-hidden="true" />
                                            <span className="project-list__name">{project.name}</span>
                                            <span className="project-list__type">{project.type}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div ref={detailsRef} style={{ scrollMarginTop: 'calc(var(--layout-nav-height) + 16px)' }}>
                        {/* re-mounted per project so the CSS entrance replays */}
                        {selected && (
                            <div key={selected.id} className="swap-in">
                                <ProjectDetails project={selected} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Organizations />
        </>
    );
};

export default Projects;
