import React, { useRef } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Card, CardContent, Chip, Link, Typography } from "@mui/material";
import type { Project } from "../data/types";
import { Reveal } from "../Components/Motion/Reveal";
import { GlitchText } from "../Components/Motion/GlitchText";
import { Carousel } from "../Components/Carousel/Carousel";
import { SectionHeader, SplitSection } from "../Components/Section/Section";
import { LUCY_LINKS } from "../data/contact.data";
import { cssColors } from "../theme/theme.const";
import { useLocalePath } from "../i18n/locale";
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
                <Typography id="project-title" variant="h2" component="h2">
                    {/* details remount per project, so the glitch replays on every switch */}
                    <GlitchText text={project.name} onLoad delay={0.1} />
                </Typography>
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
                    <Carousel
                        items={project.images}
                        label={t('details.images', { name: project.name })}
                        altFor={(index) => t('details.screenshot', { index, name: project.name })}
                    />
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
                    <Card sx={{ '--chamfer-border': cssColors.lineStrong }}>
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

/** Smaller and school projects: one line each, straight to the source */
const Archive: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const { t } = useTranslation('projects');
    if (projects.length === 0) return null;

    return (
        <section className="section section--tight" aria-labelledby="archive-title">
            <div className="container">
                <SectionHeader
                    eyebrow={t('archive.eyebrow')}
                    title={<span id="archive-title">{t('archive.title')}</span>}
                    intro={t('archive.intro')}
                />
                <Reveal>
                    <ul className="archive-list">
                        {projects.map((project) => {
                            const url = isUrl(project.repository) ? project.repository : isUrl(project.demo) ? project.demo : undefined;
                            return (
                                <li key={project.id} className="archive-list__item">
                                    <span className="archive-list__name">{project.name}</span>
                                    <span className="archive-list__desc">{project.description}</span>
                                    <span className="archive-list__stack">{project.stack}</span>
                                    {url && (
                                        <Link
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="archive-list__link"
                                            aria-label={t('archive.sourceLabel', { name: project.name })}
                                        >
                                            {t('archive.source')} ↗
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const { id } = useParams();
    const { t } = useTranslation('projects');
    const lp = useLocalePath();
    const detailsRef = useRef<HTMLDivElement>(null);
    const featured = projects.filter((p) => p.featured);
    const archived = projects.filter((p) => !p.featured);
    // /projects/<id> picks the project; /projects (or an unknown id) shows the first one
    const selected = featured.find((p) => p.id === id) || featured[0];

    // The link itself updates the URL (replace: switching projects doesn't pile up history entries)
    const select = () => {
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
                            {t('list.count', { count: featured.length })}
                        </Typography>
                        <ul className="project-list">
                            {featured.map((project) => {
                                const active = project.id === selected?.id;
                                return (
                                    <li key={project.id}>
                                        <RouterLink
                                            to={lp(`/projects/${project.id}`)}
                                            replace
                                            className={`project-list__item ${active ? 'is-active' : ''}`}
                                            aria-current={active ? 'page' : undefined}
                                            onClick={select}
                                        >
                                            <span className={`status-dot status-dot--${statusKey(project)}`} aria-hidden="true" />
                                            <span className="project-list__name">{project.name}</span>
                                            <span className="project-list__type">{project.type}</span>
                                        </RouterLink>
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

            <Archive projects={archived} />
            <Organizations />
        </>
    );
};

export default Projects;
