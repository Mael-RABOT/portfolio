import { LOCAL_PROJECTS } from './projects.data';
import { LOCAL_EXPERIENCES } from './experiences.data';
import { LOCAL_EDUCATIONS } from './educations.data';
import { projectMedia } from './projectMedia';
import type { Language, PortfolioData, Project, Translatable } from './types';

/**
 * ============================================================================
 * LOCAL PORTFOLIO DATA HUB
 * ============================================================================
 *
 * To add or edit an item, edit the matching file in `src/data/`:
 *  - projects.data.ts, experiences.data.ts, educations.data.ts
 *
 * Every item is written in English. Add a `fr: { ... }` block with the
 * translated fields; anything left out falls back to English.
 */

const localize = <T extends { id: string }>(items: Translatable<T>[], lang: Language): T[] =>
  items.map(({ fr, ...item }) => (lang === 'fr' && fr ? { ...item, ...fr } : item) as T);

// Files in src/assets/projects/<id>/ come after any images listed in the data
const withMedia = (project: Project): Project => {
  const media = projectMedia(project.id, project.mediaAlt);
  return media.length ? { ...project, images: [...(project.images ?? []), ...media] } : project;
};

export const getPortfolioData = (lang: Language): PortfolioData => ({
  projects: localize(LOCAL_PROJECTS, lang).map(withMedia),
  experiences: localize(LOCAL_EXPERIENCES, lang),
  educations: localize(LOCAL_EDUCATIONS, lang),
});

export default getPortfolioData;
