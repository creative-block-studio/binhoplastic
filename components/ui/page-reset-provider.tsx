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

    const resetOnMount = () => {
      if (window.scrollY > 2) {
        return;
      }

      resetScrollToTop();
      requestAnimationFrame(() => {
        if (window.scrollY <= 2) {
          resetScrollToTop();
        }
      });
    };

    resetOnMount();
  }, []);

  return null;
}
