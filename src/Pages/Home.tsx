import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

interface SkillCategory {
    title: string;
    skills: string[];
    command: string;
}

const Home: React.FC = () => {
    const { t } = useTranslation();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [systemReady, setSystemReady] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [currentCommand, setCurrentCommand] = useState('');

    const fullIntroText = `
INITIALIZING PORTFOLIO SYSTEM...
LOADING USER DATA...
ESTABLISHING SECURE CONNECTION...
READY FOR INPUT.
    `;

    // Simulate system boot
    useEffect(() => {
        const timer = setTimeout(() => {
            setSystemReady(true);
        }, 2000);

        const progressTimer = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, []);

    // Typing effect for intro text
    useEffect(() => {
        if (systemReady) {
            let i = 0;
            const typeText = () => {
                if (i < fullIntroText.length) {
                    setDisplayText(prev => prev + fullIntroText[i]);
                    i++;
                    setTimeout(typeText, 50);
                }
            };
            typeText();
        }
    }, [systemReady, fullIntroText]);

    const programmingSkills: SkillCategory[] = React.useMemo(() => [
        {
            title: "PROGRAMMING_LANGUAGES",
            command: "ls /usr/local/languages/",
            skills: Array.isArray(t("home.skills.programmingLanguages.list", { returnObjects: true }))
                ? t("home.skills.programmingLanguages.list", { returnObjects: true }) as string[]
                : ["JavaScript/TypeScript", "Python", "Java", "C/C++", "Rust"]
        },
        {
            title: "TOOLS_&_FRAMEWORKS",
            command: "cat /etc/tools.conf",
            skills: Array.isArray(t("home.skills.tools.list", { returnObjects: true }))
                ? t("home.skills.tools.list", { returnObjects: true }) as string[]
                : ["React", "Node.js", "Docker", "Kubernetes", "AWS", "PostgreSQL"]
        },
        {
            title: "SOFT_SKILLS",
            command: "whoami --extended",
            skills: Array.isArray(t("home.skills.softSkills.list", { returnObjects: true }))
                ? t("home.skills.softSkills.list", { returnObjects: true }) as string[]
                : ["Team Leadership", "Problem Solving", "Communication", "Project Management"]
        },
        {
            title: "LANGUAGES",
            command: "locale -a",
            skills: Array.isArray(t("home.skills.languages.list", { returnObjects: true }))
                ? t("home.skills.languages.list", { returnObjects: true }) as string[]
                : ["French (Native)", "English (Fluent)", "Korean (Learning)"]
        }
    ], [t]);

    const systemInfo = {
        hostname: "maelrabot.com",
        user: "mael_rabot",
        kernel: "Linux-Portfolio 5.4.0",
        uptime: "1337d 13h 37m",
        load: "0.42",
        memory: "8.1GB / 16GB",
        processes: "156",
        shell: "/bin/coding_passion"
    };

    if (!systemReady) {
    return (
            <div className="terminal-section">
                <div className="terminal-section-header">
                    SYSTEM BOOT SEQUENCE
                </div>
                <div className="terminal-section-content">
                    <ASCIIArt type="loading" size="medium" />
                    <div className="terminal-text">
                        <div className="terminal-prompt">
                            LOADING... [{Math.round(loadingProgress)}%]
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
                    PORTFOLIO SYSTEM v2.1.0 - MAIN INTERFACE
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
                    SYSTEM INFORMATION - {t('home.welcome').toUpperCase()}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-grid">
                        <div className="terminal-card">
                            <div className="terminal-card-header">HOST INFO</div>
                            <table className="terminal-table">
                                <tbody>
                                    <tr><td>HOSTNAME:</td><td>{systemInfo.hostname}</td></tr>
                                    <tr><td>USER:</td><td>{systemInfo.user}</td></tr>
                                    <tr><td>KERNEL:</td><td>{systemInfo.kernel}</td></tr>
                                    <tr><td>SHELL:</td><td>{systemInfo.shell}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="terminal-card">
                            <div className="terminal-card-header">PERFORMANCE</div>
                            <table className="terminal-table">
                                <tbody>
                                    <tr><td>UPTIME:</td><td>{systemInfo.uptime}</td></tr>
                                    <tr><td>LOAD AVG:</td><td>{systemInfo.load}</td></tr>
                                    <tr><td>MEMORY:</td><td>{systemInfo.memory}</td></tr>
                                    <tr><td>PROCESSES:</td><td>{systemInfo.processes}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    USER PROFILE - DEVELOPER DOCUMENTATION
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">cat /home/mael_rabot/README.md</div>
                    <div className="terminal-text">
                                                <h3 className="terminal-command">{t('home.aboutMe').toUpperCase()}.EXE</h3>
                        <p>
                            &gt; {t('home.description1')}
                        </p>
                        <p>
                            &gt; {t('home.description2')}
                        </p>

                        <h3 className="terminal-command">{t('home.involvement').toUpperCase()}.txt</h3>
                        <p>
                            &gt; {t('home.description3')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    INSTALLED PACKAGES & CAPABILITIES - {t('home.skills.title').toUpperCase()}
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
                    PERSONAL INTERESTS - {t('home.passions.title').toUpperCase()}
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">cat /etc/interests.conf</div>
                    <div className="tech-grid">
                        {(Array.isArray(t('home.passions.list', { returnObjects: true }))
                            ? t('home.passions.list', { returnObjects: true }) as string[]
                            : ["Robotics & AI", "Open Source Development", "3D Printing", "Machine Learning", "IoT Projects"]
                        ).map((passion, index) => (
                            <div key={index} className="tech-item">
                                <span className="status-indicator"></span>
                                <span className="terminal-command">{passion}</span>
                                <span className="skill-status">[ACTIVE]</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    QUICK ACCESS COMMANDS
                </div>
                <div className="terminal-section-content">
                    <div className="command-grid">
                        <div className="command-item">
                            <div className="terminal-prompt">./view_projects.sh</div>
                            <div className="terminal-text">Browse development portfolio</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">cat resume.pdf</div>
                            <div className="terminal-text">Display professional experience</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">send_message.py</div>
                            <div className="terminal-text">Initialize contact protocol</div>
                        </div>
                        <div className="command-item">
                            <div className="terminal-prompt">git status</div>
                            <div className="terminal-text">Check current development status</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">SYSTEM READY FOR INPUT</span>
            </div>
        </div>
    );
};

export default Home;
