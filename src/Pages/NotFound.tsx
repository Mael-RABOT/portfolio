import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ASCIIArt from "../Components/ASCII/ASCIIArt";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const [glitchText, setGlitchText] = useState("404");
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    const glitchChars = ["4", "0", "4", "█", "▓", "▒", "░", "╳", "╬", "╪"];

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            if (Math.random() < 0.3) {
                const glitched = "404".split("").map(char =>
                    Math.random() < 0.4 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
                ).join("");
                setGlitchText(glitched);

                setTimeout(() => setGlitchText("404"), 150);
            }
        }, 500);

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
            "SYSTEM ERROR: Page has wandered off into the digital void...",
            "",
            "Available commands: [home] [projects] [resume] [contact] [help]"
        ];

        let index = 0;
        const terminalInterval = setInterval(() => {
            if (index < commands.length) {
                setTerminalOutput(prev => [...prev, commands[index]]);
                index++;
            } else {
                clearInterval(terminalInterval);
            }
        }, 300);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(terminalInterval);
        };
    }, []);

    const funFacts = [
            "🎯 The first 404 error was discovered by a programmer who was looking for coffee",
            "🔍 404 pages are like digital tumbleweeds in the vast desert of the internet",
            "💡 This 404 page contains more code than some entire websites from 1995",
            "🤖 You've just activated the portfolio's defense mechanism against broken links",
            "🚀 Fun fact: You can use F1-F4 keys to navigate this portfolio!",
    ];

    const selectedFunFact = useMemo(() => {
        return funFacts[Math.floor(Math.random() * funFacts.length)];
    }, []);

    return (
        <div className="terminal-crt terminal-scanlines">
            {/* Error Header */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    SYSTEM ERROR - COMMAND NOT FOUND
                </div>
                <div className="terminal-section-content">
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{
                            fontSize: '4rem',
                            fontFamily: 'monospace',
                            color: 'var(--terminal-red)',
                            textShadow: '0 0 10px var(--terminal-red)',
                            letterSpacing: '0.5rem',
                            marginBottom: '10px'
                        }}>
                            {glitchText}
                        </div>
                        <div style={{
                            fontSize: '1.5rem',
                            color: 'var(--terminal-yellow)',
                            marginBottom: '20px'
                        }}>
                            PAGE NOT FOUND
                        </div>
                    </div>

                    <ASCIIArt type="computer" size="medium" />

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <pre style={{ color: 'var(--terminal-green)', fontSize: '0.9rem' }}>
{`
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║    ⚠️  ERROR: The page you requested has gone rogue!  ⚠️  ║
    ║                                                           ║
    ║           (╯°□°)╯ ┻━┻   <-- That's the page               ║
    ║                                                           ║
    ║    Status: Missing In Action (MIA)                        ║
    ║    Cause: Lost in the digital void                        ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
`}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    TERMINAL OUTPUT - DEBUG SESSION
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">Attempting to locate missing page...</div>
                    <div className="terminal-text">
                        {terminalOutput.map((line, index) => (
                            <div key={index} style={{
                                color: (line && line.startsWith('$')) ? 'var(--terminal-bright-green)' :
                                       (line && (line.includes('not found') || line.includes('No such file'))) ? 'var(--terminal-red)' :
                                       (line && line.includes('404')) ? 'var(--terminal-yellow)' :
                                       'var(--terminal-green)',
                                marginBottom: '5px'
                            }}>
                                {line || ''}
                            </div>
                        ))}
                        <div className="blinking-cursor" style={{ display: 'inline-block', marginTop: '10px' }}>█</div>
                    </div>
                </div>
            </div>

            {/* Navigation Options */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    RECOVERY OPTIONS - NAVIGATION MENU
                </div>
                <div className="terminal-section-content">
                    <div className="terminal-prompt">Choose your path back to civilization:</div>
                    <div className="terminal-grid">
                        <div
                            className="terminal-card command-item"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">🏠 HOME</div>
                            <div className="terminal-prompt">./navigate_home.sh</div>
                            <div className="terminal-text">
                                Return to the safe harbor of the homepage.<br/>
                                <strong>Status:</strong> ✅ OPERATIONAL<br/>
                                <strong>Risk Level:</strong> MINIMAL
                            </div>
                        </div>

                        <div
                            className="terminal-card command-item"
                            onClick={() => navigate('/projects')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">📂 PROJECTS</div>
                            <div className="terminal-prompt">./explore_projects.sh</div>
                            <div className="terminal-text">
                                Browse the digital artifacts and code repositories.<br/>
                                <strong>Status:</strong> ✅ ACTIVE<br/>
                                <strong>Risk Level:</strong> EDUCATIONAL
                            </div>
                        </div>

                        <div
                            className="terminal-card command-item"
                            onClick={() => navigate('/resume')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">📄 RESUME</div>
                            <div className="terminal-prompt">./view_credentials.sh</div>
                            <div className="terminal-text">
                                Access professional background and achievements.<br/>
                                <strong>Status:</strong> ✅ UPDATED<br/>
                                <strong>Risk Level:</strong> INFORMATIVE
                            </div>
                        </div>

                        <div
                            className="terminal-card command-item"
                            onClick={() => navigate('/contact')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="terminal-card-header">📧 CONTACT</div>
                            <div className="terminal-prompt">./establish_contact.sh</div>
                            <div className="terminal-text">
                                Initiate communication protocols.<br/>
                                <strong>Status:</strong> ✅ READY<br/>
                                <strong>Risk Level:</strong> SOCIAL
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fun Facts */}
            <div className="terminal-section">
                <div className="terminal-section-header">
                    FUN FACT GENERATOR - ERROR ENTERTAINMENT SYSTEM
                </div>
                <div className="terminal-section-content">
                                         <div className="terminal-text">
                         <div className="terminal-prompt">Did you know?</div>
                         {selectedFunFact}
                     </div>
                </div>
            </div>

            {/* Footer */}
            <ASCIIArt type="divider" size="large" />
            <div className="terminal-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                <span className="blinking-cursor">
                    ERROR CODE 404 | PRESS ANY NAVIGATION BUTTON TO CONTINUE
                </span>
            </div>
        </div>
    );
};

export default NotFound;