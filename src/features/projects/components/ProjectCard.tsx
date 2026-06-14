import { Link } from 'react-router-dom';
import { Button, Card, Title } from 'animal-island-ui';
import type { Project } from '@/types/content';
import { resolveCardColor, resolveCardPattern } from '../utils/cardTheme';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const color = resolveCardColor(project);
  const pattern = resolveCardPattern(project);

  return (
    <Card
      color={color}
      pattern={pattern ?? 'none'}
      className={styles.card}
    >
      {project.cover && (
        <img
          src={project.cover}
          alt=""
          className={styles.cover}
          loading="lazy"
        />
      )}
      <Title size="small" color={color === 'default' ? 'app-blue' : color}>
        {project.title}
      </Title>
      <p className={styles.summary}>{project.summary}</p>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        <Link to={`/projects/${project.slug}`}>
          <Button type="primary" size="small">
            详情
          </Button>
        </Link>
        {project.links?.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer">
            <Button type="link" size="small">
              GitHub
            </Button>
          </a>
        )}
        {project.links?.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer">
            <Button type="dashed" size="small">
              Demo
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
}
