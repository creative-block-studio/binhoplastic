'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { CountUpValue } from '@/components/ui/count-up-value';
import { FlowButton } from '@/components/ui/flow-button';
import productColorSamples from '@/assets/images/products-color-samples.webp';
import styles from '@/components/ui/products-section.module.css';

const highlights = [
  {
    countTo: 500,
    suffix: '+',
    description:
      'cores disponíveis para basear ou acelerar desenvolvimentos sob medida.',
  },
  {
    countTo: 20,
    suffix: ' anos',
    description:
      'de experiência acumulada no setor plástico pela equipe da empresa.',
  },
  {
    value: 'B2B',
    description:
      'atendimento técnico-comercial voltado à transformação, formulação e escala.',
  },
] as const;

const swatches = [
  '#E32168',
  '#F64B27',
  '#F7A91A',
  '#F9D527',
  '#7CCB43',
  '#18B28B',
  '#28B8D4',
  '#4585F1',
  '#7E59E6',
  '#A78BFA',
] as const;

const sectionRevealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.94,
      ease: sectionRevealEase,
    },
  }),
};

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swatchesRef = useRef<HTMLDivElement | null>(null);
  const [sectionActive, setSectionActive] = useState(false);
  const [swatchesActive, setSwatchesActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSectionActive(true);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = swatchesRef.current;
    if (!node || !sectionActive) return;
    const resetTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setSwatchesActive(false);
    }, 1600);

    setSwatchesActive(true);

    return () => {
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [sectionActive]);

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className={styles.section}
      aria-labelledby="products-section-title"
      data-nav-tone="light"
    >
      <div className="site-shell">
        <div className={styles.shell}>
          <div className={styles.inner}>
            <div className={styles.content}>
              <motion.h2
                id="products-section-title"
                className={styles.title}
                variants={sectionRevealVariants}
                initial="hidden"
                animate={sectionActive ? 'visible' : 'hidden'}
                custom={0.22}
              >
                Produtos de Alta Performance
              </motion.h2>

              <div className={styles.titleRule} aria-hidden="true" />

              <motion.p
                className={styles.lead}
                variants={sectionRevealVariants}
                initial="hidden"
                animate={sectionActive ? 'visible' : 'hidden'}
                custom={0.54}
              >
                Nossa linha de masterbatches, pigmentos e aditivos é desenvolvida
                para atender aos padrões mais rigorosos da indústria plástica.
                Reunimos profundidade técnica, repertório cromático e suporte de
                aplicação para encurtar o caminho entre teste, aprovação e
                produção.
              </motion.p>

              <div className={styles.highlights}>
                {highlights.map((item) => (
                  <article
                    key={'value' in item ? item.value : `${item.countTo}${item.suffix}`}
                    className={styles.card}
                  >
                    <span className={styles.cardValue}>
                      {'countTo' in item ? (
                        <CountUpValue
                          active={sectionActive}
                          to={item.countTo}
                          suffix={item.suffix}
                        />
                      ) : (
                        item.value
                      )}
                    </span>
                    <p className={styles.cardText}>{item.description}</p>
                  </article>
                ))}
              </div>

              <div className={styles.footer}>
                <div
                  ref={swatchesRef}
                  className={`${styles.swatches} ${swatchesActive ? styles.swatchesActive : ''}`}
                  aria-hidden="true"
                >
                  {swatches.map((color, index) => (
                    <button
                      key={color}
                      type="button"
                      className={styles.swatch}
                      style={
                        {
                          '--swatch-color': color,
                          '--swatch-index': index,
                        } as CSSProperties
                      }
                      data-color={color}
                      tabIndex={-1}
                    />
                  ))}
                </div>

                <FlowButton
                  href="/catalogo"
                  text="VER CATÁLOGO"
                  className={styles.ctaButton}
                />
              </div>
            </div>
          </div>

          <div className={styles.media} aria-hidden="true">
            <div className={styles.imageWrap}>
              <Image
                src={productColorSamples}
                alt=""
                fill
                sizes="(max-width: 980px) 88vw, 38vw"
                className={styles.image}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
