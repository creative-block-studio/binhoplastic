'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import navMark from '@/assets/images/nav-color-icon.webp';
import styles from '@/components/ui/site-header.module.css';

const LIGHT_LUMINANCE_THRESHOLD = 150;
const navLinks = [
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/sobre', label: 'Sobre' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const dockRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const [barIsLight, setBarIsLight] = useState(false);
  const [ctaIsLight, setCtaIsLight] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const resolveAnchorHref = useCallback(
    (href: string) => (pathname === '/' ? href : `/${href}`),
    [pathname],
  );

  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const href = event.currentTarget.getAttribute('href');
      if (!href?.startsWith('#')) return;
      if (pathname !== '/') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    },
    [pathname],
  );

  const handlePageResetNavigation = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== href) return;

      event.preventDefault();
      window.location.assign(href);
    },
    [pathname],
  );

  const handleLogoClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (typeof window === 'undefined') return;

      window.location.assign('/');
    },
    [],
  );

  useEffect(() => {
    const getLuminance = (r: number, g: number, b: number) =>
      0.2126 * r + 0.7152 * g + 0.0722 * b;

    const readDeclaredTone = (element: Element | null) => {
      if (!element) return null;

      if (element instanceof HTMLElement) {
        const declaredTone = element.dataset.navTone;
        if (declaredTone === 'light') return true;
        if (declaredTone === 'dark') return false;
      }

      return null;
    };

    const readBackgroundTone = (element: Element | null) => {
      if (!element) return null;

      const backgroundColor = window.getComputedStyle(element).backgroundColor;
      const match = backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/,
      );
      if (!match) return null;

      const alpha = match[4] ? Number(match[4]) : 1;
      if (alpha < 0.08) return null;

      return (
        getLuminance(Number(match[1]), Number(match[2]), Number(match[3])) >
        LIGHT_LUMINANCE_THRESHOLD
      );
    };

    const sampleTone = (element: HTMLElement | null) => {
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const samplePoints = [
        [0.2, 0.5],
        [0.4, 0.5],
        [0.5, 0.5],
        [0.6, 0.5],
        [0.8, 0.5],
      ] as const;

      const dock = dockRef.current;
      const visibilityTarget = dock ?? element;
      const previousVisibility = visibilityTarget.style.visibility;
      const previousPointerEvents = visibilityTarget.style.pointerEvents;
      visibilityTarget.style.pointerEvents = 'none';
      visibilityTarget.style.visibility = 'hidden';

      let lightHits = 0;
      let darkHits = 0;

      for (const [xRatio, yRatio] of samplePoints) {
        const sampleX = rect.left + rect.width * xRatio;
        const sampleY = rect.top + rect.height * yRatio;
        const stack = document.elementsFromPoint(sampleX, sampleY);
        let resolvedDeclaredTone: boolean | null = null;
        let resolvedBackgroundTone: boolean | null = null;

        for (const stackedElement of stack) {
          let target: Element | null = stackedElement;

          while (target && target !== document.documentElement) {
            const declaredTone = readDeclaredTone(target);
            if (declaredTone !== null) {
              resolvedDeclaredTone = declaredTone;
              break;
            }

            target = target.parentElement;
          }

          if (resolvedDeclaredTone !== null) break;
        }

        if (resolvedDeclaredTone === null) {
          for (const stackedElement of stack) {
            let target: Element | null = stackedElement;

            while (target && target !== document.documentElement) {
              const backgroundTone = readBackgroundTone(target);
              if (backgroundTone !== null) {
                resolvedBackgroundTone = backgroundTone;
                break;
              }

              target = target.parentElement;
            }

            if (resolvedBackgroundTone !== null) break;
          }
        }

        const resolvedTone = resolvedDeclaredTone ?? resolvedBackgroundTone;

        if (resolvedTone === true) {
          lightHits += 1;
        } else if (resolvedTone === false) {
          darkHits += 1;
        }
      }

      visibilityTarget.style.visibility = previousVisibility;
      visibilityTarget.style.pointerEvents = previousPointerEvents;

      return lightHits > darkHits;
    };

    const updateHeaderState = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const previousScrollY = lastScrollYRef.current;
      const delta = currentScrollY - previousScrollY;

      setBarIsLight(sampleTone(barRef.current));
      setCtaIsLight(sampleTone(ctaRef.current));

      if (currentScrollY < 40) {
        setIsHidden(false);
      } else if (delta > 8) {
        setIsHidden(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const requestUpdate = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(() => {
        updateHeaderState();
        tickingRef.current = false;
      });
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);
    window.addEventListener('pageshow', requestUpdate);

    const mutationObserver = new MutationObserver(requestUpdate);
    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-nav-tone'],
    });

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(document.body);

    const initialFrames = [
      requestAnimationFrame(updateHeaderState),
      requestAnimationFrame(() => requestAnimationFrame(updateHeaderState)),
      window.setTimeout(updateHeaderState, 0),
      window.setTimeout(updateHeaderState, 120),
      window.setTimeout(updateHeaderState, 320),
      window.setTimeout(updateHeaderState, 700),
    ];

    const initialInterval = window.setInterval(updateHeaderState, 180);
    const stopInitialInterval = window.setTimeout(() => {
      clearInterval(initialInterval);
    }, 1600);

    void document.fonts?.ready.then(requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('load', requestUpdate);
      window.removeEventListener('pageshow', requestUpdate);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      const [firstFrame, secondFrame, firstTimeout, secondTimeout, thirdTimeout, fourthTimeout] =
        initialFrames;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
      clearTimeout(thirdTimeout);
      clearTimeout(fourthTimeout);
      clearInterval(initialInterval);
      clearTimeout(stopInitialInterval);
    };
  }, [pathname]);

  const barClassName = [
    styles.bar,
    barIsLight ? styles.light : '',
    isHidden ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  const ctaClassName = [
    styles.cta,
    ctaIsLight ? styles.ctaLight : '',
    isHidden ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  const glassStyle = {
    backdropFilter: 'blur(18px) saturate(155%)',
    WebkitBackdropFilter: 'blur(18px) saturate(155%)',
  } as const;

  return (
    <div ref={dockRef} className={styles.dock}>
      <div className={styles.rail}>
        <div className={styles.row}>
          <div className={styles.cluster}>
            <header
              ref={barRef}
              className={barClassName}
              style={glassStyle}
              aria-label="Marca Binho Plastic"
            >
              <button
                className={styles.logo}
                aria-label="Binho Plastic"
                onClick={handleLogoClick}
                type="button"
              >
                <Image
                  src={navMark}
                  alt=""
                  aria-hidden="true"
                  className={styles.logoMark}
                  sizes="46px"
                />
              </button>
            </header>
          </div>

          <nav
            ref={ctaRef}
            className={ctaClassName}
            aria-label="Seções principais"
            style={glassStyle}
          >
            <div className={styles.ctaNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className={styles.ctaNavLink}
                  href={link.href.startsWith('#') ? resolveAnchorHref(link.href) : link.href}
                  onClick={(event) => {
                    if (link.href.startsWith('#')) {
                      handleAnchorClick(event);
                      return;
                    }

                    handlePageResetNavigation(event, link.href);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              className={styles.ctaButton}
              href="/solicitar-amostra"
              onClick={(event) => handlePageResetNavigation(event, '/solicitar-amostra')}
            >
              <span className={styles.ctaLabel}>Solicitar amostra</span>
              <span className={styles.ctaIcon} aria-hidden="true">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
