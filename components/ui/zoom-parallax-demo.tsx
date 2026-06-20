'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lenis from 'lenis';
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
import { ProcessSectionsStack } from '@/components/ui/process-sections-stack';
import { ProductsSection } from '@/components/ui/products-section';
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
  useEffect(() => {
    const lenis = new Lenis();
    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="inicio" className="min-h-[100dvh] w-full">
      <SiteHeader />
      <section
        className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[#0D0C1A]"
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
          <div
            className="flex min-h-[100dvh] flex-col justify-between pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-36"
            style={{
              paddingLeft: 'var(--site-content-inset-left)',
              paddingRight: 'var(--site-content-inset-right)',
            }}
          >
            <div className="ml-auto w-full max-w-[min(100%,36.5rem)]">
              <motion.p
                className="text-right text-[clamp(1.25rem,2.35vw,2.8rem)] font-extralight leading-[1.08] tracking-[-0.045em] text-[#e0f0f1] [text-wrap:balance]"
                variants={heroLineVariants}
                initial="hidden"
                animate="visible"
                custom={0.28}
              >
                A COR CERTA PARA O SEU PLÁSTICO
              </motion.p>
              <div className="mt-1.5 text-right text-[clamp(1.7rem,3.2vw,3.05rem)] font-bold leading-[1.03] tracking-[-0.05em] text-[#e0f0f1] [text-wrap:balance]">
                <motion.p
                  className="m-0"
                  variants={heroLineVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.66}
                >
                  <span className="font-normal">do </span>
                  <span className="text-[#62C3D1]">desenvolvimento</span>
                </motion.p>
                <motion.p
                  className="m-0"
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

            <div className="w-[clamp(13rem,29vw,33rem)] max-w-[72vw]">
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
      <section className="w-full bg-[#0D0C1A]" data-nav-tone="dark">
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
      <section id="processos" data-nav-tone="dark">
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
      </section>
      <div id="sobre" data-nav-tone="light">
        <DiferenciaisSection />
      </div>
      <SiteFooter />
    </main>
  );
}
