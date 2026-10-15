export type Language = 'en' | 'fr';

export interface Link {
  url: string;
  label: string;
}

export interface Image {
  url: string;
  alt?: string;
}

interface BaseItem {
  id: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  links?: Link[];
  images?: Image[];
  /** Small key/value facts, displayed as a grid */
  facts?: Record<string, string>;
  location?: string;
  duration?: string;
}

export interface Experience extends BaseItem {
  position: string;
  company: string;
  /** Company / organisation website, the company name links to it */
  website?: string;
  contractType?: string;
}

export interface Education extends BaseItem {
  degree: string;
  institution: string;
}

export interface Project extends BaseItem {
  name: string;
  type?: string;
  status?: 'active' | 'completed' | 'archived';
  stack?: string;
  repository?: string;
  demo?: string;
}

/**
 * An item written in English, with an optional French override.
 * Only the fields that change need to be listed in `fr`.
 */
export type Translatable<T extends { id: string }> = T & {
  fr?: Partial<Omit<T, 'id'>>;
};

export interface PortfolioData {
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
}
