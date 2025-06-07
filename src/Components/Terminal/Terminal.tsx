import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MatrixRain from '../Effects/MatrixRain';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import './Terminal.css';

interface TerminalProps {
  children: React.ReactNode;
  currentTime: Date;
}

const Terminal: React.FC<TerminalProps> = ({ children, currentTime }) => {
  const location = useLocation();
  const { t } = useTranslation('navigation');

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
      default: return t('titles.portfolio');
    }
  };

  return (
    <div className="terminal-window">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-title">
          <span className="status-indicator"></span>
          {getPageTitle(location.pathname)} - PORTFOLIO.EXE - [{formatTime(currentTime)}]
        </div>
        <div className="terminal-header-right">
          <LanguageSwitch />
          <div className="terminal-controls">
            <button className="terminal-control">−</button>
            <button className="terminal-control">□</button>
            <button className="terminal-control">×</button>
          </div>
        </div>
      </div>

      {/* Terminal Navigation */}
      <nav className="terminal-nav">
        <div className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t('menu.home')}
          </Link>
          <Link
            to="/projects"
            className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}
          >
            {t('menu.projects')}
          </Link>
          <Link
            to="/resume"
            className={`nav-item ${location.pathname === '/resume' ? 'active' : ''}`}
          >
            {t('menu.resume')}
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            {t('menu.contact')}
          </Link>
        </div>
      </nav>

      {/* Terminal Content */}
      <div className="terminal-content">
        {/* Command Line Indicator */}
        <div className="terminal-prompt">
          user@portfolio:~$ {t('command', { page: getPageTitle(location.pathname).toLowerCase() })}
        </div>

        {/* Matrix Rain Background Effect */}
        <MatrixRain />

        {/* Main Content */}
        <div className="terminal-main">
          {children}
        </div>

        {/* Footer */}
        <div className="terminal-footer">
          <div className="terminal-status-bar">
            <span className="status-left">
              STATUS: ONLINE | LOAD: {Math.random().toFixed(2)} | MEM: {(Math.random() * 100).toFixed(0)}%
            </span>
            <span className="status-right">
              [{formatTime(currentTime)}] | ESC: EXIT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;