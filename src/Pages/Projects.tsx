import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { portfolioApi, PortfolioItem } from "../services/portfolioApi";
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Chip,
    Button,
    Link
} from "@mui/material";

const Projects: React.FC = () => {
    const { t } = useTranslation('projects');
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            setIsLoading(true);
            setTerminalOutput([
                t('terminal.scanning'),
                'Connecting to portfolio API...',
                'Fetching live data...'
            ]);

            try {
                const data = await portfolioApi.getAllData();
                setProjects(data.projects);
                setTerminalOutput([
                    t('terminal.scanning'),
                    t('terminal.found', { count: data.projects.length }),
                    'Successfully loaded live data',
                    t('terminal.ready')
                ]);
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
                setTerminalOutput([
                    t('terminal.scanning'),
                    'Warning: Could not fetch live data',
                    t('terminal.ready')
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolioData();
    }, [t]);

    const handleProjectSelect = (project: PortfolioItem) => {
        setSelectedProject(project);
        setTerminalOutput([
            `> cd /projects/${project.name}`,
            `> ls -la`,
            t('terminal.loadingProject', { name: project.name }),
            `${t('meta.type')} ${project.type}`,
            // eslint-disable-next-line
            `${t('meta.gitStatus')} ${t(`status.${project.status?.toLowerCase()}` as any)}`,
            `${t('meta.lang')} ${project.language}`,
            t('terminal.readyInspection')
        ]);

        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'active': return '#00CC34'; // Highlight Hover
            case 'completed': return '#00FF41'; // Highlight
            case 'archived': return '#B7B7B7'; // Neutral
            default: return '#00FF41';
        }
    };

    const isUrl = (text: string) => {
        try {
            new URL(text);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
            return false;
        }
    }

    return (
        <Box>
            {/* Header */}
            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('header.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 1 }}>{t('header.command')}{projects.length}</Typography>
                    <Box>
                        {terminalOutput.map((line, index) => (
                            <Typography key={index} variant="body1">&gt; {line}</Typography>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Selected Project Details */}
            {selectedProject && (
                <Card sx={{ mb: 4, borderColor: 'primary.main', borderWidth: 1 }}>
                    <CardHeader 
                        title={`${t('details.title')} - ${selectedProject.name?.toUpperCase()}`} 
                        action={
                            <Button 
                                color="inherit" 
                                onClick={() => setSelectedProject(null)}
                                sx={{ minWidth: 'auto', px: 2, fontSize: '1.2rem', fontWeight: 'bold' }}
                            >
                                ×
                            </Button>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography className="terminal-prompt" sx={{ mb: 2 }}>{t('details.info.command')}</Typography>
                                {selectedProject.images && selectedProject.images.length > 0 && (
                                    <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mb: 3, pb: 1 }}>
                                        {selectedProject.images.map((img, imgIndex) => (
                                            <Box 
                                                component="img"
                                                key={imgIndex}
                                                src={img.url} 
                                                alt={`${selectedProject.name} ${imgIndex + 1}`} 
                                                sx={{ 
                                                    maxHeight: '300px', 
                                                    maxWidth: '90%',
                                                    objectFit: 'contain',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    flexShrink: 0
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                )}
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('details.info.description')}</Typography>
                                <Typography sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>{selectedProject.description}</Typography>
                                
                                {selectedProject.links && selectedProject.links.length > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Associated Links:</Typography>
                                        <Box component="ul" sx={{ mt: 0.5, pl: 3 }}>
                                            {selectedProject.links.map((link, index) => (
                                                <Box component="li" key={index}>
                                                    <Link href={link.url} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                                        {link.url}
                                                    </Link>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                <Box sx={{ mb: 3 }}>
                                    <Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Explore the code: </Typography>
                                    {selectedProject.dataSource ? (
                                        isUrl(selectedProject.dataSource) ? (
                                            <Link href={selectedProject.dataSource} target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                                {selectedProject.dataSource}
                                            </Link>
                                        ) : (
                                            <Typography component="span">{selectedProject.dataSource}</Typography>
                                        )
                                    ) : (
                                        <Typography component="span">none</Typography>
                                    )}
                                </Box>

                                {selectedProject.additionalInfo && Object.keys(selectedProject.additionalInfo).length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        {Object.entries(selectedProject.additionalInfo).map(([key, value], index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography component="span" sx={{ fontWeight: 'bold' }}>{key}:</Typography>
                                                {Array.isArray(value) ? (
                                                    <Box component="ul" sx={{ mt: 0.5, pl: 3 }}>
                                                        {value.map((item, itemIndex) => (
                                                            <Box component="li" key={itemIndex}>
                                                                <Typography component="span">{item}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                ) : (
                                                    <Typography component="span" sx={{ whiteSpace: 'pre-wrap' }}> {value}</Typography>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Grid>

                            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography className="terminal-prompt" sx={{ mt: 1, mb: 2 }}>{t('details.stack.command')}</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {selectedProject.technologies.map((tech, index) => (
                                            <Chip key={index} label={tech} variant="outlined" />
                                        ))}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* Project Grid */}
            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('listing.title')} />
                <CardContent>
                    {isLoading ? (
                        <Typography>Loading projects...</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {projects.map((project, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card 
                                        variant="outlined" 
                                        sx={{ 
                                            height: '100%', 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'rgba(0, 255, 65, 0.05)'
                                            }
                                        }}
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        <CardHeader 
                                            title={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Box 
                                                        sx={{ 
                                                            width: 10, 
                                                            height: 10, 
                                                            bgcolor: getStatusColor(project.status),
                                                            borderRadius: '50%' 
                                                        }} 
                                                    />
                                                    <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{project.name}</Typography>
                                                </Box>
                                            } 
                                        />
                                        <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                                            <Typography className="terminal-prompt" variant="body2" sx={{ mb: 1.5 }}>
                                                {/* eslint-disable-next-line */}
                                                {t('meta.gitStatus')} {t(`status.${project.status?.toLowerCase()}` as any)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                <strong>{t('meta.type')}</strong> {project.type}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 2 }}>
                                                <strong>{t('meta.lang')}</strong> {project.language}
                                            </Typography>
                                            {project.technologies && project.technologies.length > 0 && (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                        <Chip key={techIndex} label={tech} size="small" variant="outlined" />
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <Typography variant="caption" sx={{ alignSelf: 'center', ml: 0.5 }}>
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
                    )}
                </CardContent>
            </Card>

            {/* Group Projects Section */}
            <Card sx={{ mb: 4 }}>
                <CardHeader title={t('organizations.title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 3 }}>{t('organizations.command')}</Typography>
                    
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>📦 {t('organizations.personal.title')}</Typography>
                        <Typography sx={{ mt: 0.5 }}>{t('organizations.personal.description')}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>🏢 ASM Studios</Typography>
                        <Typography sx={{ mt: 0.5 }}>{t('organizations.asm.description')}</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link href="https://github.com/ASM-Studios/" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                → github.com/ASM-Studios
                            </Link>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>🤖 Sentience Robotics</Typography>
                        <Typography sx={{ mt: 0.5 }}>{t('organizations.sentience.description')}</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link href="https://github.com/Sentience-Robotics" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">
                                → github.com/Sentience-Robotics
                            </Link>
                        </Box>
                    </Box>

                    <Typography className="terminal-prompt">{t('organizations.stats')}</Typography>
                </CardContent>
            </Card>

            {/* Footer */}
            <Typography align="center" sx={{ mt: 4 }}>
                <span className="blinking-cursor">{t('footer.select')}</span>
            </Typography>
        </Box>
    );
};

export default Projects;