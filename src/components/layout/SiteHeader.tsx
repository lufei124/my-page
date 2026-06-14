import { Link, useLocation } from 'react-router-dom';
import { Button, Title } from 'animal-island-ui';
import { siteConfig } from '@/lib/site';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <Title size="small" color="app-green">
          {siteConfig.name}
        </Title>
      </Link>
      <nav className={styles.nav} aria-label="主导航">
        {siteConfig.nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button type={active ? 'primary' : 'default'} size="small">
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
