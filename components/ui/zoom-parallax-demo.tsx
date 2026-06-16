'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

import { ExtrusaoDetailSection } from '@/components/ui/extrusao-detail-section';
import { FilmeDetailSection } from '@/components/ui/filme-detail-section';
import { FiosCabosDetailSection } from '@/components/ui/fios-cabos-detail-section';
import { InjectionDetailSection } from '@/components/ui/injection-detail-section';
import { SoproDetailSection } from '@/components/ui/sopro-detail-section';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
 
const images = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Modern architecture building',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Urban cityscape at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Abstract geometric pattern',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Minimalist design elements',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Ocean waves and beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Forest trees and sunlight',
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
    <main className="min-h-screen w-full">
      <section className="site-shell">
        <div className="relative flex h-[50vh] items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(23,23,23,0.12),transparent_55%)] blur-[30px]"
          />
          <h1 className="text-center text-4xl font-bold">
            Scroll Down for Zoom Parallax
          </h1>
        </div>
      </section>
      <ZoomParallax images={images} />
      <InjectionDetailSection />
      <SoproDetailSection />
      <ExtrusaoDetailSection />
      <FilmeDetailSection />
      <FiosCabosDetailSection />
    </main>
  );
}
