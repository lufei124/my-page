import { SEOHead } from '@/components/seo/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
export default function HomePage() {
  return (
    <>
      <SEOHead
        title={siteConfig.title}
        description={siteConfig.description}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.author.name,
          url: absoluteUrl('/'),
          sameAs: [siteConfig.social.github].filter(Boolean),
        }}
      />
      <HeroSection />
      <ProjectGrid />
    </>
  );
}
