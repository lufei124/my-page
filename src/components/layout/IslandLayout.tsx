import { Outlet } from 'react-router-dom';
import { Cursor, Footer } from 'animal-island-ui';
import { SiteHeader } from './SiteHeader';
import { PageTransition } from './PageTransition';
import styles from './IslandLayout.module.css';

export function IslandLayout() {
  return (
    <Cursor>
      <div className={styles.shell}>
        <SiteHeader />
        <main className={styles.main}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer type="sea" />
      </div>
    </Cursor>
  );
}
