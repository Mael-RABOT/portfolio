import type { Language } from './types';
import { CONTACT, LUCY_LINKS } from './contact.data';

/**
 * Printable CV content (rendered at /cv/en and /cv/fr, exported to PDF by
 * `npm run cv:pdf`). Kept separate from the portfolio data because a CV is a
 * curated, condensed document: the French version must fit on ONE page
 * (the PDF script fails if it does not).
 */

export interface CvEntry {
  title: string;
  org?: string;
  url?: string;
  meta: string;
  summary?: string;
  bullets: string[];
}

export interface CvSkillGroup {
  label: string;
  items: string;
}

/** Full-width section of the continuation page (after the two-column first page) */
export interface CvExtraSection {
  title: string;
  entries?: CvEntry[];
  items?: string[];
}

export interface Cv {
  /**
   * 'main': projects stay in the main column (one-page CV).
   * 'nextPage': projects start a full-width second page, followed by `extra`.
   */
  projectsPlacement: 'main' | 'nextPage';
  extra?: CvExtraSection[];
  labels: {
    profile: string;
    experience: string;
    projects: string;
    education: string;
    skills: string;
    languages: string;
  };
  name: string;
  headline: string;
  location: string;
  profile: string;
  experience: CvEntry[];
  projects: CvEntry[];
  education: CvEntry[];
  skills: CvSkillGroup[];
  languages: string[];
}

export const CV_CONTACT = {
  email: CONTACT.email,
  website: 'maelrabot.com',
  linkedin: CONTACT.linkedin.replace('https://', ''),
  github: CONTACT.github.replace('https://', ''),
};

export const CV: Record<Language, Cv> = {
  // English: built from the portfolio data
  en: {
    projectsPlacement: 'nextPage',
    labels: {
      profile: 'Profile',
      experience: 'Experience',
      projects: 'Selected projects',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
    },
    name: 'Maël Rabot',
    headline: 'Software Engineer · Developer Mentoring & Robotics',
    location: 'Paris, France',
    profile: "Software engineer completing a Master's in Computer Science at Epitech. I mentor developers at Epitech International and co-founded Lucy-Robotics, where we build Lucy, an open-source framework that makes robots simpler to use: one platform, any robot. I enjoy low-level programming, object-oriented design, web development and robotics, and I like working in international, team-driven environments.",
    experience: [
      {
        title: 'Pedagogical Mentor',
        org: 'Epitech International',
        url: 'https://international.epitech.eu/',
        meta: 'Paris, France (on-site) · 2026 – Present · Fixed-term contract',
        bullets: [
          'Mentor 150+ international exchange students from 25 countries, alongside MSc 1 & 2 students, through project-based learning in English',
          'Run technical code reviews and project defenses across C, C++, Python, TypeScript/Vue.js, Elixir and DevOps',
          'Apply Socratic mentoring to build autonomy, architectural thinking and debugging skills rather than handing over solutions',
          'Evaluate software architecture, code quality, testing and design patterns; follow each student on organization, work habits and well-being',
          'Coordinate the program behind the scenes: activity schedules and liaison with Erasmus managers, French teachers and administration',
        ],
      },
      {
        title: 'Co-Founder & Product Manager',
        org: 'Lucy-Robotics',
        url: LUCY_LINKS.site,
        meta: 'Lyon, France · 2024 – Present · Non-profit association',
        bullets: [
          'Co-founded the association behind Lucy, an open-source robotics framework: one ROS 2 core between robots and the interfaces that drive them',
          'Lead the product roadmap and engineering teams: backlog prioritization, sprint planning and agile delivery with Kanban',
          'Contribute to the ROS 2 framework architecture and its technical documentation',
          'Drive open-source hardware integration and 3D-printed prototyping',
        ],
      },
      {
        title: 'Full Stack Developer',
        org: 'AudioWizard',
        url: 'https://audiowizard.fr/',
        meta: 'Lyon / Remote · July 2023 – August 2025 · Contract',
        bullets: [
          'Built and maintained SaaS products for hearing care professionals and their clinical workflows (TypeScript, Node.js, React)',
          'Administered PostgreSQL databases and optimized query performance',
          'Deployed a ForestAdmin back-office for internal operations',
          'Owned continuous integration and production maintenance (Docker)',
        ],
      },
      {
        title: 'Research & Development Developer',
        org: 'PoC Innovation Lab',
        url: 'https://poc-innovation.fr/',
        meta: 'Lyon, France · January 2023 – August 2023 · Student research association',
        bullets: [
          'Researched and prototyped deep learning models that turn images into musical scores (Python, PyTorch)',
          'Implemented convolutional neural networks and generative AI architectures; managed experimental datasets and data pipelines',
        ],
      },
      {
        title: 'Workshop Lead & Mentor',
        org: 'Coding Club',
        url: 'https://www.epitech.eu/inscription-atelier-programmation-informatique/',
        meta: 'Lyon, France · February 2023 – February 2025 · Association',
        bullets: [
          'Organized and hosted hands-on coding workshops in Python, C and web development for high-school students',
          'Mentored students through competitive programming and hackathon challenges; designed activities with educators',
        ],
      },
    ],
    projects: [
      {
        title: 'Lucy: open-source robotics framework',
        org: 'Lucy-Robotics',
        url: LUCY_LINKS.site,
        meta: 'Active · ROS 2, ros2_control, C++, Rust, Python, TypeScript, React · lucy-robotics.com',
        summary: '> One platform // Any robot. A common layer between robot hardware and the tools that drive it, so the same software works whatever the robot.',
        bullets: [
          'Core: all the ROS 2 logic in C++, Rust and Python; main packages lucy_ros_packages (built on ros2_control) and lucy_embedded_firmware',
          'lucy_ws: one workspace with Python scripts and installers, running in a few commands on macOS, Windows and Linux without Docker (pixi + RoboStack)',
          'Robots supported today: InMoov (open-source 3D-printed humanoid by Gaël Langevin) and the SO-101 arm; robot-agnostic by design',
          'Interfaces: Lucy Control Panel (React / TypeScript web app for real-time control and telemetry), a CLI, and any custom interface',
          'Open-source ecosystem: GPL-3.0 software, CC BY-NC hardware, public documentation, roadmap, issue tracking and Discord community',
        ],
      },
      {
        title: 'HuRI: human-robot interaction',
        org: 'Lucy-Robotics',
        url: 'https://github.com/Lucy-Robotics/HuRI',
        meta: 'Active · Python, ROS 2 · github.com/Lucy-Robotics/HuRI',
        bullets: [
          'AI framework for speech-to-speech conversation, multi-layer memory (short, medium, long term) and kinematic grounding, so robots converse and move naturally',
        ],
      },
      {
        title: 'R-Type: networked game engine',
        org: 'ASM Studios',
        url: 'https://github.com/ASM-Studios/R-Type',
        meta: 'C++, CMake, ECS · github.com/ASM-Studios/R-Type',
        bullets: ['Cross-platform ECS game engine recreating the arcade classic R-Type, with networked multiplayer'],
      },
      {
        title: 'AREA: automation platform',
        org: 'ASM Studios',
        url: 'https://github.com/ASM-Studios/AREA',
        meta: 'TypeScript, Vite, Go, Docker, OAuth2, 2FA · github.com/ASM-Studios/AREA',
        bullets: ['Recreation of the IFTTT action-reaction automation platform, with OAuth2 and two-factor authentication'],
      },
      {
        title: 'Not A Rhythm Game',
        url: 'https://github.com/Mael-RABOT/NotARhythmGame',
        meta: 'Active · C++, ImGui, GLFW, BASS · github.com/Mael-RABOT/NotARhythmGame',
        bullets: ['Open-source rhythm game inspired by Muse Dash, with a complete level editor and a custom audio engine'],
      },
      {
        title: 'Corewar',
        org: 'ASM Studios',
        url: 'https://github.com/ASM-Studios/ASM-corewar',
        meta: 'C, assembly, compiler design · github.com/ASM-Studios/ASM-corewar',
        bullets: ['Virtual machine arena and bytecode assembler where competing programs fight for survival in memory'],
      },
      {
        title: 'Pandoc Parser',
        url: 'https://github.com/Mael-RABOT/Pandoc',
        meta: 'Haskell, functional programming · github.com/Mael-RABOT/Pandoc',
        bullets: ['Document format parser and converter written in Haskell, built on AST transformations'],
      },
      {
        title: 'Teams TUI Clone',
        url: 'https://github.com/Mael-RABOT/microsoftTeams',
        meta: 'C, BSD sockets, networking · github.com/Mael-RABOT/microsoftTeams',
        bullets: ['Lightweight terminal clone of Microsoft Teams with multi-client messaging over network sockets'],
      },
      {
        title: 'AI Number Recognition',
        url: 'https://github.com/Mael-RABOT/AI_number_recognition',
        meta: 'Python, machine learning, computer vision · github.com/Mael-RABOT/AI_number_recognition',
        bullets: ['Neural network built from scratch to recognize and classify hand-drawn digits'],
      },
    ],
    extra: [
      {
        title: 'Other experience',
        entries: [
          {
            title: 'Delegate',
            org: 'Model United Nations (FerMUN)',
            url: 'https://fermun.org/en/',
            meta: 'Ferney-Voltaire / Geneva (UN) · September 2019 – June 2021',
            bullets: [
              'Represented delegations in debates held at the ITU and the UN in Geneva on international technology and sustainability policy',
              'Public speaking and diplomatic negotiation in English and French; drafted multilateral resolutions and position papers',
            ],
          },
        ],
      },
      {
        title: 'Interests',
        items: ['Robotics & 3D printing', 'Open source', 'Mentoring', 'Aviation', 'Game development & graphics programming'],
      },
    ],
    education: [
      {
        title: "Master's in Computer Science",
        org: 'Epitech Lyon',
        meta: '2022 – 2027',
        bullets: ['C/C++, Unix system programming, network architecture · 3.2 GPA · School ambassador · Innovation Hub contributor'],
      },
      {
        title: 'International Engineering Program',
        org: 'Chung-Ang University, Seoul',
        meta: '2025 – 2026',
        bullets: ['Exchange year: distributed systems, robotics'],
      },
      {
        title: 'Scientific Baccalaureate',
        org: 'Lycée International de Ferney-Voltaire',
        meta: '2018 – 2021',
        bullets: [],
      },
    ],
    skills: [
      { label: 'Languages', items: 'C, C++, Python, TypeScript, JavaScript, Rust, Go, Elixir, Haskell, SQL, Bash' },
      { label: 'Web', items: 'React, Vue.js, Node.js, Vite' },
      { label: 'Robotics', items: 'ROS 2, ros2_control, URDF, InMoov, 3D printing' },
      { label: 'Data, AI & tools', items: 'PostgreSQL, MariaDB, PyTorch, Git, Docker, CI, Agile' },
      { label: 'Engineering', items: 'Software architecture, code review, OOP, ECS, networking' },
      { label: 'Soft skills', items: 'Mentoring, teamwork, autonomy, problem solving' },
    ],
    languages: ['French: native', 'English: C1 (professional)'],
  },

  // French: same source as the English CV (portfolio data), condensed to fit on ONE page
  fr: {
    projectsPlacement: 'main',
    labels: {
      profile: 'Profil',
      experience: 'Expérience',
      projects: 'Projet phare',
      education: 'Formation',
      skills: 'Compétences',
      languages: 'Langues',
    },
    name: 'Maël Rabot',
    headline: 'Ingénieur logiciel · Mentorat de développeurs & robotique',
    location: 'Paris, France',
    profile: "Ingénieur logiciel en fin de Master informatique à Epitech. J'accompagne les étudiants d'Epitech International dans leurs projets et j'ai co-fondé Lucy-Robotics, qui développe Lucy, un framework open source qui simplifie l'utilisation des robots : une plateforme, n'importe quel robot. J'aime la programmation bas niveau, la conception orientée objet, le développement web et la robotique.",
    experience: [
      {
        title: 'Mentor pédagogique',
        org: 'Epitech International',
        url: 'https://international.epitech.eu/',
        meta: 'Paris (sur site) · 2026 – Aujourd\'hui · CDD',
        bullets: [
          'Accompagnement de 150+ étudiants en échange venus de 25 pays et d\'étudiants en MSc 1 & 2, par projets et en anglais',
          'Revues de code et soutenances en C, C++, Python, TypeScript/Vue.js, Elixir et DevOps ; mentorat socratique',
          'Coordination du programme : plannings d\'activités, lien avec les responsables Erasmus, professeurs de français et l\'administration',
        ],
      },
      {
        title: 'Co-fondateur & Product Manager',
        org: 'Lucy-Robotics',
        url: LUCY_LINKS.site,
        meta: 'Lyon · 2024 – Aujourd\'hui · Association loi 1901',
        bullets: [
          'Pilotage de la feuille de route produit et des équipes : priorisation du backlog, sprints, Kanban',
          'Contribution à l\'architecture du framework ROS 2, à sa documentation et au prototypage matériel en impression 3D',
        ],
      },
      {
        title: 'Développeur Full Stack',
        org: 'AudioWizard',
        url: 'https://audiowizard.fr/',
        meta: 'Lyon / Télétravail · Juillet 2023 – Août 2025 · Contrat',
        bullets: [
          'Développement et maintenance de solutions SaaS pour les audioprothésistes (TypeScript, Node.js, React)',
          'Administration PostgreSQL et optimisation des requêtes ; déploiement d\'un back-office ForestAdmin',
          'Intégration continue et maintenance en production (Docker)',
        ],
      },
      {
        title: 'Développeur Recherche & Développement',
        org: 'PoC Innovation Lab',
        url: 'https://poc-innovation.fr/',
        meta: 'Lyon · Janvier 2023 – Août 2023 · Association étudiante',
        bullets: [
          'Prototypage de modèles de deep learning transformant des images en partitions (Python, PyTorch, CNN, IA générative)',
        ],
      },
      {
        title: 'Animateur d\'ateliers & mentor',
        org: 'Coding Club',
        url: 'https://www.epitech.eu/inscription-atelier-programmation-informatique/',
        meta: 'Lyon · Février 2023 – Février 2025 · Association',
        bullets: [
          'Ateliers de programmation (Python, C, web) pour lycéens ; accompagnement en hackathons et défis de programmation',
        ],
      },
    ],
    projects: [
      {
        title: 'Lucy : framework robotique open source',
        org: 'Lucy-Robotics',
        url: LUCY_LINKS.site,
        meta: 'ROS 2, ros2_control, C++, Rust, Python, TypeScript, React · lucy-robotics.com',
        summary: '> Une plateforme // N\'importe quel robot. Une couche commune entre le matériel et les outils qui le pilotent.',
        bullets: [
          'Cœur ROS 2 (lucy_ros_packages, lucy_embedded_firmware) ; installation en quelques commandes sur macOS, Windows et Linux, sans Docker',
          'Robots : InMoov et bras SO-101 ; interfaces : Lucy Control Panel (application web React), CLI, framework d\'IA HuRI',
        ],
      },
    ],
    education: [
      {
        title: 'Master en informatique',
        org: 'Epitech Lyon',
        meta: '2022 – 2027',
        bullets: ['C/C++, programmation système Unix, réseau · GPA 3,2 · Ambassadeur de l\'école'],
      },
      {
        title: 'Programme international d\'ingénierie',
        org: 'Université Chung-Ang, Séoul',
        meta: '2025 – 2026',
        bullets: ['Année d\'échange : systèmes distribués, robotique'],
      },
      {
        title: 'Baccalauréat scientifique',
        org: 'Lycée International de Ferney-Voltaire',
        meta: '2018 – 2021',
        bullets: [],
      },
    ],
    skills: [
      { label: 'Langages', items: 'C, C++, Python, TypeScript, JavaScript, Rust, Go, Elixir, Haskell, SQL, Bash' },
      { label: 'Web', items: 'React, Vue.js, Node.js, Vite' },
      { label: 'Robotique', items: 'ROS 2, ros2_control, URDF, InMoov, impression 3D' },
      { label: 'Données, IA & outils', items: 'PostgreSQL, MariaDB, PyTorch, Git, Docker, CI, Agile' },
      { label: 'Ingénierie', items: 'Architecture logicielle, revue de code, POO, ECS, réseau' },
      { label: 'Savoir-être', items: 'Mentorat, travail d\'équipe, autonomie, résolution de problèmes' },
    ],
    languages: ['Français : natif', 'Anglais : C1 (professionnel)'],
  },
};
