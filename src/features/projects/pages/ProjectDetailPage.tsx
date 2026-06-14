import { Link, useParams } from 'react-router-dom';
import { Button, Card, Divider, Title } from 'animal-island-ui';
import { SEOHead } from '@/components/seo/SEOHead';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import { getProjectBySlug } from '@/lib/mdx';
import { formatDate, absoluteUrl } from '@/lib/seo';
import styles from './ProjectDetailPage.module.css';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Card type="dashed">
        <Title>项目未找到</Title>
        <Link to="/projects">
          <Button type="primary">返回列表</Button>
        </Link>
      </Card>
    );
  }

  const { Content } = project;

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.summary}
        path={`/projects/${project.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: absoluteUrl(`/projects/${project.slug}`),
          datePublished: project.date,
        }}
      />
      <article className={styles.article}>
        <Title size="large" color="app-blue">
          {project.title}
        </Title>
        <p className={styles.meta}>{formatDate(project.date)}</p>
        <Divider type="wave-yellow" />
        <div className={styles.content}>
          <Content components={mdxComponents} />
        </div>
        <div className={styles.actions}>
          <Link to="/projects">
            <Button type="default">返回项目</Button>
          </Link>
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer">
              <Button type="primary">GitHub</Button>
            </a>
          )}
        </div>
      </article>
    </>
  );
}
