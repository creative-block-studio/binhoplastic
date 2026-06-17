'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import navMark from '@/assets/images/nav-color-icon.webp';
import styles from '@/components/ui/site-header.module.css';

const links = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const;

const LIGHT_LUMINANCE_THRESHOLD = 150;

export function SiteHeader() {
  const barRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const [isLight, setIsLight] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const href = event.currentTarget.getAttribute('href');
      if (!href?.startsWith('#')) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    },
    [],
  );

  useEffect(() => {
    const getLuminance = (r: number, g: number, b: number) =>
      0.2126 * r + 0.7152 * g + 0.0722 * b;

    const isLightBackground = (element: Element | null) => {
      if (!element) return false;

      const backgroundColor = window.getComputedStyle(element).backgroundColor;
      const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return false;

      return (
        getLuminance(Number(match[1]), Number(match[2]), Number(match[3])) >
        LIGHT_LUMINANCE_THRESHOLD
      );
    };

    const sampleBehindHeader = () => {
      const header = barRef.current;
      if (!header) return false;

      const rect = header.getBoundingClientRect();
      const sampleX = rect.left + rect.width / 2;
      const sampleY = rect.top + rect.height / 2;

      const previousVisibility = header.style.visibility;
      const previousPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = 'none';
      header.style.visibility = 'hidden';
      const behind = document.elementFromPoint(sampleX, sampleY);
      header.style.visibility = previousVisibility;
      header.style.pointerEvents = previousPointerEvents;

      let target = behind;
      while (target && target !== document.documentElement) {
        if (target instanceof HTMLElement) {
          const declaredTone = target.dataset.navTone;
          if (declaredTone === 'light') return true;
          if (declaredTone === 'dark') return false;
        }

        if (isLightBackground(target)) return true;
        target = target.parentElement;
      }

      return false;
    };

    const updateHeaderState = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const previousScrollY = lastScrollYRef.current;
      const delta = currentScrollY - previousScrollY;

      setIsLight(sampleBehindHeader());

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
    requestAnimationFrame(updateHeaderState);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const barClassName = [
    styles.bar,
    isLight ? styles.light : '',
    isHidden ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  const ctaClassName = [
    styles.cta,
    isLight ? styles.ctaLight : '',
    isHidden ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.dock}>
      <div className={styles.rail}>
        <div className={styles.row}>
          <div className={styles.cluster}>
            <header ref={barRef} className={barClassName} aria-label="Navegação principal">
              <a
                className={styles.logo}
                href="#inicio"
                aria-label="Binho Plastic"
                onClick={handleAnchorClick}
              >
                <Image
                  src={navMark}
                  alt=""
                  aria-hidden="true"
                  className={styles.logoMark}
                  sizes="46px"
                />
              </a>

              <nav className={styles.nav} aria-label="Seções do site">
                <ul className={styles.navList}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <a className={styles.navLink} href={link.href} onClick={handleAnchorClick}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
          </div>

          <a className={ctaClassName} href="#sobre" onClick={handleAnchorClick}>
            <span className={styles.ctaLabel}>Solicitar amostra</span>
            <span className={styles.ctaIcon} aria-hidden="true">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
