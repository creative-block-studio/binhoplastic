'use client';

import type { CSSProperties, ReactNode } from 'react';

import styles from '@/components/ui/process-sections-stack.module.css';

type ProcessSectionsStackProps = {
  sections: readonly ReactNode[];
};

export function ProcessSectionsStack({
  sections,
}: ProcessSectionsStackProps) {
  return (
    <section className={styles.stack} aria-label="Processos">
      {sections.map((section, index) => (
        <div className={styles.item} key={index}>
          <div
            className={styles.card}
            style={{ '--stack-z': index + 1 } as CSSProperties}
          >
            {section}
          </div>
        </div>
      ))}
    </section>
  );
}
