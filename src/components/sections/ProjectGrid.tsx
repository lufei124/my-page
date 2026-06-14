import { useMemo, useState } from 'react';
import { Tabs, Title, Divider } from 'animal-island-ui';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { useProjects } from '@/features/projects/hooks/useProjects';
import styles from './ProjectGrid.module.css';

export function ProjectGrid() {
  const projects = useProjects();
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['全部', ...Array.from(set).sort()];
  }, [projects]);

  const [activeKey, setActiveKey] = useState('全部');

  const tabItems = categories.map((cat) => {
    const items =
      cat === '全部' ? projects : projects.filter((p) => p.tags.includes(cat));

    return {
      key: cat,
      label: cat,
      children: (
        <div className={styles.grid}>
          {items.length === 0 ? (
            <p className={styles.empty}>暂无该分类的项目。</p>
          ) : (
            items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))
          )}
        </div>
      ),
    };
  });

  return (
    <section aria-label="项目展示">
      <Title size="large" color="app-blue">
        项目展示
      </Title>
      <Divider type="wave-yellow" />
      <Tabs
        items={tabItems}
        activeKey={activeKey}
        onChange={setActiveKey}
      />
    </section>
  );
}
