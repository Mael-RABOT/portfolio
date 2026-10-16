import type { Project, Translatable } from './types';
import { LUCY_LINKS } from './contact.data';

/**
 * Projects, shown in this order on the Projects page.
 */
export const LOCAL_PROJECTS: Translatable<Project>[] = [
  {
    id: 'lucy',
    name: 'Lucy',
    type: 'Robotics framework',
    status: 'active',
    stack: 'ROS 2 / C++ / Rust / Python / TypeScript / React',
    description: `> One platform // Any robot

Lucy is an open-source robotics framework that makes robots simpler to use: one ROS 2 core between the robots and the interfaces that drive them.

How it fits together:
• Core: runs all the ROS 2 logic in C++, Rust and Python. The main packages are lucy_ros_packages (built on ros2_control) and lucy_embedded_firmware.
• lucy_ws: the workspace that pulls everything together, with Python scripts and installers. A few commands get it running on macOS, Windows or Linux, without Docker (pixi + RoboStack).
• Robots: InMoov (the open-source humanoid by Gaël Langevin) and the SO-101 arm today, with more to come.
• Interfaces: the Lucy Control Panel (web app) and a CLI ship with Lucy, and any other interface can be plugged in or built, since everything is open source.

Software is licensed under GPL-3.0; hardware contributions follow InMoov's CC BY-NC licence.`,
    technologies: ['ROS 2', 'ros2_control', 'C++', 'Rust', 'Python', 'TypeScript', 'React', 'pixi', 'RoboStack', 'URDF', 'InMoov', 'SO-101'],
    repository: LUCY_LINKS.github,
    links: [
      { url: LUCY_LINKS.site, label: 'Website' },
      { url: LUCY_LINKS.docs, label: 'Public documentation' },
      { url: LUCY_LINKS.projects, label: 'Roadmap & development cycle' },
      { url: 'https://github.com/Lucy-Robotics/lucy_ws', label: 'Lucy workspace (lucy_ws)' },
      { url: 'https://github.com/Lucy-Robotics/lucy_control_panel', label: 'Lucy Control Panel' },
      { url: LUCY_LINKS.discord, label: 'Community Discord' },
    ],
    highlights: [
      'Architecting a modular, robot-agnostic framework on ROS 2',
      'Hardware abstraction in C++ with ros2_control for real-time actuator control',
      'Lucy Control Panel and CLI as ready-to-use interfaces',
      'Open-source community, public documentation, roadmap and issue tracking',
    ],
    fr: {
      type: 'Framework robotique',
      description: `> Une plateforme // N'importe quel robot

Lucy est un framework robotique open source qui simplifie l'utilisation des robots : un seul cœur ROS 2 entre les robots et les interfaces qui les pilotent.

Comment ça s'articule :
• Le cœur : il exécute toute la logique ROS 2 en C++, Rust et Python. Les principaux packages sont lucy_ros_packages (basé sur ros2_control) et lucy_embedded_firmware.
• lucy_ws : le workspace qui rassemble tout, avec scripts Python et installeurs. Quelques commandes suffisent pour le lancer sur macOS, Windows ou Linux, sans Docker (pixi + RoboStack).
• Les robots : InMoov (l'humanoïde open source de Gaël Langevin) et le bras SO-101 aujourd'hui, et d'autres à venir.
• Les interfaces : le Lucy Control Panel (application web) et une CLI sont fournis avec Lucy, et n'importe quelle autre interface peut être branchée ou développée, puisque tout est open source.

Le logiciel est sous licence GPL-3.0 ; les contributions matérielles suivent la licence CC BY-NC d'InMoov.`,
      links: [
        { url: LUCY_LINKS.site, label: 'Site web' },
        { url: LUCY_LINKS.docs, label: 'Documentation publique' },
        { url: LUCY_LINKS.projects, label: 'Feuille de route & cycle de développement' },
        { url: 'https://github.com/Lucy-Robotics/lucy_ws', label: 'Workspace Lucy (lucy_ws)' },
        { url: 'https://github.com/Lucy-Robotics/lucy_control_panel', label: 'Lucy Control Panel' },
        { url: LUCY_LINKS.discord, label: 'Discord de la communauté' },
      ],
      highlights: [
        'Architecture d\'un framework modulaire et indépendant du robot, basé sur ROS 2',
        'Abstraction matérielle en C++ avec ros2_control pour le contrôle temps réel des actionneurs',
        'Lucy Control Panel et CLI comme interfaces prêtes à l\'emploi',
        'Communauté open source, documentation publique, feuille de route et suivi des tickets',
      ],
    },
  },
  {
    id: 'huri',
    name: 'HuRI | Human-Robot Interaction',
    type: 'AI framework',
    status: 'active',
    stack: 'Python / ROS 2',
    description: 'AI framework developed at Lucy-Robotics for human-robot interaction: speech-to-speech pipelines, multi-layer memory (short, medium and long term) and kinematic grounding, so robots can converse and move in a natural, context-aware way.',
    technologies: ['Python', 'Speech-to-Speech', 'Cognitive memory', 'Kinematics', 'ROS 2'],
    repository: 'https://github.com/Lucy-Robotics/HuRI',
    fr: {
      name: 'HuRI | Interaction humain-robot',
      type: 'Framework d\'IA',
      description: 'Framework d\'IA développé chez Lucy-Robotics pour l\'interaction humain-robot : conversation vocale (speech-to-speech), mémoire multi-niveaux (court, moyen et long terme) et ancrage cinématique, pour que les robots dialoguent et bougent de manière naturelle et adaptée au contexte.',
      technologies: ['Python', 'Speech-to-Speech', 'Mémoire cognitive', 'Cinématique', 'ROS 2'],
    },
  },
  {
    id: 'not-a-rhythm-game',
    name: 'Not A Rhythm Game',
    type: 'Desktop game',
    status: 'completed',
    stack: 'C++',
    description: 'Open-source rhythm game inspired by Muse Dash, with a complete level editor and a custom audio engine.',
    technologies: ['C++', 'ImGui', 'GLFW', 'BASS'],
    repository: 'https://github.com/Mael-RABOT/NotARhythmGame',
    fr: {
      type: 'Jeu PC',
      description: 'Jeu de rythme open source inspiré de Muse Dash, avec un éditeur de niveaux complet et un moteur audio maison.',
    },
  },
  {
    id: 'ast3roid',
    name: 'Ast3roid',
    type: 'Desktop game',
    status: 'completed',
    stack: 'Rust / Bevy',
    description: 'Small spaceship game inspired by the arcade classic Asteroids, made entirely in Rust with the Bevy engine. Developed as part of the "Design of a Game Software" course at Chung-Ang University, Seoul.',
    technologies: ['Rust', 'Bevy', 'Blender', 'Texturing', 'Lighting', 'SFX / VFX', 'Game design'],
    demo: 'https://mael-rabot.itch.io/ast3roid',
    links: [
      { url: 'https://mael-rabot.itch.io/ast3roid', label: 'Play on itch.io' },
      { url: 'https://www.cau.ac.kr/', label: 'Chung-Ang University' },
    ],
    highlights: [
      'Game design and most of the asset creation',
      '3D modelling and texturing in Blender',
      'Work on the lighting system',
      'Some sound and visual effects (SFX / VFX)',
    ],
    fr: {
      type: 'Jeu PC',
      description: 'Petit jeu de vaisseau spatial inspiré du classique d\'arcade Asteroids, entièrement réalisé en Rust avec le moteur Bevy. Développé dans le cadre du cours « Design of a Game Software » à l\'université Chung-Ang de Séoul.',
      technologies: ['Rust', 'Bevy', 'Blender', 'Texturing', 'Éclairage', 'SFX / VFX', 'Game design'],
      links: [
        { url: 'https://mael-rabot.itch.io/ast3roid', label: 'Jouer sur itch.io' },
        { url: 'https://www.cau.ac.kr/', label: 'Université Chung-Ang' },
      ],
      highlights: [
        'Game design et la majeure partie de la création des assets',
        'Modélisation 3D et texturing sous Blender',
        'Travail sur le système d\'éclairage',
        'Quelques effets sonores et visuels (SFX / VFX)',
      ],
    },
  },
  {
    id: 'area',
    name: 'AREA',
    type: 'Web application',
    status: 'completed',
    stack: 'TypeScript / Go',
    description: 'Recreation of the IFTTT action-reaction automation platform, with OAuth2 and two-factor authentication.',
    technologies: ['Vite', 'TypeScript', 'Go', 'OAuth2', '2FA', 'Docker'],
    repository: 'https://github.com/ASM-Studios/AREA',
    fr: {
      type: 'Application web',
      description: 'Reproduction de la plateforme d\'automatisation action-réaction IFTTT, avec authentification OAuth2 et double facteur.',
    },
  },
  {
    id: 'r-type',
    name: 'R-Type',
    type: 'Game engine',
    status: 'completed',
    stack: 'C++',
    description: 'Cross-platform ECS game engine recreating the arcade classic R-Type, with networked multiplayer.',
    technologies: ['C++', 'CMake', 'Cross-platform', 'ECS architecture'],
    repository: 'https://github.com/ASM-Studios/R-Type',
    fr: {
      type: 'Moteur de jeu',
      description: 'Moteur de jeu ECS multiplateforme recréant le classique d\'arcade R-Type, avec multijoueur en réseau.',
      technologies: ['C++', 'CMake', 'Multiplateforme', 'Architecture ECS'],
    },
  },
  {
    id: 'office-du-tourisme',
    name: 'Office Du Tourisme',
    type: 'Web application',
    status: 'completed',
    stack: 'JavaScript',
    description: 'Game-jam project: a GeoGuessr-style exploration game built on the Google Maps Street View API.',
    technologies: ['JavaScript', 'Google Maps API', 'HTML5 / CSS3'],
    repository: 'https://github.com/ASM-Studios/officeDuTourisme-Front',
    fr: {
      type: 'Application web',
      description: 'Projet de game jam : un jeu d\'exploration façon GeoGuessr basé sur l\'API Google Maps Street View.',
    },
  },
  {
    id: 'corewar',
    name: 'Corewar',
    type: 'System programming',
    status: 'completed',
    stack: 'C',
    description: 'Virtual machine arena and bytecode assembler where competing programs fight for survival in memory.',
    technologies: ['C', 'Assembly', 'Virtual machine', 'Compiler design'],
    repository: 'https://github.com/ASM-Studios/ASM-corewar',
    fr: {
      type: 'Programmation système',
      description: 'Arène de machine virtuelle et assembleur de bytecode où des programmes s\'affrontent pour survivre en mémoire.',
      technologies: ['C', 'Assembleur', 'Machine virtuelle', 'Compilation'],
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    type: 'Web application',
    status: 'active',
    stack: 'TypeScript / React',
    description: 'This website: a dark, minimalist portfolio with a token-based theme, scroll animations and English/French support.',
    technologies: ['React', 'TypeScript', 'Vite', 'MUI', 'Framer Motion', 'i18next'],
    repository: 'https://github.com/Mael-RABOT/portfolio',
    fr: {
      type: 'Application web',
      description: 'Ce site : un portfolio sombre et minimaliste, avec un thème basé sur des tokens, des animations au scroll et une version anglaise/française.',
    },
  },
  {
    id: 'pandoc',
    name: 'Pandoc Parser',
    type: 'System tool',
    status: 'completed',
    stack: 'Haskell',
    description: 'Document format parser and converter written in Haskell, built on AST transformations.',
    technologies: ['Haskell', 'Functional programming', 'Document processing'],
    repository: 'https://github.com/Mael-RABOT/Pandoc',
    fr: {
      type: 'Outil système',
      description: 'Parseur et convertisseur de formats de documents écrit en Haskell, basé sur des transformations d\'AST.',
      technologies: ['Haskell', 'Programmation fonctionnelle', 'Traitement de documents'],
    },
  },
  {
    id: 'teams-clone',
    name: 'Teams TUI Clone',
    type: 'Terminal application',
    status: 'completed',
    stack: 'C',
    description: 'Lightweight terminal clone of Microsoft Teams with multi-client messaging over network sockets.',
    technologies: ['C', 'TUI', 'BSD sockets', 'Networking'],
    repository: 'https://github.com/Mael-RABOT/microsoftTeams',
    fr: {
      type: 'Application terminal',
      description: 'Clone léger de Microsoft Teams en terminal, avec messagerie multi-clients via sockets réseau.',
      technologies: ['C', 'TUI', 'Sockets BSD', 'Réseau'],
    },
  },
  {
    id: 'ai-number-recognition',
    name: 'AI Number Recognition',
    type: 'Machine learning',
    status: 'completed',
    stack: 'Python',
    description: 'Neural network built from scratch to recognise and classify hand-drawn digits.',
    technologies: ['Python', 'Machine learning', 'Computer vision', 'Neural networks'],
    repository: 'https://github.com/Mael-RABOT/AI_number_recognition',
    fr: {
      name: 'Reconnaissance de chiffres par IA',
      type: 'Machine learning',
      description: 'Réseau de neurones codé from scratch pour reconnaître et classer des chiffres dessinés à la main.',
      technologies: ['Python', 'Machine learning', 'Vision par ordinateur', 'Réseaux de neurones'],
    },
  },
];
