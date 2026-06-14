import type { Project } from '@/types/content';

export function resolveProjectLink(
  project: Project,
): { href: string; external: boolean } | null {
  const href = project.links?.demo ?? project.links?.github;
  if (!href) return null;

  return {
    href,
    external: /^https?:\/\//.test(href),
  };
}
