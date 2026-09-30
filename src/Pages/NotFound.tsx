import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../theme/theme.const";

const GLITCH_CHARS = ["4", "0", "4", "█", "▓", "▒", "░", "╳", "╬", "╪"];

const FUN_FACTS = [
    "The first 404 error was documented when searching for missing records at CERN.",
    "404 pages act as safe terminal boundaries in digital architectures.",
    "You can use F1-F4 keys to navigate quickly across this portfolio.",
    "Clean error states preserve user orientation and system predictability.",
];

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const [glitchText, setGlitchText] = useState("404");
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            if (Math.random() < 0.25) {
                const glitched = "404".split("").map(char =>
                    Math.random() < 0.35 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char
                ).join("");
                setGlitchText(glitched);

                setTimeout(() => setGlitchText("404"), 120);
            }
        }, 800);

        const commands = [
            "$ cd /portfolio/page",
            "bash: cd: /portfolio/page: No such file or directory",
            "$ ls -la",
            "total 0",
            "$ whereis page",
            "page: not found",
            "$ echo $ERROR_CODE",
            "404",
            "$ cat /etc/motd",
            "",
            "SYSTEM ERROR: Requested resource is unreachable in the current environment.",
            "",
            "Available entry points: [home] [projects] [resume] [contact]"
        ];

        let index = 0;
        const terminalInterval = setInterval(() => {
            if (index < commands.length) {
                setTerminalOutput(prev => [...prev, commands[index]]);
                index++;
            } else {
                clearInterval(terminalInterval);
            }
        }, 250);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(terminalInterval);
        };
    }, []);

    const selectedFunFact = useMemo(() => {
        return FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    }, []);

    return (
        <div className="terminal-scanlines">
            {/* Error Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    SYSTEM ERROR // RESOURCE_NOT_FOUND
                </div>
                <div className="terminal-section-content">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{
                            fontSize: '4.5rem',
                            fontFamily: fonts.title,
                            fontWeight: 800,
                            color: colors.status.error,
                            letterSpacing: '0.4rem',
                            marginBottom: 'var(--spacing-xs)',
                        }}>
                            {glitchText}
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-lg)',
                            fontFamily: fonts.title,
                            fontWeight: 700,
                            color: colors.secondary.text,
                            letterSpacing: '2px',
                        }}>
                            PAGE NOT FOUND
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
                        <pre style={{
                            color: colors.highlight.base,
                            fontSize: 'var(--font-size-xs)',
                            fontFamily: fonts.mono,
                            lineHeight: 1.4,
                        }}>
{`
    ┌───────────────────────────────────────────────────────────┐
    │                                                           │
    │    [!] NOTICE: The requested resource does not exist.     │
    │    Status: 404 NOT FOUND                                  │
    │    Diagnosis: Route unreachable or deprecated             │
    │                                                           │
    └───────────────────────────────────────────────────────────┘
`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    DIAGNOSTIC TRACE // DEBUG_OUTPUT
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">Executing recovery probe...</div>
                    <div className="terminal-text">
                        {terminalOutput.map((line, index) => (
                            <div key={index} style={{
                                color: (line && line.startsWith('$')) ? colors.highlight.base :
                                       (line && (line.includes('not found') || line.includes('No such file'))) ? colors.status.error :
                                       (line && line.includes('404')) ? colors.status.warning :
                                       colors.secondary.text,
                                marginBottom: '4px',
                                fontFamily: fonts.mono,
                                fontSize: 'var(--font-size-sm)',
                            }}>
                                {line || ''}
                            </div>
                        ))}
                        <div className="blinking-cursor" style={{ display: 'inline-block', marginTop: 'var(--spacing-xs)' }}></div>
                    </div>
                </div>
            </div>

            {/* Navigation Options */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    RECOVERY ROUTES // SELECT_TARGET
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt" style={{ marginBottom: 'var(--spacing-md)' }}>
                        Select a target destination:
                    </div>
                    <div className="terminal-grid">
                        <div
                            className="terminal-card"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">01 // HOME</div>
                            <div className="terminal-prompt">./nav_home.sh</div>
                            <div className="terminal-text">
                                Return to main system dashboard.<br/>
                                <strong>Status:</strong> OPERATIONAL
                            </div>
                        </div>

                        <div
                            className="terminal-card"
                            onClick={() => navigate('/projects')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">02 // PROJECTS</div>
                            <div className="terminal-prompt">./nav_projects.sh</div>
                            <div className="terminal-text">
                                Inspect repositories and engineered systems.<br/>
                                <strong>Status:</strong> ACTIVE
                            </div>
                        </div>

                        <div
                            className="terminal-card"
                            onClick={() => navigate('/resume')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">03 // RESUME</div>
                            <div className="terminal-prompt">./nav_credentials.sh</div>
                            <div className="terminal-text">
                                Review qualifications and engineering history.<br/>
                                <strong>Status:</strong> VERIFIED
                            </div>
                        </div>

                        <div
                            className="terminal-card"
                            onClick={() => navigate('/contact')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">04 // CONTACT</div>
                            <div className="terminal-prompt">./nav_contact.sh</div>
                            <div className="terminal-text">
                                Establish direct transmission channel.<br/>
                                <strong>Status:</strong> READY
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fun Fact */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    SYSTEM INFO // TELEMETRY
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-text">
                        <div className="terminal-prompt">Telemetry Note:</div>
                        {selectedFunFact}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
                <span className="blinking-cursor">
                    SYSTEM STANDBY | SELECT A RECOVERY ROUTE ABOVE
                </span>
            </div>
        </div>
    );
};

export default NotFound;