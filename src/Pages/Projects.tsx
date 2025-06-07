import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ASCIIArt from "../Components/ASCII/ASCIIArt";
import { githubApi, FileTreeItem } from "../services/githubApi";

interface Project {
    name: string;
    type: string;
    status: 'active' | 'completed' | 'archived';
    language: string;
    description: string;
    technologies: string[];
    repository: string;
    demo?: string;
    fileCount?: number;
    lastCommit?: string;
    stars?: number;
    forks?: number;
    fileStructure?: FileTreeItem[];
}

const Projects: React.FC = () => {
    const { t } = useTranslation('projects');
    const { t: tData } = useTranslation('data');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const projectsData = tData('projects', { returnObjects: true }) as any[];
    const initialProjects: Project[] = projectsData || [];

    // const [terminalOutput, setTerminalOutput] = useState<string[]>([
    //     t('terminal.scanning'),
    //     t('terminal.found', { count: initialProjects.length }),
    //     t('terminal.loading'),
    //     t('terminal.ready')
    // ]);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    useEffect(() => {
        const fetchGitHubData = async () => {
            setTerminalOutput([]);
            setIsLoading(false);
            setProjects(initialProjects.map(p => ({ ...p, fileCount: 0, lastCommit: 'Unknown', fileStructure: [] })));
            return; // API is disabled for now

            setIsLoading(true);
            setTerminalOutput([
                t('terminal.scanning'),
                t('terminal.found', { count: initialProjects.length }),
                'Testing GitHub authentication...',
                'Please wait while we gather repository statistics...'
            ]);

            try {
                const authTest = await githubApi.testAuthentication();
                console.log('GitHub Authentication Test:', authTest);

                setTerminalOutput([
                    t('terminal.scanning'),
                    t('terminal.found', { count: initialProjects.length }),
                    `GitHub API: ${authTest.authenticated ? 'Authenticated' : 'Unauthenticated'} (${authTest.rateLimit.remaining}/${authTest.rateLimit.limit} requests)`,
                    authTest.user ? `Authenticated as: ${authTest.user}` : 'Using public access',
                    'Fetching live data from GitHub repositories...'
                ]);

                const repoUrls = initialProjects.map(p => p.repository);
                const githubInfo = await githubApi.getMultipleRepoInfo(repoUrls);

                const updatedProjects = initialProjects.map(project => ({
                    ...project,
                    fileCount: githubInfo[project.repository]?.fileCount || 0,
                    lastCommit: githubInfo[project.repository]?.lastCommit || 'Unknown',
                    stars: githubInfo[project.repository]?.stars || 0,
                    forks: githubInfo[project.repository]?.forks || 0,
                    fileStructure: githubInfo[project.repository]?.fileStructure || []
                }));

                setProjects(updatedProjects);
                setTerminalOutput([
                    t('terminal.scanning'),
                    t('terminal.found', { count: updatedProjects.length }),
                    'Successfully loaded live GitHub data',
                    t('terminal.ready')
                ]);
            } catch (error) {
                console.error('Failed to fetch GitHub data:', error);
                setProjects(initialProjects.map(p => ({ ...p, fileCount: 0, lastCommit: 'Unknown', fileStructure: [] })));
                setTerminalOutput([
                    t('terminal.scanning'),
                    t('terminal.found', { count: initialProjects.length }),
                    'Warning: Could not fetch live GitHub data',
                    t('terminal.ready')
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        if (initialProjects.length > 0) {
            fetchGitHubData();
        }
    }, [initialProjects.length, t]);

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setTerminalOutput([
            `> cd /projects/${project.name}`,
            `> ls -la`,
            t('terminal.loadingProject', { name: project.name }),
            `${t('meta.type')} ${project.type}`,
            `${t('meta.gitStatus')} ${t(`status.${project.status.toLowerCase()}` as any)}`,
            `${t('meta.lang')} ${project.language}`,
                                                `${t('meta.files')} ${project.fileCount || 0}`,
                                    `${t('meta.last')} ${project.lastCommit || 'Unknown'}`,
                                    ...(project.stars ? [`⭐ Stars: ${project.stars}`] : []),
            t('terminal.readyInspection')
        ]);

        // Scroll to top on mobile when project is selected
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'var(--terminal-bright-green)';
            case 'completed': return 'var(--terminal-green)';
            case 'archived': return 'var(--terminal-gray)';
            default: return 'var(--terminal-green)';
        }
    };

    const renderFileTree = (items: FileTreeItem[], depth: number = 0): string => {
        if (!items || items.length === 0) {
            return depth === 0 ? "No file structure available" : "";
        }

        let result = "";
        items.forEach((item, index) => {
            const isLast = index === items.length - 1;
            const prefix = depth === 0 ?
                (isLast ? "└── " : "├── ") :
                "│   ".repeat(depth) + (isLast ? "└── " : "├── ");

            const icon = item.type === 'dir' ? '📁' : '📄';
            result += `${prefix}${icon} ${item.name}\n`;

            // Render children if it's a directory and has children
            if (item.type === 'dir' && item.children && item.children.length > 0) {
                const childPrefix = depth === 0 ?
                    (isLast ? "    " : "│   ") :
                    "│   ".repeat(depth + 1);

                item.children.forEach((child, childIndex) => {
                    const isLastChild = childIndex === item.children!.length - 1;
                    const childIcon = child.type === 'dir' ? '📁' : '📄';
                    result += `${childPrefix}${isLastChild ? "└── " : "├── "}${childIcon} ${child.name}\n`;
                });
            }
        });

        return result;
    };

    const hasValidFileStructure = (project: Project): boolean => {
        return !!(project.fileStructure &&
                 project.fileStructure.length > 0 &&
                 project.fileStructure.some(item => item.name && item.name.trim() !== ''));
    };

    const getFileTree = (project: Project) => {
        if (hasValidFileStructure(project)) {
            return renderFileTree(project.fileStructure!);
        }

        // Return empty string if no data - this should not be called anyway due to conditional rendering
        return "";
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

            {/* Selected Project Details - Mobile Focus Zone */}
            {selectedProject && (
                <div className="terminal-section mobile-focus-zone">
                    <div className="terminal-section-header">
                        <span className="mobile-close-btn" onClick={() => setSelectedProject(null)}>×</span>
                        {t('details.title')} - {selectedProject.name.toUpperCase()}
                    </div>
                    <div className="terminal-section-content">
                        <div className="terminal-grid">
                            <div className="terminal-card">
                                <div className="terminal-card-header">{t('details.info.title')}</div>
                                <div className="terminal-prompt">{t('details.info.command')}</div>
                                <div className="terminal-text mobile-project-description">
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

                            {hasValidFileStructure(selectedProject) && !isLoading && (
                                <div className="terminal-card">
                                    <div className="terminal-card-header">{t('details.structure.title')}</div>
                                    <div className="terminal-prompt">{t('details.structure.command')}</div>
                                    <pre className="terminal-text file-tree">
                                        {getFileTree(selectedProject)}
                                    </pre>
                                </div>
                            )}
                        </div>

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
                    </div>
                </div>
            )}

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
                                    <div className="terminal-text mobile-project-summary">
                                        <strong>{t('meta.type')}</strong> {project.type}<br/>
                                        <strong>{t('meta.lang')}</strong> {project.language}<br/>
                                        <strong>{t('meta.files')}</strong> {isLoading ? '...' : project.fileCount}<br/>
                                        <strong>{t('meta.last')}</strong> {isLoading ? '...' : project.lastCommit}
                                        {project.stars !== undefined && project.stars > 0 && (
                                            <><br/><strong>⭐ Stars:</strong> {project.stars}</>
                                        )}
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
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.select')}</span>
            </div>
        </div>
    );
};

export default Projects;
