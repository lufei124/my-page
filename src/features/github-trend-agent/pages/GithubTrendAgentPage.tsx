import { Link } from 'react-router-dom';
import { Button } from 'animal-island-ui';
import { SEOHead } from '@/components/seo/SEOHead';
import { TrendAgentShowcase } from '@/features/github-trend-agent/components/TrendAgentShowcase';
import { getProjectBySlug } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import styles from './GithubTrendAgentPage.module.css';

export default function GithubTrendAgentPage() {
  const project = getProjectBySlug('github-trend-agent');

  if (!project) {
    return null;
  }

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.summary}
        path="/projects/github-trend-agent"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: absoluteUrl('/projects/github-trend-agent'),
          datePublished: project.date,
        }}
      />
      <article className={styles.page}>
        <div className={styles.back}>
          <Link to="/">
            <Button type="default">返回首页</Button>
          </Link>
        </div>
        <TrendAgentShowcase project={project} />
      </article>
    </>
  );
}
