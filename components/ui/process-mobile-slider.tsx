'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

import blowObject from '@/assets/images/process-blow-object-figma.webp';
import extrusionObject from '@/assets/images/process-extrusion-object-figma.webp';
import filmObject from '@/assets/images/process-film-object-figma.webp';
import injectionObject from '@/assets/images/process-injection-object-figma.webp';
import wiresObject from '@/assets/images/process-wires-object-figma.webp';
import styles from '@/components/ui/process-mobile-slider.module.css';

type ProcessApplication = {
  label: string;
  iconSrc: string;
  iconAlt: string;
};

type ProcessSlide = {
  key: string;
  label: string;
  title: string;
  description: string;
  chips: readonly [string, string];
  applications: readonly [ProcessApplication, ProcessApplication, ProcessApplication];
  image: StaticImageData;
  imageAlt: string;
  imageWidth: string;
  imageHeight?: string;
  tabletImageWidth?: string;
  tabletImageHeight?: string;
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
      {
        label: 'Tampas de cosméticos',
        iconSrc: '/assets/images/process-app-injection-cap.svg',
        iconAlt: 'Ícone de tampa de cosméticos',
      },
      {
        label: 'Caixas organizadoras',
        iconSrc: '/assets/images/process-app-injection-box.svg',
        iconAlt: 'Ícone de caixa organizadora',
      },
      {
        label: 'Peças automotivas',
        iconSrc: '/assets/images/process-app-injection-carpart.svg',
        iconAlt: 'Ícone de peça automotiva',
      },
    ],
    image: injectionObject,
    imageAlt: 'Peças plásticas do processo de injeção',
    imageWidth: '17.25rem',
    tabletImageWidth: '29rem',
    tabletImageHeight: '27rem',
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
    applications: [
      {
        label: 'Garrafas PET',
        iconSrc: '/assets/images/process-app-blow-petbottle.svg',
        iconAlt: 'Ícone de garrafa PET',
      },
      {
        label: 'Frascos de shampoo',
        iconSrc: '/assets/images/process-app-blow-shampoo.svg',
        iconAlt: 'Ícone de frasco de shampoo',
      },
      {
        label: 'Galões industriais',
        iconSrc: '/assets/images/process-app-blow-gallon.svg',
        iconAlt: 'Ícone de galão industrial',
      },
    ],
    image: blowObject,
    imageAlt: 'Frascos e galões do processo de sopro',
    imageWidth: '18rem',
    tabletImageWidth: '29rem',
    tabletImageHeight: '27rem',
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
    applications: [
      {
        label: 'Perfis de PVC',
        iconSrc: '/assets/images/process-app-extrusion-profile.svg',
        iconAlt: 'Ícone de perfil de PVC',
      },
      {
        label: 'Tubos e mangueiras',
        iconSrc: '/assets/images/process-app-extrusion-hose.svg',
        iconAlt: 'Ícone de tubos e mangueiras',
      },
      {
        label: 'Chapas plásticas',
        iconSrc: '/assets/images/process-app-extrusion-sheet.svg',
        iconAlt: 'Ícone de chapa plástica',
      },
    ],
    image: extrusionObject,
    imageAlt: 'Perfis e tubos do processo de extrusão',
    imageWidth: '23.2rem',
    imageHeight: '21.1rem',
    tabletImageWidth: '33rem',
    tabletImageHeight: '29rem',
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
    applications: [
      {
        label: 'Sacolas',
        iconSrc: '/assets/images/process-app-film-bag.svg',
        iconAlt: 'Ícone de sacolas',
      },
      {
        label: 'Filme stretch',
        iconSrc: '/assets/images/process-app-film-stretch.svg',
        iconAlt: 'Ícone de filme stretch',
      },
      {
        label: 'Embalagens flexíveis',
        iconSrc: '/assets/images/process-app-film-flexible.svg',
        iconAlt: 'Ícone de embalagem flexível',
      },
    ],
    image: filmObject,
    imageAlt: 'Embalagens flexíveis do processo filme',
    imageWidth: '17.5rem',
    tabletImageWidth: '29rem',
    tabletImageHeight: '27rem',
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
      {
        label: 'Cabos residenciais',
        iconSrc: '/assets/images/process-app-wires-residential.svg',
        iconAlt: 'Ícone de cabos residenciais',
      },
      {
        label: 'Cabos automotivos',
        iconSrc: '/assets/images/process-app-wires-automotive.svg',
        iconAlt: 'Ícone de cabos automotivos',
      },
      {
        label: 'Cabos de dados',
        iconSrc: '/assets/images/process-app-wires-data.svg',
        iconAlt: 'Ícone de cabos de dados',
      },
    ],
    image: wiresObject,
    imageAlt: 'Cabos elétricos coloridos do processo de fios e cabos',
    imageWidth: '17.25rem',
    tabletImageWidth: '29rem',
    tabletImageHeight: '27rem',
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

const PROCESS_MOBILE_ACCENT = '#d14d72';

export function ProcessMobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = processSlides[activeIndex];
  const totalSlides = processSlides.length;

  const scrollToIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(processSlides.length - 1, index));
    setActiveIndex(nextIndex);
  };

  const goToPreviousSlide = () => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  };

  return (
    <div
      className={styles.section}
      data-lenis-prevent-touch
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
          '--process-tablet-object-width': activeSlide.tabletImageWidth ?? '28rem',
          '--process-tablet-object-height': activeSlide.tabletImageHeight ?? '26rem',
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
                onClick={() => scrollToIndex(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`process-slide-${slide.key}`}
                id={`process-tab-${slide.key}`}
              >
                {slide.label}
              </button>
            ))}
          </div>

          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={goToPreviousSlide}
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
                      sizes="(max-width: 640px) 70vw, (max-width: 900px) 28rem, 18rem"
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
                    <div key={application.label} className={styles.applicationCard}>
                      <div className={styles.applicationIconWrap}>
                        <Image
                          src={application.iconSrc}
                          alt={application.iconAlt}
                          width={42}
                          height={42}
                          unoptimized
                          className={styles.applicationIcon}
                        />
                      </div>
                      <span className={styles.applicationLabel}>
                        {application.label}
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
              onClick={goToNextSlide}
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
