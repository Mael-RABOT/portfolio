import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { portfolioApi, PortfolioItem } from "../services/portfolioApi";

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

        // Scroll to top on mobile when project is selected
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'active': return 'var(--terminal-bright-green)';
            case 'completed': return 'var(--terminal-green)';
            case 'archived': return 'var(--terminal-gray)';
            default: return 'var(--terminal-green)';
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
        <div className="terminal-crt terminal-scanlines">
            {/* Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('header.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('header.command')}{projects.length}</div>
                    <div className="terminal-text">
                        {terminalOutput.map((line, index) => (
                            <div key={index}>&gt; {line}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Project Details - Mobile Focus Zone */}
            {selectedProject && (
                <div className="terminal-section mobile-focus-zone">
                    <div className="terminal-section-header">
                        <span className="mobile-close-btn" onClick={() => setSelectedProject(null)}>×</span>
                        {t('details.title')} - {selectedProject.name?.toUpperCase()}
                    </div>
                    <div className="terminal-section-content">
                        <div className="terminal-grid">
                            <div className="terminal-card">
                                <div className="terminal-card-header">{t('details.info.title')}</div>
                                <div className="terminal-prompt">{t('details.info.command')}</div>
                                <div className="terminal-text mobile-project-description">
                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div style={{ 
                                            display: 'flex', 
                                            overflowX: 'auto', 
                                            gap: '15px', 
                                            marginBottom: '15px',
                                            paddingBottom: '5px'
                                        }}>
                                            {selectedProject.images.map((img, imgIndex) => (
                                                <img 
                                                    key={imgIndex}
                                                    src={img.url} 
                                                    alt={`${selectedProject.name} ${imgIndex + 1}`} 
                                                    style={{ 
                                                        maxHeight: '300px', 
                                                        maxWidth: '90%',
                                                        objectFit: 'contain',
                                                        borderRadius: '4px', 
                                                        border: '1px solid var(--terminal-green)',
                                                        flexShrink: 0
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <strong>{t('details.info.description')}</strong><br/>
                                    <span style={{ whiteSpace: 'pre-wrap' }}>{selectedProject.description}</span>
                                    
                                    {selectedProject.links && selectedProject.links.length > 0 && (
                                        <>
                                            <br/><br/>
                                            <strong>Associated Links:</strong><br/>
                                            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                                {selectedProject.links.map((link, index) => (
                                                    <li key={index}>
                                                        <a href={link.url}
                                                           className="terminal-link"
                                                           target="_blank"
                                                           rel="noopener noreferrer">
                                                            {link.url}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    <div style={{ marginTop: '15px' }}>
                                        <strong>Explore the code:</strong>{' '}
                                        {selectedProject.dataSource ? (
                                            isUrl(selectedProject.dataSource) ? (
                                                <a href={selectedProject.dataSource}
                                                   className="terminal-link"
                                                   target="_blank"
                                                   rel="noopener noreferrer">
                                                    {selectedProject.dataSource}
                                                </a>
                                            ) : (
                                                <span>{selectedProject.dataSource}</span>
                                            )
                                        ) : (
                                            "none"
                                        )}
                                    </div>

                                    {selectedProject.additionalInfo && Object.keys(selectedProject.additionalInfo).length > 0 && (
                                        <>
                                            <br/><br/>
                                            {Object.entries(selectedProject.additionalInfo).map(([key, value], index) => (
                                                <div key={index}>
                                                    <strong>{key}:</strong>
                                                    {Array.isArray(value) ? (
                                                        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                                            {value.map((item, itemIndex) => (
                                                                <li key={itemIndex}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span style={{ whiteSpace: 'pre-wrap' }}> {value}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                            <div className="terminal-card" style={{ marginTop: '20px' }}>
                                <div className="terminal-card-header">{t('details.stack.title')}</div>
                                <div className="terminal-prompt">{t('details.stack.command')}</div>
                                <div className="tech-grid">
                                    {selectedProject.technologies.map((tech, index) => (
                                        <div key={index} className="tech-item">
                                            <span className="status-indicator"></span>
                                            <span className="terminal-command">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Project Grid */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('listing.title')}
                </div>
                <div className="terminal-section-content">
                    {isLoading ? (
                        <div className="terminal-text">Loading projects...</div>
                    ) : (
                        <div className="terminal-grid">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="terminal-card command-item"
                                    onClick={() => handleProjectSelect(project)}
                                >
                                    <div className="terminal-card-header">
                                        <span className="status-indicator"
                                              style={{ backgroundColor: getStatusColor(project.status) }}>
                                        </span>
                                        {project.name}
                                    </div>
                                    <div className="project-meta">
                                        <div className="terminal-prompt">
                                            {/* eslint-disable-next-line */}
                                            {t('meta.gitStatus')} {t(`status.${project.status?.toLowerCase()}` as any)}
                                        </div>
                                        <div className="terminal-text mobile-project-summary">
                                            <strong>{t('meta.type')}</strong> {project.type}<br/>
                                            <strong>{t('meta.lang')}</strong> {project.language}<br/>
                                        </div>
                                    </div>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="tech-stack">
                                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                <span key={techIndex} className="terminal-command tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="tech-more">+{project.technologies.length - 3}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Group Projects Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('organizations.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-text">
                        <div className="terminal-prompt">{t('organizations.command')}</div>
                        <br/>
                        <div>
                            <strong>📦 {t('organizations.personal.title')}</strong><br/>
                            {t('organizations.personal.description')}
                        </div>
                        <br/>
                        <div>
                            <strong>🏢 ASM Studios</strong><br/>
                            {t('organizations.asm.description')}<br/>
                            <a href="https://github.com/ASM-Studios/"
                               className="terminal-link"
                               target="_blank"
                               rel="noopener noreferrer">
                                → github.com/ASM-Studios
                            </a>
                        </div>
                        <br/>
                        <div>
                            <strong>🤖 Sentience Robotics</strong><br/>
                            {t('organizations.sentience.description')}<br/>
                            <a href="https://github.com/Sentience-Robotics"
                               className="terminal-link"
                               target="_blank"
                               rel="noopener noreferrer">
                                → github.com/Sentience-Robotics
                            </a>
                        </div>
                        <br/>
                        <div className="terminal-prompt">{t('organizations.stats')}</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.select')}</span>
            </div>
        </div>
    );
};

export default Projects;
