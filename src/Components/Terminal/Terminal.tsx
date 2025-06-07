import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MatrixRain from '../Effects/MatrixRain';
import './Terminal.css';

interface TerminalProps {
  children: React.ReactNode;
  currentTime: Date;
}

const Terminal: React.FC<TerminalProps> = ({ children, currentTime }) => {
  const location = useLocation();

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
      case '/': return 'HOME';
      case '/projects': return 'PROJECTS';
      case '/resume': return 'RESUME';
      case '/contact': return 'CONTACT';
      default: return 'PORTFOLIO';
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
        <div className="terminal-controls">
          <button className="terminal-control">−</button>
          <button className="terminal-control">□</button>
          <button className="terminal-control">×</button>
        </div>
      </div>

      {/* Terminal Navigation */}
      <nav className="terminal-nav">
        <div className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            [F1] HOME
          </Link>
          <Link
            to="/projects"
            className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}
          >
            [F2] PROJECTS
          </Link>
          <Link
            to="/resume"
            className={`nav-item ${location.pathname === '/resume' ? 'active' : ''}`}
          >
            [F3] RESUME
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            [F4] CONTACT
          </Link>
        </div>
      </nav>

      {/* Terminal Content */}
      <div className="terminal-content">
        {/* Command Line Indicator */}
        <div className="terminal-prompt">
          user@portfolio:~$ cat {getPageTitle(location.pathname).toLowerCase()}.txt
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