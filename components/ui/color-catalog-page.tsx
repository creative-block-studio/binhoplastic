'use client';

import { useRef, useState, type CSSProperties, type WheelEvent } from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  Construction,
  Download,
  Droplets,
  Filter,
  FlaskConical,
  Percent,
  ShieldAlert,
  ShieldCheck,
  SunMedium,
  Thermometer,
} from 'lucide-react';

import catalogHeroHeader from '@/assets/images/catalogo-hero-header.webp';
import {
  catalogColors,
  defaultSelectedColorId,
  processKeys,
  processLabels,
  processShortLabels,
  type ProcessKey,
  type SpecIcon,
} from '@/components/ui/color-catalog-data';
import { FlowButton } from '@/components/ui/flow-button';
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import styles from '@/components/ui/color-catalog-page.module.css';

const catalogColorById = new Map(catalogColors.map((color) => [color.id, color]));

function formatSpecValue(value: string, icon: SpecIcon) {
  if (icon === 'temperature') {
    return value.replace(/(\d+)\s*C/g, '$1°C');
  }

  return value;
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  return {
    red: Number.parseInt(clean.slice(0, 2), 16),
    green: Number.parseInt(clean.slice(2, 4), 16),
    blue: Number.parseInt(clean.slice(4, 6), 16),
  };
}

function toLinearChannel(channel: number) {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function getRelativeLuminance(hex: string) {
  const { red, green, blue } = hexToRgb(hex);
  return (
    0.2126 * toLinearChannel(red) +
    0.7152 * toLinearChannel(green) +
    0.0722 * toLinearChannel(blue)
  );
}

function getContrastRatio(firstHex: string, secondHex: string) {
  const firstLuminance = getRelativeLuminance(firstHex);
  const secondLuminance = getRelativeLuminance(secondHex);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getReadableColor(backgroundHex: string) {
  const darkText = '#111110';
  const lightText = '#F7F2EA';

  return getContrastRatio(backgroundHex, darkText) >= getContrastRatio(backgroundHex, lightText)
    ? darkText
    : lightText;
}

function getReadableTextOnSurface(foregroundHex: string, surfaceHex: string) {
  const fallbackText = '#111110';
  return getContrastRatio(foregroundHex, surfaceHex) >= 3 ? foregroundHex : fallbackText;
}

function getSpecIcon(icon: SpecIcon) {
  switch (icon) {
    case 'temperature':
      return <Thermometer size={18} strokeWidth={1.8} />;
    case 'sun':
      return <SunMedium size={18} strokeWidth={1.8} />;
    case 'migration':
      return <Droplets size={18} strokeWidth={1.8} />;
    case 'pigment':
      return <FlaskConical size={18} strokeWidth={1.8} />;
    case 'percent':
      return <Percent size={18} strokeWidth={1.8} />;
    case 'shield':
      return <ShieldCheck size={18} strokeWidth={1.8} />;
  }
}

export function ColorCatalogPage() {
  const [activeProcess, setActiveProcess] = useState<ProcessKey>('todos');
  const [selectedColorId, setSelectedColorId] = useState(defaultSelectedColorId);
  const detailScrollableRef = useRef<HTMLDivElement | null>(null);

  const filteredColors =
    activeProcess === 'todos'
      ? catalogColors
      : catalogColors.filter((color) => color.processes.includes(activeProcess));

  const selectedColor = catalogColorById.get(selectedColorId) ?? catalogColors[0];

  const handleDetailWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = detailScrollableRef.current;
    if (!container) return;

    event.preventDefault();
    event.stopPropagation();

    const maxScrollTop = container.scrollHeight - container.clientHeight;
    if (maxScrollTop <= 0) return;

    const nextScrollTop = Math.max(0, Math.min(container.scrollTop + event.deltaY, maxScrollTop));
    container.scrollTop = nextScrollTop;
  };

  const primaryCtaStyle = {
    '--catalog-primary-cta-color': selectedColor.swatch,
    '--catalog-primary-cta-hover-color': '#FFFFFF',
    '--catalog-primary-cta-text': getReadableColor(selectedColor.swatch),
    '--catalog-primary-cta-hover-text': getReadableTextOnSurface(selectedColor.swatch, '#FFFFFF'),
  } as CSSProperties;

  return (
    <>
      <SiteHeader />
      <main id="inicio" className={styles.page}>
        <section className={styles.hero} data-nav-tone="dark">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              src={catalogHeroHeader}
              alt=""
              fill
              className={styles.heroBackgroundImage}
              sizes="100vw"
              priority
            />
          </div>
          <div className={styles.heroBackdrop} aria-hidden="true" />

          <div className="site-shell">
            <div className={styles.heroInner}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>Catálogo de Cores</span>
                <h1 className={styles.title}>Encontre a cor certa para o seu processo</h1>
                <p className={styles.description}>
                  Filtre por processo e resina para ver as cores disponíveis para a sua linha.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.catalogSection} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.filtersBar}>
              <div className={styles.filtersRow}>
                {processKeys.map((process) => (
                  <button
                    key={process}
                    type="button"
                    className={process === activeProcess ? styles.filterActive : styles.filterChip}
                    onClick={() => setActiveProcess(process)}
                    aria-pressed={process === activeProcess}
                  >
                    {processLabels[process]}
                  </button>
                ))}
              </div>

              <div className={styles.filterMeta}>
                <Filter size={16} strokeWidth={1.8} />
                <span>{filteredColors.length} cores visíveis</span>
              </div>
            </div>

            <div className={styles.catalogGrid}>
              <div className={styles.cardsColumn}>
                <div className={styles.cardsGrid}>
                  {filteredColors.map((color) => {
                    const isSelected = color.id === selectedColor.id;

                    return (
                      <button
                        key={color.id}
                        type="button"
                        className={isSelected ? styles.cardSelected : styles.card}
                        onClick={() => setSelectedColorId(color.id)}
                        style={isSelected ? { borderColor: color.swatch } : undefined}
                      >
                        <div
                          className={styles.cardSwatch}
                          style={{
                            backgroundColor: color.swatch,
                            color: getReadableColor(color.swatch),
                          }}
                        >
                          <div className={styles.cardHeadline}>
                            <span className={styles.cardCode}>{`COD. ${color.code}`}</span>
                            <h2 className={styles.cardTitle}>{color.name}</h2>
                          </div>
                        </div>

                        <div className={styles.cardBody}>
                          <div className={styles.cardPills}>
                            {color.processes.map((process) => (
                              <span key={process} className={styles.processPill}>
                                {processShortLabels[process]}
                              </span>
                            ))}
                          </div>

                          <div className={styles.cardSection}>
                            <span className={styles.cardSectionLabel}>Polímeros</span>
                            <p className={styles.cardSectionValue}>{color.polymers.join(', ')}</p>
                          </div>

                          <div className={styles.cardStatusRow}>
                            <span
                              className={
                                color.heavyMetalsFree ? styles.statusPositive : styles.statusWarning
                              }
                            >
                              {color.heavyMetalsFree ? (
                                <ShieldCheck size={14} strokeWidth={1.9} />
                              ) : (
                                <ShieldAlert size={14} strokeWidth={1.9} />
                              )}
                              {color.heavyMetalsFree
                                ? 'Livre de metais pesados (atóxico)'
                                : 'Contém metais pesados'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.catalogClosingNotice}>
                  <span className={styles.catalogClosingIcon} aria-hidden="true">
                    <Construction size={20} strokeWidth={1.9} />
                  </span>

                  <div className={styles.catalogClosingCopy}>
                    <p className={styles.catalogClosingEyebrow}>Em construção</p>
                    <h2 className={styles.catalogClosingTitle}>
                      Novas cores, filtros e materiais técnicos em breve.
                    </h2>
                    <p className={styles.catalogClosingText}>
                      Estamos expandindo este catálogo com novas referências e conteúdos de apoio.
                    </p>
                  </div>
                </div>
              </div>

              <aside className={styles.detailColumn}>
                <div className={styles.detailPanel}>
                  <div
                    className={styles.detailHero}
                    style={{
                      backgroundColor: selectedColor.swatch,
                      color: getReadableColor(selectedColor.swatch),
                    }}
                  >
                    <div className={styles.detailHeroMeta}>
                      <span className={styles.detailCode}>{`COD. ${selectedColor.code}`}</span>
                      <h2 className={styles.detailName}>{selectedColor.name}</h2>
                    </div>
                  </div>

                  <div
                    ref={detailScrollableRef}
                    className={styles.detailScrollable}
                    onWheelCapture={handleDetailWheel}
                  >
                    <div className={styles.alertBox}>
                      <span className={styles.alertBar} aria-hidden="true" />
                      <span className={styles.alertIcon} aria-hidden="true">
                        <AlertTriangle size={18} strokeWidth={2} />
                      </span>
                      <p className={styles.alertText}>
                        Cores sofrem variação em telas. Solicite uma amostra física antes de aprovar.
                      </p>
                    </div>

                    <div className={styles.detailStack}>
                      <section className={styles.detailSection}>
                        <h3 className={styles.detailSectionTitle}>Especificações Técnicas</h3>
                        <div className={styles.specList}>
                          {selectedColor.technicalSpecs.map((item) => (
                            <article key={item.label} className={styles.specItem}>
                              <span className={styles.specIcon}>{getSpecIcon(item.icon)}</span>
                              <div className={styles.specHeading}>
                                <p className={styles.specLabel}>{item.label}</p>
                              </div>
                              <div className={styles.specMeasure}>
                                <strong className={styles.specValue}>
                                  {formatSpecValue(item.value, item.icon)}
                                </strong>
                                {item.description ? (
                                  <p className={styles.specDescription}>{item.description}</p>
                                ) : null}
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className={styles.detailSection}>
                        <h3 className={styles.detailSectionTitle}>Aplicações</h3>
                        <div className={styles.specList}>
                          {selectedColor.applications.map((item) => (
                            <article key={item.label} className={styles.specItem}>
                              <span className={styles.specIcon}>{getSpecIcon(item.icon)}</span>
                              <div className={styles.specHeading}>
                                <p className={styles.specLabel}>{item.label}</p>
                              </div>
                              <div className={styles.specMeasure}>
                                <strong className={styles.specValue}>
                                  {formatSpecValue(item.value, item.icon)}
                                </strong>
                                {item.description ? (
                                  <p className={styles.specDescription}>{item.description}</p>
                                ) : null}
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className={styles.detailSection}>
                        <h3 className={styles.detailSectionTitle}>Responsável Técnico</h3>
                        <div className={styles.responsibleBlock}>
                          <p className={styles.responsibleName}>{selectedColor.responsible.name}</p>
                          <p className={styles.responsibleRole}>{selectedColor.responsible.role}</p>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className={styles.ctaStack}>
                    <FlowButton
                      href={`/solicitar-amostra?cor=${encodeURIComponent(selectedColor.name)}&codigo=${encodeURIComponent(selectedColor.code)}`}
                      className={styles.primaryCta}
                      style={primaryCtaStyle}
                      text="Solicitar amostra desta cor"
                    />

                    <button type="button" className={styles.secondaryCta} disabled>
                      <Download size={16} strokeWidth={1.9} />
                      <span>Baixar laudo de análise (em breve)</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
