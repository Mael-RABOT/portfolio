import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import './Terminal.css';

interface TerminalProps {
  children: React.ReactNode;
  currentTime: Date;
}

const Terminal: React.FC<TerminalProps> = ({ children, currentTime }) => {
  const location = useLocation();
  const { t } = useTranslation('navigation');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [shutdownStep, setShutdownStep] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return t('titles.home');
      case '/projects': return t('titles.projects');
      case '/resume': return t('titles.resume');
      case '/contact': return t('titles.contact');
      case '/accessibility': return t('titles.accessibility', 'Accessibility');
      default: return t('titles.portfolio');
    }
  };

  // Easter egg functions
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    // Toggle fullscreen effect
    if (!isMaximized) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleClose = () => {
    setShowShutdown(true);
    setShutdownStep(0);
    setShowContinue(false);
    setVisibleLines([]);
  };

  const shutdownMessages = [
    "Saving system state...",
    "Closing applications...",
    "Shutting down Matrix protocol...",
    "System shutdown complete.",
    "Restarting system...",
    "Welcome back!"
  ];

  // Shutdown sequence animation
      // Handle mobile navigation visibility - start hidden on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileNavVisible(false);
      } else {
        setIsMobileNavVisible(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!showShutdown) {
      return;
    }

    if (shutdownStep === 0) {
      // Start the sequence by showing the first line after a short delay
      const timer = setTimeout(() => {
        setVisibleLines([0]);
        setShutdownStep(1);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (shutdownStep > 0 && shutdownStep < shutdownMessages.length) {
      // Show the next line after 1 second
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, shutdownStep]);
        setShutdownStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (shutdownStep === shutdownMessages.length) {
      // All messages shown, wait 2 seconds then show continue
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showShutdown, shutdownStep, shutdownMessages.length]);

  return (
    <div className="terminal-window" style={{ outline: "5px", outlineColor: "#00FF41"}}>
      {/* Minimized Page Overlay */}
      {isMinimized && (
        <div className="minimized-overlay" onClick={() => setIsMinimized(false)}>
          <div className="minimized-content">
            <div className="minimized-ascii">
              <pre>{`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║             OOPS! MINIMIZED!          ║
    ║                                       ║
    ║         (╯°□°)╯   ┻━┻                 ║
    ║                                       ║
    ║    Don't worry, your portfolio is     ║
    ║    taking a quick coffee break! ☕    ║
    ║                                       ║
    ║                                       ║
    ║          ∩───∩                        ║
    ║         ( ͡° ͜ʖ ͡°)                      ║
    ║          /   \\                        ║
    ║         /     \\                       ║
    ║        /__   __\\                      ║
    ║           | |                         ║
    ║                                       ║
    ║    Your portfolio went to get some    ║
    ║    fresh pixels and will be right     ║
    ║    back! Click anywhere to restore... ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
              `}</pre>
            </div>
            <div className="minimized-jokes">
              <div className="joke-line">💻 ERROR 404: Portfolio not found... just kidding!</div>
              <div className="joke-line">🔍 Searching for motivation... 99% complete</div>
              <div className="joke-line">🚀 Launching productivity in 3... 2... 1...</div>
              <div className="joke-line">☕ Currently brewing some fresh code...</div>
            </div>
            <div className="minimized-footer">
              <div className="blinking-text">
                ▶ Click anywhere to maximize and continue your journey! ◀
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shutdown Overlay */}
      {showShutdown && (
        <div className="shutdown-overlay" onClick={() => {
          setShowShutdown(false);
          setShutdownStep(0);
          setShowContinue(false);
          setVisibleLines([]);
        }}>
          <div className="shutdown-content">
            <div className="shutdown-logo">/!\</div>
            <div className="shutdown-message">
              {visibleLines.map((lineIndex) => (
                <div
                  key={lineIndex}
                  className={`shutdown-line ${lineIndex === shutdownMessages.length - 1 ? 'final-message' : ''}`}
                >
                  &gt; {shutdownMessages[lineIndex]}
                </div>
              ))}
            </div>
            {showContinue && (
              <div className="shutdown-restart">
                <div className="terminal-prompt">Click anywhere to continue...</div>
              </div>
            )}
          </div>
        </div>
      )}

            {!isMinimized && (
        <>
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-title">
              <span className="status-indicator"></span>
              {getPageTitle(location.pathname)} - PORTFOLIO.EXE - [{formatTime(currentTime)}]
            </div>
            <div className="terminal-header-right">
              <LanguageSwitch />
              <div className="terminal-controls">
                <button
                  className={`terminal-control ${isMinimized ? 'active' : ''}`}
                  onClick={handleMinimize}
                  title="Minimize (Easter Egg!)"
                  aria-label="Minimize terminal window"
                >
                  −
                </button>
                <button
                  className={`terminal-control ${isMaximized ? 'active' : ''}`}
                  onClick={handleMaximize}
                  title="Maximize (Easter Egg!)"
                  aria-label="Maximize terminal window"
                >
                  □
                </button>
                <button
                  className="terminal-control"
                  onClick={handleClose}
                  title="Close (Easter Egg!)"
                  aria-label="Close terminal window"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Navigation */}
          <nav className={`terminal-nav ${isMobileNavVisible ? 'visible' : 'hidden'}`} aria-label="Main Navigation">
            <div className="nav-menu">
              <Link
                to="/"
                className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsMobileNavVisible(false);
                  }
                }}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                {t('menu.home')}
              </Link>
              <Link
                to="/projects"
                className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsMobileNavVisible(false);
                  }
                }}
                aria-current={location.pathname === '/projects' ? 'page' : undefined}
              >
                {t('menu.projects')}
              </Link>
              <Link
                to="/resume"
                className={`nav-item ${location.pathname === '/resume' ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsMobileNavVisible(false);
                  }
                }}
                aria-current={location.pathname === '/resume' ? 'page' : undefined}
              >
                {t('menu.resume')}
              </Link>
              <Link
                to="/contact"
                className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsMobileNavVisible(false);
                  }
                }}
                aria-current={location.pathname === '/contact' ? 'page' : undefined}
              >
                {t('menu.contact')}
              </Link>
                <Link
                    to="/accessibility"
                    className={`nav-item ${location.pathname === '/accessibility' ? 'active' : ''}`}
                    onClick={() => {
                        if (window.innerWidth <= 768) {
                            setIsMobileNavVisible(false);
                        }
                    }}
                    aria-current={location.pathname === '/accessibility' ? 'page' : undefined}
                >
                    {t('menu.accessibility')}
                </Link>
            </div>
          </nav>

                    {/* Mobile Navigation Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}
            aria-label={isMobileNavVisible ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileNavVisible}
          >
            <span className="nav-toggle-icon" aria-hidden="true">
              {isMobileNavVisible ? '×' : '☰'}
            </span>
          </button>

          {/* Terminal Content */}
          <main className="terminal-content">
            {/* Command Line Indicator */}
            <div className="terminal-prompt" aria-hidden="true">
              user@portfolio:~$ {t('command', { page: getPageTitle(location.pathname).toLowerCase() })}
            </div>

            {/* Main Content */}
            <div className="terminal-main">
              {children}
            </div>

            {/* Footer */}
            <footer className="terminal-footer">
              <div className="terminal-status-bar">
                <span className="status-left">
                  STATUS: ONLINE | LOAD: {Math.random().toFixed(2)} | MEM: {(Math.random() * 100).toFixed(0)}%
                </span>
                <span className="status-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Link to="/accessibility" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Accessibility Statement">
                    {t('footer.accessibility', 'Accessibility')}
                  </Link>
                  <span>| [{formatTime(currentTime)}] | ESC: EXIT</span>
                </span>
              </div>
            </footer>
          </main>
        </>
      )}

      {/* Minimized Header (just controls) */}
      {isMinimized && (
        <div className="minimized-header">
          <div className="terminal-controls">
            <button
              className={`terminal-control ${isMinimized ? 'active' : ''}`}
              onClick={handleMinimize}
              title="Restore (Easter Egg!)"
              aria-label="Restore terminal window"
            >
              −
            </button>
            <button
              className={`terminal-control ${isMaximized ? 'active' : ''}`}
              onClick={handleMaximize}
              title="Maximize (Easter Egg!)"
              aria-label="Maximize terminal window"
            >
              □
            </button>
            <button
              className="terminal-control"
              onClick={handleClose}
              title="Close (Easter Egg!)"
              aria-label="Close terminal window"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
