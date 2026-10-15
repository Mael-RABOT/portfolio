import type { Education, Translatable } from './types';

/**
 * Education, most recent first.
 */
export const LOCAL_EDUCATIONS: Translatable<Education>[] = [
  {
    id: 'epitech-master',
    degree: "Master's Degree in Computer Science",
    institution: 'Epitech Lyon',
    location: 'Lyon, France',
    duration: 'September 2022 – April 2027',
    description: 'Project-based higher education in software architecture, low-level systems programming, algorithms and leadership.',
    highlights: [
      'Focus on C, C++, Unix system programming and network architecture',
      '3.2 GPA · School ambassador',
      'Active contributor to the Epitech Innovation Hub',
      'Advanced software architecture and team-based engineering projects',
    ],
    fr: {
      degree: 'Master en informatique',
      duration: 'Septembre 2022 – Avril 2027',
      description: 'Formation par projets en architecture logicielle, programmation système bas niveau, algorithmique et leadership.',
      highlights: [
        'Spécialisation en C, C++, programmation système Unix et architecture réseau',
        'GPA de 3,2 · Ambassadeur de l\'école',
        'Contributeur actif au Hub Innovation d\'Epitech',
        'Projets d\'équipe avancés en architecture logicielle',
      ],
    },
  },
  {
    id: 'chung-ang-university',
    degree: 'International Engineering Program',
    institution: 'Chung-Ang University (CAU)',
    location: 'Seoul, South Korea',
    duration: 'August 2025 – June 2026',
    description: 'International exchange year with advanced computer science coursework, collaborative research and cross-cultural engineering.',
    highlights: [
      'Advanced coursework in distributed systems and robotics',
      'International software development collaborations',
      'Korean language and immersive academic study',
    ],
    fr: {
      degree: 'Programme international d\'ingénierie',
      location: 'Séoul, Corée du Sud',
      duration: 'Août 2025 – Juin 2026',
      description: 'Année d\'échange international : cours avancés en informatique, recherche collaborative et ingénierie interculturelle.',
      highlights: [
        'Cours avancés en systèmes distribués et en robotique',
        'Collaborations internationales en développement logiciel',
        'Apprentissage du coréen et immersion universitaire',
      ],
    },
  },
  {
    id: 'lycee-international',
    degree: 'Scientific High School Diploma (Baccalauréat)',
    institution: 'Lycée International de Ferney-Voltaire',
    location: 'Ferney-Voltaire, France',
    duration: 'September 2018 – June 2021',
    description: 'Scientific curriculum specialising in mathematics, computer science and international languages.',
    highlights: [
      'Specialisation in mathematics and computer science',
      'Bilingual, international secondary programme',
      'President and delegate in student organisations',
    ],
    fr: {
      degree: 'Baccalauréat scientifique',
      duration: 'Septembre 2018 – Juin 2021',
      description: 'Parcours scientifique avec spécialités mathématiques, informatique et langues internationales.',
      highlights: [
        'Spécialités mathématiques et informatique',
        'Section bilingue et internationale',
        'Président et délégué d\'associations lycéennes',
      ],
    },
  },
];
