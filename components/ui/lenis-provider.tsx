'use client';

import { useLayoutEffect } from 'react';
import Lenis from 'lenis';

export function LenisProvider() {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      gestureOrientation: 'vertical',
      overscroll: false,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
