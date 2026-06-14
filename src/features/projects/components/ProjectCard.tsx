import { Link } from 'react-router-dom';
import { Card, Title } from 'animal-island-ui';
import type { Project } from '@/types/content';
import { resolveCardColor, resolveCardPattern } from '../utils/cardTheme';
import { resolveProjectLink } from '../utils/projectLink';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const color = resolveCardColor(project);
  const pattern = resolveCardPattern(project);
  const link = resolveProjectLink(project);

  const card = (
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
    </Card>
  );

  if (!link) {
    return card;
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        className={styles.cardLink}
        target="_blank"
        rel="noreferrer"
        aria-label={`打开 ${project.title}`}
      >
        {card}
      </a>
    );
  }

  return (
    <Link
      to={link.href}
      className={styles.cardLink}
      aria-label={`打开 ${project.title}`}
    >
      {card}
    </Link>
  );
}
