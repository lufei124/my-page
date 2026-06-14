import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({
  title,
  description = siteConfig.description,
  image = '/og-default.svg',
  path = '/',
  type = 'website',
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
