import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

interface SkillCategory {
    title: string;
    skills: string[];
    command: string;
}

const Home: React.FC = () => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [systemReady, setSystemReady] = useState<boolean>(false);
    const [displayText, setDisplayText] = useState<string>("");
    const [uptime, setUptime] = useState<string>("");

    const fullIntroText = [
        t('banner.initializing'),
        t('banner.loadingUserData'),
        t('banner.securingConnection'),
        t('banner.ready')
    ].filter(Boolean).join('\n') + '\n';

    // Simulate system boot
    useEffect(() => {
        const timer = setTimeout(() => {
            setSystemReady(true);
        }, 1500);

        const progressTimer = setInterval(() => {
                    setLoadingProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressTimer);
                return 100;
            }
            return Math.min(100, prev + Math.random() * 15);
        });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, []);

        // Typing effect for intro text
    useEffect(() => {
        if (systemReady && fullIntroText) {
            // Clear existing text immediately
            setDisplayText('');

            let i = 0;
            let isCancelled = false;

            const typeText = () => {
                if (isCancelled) return;

                if (i < fullIntroText.length) {
                    const newText = fullIntroText.substring(0, i + 1);
                    setDisplayText(newText);
                    i++;
                    setTimeout(typeText, 50);
                } else {
                    // Typing complete, ensure final text is set correctly
                    setDisplayText(fullIntroText);
                }
            };

            // Start typing after a delay to ensure text is cleared
            const startTyping = setTimeout(typeText, 200);

            return () => {
                isCancelled = true;
                clearTimeout(startTyping);
            };
        }
    }, [systemReady, fullIntroText]);

    // Dynamic uptime calculation
    useEffect(() => {
        const calculateUptime = () => {
            const startDate = new Date('2004-02-24T00:00:00');
            const now = new Date();
            const diffMs = now.getTime() - startDate.getTime();

            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            setUptime(`${days}d ${hours}h ${minutes}m - (${Math.floor(days / 365)} years)`);
        };

        calculateUptime();
        const interval = setInterval(calculateUptime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const programmingSkills: SkillCategory[] = React.useMemo(() => [
        {
            title: t("skills.programmingLanguages.title"),
            command: t("skills.programmingLanguages.command"),
            skills: Array.isArray(t("skills.programmingLanguages.list", { returnObjects: true }))
                ? t("skills.programmingLanguages.list", { returnObjects: true }) as string[]
                : ["JavaScript/TypeScript", "Python", "Java", "C/C++", "Rust"]
        },
        {
            title: t("skills.tools.title"),
            command: t("skills.tools.command"),
            skills: Array.isArray(t("skills.tools.list", { returnObjects: true }))
                ? t("skills.tools.list", { returnObjects: true }) as string[]
                : ["React", "Node.js", "Docker", "Kubernetes", "AWS", "PostgreSQL"]
        },
        {
            title: t("skills.softSkills.title"),
            command: t("skills.softSkills.command"),
            skills: Array.isArray(t("skills.softSkills.list", { returnObjects: true }))
                ? t("skills.softSkills.list", { returnObjects: true }) as string[]
                : ["Team Leadership", "Problem Solving", "Communication", "Project Management"]
        },
        {
            title: t("skills.languages.title"),
            command: t("skills.languages.command"),
            skills: Array.isArray(t("skills.languages.list", { returnObjects: true }))
                ? t("skills.languages.list", { returnObjects: true }) as string[]
                : ["French (Native)", "English (Fluent)", "Korean (Learning)"]
        }
    ], [t]);

    const systemInfo = {
        hostname: "maelrabot.com",
        user: "mael_rabot",
        kernel: "Linux-Portfolio 5.4.0",
        uptime: uptime,
        load: "3.5",
        memory: "8.1GB / 16GB",
        processes: "156",
        shell: "/bin/coding_passion"
    };

    if (!systemReady) {
    return (
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('systemBoot.title')}
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="loading" size="medium" />
                    <div className="terminal-text">
                        <div className="terminal-prompt">
                            {t('systemBoot.loading')} [{Math.round(loadingProgress)}%]
                        </div>
                        <div style={{
                            width: '100%',
                            height: '20px',
                            border: '1px solid var(--terminal-green)',
                            marginTop: '10px',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: `${loadingProgress}%`,
                                            height: '100%',
                                backgroundColor: 'var(--terminal-green)',
                                transition: 'width 0.1s ease'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="terminal-crt terminal-scanlines">
            {/* Main Portfolio Banner */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('banner.title')}
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="banner" size="large" animate={true} />
                    <div className="ascii-extra">
                        <pre className="terminal-text">{displayText}</pre>
                    </div>
                </div>
            </div>

            {/* System Information */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('systemInfo.title')} - {t('systemInfo.welcome').toUpperCase()}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        <div className="terminal-card">
                            <div className="terminal-card-header">{t('systemInfo.hostInfo.title')}</div>
                            <table className="terminal-table">
                                <tbody>
                                    <tr><td>{t('systemInfo.hostInfo.hostname')}</td><td>{systemInfo.hostname}</td></tr>
                                    <tr><td>{t('systemInfo.hostInfo.user')}</td><td>{systemInfo.user}</td></tr>
                                    <tr><td>{t('systemInfo.hostInfo.kernel')}</td><td>{systemInfo.kernel}</td></tr>
                                    <tr><td>{t('systemInfo.hostInfo.shell')}</td><td>{systemInfo.shell}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="terminal-card">
                            <div className="terminal-card-header">{t('systemInfo.performance.title')}</div>
                            <table className="terminal-table">
                                <tbody>
                                    <tr><td>{t('systemInfo.performance.uptime')}</td><td>{systemInfo.uptime}</td></tr>
                                    <tr><td>{t('systemInfo.performance.loadAvg')}</td><td>{systemInfo.load}</td></tr>
                                    <tr><td>{t('systemInfo.performance.memory')}</td><td>{systemInfo.memory}</td></tr>
                                    <tr><td>{t('systemInfo.performance.processes')}</td><td>{systemInfo.processes}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlight Project Section */}
            <div className="terminal-section highlight-section">
                <div className="terminal-section-header">
                    {t('highlight.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('highlight.command')}</div>
                    <div className="highlight-content">
                        <div className="highlight-description">
                            <p className="terminal-text">{t('highlight.description')}</p>
                            <div className="highlight-tech">
                                <span className="terminal-command">{t('highlight.techStack')}</span>
                                <span className="status-badge">{t('highlight.status')}</span>
                            </div>
                        </div>
                        <div className="highlight-action">
                            <div className="highlight-buttons">
                                <div
                                    className="command-item highlight-button"
                                    onClick={() => navigate('/projects')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="terminal-prompt">{t('highlight.viewProject')}</div>
                                    <div className="terminal-text">→ Navigate to project details</div>
                                </div>
                                <div
                                    className="command-item highlight-button secondary"
                                    onClick={() => window.open('https://github.com/Mael-RABOT/NotARhythmGame', '_blank')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="terminal-prompt">{t('highlight.viewGitHub')}</div>
                                    <div className="terminal-text">→ Open repository</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('profile.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('profile.command')}</div>
                    <div className="terminal-text">
                        <h3 className="terminal-command">{t('profile.aboutMe').toUpperCase()}.EXE</h3>
                        <p>
                            &gt; {t('profile.description1')}
                        </p>
                        <p>
                            &gt; {t('profile.description2')}
                        </p>

                        <h3 className="terminal-command">{t('profile.involvement').toUpperCase()}.txt</h3>
                        <p>
                            &gt; {t('profile.description3')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('skills.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        {programmingSkills.map((category, index) => (
                            <div key={index} className="terminal-card">
                                <div className="terminal-card-header">{category.title}</div>
                                <div className="terminal-prompt">{category.command}</div>
                                <div className="skills-list">
                                            {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="skill-item">
                                            <span className="status-indicator"></span>
                                            <span className="terminal-command">{skill}</span>
                                            <span className="skill-status">[ACTIVE]</span>
                                        </div>
                                            ))}
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Passions Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('passions.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">{t('passions.command')}</div>
                    <div className="tech-grid">
                        {(Array.isArray(t('passions.list', { returnObjects: true }))
                            ? t('passions.list', { returnObjects: true }) as string[]
                            : ["Robotics & AI", "Open Source Development", "3D Printing", "Machine Learning", "IoT Projects"]
                        ).map((passion, index) => (
                            <div key={index} className="tech-item">
                                <span className="status-indicator"></span>
                                <span className="terminal-command">{passion}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    {t('quickActions.title')}
                </div>
                <div className="terminal-section-content">
                    <div className="command-grid">
                        <div className="command-item" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('quickActions.viewProjects.command')}</div>
                            <div className="terminal-text">{t('quickActions.viewProjects.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => navigate('/resume')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('quickActions.viewResume.command')}</div>
                            <div className="terminal-text">{t('quickActions.viewResume.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('quickActions.sendMessage.command')}</div>
                            <div className="terminal-text">{t('quickActions.sendMessage.description')}</div>
                        </div>
                        <div className="command-item" onClick={() => window.open('https://github.com/Mael-RABOT', '_blank')} style={{ cursor: 'pointer' }}>
                            <div className="terminal-prompt">{t('quickActions.gitStatus.command')}</div>
                            <div className="terminal-text">{t('quickActions.gitStatus.description')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">{t('footer.ready')}</span>
            </div>
        </div>
    );
};

export default Home;
