import {
  Mail,
  MapPin,
  Phone,
  Share2,
  Target,
} from 'lucide-react';

import styles from '@/components/ui/site-footer.module.css';

const navigationLinks = [
  { href: '/#inicio', label: 'Home' },
  { href: '/#catalogo', label: 'Catálogo' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
] as const;

const applicationLinks = [
  { href: '/#processo-injecao', label: 'Injeção' },
  { href: '/#processo-extrusao', label: 'Extrusão' },
  { href: '/#processo-sopro', label: 'Sopro' },
  { href: '/#processo-filme', label: 'Filme' },
  { href: '/#processo-fios-cabos', label: 'Fios e cabos' },
] as const;

const socialLinks = [
  { href: '/#contato', label: 'Localização', icon: Target },
  { href: '/#contato', label: 'Compartilhar', icon: Share2 },
] as const;

export function SiteFooter() {
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
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className={styles.socialLink}
                    aria-label={label}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Navegação</h3>
              <div className={styles.list}>
                {navigationLinks.map((link) => (
                  <a key={link.label} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Aplicações</h3>
              <div className={styles.list}>
                {applicationLinks.map((link) => (
                  <a key={link.label} href={link.href} className={styles.link}>
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
