import React from 'react';

interface ASCIIArtProps {
  type: 'banner' | 'computer' | 'logo' | 'divider' | 'loading' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

const ASCIIArt: React.FC<ASCIIArtProps> = ({ type, size = 'medium', animate = false }) => {
  const getArt = () => {
    switch (type) {
      case 'banner':
        return `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
        `;

      case 'computer':
        return `
            ┌────────────────────────────────────┐
            │                                    │
            │  ██████╗ ██████╗ ███████╗███╗  ██╗ │
            │ ██║   ██╗██╔══██╗██╔════╝████╗ ██║ │
            │ ██║   ██║██████╔╝█████╗  ██╔██╗██║ │
            │ ██║   ██║██╔═══╝ ██╔══╝  ██║╚████║ │
            │ ╚██████╔╝██║     ███████╗██║ ╚███║ │
            │  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚══╝ │
            └────────────────────────────────────┘
                ┌────────────────────────┐
                │░░░░░░░░░░░░░░░░░░░░░░░░│
                └────────────────────────┘
                         ███
                         ███
                    ▀▀▀▀▀███▀▀▀▀▀
        `;

      case 'logo':
        return `
    ╔══════════════════════════════════════╗
    ║  ██████  ████████ ██████  ██████     ║
    ║  ██   ██ ██       ██   ██ ██   ██    ║
    ║  ██   ██ ██████   ██   ██ ██████     ║
    ║  ██   ██ ██       ██   ██ ██         ║
    ║  ██████  ████████ ██████  ██         ║
    ╚══════════════════════════════════════╝
        `;

      case 'divider':
        return `
    ╔══════════════════════════════════════════════════════════════════════╗
    ║ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║
    ╚══════════════════════════════════════════════════════════════════════╝
        `;

      case 'loading':
        return `
    ┌─────────────────────────────────────┐
    │  ██╗      ██████╗  █████╗ ██████╗   │
    │  ██║     ██╔═══██╗██╔══██╗██╔══██╗  │
    │  ██║     ██║   ██║███████║██║  ██║  │
    │  ██║     ██║   ██║██╔══██║██║  ██║  │
    │  ███████╗╚██████╔╝██║  ██║██████╔╝  │
    │  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝   │
    │  [████████████████████████████] 100%│
    └─────────────────────────────────────┘
        `;

      case 'error':
        return `
    ╔════════════════════════════════════════════╗
    ║  ███████╗██████╗ ██████╗  ██████╗ ██████╗  ║
    ║  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗ ║
    ║  █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝ ║
    ║  ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗ ║
    ║  ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║ ║
    ║  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ║
    ║    SYSTEM ERROR - CONTACT ADMINISTRATOR    ║
    ╚════════════════════════════════════════════╝
        `;

      case 'success':
        return `
    ┌──────────────────────────────────────┐
    │  ███████╗██╗   ██╗ ██████╗ ██████╗   │
    │  ██╔════╝██║   ██║██╔════╝██╔════╝   │
    │  ███████╗██║   ██║██║     ██║        │
    │  ╚════██║██║   ██║██║     ██║        │
    │  ███████║╚██████╔╝╚██████╗╚██████╗   │
    │  ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝   │
    │  OPERATION COMPLETED SUCCESSFULLY    │
    └──────────────────────────────────────┘
        `;

      default:
        return `
    ╔═══════════════════════════════════════╗
    ║        ASCII ART NOT FOUND            ║
    ╚═══════════════════════════════════════╝
        `;
    }
  };

  const getAdditionalArt = () => {
    switch (type) {
      case 'banner':
        return `
┌─ SYSTEM INFORMATION ──────────────────────────┐
│ OS: Terminal OS v2.1.0                        │
│ KERNEL: Linux-Portfolio 5.4.0                 │
│ UPTIME: 24d 7h 42m                            │
│ USER: developer                               │
│ SHELL: /bin/portfolio                         │
└───────────────────────────────────────────────┘
        `;

      case 'computer':
        return `
        [####################################] 100%
        [BOOT SEQUENCE COMPLETE]
        [LOADING USER INTERFACE...]
        [READY FOR INPUT]
        `;

      default:
        return '';
    }
  };

  return (
    <div className={`ascii-art ${size} ${animate ? 'terminal-typing' : ''}`}>
      <pre>{getArt()}</pre>
      {getAdditionalArt() && (
        <pre className="ascii-extra">{getAdditionalArt()}</pre>
      )}
    </div>
  );
};

export default ASCIIArt;