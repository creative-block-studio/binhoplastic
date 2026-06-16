'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
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
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import { SoproDetailSection } from '@/components/ui/sopro-detail-section';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Modern architecture building',
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
    alt: 'Construcao Civil',
    label: 'Construcao Civil',
  },
  {
    src: sectorsWiresCablesImage,
    alt: 'Fios e Cabos',
    label: 'Fios e Cabos',
  },
  {
    src: sectorsFoodImage,
    alt: 'Alimenticios',
    label: 'Alimenticios',
  },
] as const;

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
    <main id="inicio" className="min-h-screen w-full">
      <SiteHeader />
      <section className="w-full bg-[#0D0C1A]" data-nav-tone="dark">
        <div className="site-shell">
          <div className="relative flex min-h-[26vh] items-center justify-center py-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(23,23,23,0.12),transparent_55%)] blur-[30px]"
            />
            <div
              className="relative z-10 w-full"
              style={{
                width: 'min(100%, calc(100% - clamp(120px, 15vw, 260px)))',
                marginInline: 'auto',
              }}
            >
              <h1 className="max-w-full whitespace-nowrap text-left text-[clamp(0.98rem,4.7vw,3.35rem)] font-thin leading-[0.98] tracking-[-0.04em] text-white">
                Presente em todos setores
              </h1>
              <p className="mt-2 ml-auto max-w-full whitespace-nowrap text-right text-[clamp(0.98rem,4.7vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#62C3D1]">
                Especialista no seu processo
              </p>
            </div>
          </div>
        </div>
      </section>
      <ZoomParallax images={images} />
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
      <div id="diferenciais" data-nav-tone="light">
        <DiferenciaisSection />
      </div>
      <SiteFooter />
    </main>
  );
}
