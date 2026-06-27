'use client';

import { Box, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { TouchEvent } from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import blowObject from '@/assets/images/process-blow-object-figma.webp';
import extrusionObject from '@/assets/images/process-extrusion-object-figma.webp';
import filmObject from '@/assets/images/process-film-object-figma.webp';
import injectionObject from '@/assets/images/process-injection-object-figma.webp';
import wiresObject from '@/assets/images/process-wires-object-figma.webp';
import styles from '@/components/ui/process-mobile-slider.module.css';

type ProcessSlide = {
  key: string;
  label: string;
  title: string;
  description: string;
  chips: readonly [string, string];
  applications: readonly [string, string, string];
  image: StaticImageData;
  imageAlt: string;
  imageWidth: string;
  imageHeight?: string;
  background: string;
  foreground: string;
  muted: string;
  ghost: string;
  chipBackground: string;
  chipForeground: string;
  ctaBackground: string;
  ctaForeground: string;
};

const processSlides: readonly ProcessSlide[] = [
  {
    key: 'injecao',
    label: 'Injeção',
    title: 'INJEÇÃO',
    description:
      'Polímero fundido injetado sob alta pressão em molde fechado, precisão dimensional e repetitividade em cada ciclo.',
    chips: ['Alta dispersão', 'Cor consistente'],
    applications: [
      'Tampas de cosméticos',
      'Caixas organizadoras',
      'Peças automotivas',
    ],
    image: injectionObject,
    imageAlt: 'Peças plásticas do processo de injeção',
    imageWidth: '17.25rem',
    background: '#20284c',
    foreground: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.54)',
    ghost: 'rgba(84, 92, 140, 0.34)',
    chipBackground: 'rgba(255, 255, 255, 0.08)',
    chipForeground: '#ffffff',
    ctaBackground: '#d14d72',
    ctaForeground: '#ffffff',
  },
  {
    key: 'sopro',
    label: 'Sopro',
    title: 'SOPRO',
    description:
      'Parison inflado dentro do molde com expansão biaxial. Alta produtividade, foco total em embalagem e estabilidade visual.',
    chips: ['Alta resistência', 'Cor consistente'],
    applications: ['Garrafas PET', 'Frascos de shampoo', 'Galões industriais'],
    image: blowObject,
    imageAlt: 'Frascos e galões do processo de sopro',
    imageWidth: '18rem',
    background: '#8f1238',
    foreground: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.54)',
    ghost: 'rgba(177, 48, 93, 0.28)',
    chipBackground: 'rgba(255, 255, 255, 0.1)',
    chipForeground: '#ffffff',
    ctaBackground: '#d14d72',
    ctaForeground: '#ffffff',
  },
  {
    key: 'extrusao',
    label: 'Extrusão',
    title: 'EXTRUSÃO',
    description:
      'Material fundido empurrado continuamente por uma matriz, com seção constante, estabilidade de processo e acabamento controlado.',
    chips: ['Estabilidade', 'Cor consistente'],
    applications: ['Perfis de PVC', 'Tubos e mangueiras', 'Chapas plásticas'],
    image: extrusionObject,
    imageAlt: 'Perfis e tubos do processo de extrusão',
    imageWidth: '23.2rem',
    imageHeight: '21.1rem',
    background: '#20284c',
    foreground: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.54)',
    ghost: 'rgba(84, 92, 140, 0.34)',
    chipBackground: 'rgba(255, 255, 255, 0.08)',
    chipForeground: '#ffffff',
    ctaBackground: '#d14d72',
    ctaForeground: '#ffffff',
  },
  {
    key: 'filme',
    label: 'Filme',
    title: 'FILME',
    description:
      'Extrusão por sopro ou casting para espessuras muito baixas, mono ou multicamada, com continuidade visual em alta escala.',
    chips: ['Baixa espessura', 'Cor consistente'],
    applications: ['Sacolas', 'Filme stretch', 'Embalagens flexíveis'],
    image: filmObject,
    imageAlt: 'Embalagens flexíveis do processo filme',
    imageWidth: '17.5rem',
    background: '#f7c31b',
    foreground: '#1a2d5a',
    muted: 'rgba(26, 45, 90, 0.72)',
    ghost: 'rgba(194, 145, 22, 0.36)',
    chipBackground: 'rgba(26, 45, 90, 0.14)',
    chipForeground: '#1a2d5a',
    ctaBackground: '#1a2d5a',
    ctaForeground: '#ffffff',
  },
  {
    key: 'fios-cabos',
    label: 'Fios e cabos',
    title: 'FIOS E CABOS',
    description:
      'Extrusão contínua de polímero sobre condutor metálico, com foco em isolamento, norma técnica e segurança de aplicação.',
    chips: ['Norma técnica', 'Cor consistente'],
    applications: [
      'Cabos residenciais',
      'Cabos automotivos',
      'Cabos de dados',
    ],
    image: wiresObject,
    imageAlt: 'Cabos elétricos coloridos do processo de fios e cabos',
    imageWidth: '17.25rem',
    background: '#20284c',
    foreground: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.54)',
    ghost: 'rgba(84, 92, 140, 0.34)',
    chipBackground: 'rgba(255, 255, 255, 0.08)',
    chipForeground: '#ffffff',
    ctaBackground: '#d14d72',
    ctaForeground: '#ffffff',
  },
] as const;

const AUTO_ADVANCE_MS = 4200;
const AUTO_RESUME_MS = 7000;
const SWIPE_THRESHOLD = 42;
const PROCESS_MOBILE_ACCENT = '#d14d72';

export function ProcessMobileSlider() {
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayDelay, setAutoplayDelay] = useState(AUTO_ADVANCE_MS);
  const activeSlide = processSlides[activeIndex];

  const scrollToIndex = (index: number, manual = false) => {
    const nextIndex = Math.max(0, Math.min(processSlides.length - 1, index));
    setActiveIndex(nextIndex);
    setAutoplayDelay(manual ? AUTO_RESUME_MS : AUTO_ADVANCE_MS);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;

    if (startX === null) {
      return;
    }

    touchDeltaXRef.current = (event.touches[0]?.clientX ?? startX) - startX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchDeltaXRef.current;

    if (deltaX <= -SWIPE_THRESHOLD) {
      scrollToIndex(activeIndex + 1, true);
    } else if (deltaX >= SWIPE_THRESHOLD) {
      scrollToIndex(activeIndex - 1, true);
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % processSlides.length);
      setAutoplayDelay(AUTO_ADVANCE_MS);
    }, autoplayDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, autoplayDelay]);

  return (
    <div
      className={styles.section}
      style={
        {
          '--process-mobile-bg': activeSlide.background,
          '--process-mobile-fg': activeSlide.foreground,
          '--process-mobile-muted': activeSlide.muted,
          '--process-mobile-ghost': activeSlide.ghost,
          '--process-mobile-chip-bg': activeSlide.chipBackground,
          '--process-mobile-chip-fg': activeSlide.chipForeground,
          '--process-mobile-cta-bg': activeSlide.ctaBackground,
          '--process-mobile-cta-fg': activeSlide.ctaForeground,
          '--process-mobile-accent': PROCESS_MOBILE_ACCENT,
        } as CSSProperties
      }
    >
      <div className="site-shell">
        <div className={styles.shell}>
          <small className={styles.eyebrow}>PROCESSO</small>
          <h2 className={styles.title}>{activeSlide.title}</h2>

          <div className={styles.tabs} role="tablist" aria-label="Processos">
            {processSlides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ''}`}
                onClick={() => scrollToIndex(index, true)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`process-slide-${slide.key}`}
                id={`process-tab-${slide.key}`}
              >
                {slide.label}
              </button>
            ))}
          </div>

          <div
            className={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={() => scrollToIndex(activeIndex - 1, true)}
              aria-label="Processo anterior"
            >
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>

            <article
              id={`process-slide-${activeSlide.key}`}
              className={styles.slide}
              aria-labelledby={`process-tab-${activeSlide.key}`}
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} de ${processSlides.length}`}
            >
              <div className={styles.slideInner}>
                <div className={styles.hero}>
                  <div
                    className={styles.objectWrap}
                    style={{
                      width: `min(100%, ${activeSlide.imageWidth})`,
                      height: activeSlide.imageHeight ?? undefined,
                    }}
                  >
                    <Image
                      src={activeSlide.image}
                      alt={activeSlide.imageAlt}
                      fill
                      sizes="(max-width: 640px) 70vw, 18rem"
                      className={styles.objectImage}
                      priority
                    />
                  </div>
                  <strong className={styles.ghost}>{activeSlide.title}</strong>
                </div>

                <div className={styles.pagination} aria-hidden="true">
                  {processSlides.map((item, dotIndex) => (
                    <span
                      key={`${activeSlide.key}-${item.key}`}
                      className={`${styles.dot} ${dotIndex === activeIndex ? styles.dotActive : ''}`}
                    />
                  ))}
                </div>

                <div className={styles.chips}>
                  {activeSlide.chips.map((chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                </div>

                <p className={styles.description}>{activeSlide.description}</p>

                <small className={styles.applicationsEyebrow}>APLICAÇÕES</small>

                <div className={styles.applications}>
                  {activeSlide.applications.map((application) => (
                    <div key={application} className={styles.applicationCard}>
                      <div className={styles.applicationIconWrap}>
                        <Box size={26} strokeWidth={1.6} />
                      </div>
                      <span className={styles.applicationLabel}>
                        {application}
                      </span>
                    </div>
                  ))}
                </div>

                <a href="/catalogo" className={styles.cta}>
                  VER MAIS CORES
                </a>
              </div>
            </article>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={() => scrollToIndex(activeIndex + 1, true)}
              aria-label="Próximo processo"
            >
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
