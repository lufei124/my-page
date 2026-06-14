import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const siteUrl = process.env.VITE_SITE_URL ?? 'https://yourdomain.com';
const base = siteUrl.replace(/\/$/, '');
const distDir = join(process.cwd(), 'dist');

const staticRoutes = ['/', '/projects/github-trend-agent', '/projects/last30days'];

const urls = staticRoutes.map((path) => `${base}${path === '/' ? '' : path}`);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>`;

writeFileSync(join(distDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap written with ${urls.length} URLs`);
