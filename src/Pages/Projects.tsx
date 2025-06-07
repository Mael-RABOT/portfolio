import React, { useState } from "react";
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        "Scanning project repositories...",
        "Found 8 active projects",
        "Loading project metadata...",
        "Ready for project exploration"
    ]);

    const projects: Project[] = [
        {
            name: "terminal-portfolio",
            type: "web-application",
            status: 'active',
            language: "TypeScript",
            description: "A terminal-style portfolio website with matrix effects and TUI design",
            technologies: ["React", "TypeScript", "CSS3", "Canvas API"],
            repository: "https://github.com/dev/terminal-portfolio",
            demo: "https://portfolio.dev",
            fileCount: 47,
            lastCommit: "2h ago"
        },
        {
            name: "microservice-auth",
            type: "backend-service",
            status: 'completed',
            language: "Node.js",
            description: "JWT-based authentication microservice with Redis caching",
            technologies: ["Node.js", "Express", "Redis", "MongoDB", "Docker"],
            repository: "https://github.com/dev/microservice-auth",
            fileCount: 23,
            lastCommit: "1w ago"
        },
        {
            name: "ml-prediction-api",
            type: "api-service",
            status: 'active',
            language: "Python",
            description: "Machine learning API for predictive analytics with FastAPI",
            technologies: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
            repository: "https://github.com/dev/ml-prediction-api",
            fileCount: 31,
            lastCommit: "3d ago"
        },
        {
            name: "blockchain-wallet",
            type: "crypto-application",
            status: 'active',
            language: "Rust",
            description: "Secure cryptocurrency wallet with multi-chain support",
            technologies: ["Rust", "Web3", "Ethereum", "Bitcoin", "WASM"],
            repository: "https://github.com/dev/blockchain-wallet",
            fileCount: 89,
            lastCommit: "5d ago"
        },
        {
            name: "devops-automation",
            type: "automation-script",
            status: 'completed',
            language: "Bash",
            description: "Comprehensive DevOps automation scripts for CI/CD pipelines",
            technologies: ["Bash", "Docker", "Kubernetes", "Jenkins", "AWS"],
            repository: "https://github.com/dev/devops-automation",
            fileCount: 15,
            lastCommit: "2w ago"
        },
        {
            name: "real-time-chat",
            type: "web-application",
            status: 'archived',
            language: "JavaScript",
            description: "Real-time chat application with WebSocket support",
            technologies: ["Socket.io", "Express", "MongoDB", "React"],
            repository: "https://github.com/dev/real-time-chat",
            fileCount: 34,
            lastCommit: "3m ago"
        }
    ];

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        setTerminalOutput([
            `> cd /projects/${project.name}`,
            `> ls -la`,
            `Loading project: ${project.name}...`,
            `Type: ${project.type}`,
            `Status: ${project.status.toUpperCase()}`,
            `Language: ${project.language}`,
            `Files: ${project.fileCount}`,
            `Last commit: ${project.lastCommit}`,
            "Ready for inspection."
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
                    PROJECT REPOSITORY BROWSER - GIT STATUS
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="computer" size="medium" />
                    <div className="terminal-prompt">git log --oneline | head -10</div>
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
                    PROJECT LISTING - ACTIVE REPOSITORIES
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
                                        git status: {project.status.toUpperCase()}
                                    </div>
                                    <div className="terminal-text">
                                        <strong>Type:</strong> {project.type}<br/>
                                        <strong>Lang:</strong> {project.language}<br/>
                                        <strong>Files:</strong> {project.fileCount}<br/>
                                        <strong>Last:</strong> {project.lastCommit}
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
                        PROJECT DETAILS - {selectedProject.name.toUpperCase()}
                    </div>
                    <div className="terminal-section-content">
                        <div className="terminal-grid">
                            <div className="terminal-card">
                                <div className="terminal-card-header">PROJECT INFO</div>
                                <div className="terminal-prompt">cat README.md</div>
                                <div className="terminal-text">
                                    <strong>Description:</strong><br/>
                                    {selectedProject.description}
                                    <br/><br/>
                                    <strong>Repository:</strong><br/>
                                    <a href={selectedProject.repository}
                                       className="terminal-link"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        {selectedProject.repository}
                                    </a>
                                    {selectedProject.demo && (
                                        <>
                                            <br/><br/>
                                            <strong>Live Demo:</strong><br/>
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
                                <div className="terminal-card-header">FILE STRUCTURE</div>
                                <div className="terminal-prompt">tree -L 3</div>
                                <pre className="terminal-text file-tree">
                                    {getFileTree(selectedProject)}
                                </pre>
                            </div>
                        </div>

                        <div className="terminal-card" style={{ marginTop: '20px' }}>
                            <div className="terminal-card-header">TECHNOLOGY STACK</div>
                            <div className="terminal-prompt">npm list --depth=0</div>
                            <div className="tech-grid">
                                {selectedProject.technologies.map((tech, index) => (
                                    <div key={index} className="tech-item">
                                        <span className="status-indicator"></span>
                                        <span className="terminal-command">{tech}</span>
                                        <span className="skill-status">[INSTALLED]</span>
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
                <span className="blinking-cursor">SELECT PROJECT TO EXPLORE</span>
            </div>
        </div>
    );
};

export default Projects;
