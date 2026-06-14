import type { ReactNode } from 'react';
import { Card } from 'animal-island-ui';
import styles from './IslandScrollArea.module.css';

interface IslandScrollAreaProps {
  children: ReactNode;
  className?: string;
  maxHeight?: number | string;
  'aria-label'?: string;
}

export function IslandScrollArea({
  children,
  className,
  maxHeight,
  'aria-label': ariaLabel,
}: IslandScrollAreaProps) {
  return (
    <Card
      color="default"
      pattern="default"
      className={`${styles.shell} ${className ?? ''}`}
    >
      <div
        className={`island-scroll ${styles.scroll}`}
        style={maxHeight ? { maxHeight } : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </Card>
  );
}
