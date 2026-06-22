'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useInView } from 'framer-motion';

import consistenciaImage from '@/assets/images/diferenciais-consistencia.webp';
import desenvolvimentoImage from '@/assets/images/diferenciais-desenvolvimento.webp';
import { FlowButton } from '@/components/ui/flow-button';
import laboratorioImage from '@/assets/images/diferenciais-laboratorio.webp';
import suporteImage from '@/assets/images/diferenciais-suporte.webp';
import styles from '@/components/ui/diferenciais-section.module.css';

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type DiferencialCard = {
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  background: string;
  foreground: string;
  body: string;
  span: number;
  height: string;
  mediaWidth: string;
  mediaOffset: string;
  mediaScale?: string;
  mediaShiftX?: string;
};

const cards: readonly DiferencialCard[] = [
  {
    title: 'Desenvolvimento sob medida',
    description:
      'criamos a cor exclusiva do seu produto, com match de padrão e aprovação técnica antes da produção',
    image: desenvolvimentoImage,
    imageAlt: 'Monitor com amostra de cores e frasco de pigmento.',
    background: '#08216b',
    foreground: '#ffffff',
    body: 'rgba(224, 240, 241, 0.94)',
    span: 7,
    height: 'clamp(220px, 17.8vw, 286px)',
    mediaWidth: '13.2rem',
    mediaOffset: '4px',
    mediaScale: '1.24',
    mediaShiftX: '0px',
  },
  {
    title: 'Laboratório próprio',
    description: 'colorimetria e análise desde o desenvolvimento até o lote final',
    image: laboratorioImage,
    imageAlt: 'Microscópio com frascos de laboratório.',
    background: '#00abc8',
    foreground: '#ffffff',
    body: 'rgba(224, 240, 241, 0.94)',
    span: 5,
    height: 'clamp(220px, 17.8vw, 286px)',
    mediaWidth: '15rem',
    mediaOffset: '6px',
    mediaScale: '1.78',
    mediaShiftX: '0px',
  },
  {
    title: 'Consistência lote a lote',
    description: 'controle de processo e matéria-prima que elimina variação',
    image: consistenciaImage,
    imageAlt: 'Esteira com blocos coloridos em produção.',
    background: '#e70865',
    foreground: '#ffffff',
    body: 'rgba(224, 240, 241, 0.94)',
    span: 6,
    height: 'clamp(204px, 16.2vw, 258px)',
    mediaWidth: '14.8rem',
    mediaOffset: '2px',
    mediaScale: '1.34',
    mediaShiftX: '18px',
  },
  {
    title: 'Suporte técnico dedicado',
    description: 'time disponível para otimizar aplicação e acelerar seu desenvolvimento',
    image: suporteImage,
    imageAlt: 'Headset com ícone de suporte técnico.',
    background: '#ffc302',
    foreground: '#08216b',
    body: 'rgba(8, 33, 107, 0.92)',
    span: 6,
    height: 'clamp(204px, 16.2vw, 258px)',
    mediaWidth: '11.8rem',
    mediaOffset: '8px',
    mediaScale: '1.36',
    mediaShiftX: '0px',
  },
] as const;

export function DiferenciaisSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
    margin: '0px 0px -10% 0px',
  });
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.9,
    margin: '0px 0px -12% 0px',
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="site-shell">
        <div className={styles.inner}>
          <h2
            ref={titleRef}
            className={`${styles.title} ${isTitleInView ? styles.titleVisible : ''}`}
          >
            Combinamos <span className={styles.titleAccent}>tecnologia</span>,{' '}
            <span className={styles.titleAccent}>controle</span> e{' '}
            <span className={styles.titleAccent}>suporte</span> para entregar cor com{' '}
            <span className={styles.titleAccent}>precisão</span>
          </h2>

          <div className={styles.grid}>
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                className={styles.card}
                style={
                  {
                    '--card-background': card.background,
                    '--card-foreground': card.foreground,
                    '--card-body': card.body,
                    '--card-span': card.span,
                    '--card-height': card.height,
                    '--media-width': card.mediaWidth,
                    '--media-translate-y': card.mediaOffset,
                    '--media-scale': card.mediaScale ?? '1',
                    '--media-shift-x': card.mediaShiftX ?? '0px',
                  } as CSSProperties
                }
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                whileHover={{ y: -5 }}
                transition={{
                  delay: 0.12 + index * 0.1,
                  duration: 0.62,
                  ease: revealEase,
                }}
              >
                <div className={styles.media}>
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 1100px) 24vw, 280px"
                    className={styles.mediaImage}
                  />
                </div>

                <div className={styles.copy}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.5, duration: 0.58, ease: revealEase }}
          >
            <FlowButton href="/sobre" className={styles.ctaButton} text="Saiba mais" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
