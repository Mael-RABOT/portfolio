import { PortfolioItem } from '../services/portfolioApi';

/**
 * Local Education Registry
 * Add or edit your degrees and certifications here without needing any backend server.
 */
export const LOCAL_EDUCATIONS: PortfolioItem[] = [
  {
    '@id': '/api/items/epitech-master',
    id: 'epitech-master',
    name: "Master's Degree in Computer Science",
    degree: "Master's Degree in Computer Science",
    institution: 'Epitech Lyon',
    school: 'Epitech Lyon',
    company: 'Epitech Lyon',
    location: 'Lyon, France',
    startDate: '2022',
    endDate: '2027',
    duration: 'September 2022 - April 2027',
    description: 'Expert project-based higher education in software architecture, low-level systems programming, algorithms, and leadership.',
    bullets: [
      'Focus on C, C++, Unix System Programming, and Network Architecture',
      '3.2 GPA | School Ambassador',
      'Active Contributor to the Epitech Innovation Hub',
      'Advanced software architecture and team-based engineering projects',
    ],
    responsibilities: [
      'Focus on C, C++, Unix System Programming, and Network Architecture',
      '3.2 GPA | School Ambassador',
      'Active Contributor to the Epitech Innovation Hub',
    ],
    itemType: 'education',
  },
  {
    '@id': '/api/items/chung-ang-university',
    id: 'chung-ang-university',
    name: 'International Engineering Program',
    degree: 'International Engineering Program',
    institution: 'Chung-Ang University (CAU)',
    school: 'Chung-Ang University (CAU)',
    company: 'Chung-Ang University (CAU)',
    location: 'Seoul, South Korea',
    startDate: '2025',
    endDate: '2026',
    duration: 'August 2025 - June 2026',
    description: 'International exchange program immersed in advanced computer science coursework, collaborative research, and cross-cultural engineering.',
    bullets: [
      'Advanced computer science coursework in distributed systems and robotics',
      'International software development collaborations',
      'Korean language and immersive academic study',
    ],
    responsibilities: [
      'Advanced computer science coursework in distributed systems and robotics',
      'International software development collaborations',
    ],
    itemType: 'education',
  },
  {
    '@id': '/api/items/lycee-international',
    id: 'lycee-international',
    name: 'Scientific High School Diploma (Baccalauréat)',
    degree: 'Scientific High School Diploma (Baccalauréat)',
    institution: 'Lycée International de Ferney-Voltaire',
    school: 'Lycée International de Ferney-Voltaire',
    company: 'Lycée International de Ferney-Voltaire',
    location: 'Ferney-Voltaire, France',
    startDate: '2018',
    endDate: '2021',
    duration: 'September 2018 - June 2021',
    description: 'Rigorous scientific curriculum specializing in Mathematics, Computer Science, and international languages.',
    bullets: [
      'Specialization in Mathematics and Computer Science',
      'Bilingual and international secondary academic program',
      'President and delegate in student organizations',
    ],
    responsibilities: [
      'Specialization in Mathematics and Computer Science',
      'Bilingual and international secondary academic program',
    ],
    itemType: 'education',
  },
];
