import { Title, Typewriter } from 'animal-island-ui';
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
    </section>
  );
}
