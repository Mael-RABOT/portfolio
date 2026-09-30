import { PortfolioItem } from '../services/portfolioApi';
import { LOCAL_PROJECTS } from './projects.data';
import { LOCAL_EXPERIENCES } from './experiences.data';
import { LOCAL_EDUCATIONS } from './educations.data';

/**
 * ============================================================================
 * LOCAL PORTFOLIO DATA HUB
 * ============================================================================
 * 
 * To add a new item to your portfolio locally without needing any server:
 * 1. For a new project: edit `src/data/projects.data.ts` and add an entry.
 * 2. For a new job experience: edit `src/data/experiences.data.ts` and add an entry.
 * 3. For a new education/degree: edit `src/data/educations.data.ts` and add an entry.
 * 
 * Everything is fully typed with TypeScript and immediately available across
 * the entire application without any network latency or external dependencies.
 */

export interface PortfolioDataCollection {
  projects: PortfolioItem[];
  experiences: PortfolioItem[];
  educations: PortfolioItem[];
}

export const getProjects = (): PortfolioItem[] => {
  return [...LOCAL_PROJECTS];
};

export const getExperiences = (): PortfolioItem[] => {
  return [...LOCAL_EXPERIENCES];
};

export const getEducations = (): PortfolioItem[] => {
  return [...LOCAL_EDUCATIONS];
};

export const getAllPortfolioData = (): PortfolioDataCollection => {
  return {
    projects: getProjects(),
    experiences: getExperiences(),
    educations: getEducations(),
  };
};

export default getAllPortfolioData;
