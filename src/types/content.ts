import type { ComponentType } from 'react';
import type { CardColor } from 'animal-island-ui';

export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface ProjectFrontmatter {
  title: string;
  date: string;
  tags: string[];
  featured?: boolean;
  cover?: string;
  cardColor?: CardColor;
  links?: ProjectLinks;
  summary: string;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  Content: ComponentType;
}
