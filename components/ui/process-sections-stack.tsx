'use client';

import type { CSSProperties, ReactNode } from 'react';

import styles from '@/components/ui/process-sections-stack.module.css';

type ProcessSectionItem = {
  content: ReactNode;
  id: string;
};

type ProcessSectionsStackProps = {
  sections: readonly ProcessSectionItem[];
};

export function ProcessSectionsStack({
  sections,
}: ProcessSectionsStackProps) {
  return (
    <section className={styles.stack} aria-label="Processos">
      {sections.map((section, index) => (
        <div className={styles.item} key={section.id} id={section.id}>
          <div
            className={styles.card}
            style={{ '--stack-z': index + 1 } as CSSProperties}
          >
            {section.content}
          </div>
        </div>
      ))}
    </section>
  );
}
