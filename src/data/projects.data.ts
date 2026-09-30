import { PortfolioItem } from '../services/portfolioApi';

/**
 * Local Projects Registry
 * Add or edit your projects here without needing any backend server.
 */
export const LOCAL_PROJECTS: PortfolioItem[] = [
  {
    '@id': '/api/items/lucy',
    id: 'lucy',
    name: 'Lucy',
    type: 'Humanoid Robotics Framework',
    status: 'active',
    language: 'C++ / ROS 2 / Python / React',
    description: `Welcome to Sentience Robotics & Project Lucy.
An open-source initiative dedicated to developing a modular, full-stack framework for humanoid interaction and control.

Our mission is to bridge the gap between high-level AI-driven cognition and robust, real-time hardware execution. Built primarily on the InMoov platform, Lucy acts as a universal brain and nervous system adaptable to any humanoid robotics hardware.

Key Pillars:
• LUCY (Platform Bridge): ROS 2-based interface layer with C++ core and ros2_control to allow external web clients or AI models to command robotic actuators seamlessly.
• HuRI (Human-Robot Interaction): Speech-to-Speech (S2S) pipelines, multi-layer cognitive memory (short, medium, and long-term), and kinematic grounding.
• Web Control Panel: Real-time telemetry, actuator control, and cloud-assisted teleoperation.`,
    technologies: ['Rust', 'C++', 'ROS 2', 'ros2_control', 'Python', 'TypeScript', 'React', 'InMoov', 'Blender', 'URDF'],
    repository: 'https://github.com/Sentience-Robotics',
    demo: 'https://docs.sentience-robotics.fr/share/p1x9ikjkhf/p/public-documentation-EExgMX2REV',
    links: [
      {
        id: 1,
        url: 'https://docs.sentience-robotics.fr/share/p1x9ikjkhf/p/public-documentation-EExgMX2REV',
        item: 'Public Documentation'
      },
      {
        id: 2,
        url: 'https://projects.sentience-robotics.fr/',
        item: 'Project Manager (Development Cycle)'
      },
      {
        id: 3,
        url: 'https://github.com/Sentience-Robotics',
        item: 'GitHub Organization'
      },
      {
        id: 4,
        url: 'https://discord.gg/g4KNZ3eeBd',
        item: 'Community Discord'
      }
    ],
    responsibilities: [
      'Architecting modular full-stack humanoid interaction and motor control framework in ROS 2',
      'Designing hardware abstraction with C++ and ros2_control for real-time actuator control on InMoov hardware',
      'Developing AI cognition pipeline with speech-to-speech, cognitive memory, and kinematic grounding',
      'Directing open-source community ecosystem, public documentation, project roadmap, and issue tracking'
    ],
    itemType: 'project',
  },
  {
    '@id': '/api/items/not-a-rhythm-game',
    id: 'not-a-rhythm-game',
    name: 'Not A Rhythm Game',
    type: 'Desktop Game',
    status: 'active',
    language: 'C++',
    description: 'Open source rhythm game inspired by Muse Dash, with a complete level editor and custom audio engine.',
    technologies: ['C++', 'ImGui', 'GLFW', 'BASS'],
    repository: 'https://github.com/Mael-RABOT/NotARhythmGame',
    itemType: 'project',
  },
  {
    '@id': '/api/items/area',
    id: 'area',
    name: 'AREA',
    type: 'Web Application',
    status: 'completed',
    language: 'TypeScript / Go',
    description: 'Recreation of IFTTT action-reaction automation platform featuring OAuth2 & 2FA authentication protocols.',
    technologies: ['Vite', 'TypeScript', 'Go', 'OAuth2', '2FA', 'Docker'],
    repository: 'https://github.com/ASM-Studios/AREA',
    itemType: 'project',
  },
  {
    '@id': '/api/items/r-type',
    id: 'r-type',
    name: 'R-Type',
    type: 'Game Engine',
    status: 'completed',
    language: 'C++',
    description: 'Cross-platform custom ECS game engine recreating the famous arcade game R-Type with networked multiplayer.',
    technologies: ['C++', 'CMake', 'Cross-platform', 'ECS Architecture'],
    repository: 'https://github.com/ASM-Studios/R-Type',
    itemType: 'project',
  },
  {
    '@id': '/api/items/lucy-ws',
    id: 'lucy-ws',
    name: 'LUCY | The Platform Bridge',
    type: 'Robotics Interface Layer',
    status: 'active',
    language: 'C++ / ROS 2',
    description: 'The Platform Bridge for Sentience Robotics: ROS 2-based interface layer abstracting hardware complexity with a C++ core and ros2_control to allow external web clients or AI models to command robotic actuators seamlessly on humanoid platforms (InMoov).',
    technologies: ['Rust', 'C++', 'ROS 2', 'ros2_control', 'Python', 'TypeScript', 'React', 'InMoov', 'Blender', 'URDF'],
    repository: 'https://github.com/Sentience-Robotics/lucy_ws',
    itemType: 'project',
  },
  {
    '@id': '/api/items/huri',
    id: 'huri',
    name: 'HuRI | Human-Robot Interaction',
    type: 'AI Cognition Framework',
    status: 'active',
    language: 'Python / ROS 2',
    description: 'The AI framework for Sentience Robotics focusing on Speech-to-Speech (S2S) pipelines, multi-layer cognitive memory (short, medium, and long-term), and kinematic grounding to ensure humanoid movements feel natural, expressive, and context-aware.',
    technologies: ['Python', 'Speech-to-Speech (S2S)', 'Cognitive Memory', 'Kinematics', 'ROS 2', 'AI Grounding'],
    repository: 'https://github.com/Sentience-Robotics/HuRI',
    itemType: 'project',
  },
  {
    '@id': '/api/items/lucy-control-panel',
    id: 'lucy-control-panel',
    name: 'Lucy Control Panel',
    type: 'Robotics Web Interface',
    status: 'active',
    language: 'TypeScript / React',
    description: 'Web-based control panel frontend and ROS 2 communication bridge for operating humanoid robotic platforms, commanding actuators, and monitoring telemetry in real time.',
    technologies: ['React', 'TypeScript', 'Vite', 'ROS 2', 'WebSocket', 'Material UI'],
    repository: 'https://github.com/Sentience-Robotics/lucy_control_panel',
    itemType: 'project',
  },
  {
    '@id': '/api/items/office-du-tourisme',
    id: 'office-du-tourisme',
    name: 'Office Du Tourisme',
    type: 'Web Application',
    status: 'completed',
    language: 'JavaScript',
    description: 'Game jam interactive Geoguessr-style web exploration game with Google Maps StreetView API integration.',
    technologies: ['JavaScript', 'Google Maps API', 'HTML5/CSS3'],
    repository: 'https://github.com/ASM-Studios/officeDuTourisme-Front',
    itemType: 'project',
  },
  {
    '@id': '/api/items/corewar',
    id: 'corewar',
    name: 'Corewar',
    type: 'System Programming',
    status: 'completed',
    language: 'C',
    description: 'Virtual arena machine and bytecode assembler where competing programs fight for survival in memory.',
    technologies: ['C', 'Assembly', 'Virtual Machine', 'Compiler Design'],
    repository: 'https://github.com/ASM-Studios/ASM-corewar',
    itemType: 'project',
  },
  {
    '@id': '/api/items/portfolio',
    id: 'portfolio',
    name: 'Portfolio',
    type: 'Web Application',
    status: 'active',
    language: 'TypeScript',
    description: 'Modern cyberpunk terminal portfolio featuring clean 60/30/10 tech styling, responsive layout, and i18n support.',
    technologies: ['React', 'TypeScript', 'Vite', 'MUI', 'i18n'],
    repository: 'https://github.com/Mael-RABOT/portfolio',
    itemType: 'project',
  },
  {
    '@id': '/api/items/pandoc',
    id: 'pandoc',
    name: 'Pandoc Parser',
    type: 'System Tool',
    status: 'completed',
    language: 'Haskell',
    description: 'Functional document format parser and converter implementation in Haskell with AST transformations.',
    technologies: ['Haskell', 'Functional Programming', 'Document Processing'],
    repository: 'https://github.com/Mael-RABOT/Pandoc',
    itemType: 'project',
  },
  {
    '@id': '/api/items/teams-clone',
    id: 'teams-clone',
    name: 'Teams TUI Clone',
    type: 'TUI Application',
    status: 'completed',
    language: 'C',
    description: 'Lightweight Microsoft Teams terminal user interface with multi-client network socket messaging.',
    technologies: ['C', 'TUI', 'BSD Sockets', 'Networking', 'Terminal'],
    repository: 'https://github.com/Mael-RABOT/microsoftTeams',
    itemType: 'project',
  },
  {
    '@id': '/api/items/ai-number-recognition',
    id: 'ai-number-recognition',
    name: 'AI Number Recognition',
    type: 'Machine Learning',
    status: 'completed',
    language: 'Python',
    description: 'Computer vision neural network pipeline for recognizing and classifying hand-drawn digits from scratch.',
    technologies: ['Python', 'Machine Learning', 'Computer Vision', 'Neural Networks'],
    repository: 'https://github.com/Mael-RABOT/AI_number_recognition',
    itemType: 'project',
  },
];
