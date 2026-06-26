'use client';

import type { MouseEvent } from 'react';
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import styles from '@/components/ui/site-footer.module.css';

const navigationLinks = [
  { href: '/#inicio', label: 'Home' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/sobre', label: 'Sobre' },
  { href: 'https://wa.me/5511910089499', label: 'Contato' },
] as const;

const applicationLinks = [
  { href: '/#processo-injecao', label: 'Injeção' },
  { href: '/#processo-extrusao', label: 'Extrusão' },
  { href: '/#processo-sopro', label: 'Sopro' },
  { href: '/#processo-filme', label: 'Filme' },
  { href: '/#processo-fios-cabos', label: 'Fios e cabos' },
] as const;

const socialLinks = [
  {
    href: 'https://www.instagram.com/binhoplastic/',
    label: 'Instagram da Binho Plastic',
  },
] as const;

export function SiteFooter() {
  const handlePageResetNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.assign(href);
  };

  return (
    <footer className={styles.footer} data-nav-tone="dark">
      <div className={styles.shell}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            <div className={styles.column}>
              <h2 className={styles.brandTitle}>Binho Plastic</h2>
              <p className={styles.brandCopy}>
                Masterbatch, pigmentos e aditivos
                <br />
                Soluções de cor para a indústria transformadora.
              </p>
              <div className={styles.socials}>
                {socialLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className={styles.socialLink}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3.25"
                        y="3.25"
                        width="17.5"
                        height="17.5"
                        rx="5.25"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4.1"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      />
                      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Navegação</h3>
              <div className={styles.list}>
                {navigationLinks.map((link) => (
                  link.href.startsWith('https://') ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className={styles.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={styles.link}
                      onClick={(event) => handlePageResetNavigation(event, link.href)}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Aplicações</h3>
              <div className={styles.list}>
                {applicationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.link}
                    onClick={(event) => handlePageResetNavigation(event, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.column} id="contato">
              <h3 className={styles.sectionTitle}>Contato</h3>
              <div className={styles.contactList}>
                <div className={styles.contactRow}>
                  <MapPin size={18} strokeWidth={1.9} className={styles.contactIcon} />
                  <p className={styles.contactText}>Itaqua, SP - Brasil</p>
                </div>
                <div className={styles.contactRow}>
                  <Phone size={18} strokeWidth={1.9} className={styles.contactIcon} />
                  <p className={styles.contactText}>+55 11 91008-9499</p>
                </div>
                <div className={styles.contactRow}>
                  <Mail size={18} strokeWidth={1.9} className={styles.contactIcon} />
                  <p className={styles.contactText}>binhoplastic@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.shell}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © 2026 Creative Block Studio. Design e Desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
