import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

interface Project {
    name: string;
    type: string;
    status: 'active' | 'completed' | 'archived';
    language: string;
    description: string;
    technologies: string[];
    repository: string;
    demo?: string;
    fileCount: number;
    lastCommit: string;
}

const Projects: React.FC = () => {
    const { t } = useTranslation('projects');
    const { t: tData } = useTranslation('data');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projectsData = tData('projects', { returnObjects: true }) as any[];
    const projects: Project[] = projectsData || [];

    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        t('terminal.scanning'),
        t('terminal.found', { count: projects.length }),
        t('terminal.loading'),
        t('terminal.ready')
    ]);

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setTerminalOutput([
            `> cd /projects/${project.name}`,
            `> ls -la`,
            t('terminal.loadingProject', { name: project.name }),
            `${t('meta.type')} ${project.type}`,
            `${t('meta.gitStatus')} ${t(`status.${project.status.toLowerCase()}` as any)}`,
            `${t('meta.lang')} ${project.language}`,
            `${t('meta.files')} ${project.fileCount}`,
            `${t('meta.last')} ${project.lastCommit}`,
            t('terminal.readyInspection')
        ]);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'var(--terminal-bright-green)';
            case 'completed': return 'var(--terminal-green)';
            case 'archived': return 'var(--terminal-gray)';
            default: return 'var(--terminal-green)';
        }
    };

    const getFileTree = (project: Project) => {
        return `
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── main.${project.language === 'TypeScript' ? 'tsx' : project.language === 'Python' ? 'py' : 'js'}
├── public/
├── tests/
├── docs/
├── package.json
├── README.md
└── .gitignore
        `;
    };

    return (
        <div className="terminal-crt terminal-scanlines">
            {/* Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('header.title')}
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="computer" size="medium" />
                    <div className="terminal-prompt">{t('header.command')}</div>
                    <div className="terminal-text">
                        {terminalOutput.map((line, index) => (
                            <div key={index}>&gt; {line}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Grid */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('listing.title')}
                </div>
                <div className="terminal-section-content">
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
                                        {t('meta.gitStatus')} {t(`status.${project.status.toLowerCase()}` as any)}
                                    </div>
                                    <div className="terminal-text">
                                        <strong>{t('meta.type')}</strong> {project.type}<br/>
                                        <strong>{t('meta.lang')}</strong> {project.language}<br/>
                                        <strong>{t('meta.files')}</strong> {project.fileCount}<br/>
                                        <strong>{t('meta.last')}</strong> {project.lastCommit}
                                    </div>
                                </div>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Project Details */}
            {selectedProject && (
                <div className="terminal-section">
                    <div className="terminal-section-header">
                        {t('details.title')} - {selectedProject.name.toUpperCase()}
                    </div>
                    <div className="terminal-section-content">
                        <div className="terminal-grid">
                            <div className="terminal-card">
                                <div className="terminal-card-header">{t('details.info.title')}</div>
                                <div className="terminal-prompt">{t('details.info.command')}</div>
                                <div className="terminal-text">
                                    <strong>{t('details.info.description')}</strong><br/>
                                    {selectedProject.description}
                                    <br/><br/>
                                    <strong>{t('details.info.repository')}</strong><br/>
                                    <a href={selectedProject.repository}
                                       className="terminal-link"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        {selectedProject.repository}
                                    </a>
                                    {selectedProject.demo && (
                                        <>
                                            <br/><br/>
                                            <strong>{t('details.info.demo')}</strong><br/>
                                            <a href={selectedProject.demo}
                                               className="terminal-link"
                                               target="_blank"
                                               rel="noopener noreferrer">
                                                {selectedProject.demo}
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="terminal-card">
                                <div className="terminal-card-header">{t('details.structure.title')}</div>
                                <div className="terminal-prompt">{t('details.structure.command')}</div>
                                <pre className="terminal-text file-tree">
                                    {getFileTree(selectedProject)}
                                </pre>
                            </div>
                        </div>

                        <div className="terminal-card" style={{ marginTop: '20px' }}>
                            <div className="terminal-card-header">{t('details.stack.title')}</div>
                            <div className="terminal-prompt">{t('details.stack.command')}</div>
                            <div className="tech-grid">
                                {selectedProject.technologies.map((tech, index) => (
                                    <div key={index} className="tech-item">
                                        <span className="status-indicator"></span>
                                        <span className="terminal-command">{tech}</span>
                                        <span className="skill-status">{t('meta.installed')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.select')}</span>
            </div>
        </div>
    );
};

export default Projects;
