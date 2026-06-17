'use client';

import { useRef, type CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useInView } from 'framer-motion';

import iconCoverage from '@/assets/images/icon-coverage.webp';
import iconIntensity from '@/assets/images/icon-intensity.webp';
import iconMoisture from '@/assets/images/icon-moisture.webp';
import iconReady from '@/assets/images/icon-ready.webp';
import iconResins from '@/assets/images/icon-resins.webp';
import solutionAdditives from '@/assets/images/solution-additives.webp';
import solutionDivider from '@/assets/images/solution-divider.svg';
import solutionMasterbatch from '@/assets/images/solution-masterbatch.webp';
import solutionPigments from '@/assets/images/solution-pigments.webp';
import styles from '@/components/ui/solutions-section.module.css';

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titleLineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.94,
      ease: revealEase,
    },
  }),
};

type Benefit = {
  label: string;
  icon: StaticImageData;
};

type SolutionCard = {
  title: string;
  description: string;
  image: StaticImageData;
  imagePosition: string;
  imageSizes: string;
  titleWidth?: string;
  copyWidth: string;
  benefits: readonly Benefit[];
};

const resinTags = ['PP', 'PE', 'PS', 'PET', 'ABS', 'E OUTRAS RESINAS'] as const;

const cards: readonly SolutionCard[] = [
  {
    title: 'Masterbatch',
    description:
      'Concentrado de cor pré-disperso para aplicação direta no processo, com dispersão superior, consistência e economia.',
    image: solutionMasterbatch,
    imagePosition: '75% center',
    imageSizes: '(max-width: 720px) 100vw, (max-width: 1100px) 48vw, 30vw',
    titleWidth: '14.5rem',
    copyWidth: '17.5rem',
    benefits: [
      { label: 'pronto para uso', icon: iconReady },
      { label: 'alta cobertura', icon: iconCoverage },
      { label: 'compatível com diversas resinas', icon: iconResins },
    ],
  },
  {
    title: 'Pigmentos',
    description:
      'Alta performance para quem precisa de formulação própria, com máxima intensidade de cor e estabilidade.',
    image: solutionPigments,
    imagePosition: '68% center',
    imageSizes: '(max-width: 720px) 100vw, (max-width: 1100px) 48vw, 30vw',
    titleWidth: '12rem',
    copyWidth: '13rem',
    benefits: [
      { label: 'alta intensidade', icon: iconIntensity },
      { label: 'excelente estabilidade', icon: iconCoverage },
      { label: 'ampla variedade de cores', icon: iconResins },
    ],
  },
  {
    title: 'Aditivos',
    description:
      'Soluções que agregam performance ao processo e ao produto final, com mais eficiência, proteção e produtividade.',
    image: solutionAdditives,
    imagePosition: '82% center',
    imageSizes: '(max-width: 720px) 100vw, (max-width: 1100px) 48vw, 30vw',
    titleWidth: '10rem',
    copyWidth: '15rem',
    benefits: [
      { label: 'dessecante e controle de umidade', icon: iconMoisture },
      { label: 'auxiliar de produção e processo', icon: iconCoverage },
      { label: 'otimização de processo e produtividade', icon: iconResins },
    ],
  },
] as const;

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
    margin: '0px 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className={styles.section}
      aria-labelledby="solutions-section-title"
      data-nav-tone="dark"
    >
      <div className="site-shell">
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headingBlock}>
              <h2 id="solutions-section-title" className={styles.title}>
                <motion.span
                  className={styles.titleLine}
                  variants={titleLineVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={0.18}
                >
                  Soluções que dão&nbsp;<span>cor</span> às ideias e
                </motion.span>
                <motion.span
                  className={styles.titleLine}
                  variants={titleLineVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={0.48}
                >
                  <span>performance</span> ao processo
                </motion.span>
              </h2>

              <motion.ul
                className={styles.resinList}
                aria-label="Resinas atendidas"
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ delay: 0.76, duration: 0.7, ease: revealEase }}
              >
                {resinTags.map((tag) => (
                  <li key={tag} className={styles.resinItem}>
                    {tag}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.p
              className={styles.intro}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.12, duration: 0.7, ease: revealEase }}
            >
              Um portfólio completo para desenvolver, proteger e otimizar cada
              detalhe da sua produção, com consistência tecnológica.
            </motion.p>
          </div>

          <div className={styles.cards}>
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                className={styles.card}
                style={
                  {
                    '--solution-image-position': card.imagePosition,
                    '--solution-title-width': card.titleWidth ?? 'none',
                    '--solution-copy-width': card.copyWidth,
                  } as CSSProperties
                }
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                whileHover={{ y: -8 }}
                transition={{
                  delay: 0.18 + index * 0.09,
                  duration: 0.74,
                  ease: revealEase,
                }}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes={card.imageSizes}
                  className={styles.cardImage}
                />

                <div className={styles.cardOverlay} />

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>

                  <div className={styles.divider} aria-hidden="true">
                    <Image src={solutionDivider} alt="" fill className={styles.dividerImage} />
                  </div>

                  <ul className={styles.benefits} aria-label={`${card.title} benefícios`}>
                    {card.benefits.map((benefit) => (
                      <li key={benefit.label} className={styles.benefit}>
                        <div className={styles.benefitIconWrap}>
                          <Image
                            src={benefit.icon}
                            alt=""
                            width={42}
                            height={42}
                            className={styles.benefitIcon}
                          />
                        </div>
                        <span className={styles.benefitLabel}>{benefit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
