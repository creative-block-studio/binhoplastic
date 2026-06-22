'use client';

import { useEffect } from 'react';

const resetScrollToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export function PageResetProvider() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetOnShow = () => {
      resetScrollToTop();
      requestAnimationFrame(() => {
        resetScrollToTop();
      });
    };

    resetOnShow();

    window.addEventListener('load', resetOnShow);
    window.addEventListener('pageshow', resetOnShow);

    return () => {
      window.removeEventListener('load', resetOnShow);
      window.removeEventListener('pageshow', resetOnShow);
    };
  }, []);

  return null;
}
