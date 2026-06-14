import { siteConfig } from '../../site.config';

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(siteConfig.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
