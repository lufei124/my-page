import { Link } from 'react-router-dom';
import { Button } from 'animal-island-ui';
import { SEOHead } from '@/components/seo/SEOHead';
import { Last30DaysShowcase } from '@/features/last30days/components/Last30DaysShowcase';
import { getProjectBySlug } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import styles from './Last30DaysPage.module.css';

export default function Last30DaysPage() {
  const project = getProjectBySlug('last30days');

  if (!project) {
    return null;
  }

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.summary}
        path="/projects/last30days"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: absoluteUrl('/projects/last30days'),
          datePublished: project.date,
        }}
      />
      <article className={styles.page}>
        <Last30DaysShowcase project={project} />
        <div className={styles.back}>
          <Link to="/">
            <Button type="default">返回首页</Button>
          </Link>
        </div>
      </article>
    </>
  );
}
