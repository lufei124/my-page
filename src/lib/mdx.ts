import type { Project } from '@/types/content';

interface MdxModule {
  default: Project['Content'];
  frontmatter?: Record<string, unknown>;
}

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
}

function parseProject(mod: MdxModule, slug: string): Project {
  const fm = mod.frontmatter ?? {};
  return {
    slug,
    title: String(fm.title ?? slug),
    date: String(fm.date ?? ''),
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
    featured: Boolean(fm.featured),
    cover: fm.cover ? String(fm.cover) : undefined,
    cardColor: fm.cardColor as Project['cardColor'],
    links: fm.links as Project['links'],
    summary: String(fm.summary ?? ''),
    Content: mod.default,
  };
}

const projectModules = import.meta.glob('../../content/projects/*.mdx', {
  eager: true,
}) as Record<string, MdxModule>;

export function getAllProjects(): Project[] {
  return Object.entries(projectModules)
    .map(([path, mod]) => parseProject(mod, slugFromPath(path)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllTags(items: { tags: string[] }[]): string[] {
  const tags = new Set<string>();
  items.forEach((item) => item.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}
