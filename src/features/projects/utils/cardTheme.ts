import type { CardColor, CardProps } from 'animal-island-ui';
import { siteConfig } from '@/lib/site';
import type { Project } from '@/types/content';

type CardPattern = NonNullable<CardProps['pattern']>;

export function resolveCardColor(project: Project): CardColor {
  if (project.cardColor) return project.cardColor;
  for (const tag of project.tags) {
    const mapped = siteConfig.cardColorByTag[tag as keyof typeof siteConfig.cardColorByTag];
    if (mapped) return mapped;
  }
  return siteConfig.defaultCardColor;
}

export function resolveCardPattern(project: Project): CardPattern | undefined {
  if (project.featured) return siteConfig.featuredPattern;
  return undefined;
}
