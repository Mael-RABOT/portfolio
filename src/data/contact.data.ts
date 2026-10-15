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
