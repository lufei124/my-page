import { Link } from 'react-router-dom';
import { Button, Title, Typewriter } from 'animal-island-ui';
import { siteConfig } from '@/lib/site';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="欢迎">
      <Title size="large" color="app-yellow">
        {siteConfig.title}
      </Title>
      <div className={styles.intro}>
        <Typewriter speed={45}>
          <p>{siteConfig.description}</p>
        </Typewriter>
      </div>
      <div className={styles.actions}>
        <Link to="/projects">
          <Button type="primary" size="large">
            查看项目
          </Button>
        </Link>
        <Link to="/about">
          <Button type="dashed" size="large">
            认识我
          </Button>
        </Link>
      </div>
    </section>
  );
}
