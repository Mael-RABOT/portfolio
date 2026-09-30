import React, { useState } from 'react';
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
  const [isMaximized, setIsMaximized] = useState(false);

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
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    // Toggle fullscreen effect
    if (!isMaximized) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="terminal-window">
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
              <p>
                −
              </p>
              <button
                className={`terminal-control ${isMaximized ? 'active' : ''}`}
                onClick={handleMaximize}
                title="Maximize (Easter Egg!)"
                aria-label="Maximize terminal window"
                style={{ border: "none" }}
              >
                □
              </button>
              <p>
                ×
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="terminal-nav" aria-label="Main Navigation">
          <div className="nav-menu">
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              {t('menu.home')}
            </Link>
            <Link
              to="/projects"
              className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}
              aria-current={location.pathname === '/projects' ? 'page' : undefined}
            >
              {t('menu.projects')}
            </Link>
            <Link
              to="/resume"
              className={`nav-item ${location.pathname === '/resume' ? 'active' : ''}`}
              aria-current={location.pathname === '/resume' ? 'page' : undefined}
            >
              {t('menu.resume')}
            </Link>
            <Link
              to="/contact"
              className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
            >
              {t('menu.contact')}
            </Link>
            <Link
              to="/accessibility"
              className={`nav-item ${location.pathname === '/accessibility' ? 'active' : ''}`}
              aria-current={location.pathname === '/accessibility' ? 'page' : undefined}
            >
              {t('menu.accessibility')}
            </Link>
          </div>
        </nav>

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
    </div>
  );
};

export default Terminal;
