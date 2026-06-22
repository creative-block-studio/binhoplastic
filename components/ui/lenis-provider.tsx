'use client';

import { useLayoutEffect } from 'react';
import Lenis from 'lenis';

export function LenisProvider() {
  useLayoutEffect(() => {
    const lenis = new Lenis();
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
