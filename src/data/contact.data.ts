/**
 * Public contact endpoints, shared by the navbar, footer, home and contact pages.
 */
export const CONTACT = {
  email: 'contact@maelrabot.com',
  github: 'https://github.com/Mael-RABOT',
  linkedin: 'https://linkedin.com/in/mael-rabot',
} as const;

/** Lucy-Robotics resources */
export const LUCY_LINKS = {
  site: 'https://lucy-robotics.com/',
  docs: 'https://docs.lucy-robotics.com/share/p1x9ikjkhf/p/public-documentation-EExgMX2REV',
  projects: 'https://projects.sentience-robotics.fr/',
  github: 'https://github.com/Lucy-Robotics',
  discord: 'https://discord.gg/g4KNZ3eeBd',
} as const;

export const RESUME_PDF = {
  en: { href: '/resume_en.pdf', fileName: 'Mael_RABOT_Resume_EN.pdf' },
  fr: { href: '/resume.pdf', fileName: 'Mael_RABOT_CV_FR.pdf' },
} as const;

/** Hosting provider, shown on the legal notice page (LCEN art. 6) */
export const HOSTING = {
  name: 'Oracle France SAS (Oracle Cloud Infrastructure)',
  address: '15 boulevard Charles de Gaulle, 92715 Colombes Cedex, France',
  phone: '+33 1 57 60 20 20',
  website: 'https://www.oracle.com/cloud/',
} as const;
