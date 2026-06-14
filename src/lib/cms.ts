/**
 * CMS adapter placeholder — set VITE_CONTENT_SOURCE=mdx|cms
 */
export type ContentSource = 'mdx' | 'cms';

export function getContentSource(): ContentSource {
  const source = import.meta.env.VITE_CONTENT_SOURCE;
  return source === 'cms' ? 'cms' : 'mdx';
}
