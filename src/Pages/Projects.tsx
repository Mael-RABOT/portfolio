import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PortfolioItem } from "../services/portfolioApi";
import { colors } from "../theme/theme.const";
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Chip,
    Button,
    Link,
    Divider
} from "@mui/material";

const Projects: React.FC<{ projects: PortfolioItem[] }> = ({ projects }) => {
    const location = useLocation();
    const { t, i18n } = useTranslation('projects');
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(() => {
        if (location.state?.selectedProjectId) {
            return projects?.find(p => p.id === location.state.selectedProjectId) || null;
        }
        return null;
    });

    useEffect(() => {
        if (location.state?.selectedProjectId) {
            const found = projects?.find(p => p.id === location.state.selectedProjectId);
            if (found) {
                setSelectedProject(found);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [location.state, projects]);

    const handleProjectSelect = (project: PortfolioItem) => {
        setSelectedProject(project);
        // Scroll to top immediately when a project is selected
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return colors.status.active;
            case 'completed': return colors.status.completed;
            case 'archived': return colors.secondary.base;
            default: return colors.status.active;
        }
    };

    const isUrl = (text: string) => {
        try {
            new URL(text);
            return true;
        } catch (_) {
            return false;
        }
    };

    const projectRepoUrl = selectedProject?.repository || selectedProject?.dataSource;
    const isFrench = i18n.language?.startsWith('fr');

    return (
        <Box component="main" aria-label="Projects">
            {/* Selected Project Details */}
            {selectedProject && (
                <Card
                    sx={{
                        mb: 4,
                        borderColor: 'primary.main',
                        borderWidth: 1,
                        bgcolor: 'background.paper'
                    }}
                    component="section"
                    aria-label={`Details of ${selectedProject.name}`}
                >
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                    {selectedProject.name}
                                </Typography>
                                <Chip
                                    label={t(`status.${selectedProject.status?.toLowerCase() || 'active'}` as any)}
                                    size="small"
                                    color="primary"
                                    sx={{ fontWeight: 'bold' }}
                                />
                                {selectedProject.type && (
                                    <Chip
                                        label={selectedProject.type}
                                        size="small"
                                        variant="outlined"
                                    />
                                )}
                                {selectedProject.language && (
                                    <Chip
                                        label={selectedProject.language}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderColor: colors.secondary.border }}
                                    />
                                )}
                            </Box>
                        }
                        action={
                            <Button
                                color="inherit"
                                onClick={() => setSelectedProject(null)}
                                sx={{ minWidth: 'auto', px: 2, fontSize: '1.4rem', fontWeight: 'bold' }}
                                aria-label="Close project details"
                            >
                                ×
                            </Button>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={3}>
                            {/* Images if available */}
                            {selectedProject.images && selectedProject.images.length > 0 && (
                                <Grid item xs={12}>
                                    <Box
                                        sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}
                                        role="region"
                                        aria-label={`Images for ${selectedProject.name}`}
                                    >
                                        {selectedProject.images.map((img, imgIndex) => (
                                            <Box
                                                component="img"
                                                key={imgIndex}
                                                src={img.url}
                                                alt={`Screenshot ${imgIndex + 1} of project ${selectedProject.name}`}
                                                sx={{
                                                    maxHeight: '320px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    flexShrink: 0
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>
                            )}

                            {/* Description & Overview */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ color: 'secondary.text', mb: 1, letterSpacing: '1px' }}>
                                    OVERVIEW // DESCRIPTION
                                </Typography>
                                <Typography sx={{ whiteSpace: 'pre-wrap', mb: 3, lineHeight: 1.7, fontSize: 'var(--font-size-md)' }}>
                                    {selectedProject.description}
                                </Typography>

                                {/* Action Buttons: Repository & Demo */}
                                <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, mb: 3 }}>
                                    {projectRepoUrl && isUrl(projectRepoUrl) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="a"
                                            href={projectRepoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Open source code repository for ${selectedProject.name}`}
                                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                                        >
                                            View Source Repository →
                                        </Button>
                                    )}
                                    {selectedProject.demo && isUrl(selectedProject.demo) && (
                                        <Button
                                            variant="outlined"
                                            component="a"
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Open live demo for ${selectedProject.name}`}
                                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                                        >
                                            Launch Live Demo ↗
                                        </Button>
                                    )}
                                </Box>

                                {/* Associated External Links */}
                                {selectedProject.links && selectedProject.links.length > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'secondary.text', mb: 1 }}>
                                            ASSOCIATED LINKS
                                        </Typography>
                                        <Box component="ul" sx={{ m: 0, pl: 3 }}>
                                            {selectedProject.links.map((link, index) => (
                                                <Box component="li" key={index} sx={{ mb: 0.5 }}>
                                                    <Link href={link.url} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                                        {link.item ? <strong>{link.item}: </strong> : null}
                                                        {link.url} ↗
                                                    </Link>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Key Features / Responsibilities */}
                                {(selectedProject.responsibilities || selectedProject.bullets) && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'secondary.text', mb: 1 }}>
                                            KEY HIGHLIGHTS & ARCHITECTURE
                                        </Typography>
                                        <Box component="ul" sx={{ m: 0, pl: 3 }}>
                                            {(selectedProject.responsibilities || selectedProject.bullets)?.map((bullet, idx) => (
                                                <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                                                    <Typography variant="body2">{bullet}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Additional Info Key/Values */}
                                {selectedProject.additionalInfo && Object.keys(selectedProject.additionalInfo).length > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ color: 'secondary.text', mb: 1 }}>
                                            SYSTEM METADATA
                                        </Typography>
                                        <Grid container spacing={1}>
                                            {Object.entries(selectedProject.additionalInfo).map(([key, value], idx) => (
                                                <Grid item xs={12} sm={6} key={idx}>
                                                    <Box sx={{ p: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                                                        <Typography variant="caption" sx={{ color: 'secondary.text', display: 'block' }}>
                                                            {key.toUpperCase()}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {Array.isArray(value) ? value.join(', ') : String(value)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}
                            </Grid>

                            {/* Tech Stack */}
                            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                                <Grid item xs={12}>
                                    <Divider sx={{ mb: 2, borderColor: 'divider' }} />
                                    <Typography variant="subtitle2" sx={{ color: 'secondary.text', mb: 1.5 }}>
                                        {t('details.stack.title') || 'TECHNOLOGY STACK'}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="list" aria-label="Technologies used">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <Chip
                                                role="listitem"
                                                key={index}
                                                label={tech}
                                                variant="outlined"
                                                sx={{
                                                    borderColor: colors.secondary.border,
                                                    color: 'text.primary',
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* Project Grid */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Projects List">
                <CardHeader title={t('listing.title')} />
                <CardContent>
                    <Grid container spacing={2}>
                        {projects?.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    variant="outlined"
                                    component="button"
                                    aria-label={`View details for ${project.name}`}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        textAlign: 'left',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: 'rgba(0, 255, 65, 0.05)'
                                        },
                                        '&:focus-visible': {
                                            outline: `2px solid ${colors.highlight.base}`,
                                            outlineOffset: '2px'
                                        }
                                    }}
                                    onClick={() => handleProjectSelect(project)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleProjectSelect(project);
                                        }
                                    }}
                                >
                                    <CardHeader
                                        title={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Box
                                                    aria-hidden="true"
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: getStatusColor(project.status),
                                                        borderRadius: '50%',
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                                                    {project.name}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                                        <br />
                                        <Typography className="terminal-prompt" variant="body2" sx={{ mb: 1.5 }}>
                                            <span aria-hidden="true">{t('meta.gitStatus')}</span> <span className="sr-only">Status:</span> {t(`status.${project.status?.toLowerCase() || 'active'}` as any)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                                            <strong>{t('meta.type')}</strong> {project.type}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            <strong>{t('meta.lang')}</strong> {project.language}
                                        </Typography>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} aria-label="Key technologies">
                                                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                    <Chip key={techIndex} label={tech} size="small" variant="outlined" />
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <Typography variant="caption" sx={{ alignSelf: 'center', ml: 0.5, color: 'text.secondary' }}>
                                                        +{project.technologies.length - 3}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {/* Organizations & Group Projects */}
            <Card sx={{ mb: 4 }} component="section" aria-label="Organizations">
                <CardHeader title={t('organizations.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 3 }} aria-hidden="true">
                        ls /organizations/
                    </Typography>

                    {/* Personal */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            📦 {t('organizations.personal.title')}
                        </Typography>
                        <Typography sx={{ mt: 0.5 }}>
                            {t('organizations.personal.description')}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3, borderColor: 'divider' }} />

                    {/* ASM Studios */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            🏢 ASM Studios
                        </Typography>
                        <Typography sx={{ mt: 0.5 }}>
                            {t('organizations.asm.description')}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link
                                href="https://github.com/ASM-Studios/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary"
                                underline="hover"
                                aria-label="Visit ASM Studios on GitHub"
                            >
                                → github.com/ASM-Studios
                            </Link>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3, borderColor: 'divider' }} />

                    {/* Sentience Robotics */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            🤖 Sentience Robotics
                        </Typography>

                        {isFrench ? (
                            <Box sx={{ mt: 1 }}>
                                <Typography sx={{ mb: 1.5, lineHeight: 1.7 }}>
                                    Notre suite logicielle simplifie l'intégration et le prototypage en robotique. Nous rendons possible en quelques clics la connexion de n'importe quel robot à une application web, une IA, ou tout autre interface.
                                </Typography>
                                <Typography sx={{ mb: 1.5, lineHeight: 1.7 }}>
                                    Fondamentalement open source, la force principale de notre projet est la communauté de passionné·e·s du monde de la robotique.
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 1 }}>
                                <Typography sx={{ mb: 1.5, lineHeight: 1.7 }}>
                                    An open-source initiative dedicated to developing a modular, full-stack framework for humanoid interaction and control. Our mission is to bridge the gap between high-level AI-driven cognition and robust, real-time hardware execution. While primary development thrives on the InMoov platform, our architecture serves as a universal &quot;brain and nervous system&quot; adaptable to any humanoid hardware.
                                </Typography>
                            </Box>
                        )}

                        {/* Core Pillars */}
                        <Box sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', my: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1 }}>
                                CORE PILLARS & REPOSITORIES:
                            </Typography>
                            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                                <Box component="li" sx={{ mb: 1 }}>
                                    <Link href="https://github.com/Sentience-Robotics/lucy_ws" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                        <strong>LUCY | The Platform Bridge</strong>
                                    </Link>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.2 }}>
                                        ROS 2-based interface layer with C++ core and ros2_control to seamlessly command actuators from web clients or AI.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Link href="https://github.com/Sentience-Robotics/HuRI" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                        <strong>HuRI | Human-Robot Interaction</strong>
                                    </Link>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.2 }}>
                                        AI framework focusing on Speech-to-Speech (S2S), multi-layer cognitive memory, and kinematic grounding.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                component="a"
                                href="https://github.com/Sentience-Robotics"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit Sentience Robotics on GitHub"
                            >
                                Sentience GitHub →
                            </Button>
                            <Button
                                variant="outlined"
                                component="a"
                                href="https://discord.gg/g4KNZ3eeBd"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Join Sentience Robotics Discord Community"
                                sx={{
                                    borderColor: colors.secondary.border,
                                    color: colors.text.primary,
                                }}
                            >
                                Join Discord Community 💬
                            </Button>
                        </Box>
                    </Box>

                    <Typography className="terminal-prompt" sx={{ mt: 3 }} aria-hidden="true">
                        Total: 3 GitHub organizations | 30+ repositories | 50+ contributors
                    </Typography>
                </CardContent>
            </Card>

            {/* Standby cue */}
            <Typography align="center" sx={{ mt: 4 }} aria-hidden="true">
                <span className="blinking-cursor">{t('footer.select')}</span>
            </Typography>
        </Box>
    );
};

export default Projects;
