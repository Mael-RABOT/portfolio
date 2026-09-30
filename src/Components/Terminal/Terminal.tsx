import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import './Terminal.css';

interface TerminalProps {
  children: React.ReactNode;
  currentTime: Date;
}

const Terminal: React.FC<TerminalProps> = ({ children, currentTime }) => {
  const location = useLocation();
  const { t } = useTranslation('navigation');
  const [isMaximized, setIsMaximized] = useState(false);
  const [systemStats] = useState(() => ({
    load: (0.12 + Math.random() * 0.15).toFixed(2),
    mem: Math.floor(18 + Math.random() * 12),
  }));

  // Show time formatted according to the user's system locale and settings
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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

  const navItems = [
    {
      path: '/',
      shortcut: 'F1',
      mobileLabel: t('titles.home', 'HOME'),
      desktopLabel: t('menu.home', '[F1] HOME'),
      icon: HomeIcon,
    },
    {
      path: '/projects',
      shortcut: 'F2',
      mobileLabel: t('titles.projects', 'PROJECTS'),
      desktopLabel: t('menu.projects', '[F2] PROJECTS'),
      icon: CodeBracketIcon,
    },
    {
      path: '/resume',
      shortcut: 'F3',
      mobileLabel: t('titles.resume', 'RESUME'),
      desktopLabel: t('menu.resume', '[F3] RESUME'),
      icon: DocumentTextIcon,
    },
    {
      path: '/contact',
      shortcut: 'F4',
      mobileLabel: t('titles.contact', 'CONTACT'),
      desktopLabel: t('menu.contact', '[F4] CONTACT'),
      icon: EnvelopeIcon,
    },
    {
      path: '/accessibility',
      shortcut: 'F5',
      mobileLabel: t('menu.a11y', 'A11Y'),
      desktopLabel: t('menu.accessibility', '[F5] ACCESSIBILITY'),
      icon: EyeIcon,
    },
  ];

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

        {/* Navigation */}
        <nav className="terminal-nav" aria-label="Main Navigation">
          <div className="nav-menu">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-keyshortcuts={item.shortcut}
                  aria-label={item.desktopLabel}
                >
                  <span className="nav-icon" aria-hidden="true">
                    <IconComponent className="nav-heroicon" />
                  </span>
                  <span className="nav-label nav-label-desktop">{item.desktopLabel}</span>
                  <span className="nav-label nav-label-mobile">{item.mobileLabel}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Terminal Content */}
        <main className="terminal-content">
          {/* Command Line Indicator */}
          <div className="terminal-prompt-bar">
            <div className="terminal-prompt" aria-hidden="true">
              user@portfolio:~$ {t('command', { page: getPageTitle(location.pathname).toLowerCase() })}
            </div>
          </div>

          {/* Main Content */}
          <div className="terminal-main">
            {children}
          </div>

          {/* Footer */}
          <footer className="terminal-footer">
            <div className="terminal-status-bar">
              <span className="status-left">
                STATUS: ONLINE | LOAD: {systemStats.load} | MEM: {systemStats.mem}%
              </span>
              <span className="status-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/accessibility" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Accessibility Statement">
                  {t('footer.accessibility', 'Accessibility')}
                </Link>
                <span>| [{formatTime(currentTime)}]</span>
              </span>
            </div>
          </footer>
        </main>
      </>
    </div>
  );
};

export default Terminal;
