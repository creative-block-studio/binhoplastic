'use client';

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type WheelEvent,
} from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Check,
  Construction,
  Download,
  Droplets,
  Filter,
  FlaskConical,
  Percent,
  ShieldAlert,
  ShieldCheck,
  X,
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
const polymerOptions = Array.from(new Set(catalogColors.flatMap((color) => color.polymers))).sort();

function buildSampleRequestMessage(
  colors: Array<{
    code: string;
  }>,
) {
  if (colors.length === 0) {
    return '';
  }

  const listedColors = colors.map((color) => color.code).join(', ');

  return colors.length === 1
    ? `Gostaria de solicitar uma amostra da seguinte cor: ${listedColors}.`
    : `Gostaria de solicitar amostras das seguintes cores: ${listedColors}.`;
}

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
  const filterDrawerAnimationMs = 240;
  const [activeProcess, setActiveProcess] = useState<ProcessKey>('todos');
  const [selectedColorId, setSelectedColorId] = useState(defaultSelectedColorId);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFilterDrawerMounted, setIsFilterDrawerMounted] = useState(false);
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const [selectedRequestColorIds, setSelectedRequestColorIds] = useState<string[]>([]);
  const [selectedPolymers, setSelectedPolymers] = useState<string[]>([]);
  const [heavyMetalFilter, setHeavyMetalFilter] = useState<'todos' | 'livre' | 'contem'>('todos');
  const detailPanelRef = useRef<HTMLDivElement | null>(null);
  const detailHeroRef = useRef<HTMLDivElement | null>(null);
  const detailScrollableRef = useRef<HTMLDivElement | null>(null);
  const detailCtaRef = useRef<HTMLDivElement | null>(null);
  const filterDrawerCloseTimeoutRef = useRef<number | null>(null);
  const [detailHeights, setDetailHeights] = useState({
    collapsed: 0,
    expanded: 0,
  });

  const processFilteredColors =
    activeProcess === 'todos'
      ? catalogColors
      : catalogColors.filter((color) => color.processes.includes(activeProcess));

  const filteredColors = processFilteredColors.filter((color) => {
    const matchesPolymers =
      selectedPolymers.length === 0 ||
      selectedPolymers.some((polymer) => color.polymers.includes(polymer));

    const matchesHeavyMetals =
      heavyMetalFilter === 'todos' ||
      (heavyMetalFilter === 'livre' && color.heavyMetalsFree) ||
      (heavyMetalFilter === 'contem' && !color.heavyMetalsFree);

    return matchesPolymers && matchesHeavyMetals;
  });

  const selectedColor = catalogColorById.get(selectedColorId) ?? catalogColors[0];
  const activeDrawerFilterCount =
    selectedPolymers.length + (heavyMetalFilter === 'todos' ? 0 : 1);
  const selectedRequestColors = selectedRequestColorIds
    .map((colorId) => catalogColorById.get(colorId))
    .filter((color): color is NonNullable<typeof color> => Boolean(color));
  const selectedDetailKey = useMemo(
    () => `${selectedColor.id}-${selectedColor.technicalSpecs.length}-${selectedColor.applications.length}`,
    [selectedColor],
  );
  const canExpandDetail = detailHeights.expanded - detailHeights.collapsed > 12;
  const singleRequestHref = `/solicitar-amostra?message=${encodeURIComponent(
    buildSampleRequestMessage([{ code: selectedColor.code }]),
  )}`;
  const multipleRequestHref = `/solicitar-amostra?message=${encodeURIComponent(
    buildSampleRequestMessage(
      selectedRequestColors.map((color) => ({
        code: color.code,
      })),
    ),
  )}`;

  const handleDetailWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = detailScrollableRef.current;
    if (!container || isDetailExpanded) return;

    event.preventDefault();
    event.stopPropagation();

    const maxScrollTop = container.scrollHeight - container.clientHeight;
    if (maxScrollTop <= 0) return;

    const nextScrollTop = Math.max(0, Math.min(container.scrollTop + event.deltaY, maxScrollTop));
    container.scrollTop = nextScrollTop;
  };

  useLayoutEffect(() => {
    const measureDetailHeights = () => {
      const panel = detailPanelRef.current;
      const hero = detailHeroRef.current;
      const scrollable = detailScrollableRef.current;
      const cta = detailCtaRef.current;

      if (!panel || !hero || !scrollable || !cta || typeof window === 'undefined') {
        return;
      }

      const panelTop = panel.getBoundingClientRect().top;
      const viewportLimit = window.innerHeight - 1.25 * 16;
      const maxPanelHeight = Math.min(46 * 16, viewportLimit - panelTop);
      const heroHeight = hero.getBoundingClientRect().height;
      const ctaHeight = cta.getBoundingClientRect().height;
      const availableContentHeight = Math.max(14 * 16, maxPanelHeight - heroHeight - ctaHeight);
      const expandedContentHeight = scrollable.scrollHeight;

      setDetailHeights({
        collapsed: Math.min(availableContentHeight, expandedContentHeight),
        expanded: expandedContentHeight,
      });
    };

    measureDetailHeights();

    window.addEventListener('resize', measureDetailHeights);

    return () => {
      window.removeEventListener('resize', measureDetailHeights);
    };
  }, [selectedDetailKey]);

  useEffect(() => {
    if (!isDetailExpanded && detailScrollableRef.current) {
      detailScrollableRef.current.scrollTop = 0;
    }
  }, [selectedColorId, isDetailExpanded]);

  useEffect(() => {
    return () => {
      if (filterDrawerCloseTimeoutRef.current !== null) {
        window.clearTimeout(filterDrawerCloseTimeoutRef.current);
      }
    };
  }, []);

  const primaryCtaStyle = {
    '--catalog-primary-cta-color': selectedColor.swatch,
    '--catalog-primary-cta-hover-color': '#FFFFFF',
    '--catalog-primary-cta-text': getReadableColor(selectedColor.swatch),
    '--catalog-primary-cta-hover-text': getReadableTextOnSurface(selectedColor.swatch, '#FFFFFF'),
  } as CSSProperties;

  const togglePolymer = (polymer: string) => {
    setSelectedPolymers((current) =>
      current.includes(polymer)
        ? current.filter((item) => item !== polymer)
        : [...current, polymer],
    );
  };

  const clearDrawerFilters = () => {
    setSelectedPolymers([]);
    setHeavyMetalFilter('todos');
  };

  const toggleRequestColor = (colorId: string) => {
    setSelectedRequestColorIds((current) =>
      current.includes(colorId)
        ? current.filter((item) => item !== colorId)
        : [...current, colorId],
    );
  };

  const clearSelectedRequestColors = () => {
    setSelectedRequestColorIds([]);
  };

  const closeFilterDrawer = () => {
    if (filterDrawerCloseTimeoutRef.current !== null) {
      window.clearTimeout(filterDrawerCloseTimeoutRef.current);
    }

    setIsFilterDrawerOpen(false);

    filterDrawerCloseTimeoutRef.current = window.setTimeout(() => {
      setIsFilterDrawerMounted(false);
      filterDrawerCloseTimeoutRef.current = null;
    }, filterDrawerAnimationMs);
  };

  const toggleFilterDrawer = () => {
    if (!isFilterDrawerOpen) {
      if (filterDrawerCloseTimeoutRef.current !== null) {
        window.clearTimeout(filterDrawerCloseTimeoutRef.current);
        filterDrawerCloseTimeoutRef.current = null;
      }

      setIsFilterDrawerMounted(true);
      window.requestAnimationFrame(() => {
        setIsFilterDrawerOpen(true);
      });
      return;
    }

    closeFilterDrawer();
  };

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

              <button
                type="button"
                className={styles.filterMeta}
                aria-expanded={isFilterDrawerOpen}
                aria-controls="catalog-filter-drawer"
                onClick={toggleFilterDrawer}
              >
                <Filter size={16} strokeWidth={1.8} />
                <span>Filtrar</span>
                {activeDrawerFilterCount > 0 ? (
                  <span className={styles.filterMetaCount}>{activeDrawerFilterCount}</span>
                ) : null}
              </button>
            </div>

            <div className={styles.catalogAlert}>
              <span className={styles.alertBar} aria-hidden="true" />
              <span className={styles.alertIcon} aria-hidden="true">
                <AlertTriangle size={18} strokeWidth={2} />
              </span>
              <p className={styles.alertText}>
                Cores sofrem variação em telas. Solicite uma amostra física antes de aprovar.
              </p>
            </div>

            {selectedRequestColors.length > 0 ? (
              <div className={styles.requestSelectionBar}>
                <div className={styles.requestSelectionCopy}>
                  <p className={styles.requestSelectionTitle}>
                    {selectedRequestColors.length}{' '}
                    {selectedRequestColors.length === 1
                      ? 'cor selecionada para amostra'
                      : 'cores selecionadas para amostra'}
                  </p>
                  <p className={styles.requestSelectionCodes}>
                    {selectedRequestColors.map((color) => color.code).join(', ')}
                  </p>
                </div>

                <div className={styles.requestSelectionActions}>
                  <button
                    type="button"
                    className={styles.requestSelectionClear}
                    onClick={clearSelectedRequestColors}
                  >
                    Limpar
                  </button>
                  <FlowButton
                    href={multipleRequestHref}
                    className={styles.requestSelectionCta}
                    text={
                      selectedRequestColors.length === 1
                        ? 'Solicitar amostra'
                        : 'Solicitar amostras'
                    }
                  />
                </div>
              </div>
            ) : null}

            {isFilterDrawerMounted ? (
              <>
                <button
                  type="button"
                  className={styles.filterDrawerBackdrop}
                  data-state={isFilterDrawerOpen ? 'open' : 'closed'}
                  aria-label="Fechar filtros"
                  onClick={closeFilterDrawer}
                />

                <div
                  id="catalog-filter-drawer"
                  className={styles.filterDrawer}
                  data-state={isFilterDrawerOpen ? 'open' : 'closed'}
                  style={
                    {
                      '--filter-drawer-duration': `${filterDrawerAnimationMs}ms`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.filterDrawerHeader}>
                    <div className={styles.filterDrawerTitleBlock}>
                      <p className={styles.filterDrawerEyebrow}>Filtro do catálogo</p>
                      <h2 className={styles.filterDrawerTitle}>Refine as cores visíveis</h2>
                    </div>

                    <button
                      type="button"
                      className={styles.filterDrawerClose}
                      aria-label="Fechar filtros"
                      onClick={closeFilterDrawer}
                    >
                      <X size={16} strokeWidth={2} />
                    </button>
                  </div>

                  <div className={styles.filterDrawerBody}>
                    <section className={styles.filterDrawerSection}>
                      <div className={styles.filterDrawerSectionHead}>
                        <h3 className={styles.filterDrawerSectionTitle}>Processo</h3>
                      </div>

                      <div className={styles.filterDrawerOptions}>
                        {processKeys
                          .filter((process) => process !== 'todos')
                          .map((process) => {
                            const isActive = activeProcess === process;

                            return (
                              <button
                                key={process}
                                type="button"
                                className={
                                  isActive ? styles.filterDrawerOptionActive : styles.filterDrawerOption
                                }
                                aria-pressed={isActive}
                                onClick={() => setActiveProcess(process)}
                              >
                                <span>{processLabels[process]}</span>
                                {isActive ? <Check size={14} strokeWidth={2} /> : null}
                              </button>
                            );
                          })}
                      </div>
                    </section>

                    <section className={styles.filterDrawerSection}>
                      <div className={styles.filterDrawerSectionHead}>
                        <h3 className={styles.filterDrawerSectionTitle}>Polímeros</h3>
                        <p className={styles.filterDrawerSectionText}>
                          Selecione uma ou mais resinas.
                        </p>
                      </div>

                      <div className={styles.filterDrawerOptions}>
                        {polymerOptions.map((polymer) => {
                          const isActive = selectedPolymers.includes(polymer);

                          return (
                            <button
                              key={polymer}
                              type="button"
                              className={
                                isActive ? styles.filterDrawerOptionActive : styles.filterDrawerOption
                              }
                              aria-pressed={isActive}
                              onClick={() => togglePolymer(polymer)}
                            >
                              <span>{polymer}</span>
                              {isActive ? <Check size={14} strokeWidth={2} /> : null}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <section className={styles.filterDrawerSection}>
                      <div className={styles.filterDrawerSectionHead}>
                        <h3 className={styles.filterDrawerSectionTitle}>Metais pesados</h3>
                        <p className={styles.filterDrawerSectionText}>
                          Filtre por conformidade do composto.
                        </p>
                      </div>

                      <div className={styles.filterDrawerOptions}>
                        {[
                          { key: 'todos', label: 'Todos' },
                          { key: 'livre', label: 'Livre de metais pesados' },
                          { key: 'contem', label: 'Contém metais pesados' },
                        ].map((option) => {
                          const isActive = heavyMetalFilter === option.key;

                          return (
                            <button
                              key={option.key}
                              type="button"
                              className={
                                isActive ? styles.filterDrawerOptionActive : styles.filterDrawerOption
                              }
                              aria-pressed={isActive}
                              onClick={() =>
                                setHeavyMetalFilter(option.key as 'todos' | 'livre' | 'contem')
                              }
                            >
                              <span>{option.label}</span>
                              {isActive ? <Check size={14} strokeWidth={2} /> : null}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </div>

                  <div className={styles.filterDrawerFooter}>
                    <button
                      type="button"
                      className={styles.filterDrawerReset}
                      onClick={clearDrawerFilters}
                    >
                      Limpar filtros
                    </button>
                    <p className={styles.filterDrawerResult}>
                      {filteredColors.length} cores visíveis
                    </p>
                  </div>
                </div>
              </>
            ) : null}

            <div className={styles.catalogGrid}>
              <div className={styles.cardsColumn}>
                <div className={styles.cardsGrid}>
                  {filteredColors.map((color) => {
                    const isActiveCard = color.id === selectedColor.id;
                    const isRequestSelected = selectedRequestColorIds.includes(color.id);

                    return (
                      <article
                        key={color.id}
                        className={isActiveCard ? styles.cardSelected : styles.card}
                        data-request-selected={isRequestSelected ? 'true' : 'false'}
                        style={isActiveCard ? { borderColor: color.swatch } : undefined}
                      >
                        <button
                          type="button"
                          className={styles.cardMainButton}
                          onClick={() => setSelectedColorId(color.id)}
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
                        </div>
                        </button>

                        <div className={styles.cardActionRow}>
                          <button
                            type="button"
                            className={
                              isRequestSelected
                                ? styles.cardSelectChipActive
                                : styles.cardSelectChip
                            }
                            aria-pressed={isRequestSelected}
                            onClick={() => toggleRequestColor(color.id)}
                          >
                            {isRequestSelected
                              ? 'Selecionada para amostra'
                              : '+ Selecionar para amostra'}
                          </button>

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
                      </article>
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
                <div
                  ref={detailPanelRef}
                  className={styles.detailPanel}
                  data-expanded={isDetailExpanded ? 'true' : 'false'}
                >
                  <div
                    ref={detailHeroRef}
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
                    style={
                      detailHeights.collapsed > 0
                        ? {
                            maxHeight: `${isDetailExpanded ? detailHeights.expanded : detailHeights.collapsed}px`,
                          }
                        : undefined
                    }
                  >
                    <div className={styles.detailStack}>
                      <section className={styles.detailSection}>
                        <div className={styles.detailSectionHeader}>
                          <h3 className={styles.detailSectionTitle}>Especificações Técnicas</h3>
                          {canExpandDetail || isDetailExpanded ? (
                            <button
                              type="button"
                              className={styles.detailSectionToggle}
                              aria-expanded={isDetailExpanded}
                              onClick={() => setIsDetailExpanded((current) => !current)}
                            >
                              {isDetailExpanded ? (
                                <ChevronUp size={14} strokeWidth={2} />
                              ) : (
                                <ChevronDown size={14} strokeWidth={2} />
                              )}
                              <span>{isDetailExpanded ? 'Recolher' : 'Expandir'}</span>
                            </button>
                          ) : null}
                        </div>
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

                  <div ref={detailCtaRef} className={styles.ctaStack}>
                    <FlowButton
                      href={singleRequestHref}
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
