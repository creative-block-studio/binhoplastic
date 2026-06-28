'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import heroBrandLockup from '@/assets/images/logo-hero-full.webp';
import sectorsConsumerGoodsImage from '@/assets/images/sectors-consumer-goods.webp';
import sectorsConstructionImage from '@/assets/images/sectors-construction.webp';
import sectorsFoodImage from '@/assets/images/sectors-food.webp';
import sectorsPackagingImage from '@/assets/images/sectors-packaging.webp';
import sectorsToysImage from '@/assets/images/sectors-toys.webp';
import sectorsWiresCablesImage from '@/assets/images/sectors-wires-cables.webp';

import { DiferenciaisSection } from '@/components/ui/diferenciais-section';
import { ExtrusaoDetailSection } from '@/components/ui/extrusao-detail-section';
import { FilmeDetailSection } from '@/components/ui/filme-detail-section';
import { FiosCabosDetailSection } from '@/components/ui/fios-cabos-detail-section';
import { InjectionDetailSection } from '@/components/ui/injection-detail-section';
import { ProcessMobileSlider } from '@/components/ui/process-mobile-slider';
import { ProcessSectionsStack } from '@/components/ui/process-sections-stack';
import { ProductsSection } from '@/components/ui/products-section';
import { SectorsMobileSlider } from '@/components/ui/sectors-mobile-slider';
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import { SoproDetailSection } from '@/components/ui/sopro-detail-section';
import { SolutionsSection } from '@/components/ui/solutions-section';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const automotiveFrames = Array.from(
  { length: 48 },
  (_, index) =>
    `/assets/videos/0620-frames/frame-${String(index + 1).padStart(3, '0')}.webp`,
);

const images = [
  {
    kind: 'frame-sequence' as const,
    frames: automotiveFrames,
    alt: 'Componentes do setor automotivo',
  },
  {
    src: sectorsConsumerGoodsImage,
    alt: 'Materiais de bens e consumo',
    label: 'Materiais de bens e consumo',
  },
  {
    src: sectorsPackagingImage,
    alt: 'Embalagens plasticas em fundo laranja',
    label: 'Embalagens',
  },
  {
    src: sectorsToysImage,
    alt: 'Brinquedos',
    label: 'Brinquedos',
  },
  {
    src: sectorsConstructionImage,
    alt: 'Construção Civil',
    label: 'Construção Civil',
  },
  {
    src: sectorsWiresCablesImage,
    alt: 'Fios e Cabos',
    label: 'Fios e Cabos',
  },
  {
    src: sectorsFoodImage,
    alt: 'Alimentícios',
    label: 'Alimentícios',
  },
] as const;

const mobileSectorSlides = [
  {
    image: sectorsPackagingImage,
    alt: 'Embalagens',
    label: 'Embalagens',
  },
  {
    image: sectorsConsumerGoodsImage,
    alt: 'Materiais de bens e consumo',
    label: 'Materiais de bens e consumo',
  },
  {
    image: sectorsToysImage,
    alt: 'Brinquedos',
    label: 'Brinquedos',
  },
  {
    image: sectorsWiresCablesImage,
    alt: 'Fios e cabos',
    label: 'Fios e cabos',
  },
  {
    image: sectorsConstructionImage,
    alt: 'Construção civil',
    label: 'Construção civil',
  },
  {
    image: sectorsFoodImage,
    alt: 'Alimentos',
    label: 'Alimentos',
  },
] as const;

const heroRevealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroLineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.94,
      ease: heroRevealEase,
    },
  }),
};

export default function ZoomParallaxDemo() {
  return (
    <main id="inicio" className="min-h-[100dvh] w-full" tabIndex={-1}>
      <SiteHeader />
      <section
        className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[#0D0C1A] select-none"
        data-nav-tone="dark"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/videos/hero-poster.webp"
        >
          <source src="/assets/videos/hero-desktop.webm" type="video/webm" />
        </video>
        <div className="site-shell pointer-events-none absolute inset-0 z-10">
          <div className="flex min-h-[100dvh] flex-col justify-end pb-12 pt-28 sm:justify-between sm:pb-12 sm:pt-32 sm:pl-[var(--site-content-inset-left)] sm:pr-[var(--site-content-inset-right)] lg:pb-14 lg:pt-36">
            <div className="mb-[clamp(3.5rem,12vw,6.5rem)] flex w-full flex-col items-start gap-[clamp(0.45rem,1vw,0.85rem)] sm:mb-0 sm:ml-auto sm:items-end sm:gap-[clamp(0.35rem,0.72vw,0.85rem)]">
              <motion.p
                className="m-0 max-w-full whitespace-normal text-left text-[clamp(0.95rem,4.3vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.045em] text-[#e0f0f1] sm:text-right sm:whitespace-nowrap sm:text-[clamp(1rem,2.08vw,2.8rem)]"
                variants={heroLineVariants}
                initial="hidden"
                animate="visible"
                custom={0.28}
              >
                A COR CERTA PARA O SEU PLÁSTICO
              </motion.p>
              <div className="flex max-w-full flex-col items-start gap-[clamp(0.45rem,1vw,0.85rem)] text-left text-[clamp(1.1rem,6.6vw,3.05rem)] font-bold leading-[1.03] tracking-[-0.05em] text-[#e0f0f1] sm:items-end sm:gap-[clamp(0.35rem,0.72vw,0.85rem)] sm:text-right sm:text-[clamp(1.45rem,2.72vw,3.05rem)]">
                <motion.p
                  className="m-0 max-w-full whitespace-normal sm:whitespace-nowrap"
                  variants={heroLineVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.66}
                >
                  <span className="font-normal">do </span>
                  <span className="text-[#62C3D1]">desenvolvimento</span>
                </motion.p>
                <motion.p
                  className="m-0 max-w-full whitespace-normal sm:whitespace-nowrap"
                  variants={heroLineVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.02}
                >
                  <span className="font-normal">até a </span>
                  <span className="text-[#62C3D1]">produção</span>
                </motion.p>
              </div>
            </div>

            <div className="hidden w-[clamp(13rem,29vw,33rem)] max-w-[72vw] sm:block">
              <Image
                src={heroBrandLockup}
                alt="Binho Plastic - Masterbatch, pigmentos e aditivos"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <ProductsSection />
      <SolutionsSection />
      <section className="max-[900px]:hidden w-full bg-[#0D0C1A]" data-nav-tone="dark">
        <div className="site-shell">
          <div className="relative flex min-h-[26vh] items-center justify-center px-0 pb-6 pt-16 sm:pt-20 lg:pt-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(23,23,23,0.12),transparent_55%)] blur-[30px]"
            />
            <div className="site-content-shell relative z-10">
              <h1 className="max-w-none whitespace-nowrap text-left text-[clamp(1.2rem,5.8vw,4.5rem)] font-thin leading-[0.96] tracking-[-0.05em] text-white max-[900px]:whitespace-normal">
                Presente em todos setores
              </h1>
              <p className="mt-3 ml-auto max-w-none whitespace-nowrap text-right text-[clamp(1.2rem,5.8vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#62C3D1] max-[900px]:whitespace-normal">
                Especialista no seu processo
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="min-[901px]:hidden">
        <SectorsMobileSlider slides={mobileSectorSlides} />
      </div>
      <div className="max-[900px]:hidden">
        <ZoomParallax
          images={images}
          finalReveal={{
            eyebrow: 'APLICAÇÃO',
            headlineTopPrefix: 'DO',
            headlineTopEmphasis: 'MASTERBATCH',
            headlineBottom: 'AO PRODUTO FINAL',
            caption: 'conheça cada processo',
          }}
        />
      </div>
      <section id="processos" data-nav-tone="dark">
        <div className="min-[901px]:hidden">
          <ProcessMobileSlider />
        </div>
        <div className="max-[900px]:hidden">
          <ProcessSectionsStack
            sections={[
              {
                id: 'processo-injecao',
                content: <InjectionDetailSection key="injection" />,
              },
              {
                id: 'processo-sopro',
                content: <SoproDetailSection key="sopro" />,
              },
              {
                id: 'processo-extrusao',
                content: <ExtrusaoDetailSection key="extrusao" />,
              },
              {
                id: 'processo-filme',
                content: <FilmeDetailSection key="filme" />,
              },
              {
                id: 'processo-fios-cabos',
                content: <FiosCabosDetailSection key="fios-cabos" />,
              },
            ]}
          />
        </div>
      </section>
      <div id="sobre" data-nav-tone="light">
        <DiferenciaisSection />
      </div>
      <SiteFooter />
    </main>
  );
}
