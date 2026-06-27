'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { getImageProps } from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Beaker, Blend, FlaskConical } from 'lucide-react';

import foundationImage from '@/assets/images/about-foundation.webp';
import heroCardsImage from '@/assets/images/about-hero-cards.png';
import heroCardsMobileImage from '@/assets/images/about-hero-cards-mobile.webp';
import portraitImage from '@/assets/images/about-portrait.webp';
import { CountUpValue } from '@/components/ui/count-up-value';
import { FlowButton } from '@/components/ui/flow-button';
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import styles from '@/components/ui/about-page.module.css';

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getRevealMotion(
  isActive: boolean,
  delay: number,
  y = 24,
  duration = 0.72,
) {
  return {
    initial: { opacity: 0, y },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { delay, duration, ease: revealEase },
  };
}

const metrics = [
  {
    value: '500+',
    label: 'cores desenvolvidas',
    mobileLabel: 'cores',
  },
  {
    value: '20 anos',
    label: 'de experiência no setor',
    mobileLabel: '',
  },
  {
    value: '98%',
    label: 'de replicabilidade',
    mobileLabel: 'de precisão',
  },
] as const;

const differentiators = [
  {
    title: 'Match de padrão',
    description: 'Aprovação técnica antes da produção.',
    icon: Blend,
    tone: 'cyan',
  },
  {
    title: 'Laboratório próprio',
    description: 'Colorimetria do desenvolvimento ao lote final.',
    icon: FlaskConical,
    tone: 'navy',
  },
  {
    title: '98% de replicabilidade',
    description: 'Consistência em todos os processos e resinas.',
    icon: Beaker,
    tone: 'amber',
  },
] as const;

export function AboutPage() {
  const duckAudioRef = useRef<HTMLAudioElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const metricsRef = useRef<HTMLElement | null>(null);
  const [metricsActive, setMetricsActive] = useState(false);
  const isHeroInView = useInView(heroRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -10% 0px',
  });
  const isStoryInView = useInView(storyRef, {
    once: true,
    amount: 0.22,
    margin: '0px 0px -12% 0px',
  });

  useEffect(() => {
    const node = metricsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMetricsActive(true);
        observer.disconnect();
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const handleDuckClick = () => {
    const audio = duckAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {});
  };

  const heroImageAlt = 'Cartelas coloridas de masterbatch da Binho Plastic.';
  const heroImageSizes = '(max-width: 900px) 100vw, 86vw';
  const { props: heroDesktopProps } = getImageProps({
    src: heroCardsImage,
    alt: heroImageAlt,
    className: styles.heroImage,
    sizes: heroImageSizes,
    priority: true,
  });
  const { props: heroMobileProps } = getImageProps({
    src: heroCardsMobileImage,
    alt: heroImageAlt,
    className: styles.heroImage,
    sizes: heroImageSizes,
    priority: true,
  });

  return (
    <>
      <SiteHeader />
      <audio ref={duckAudioRef} src="/quack.mp3" preload="auto" aria-hidden="true" />
      <main className={styles.page} id="inicio">
        <section ref={heroRef} className={styles.hero} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.heroInner}>
              <div className={styles.heroGrid}>
                <div className={styles.heroHeadingBlock}>
                  <motion.h1 className={styles.title} {...getRevealMotion(isHeroInView, 0.08)}>
                    Nossa História, Visão
                  </motion.h1>
                  <motion.span
                    className={styles.titleOverflow}
                    {...getRevealMotion(isHeroInView, 0.2)}
                  >
                    e Valores
                  </motion.span>
                </div>

                <div className={styles.heroCopyBlock}>
                  <motion.p className={styles.heroCopy} {...getRevealMotion(isHeroInView, 0.3)}>
                    Nascemos de dentro do setor. Por isso entendemos o que o transformador
                    precisa. Antes, durante e depois da produção.
                  </motion.p>
                </div>
              </div>

              <motion.div {...getRevealMotion(isHeroInView, 0.42, 30, 0.82)}>
                <div className={styles.heroMedia}>
                  <picture>
                    <source media="(max-width: 640px)" srcSet={heroMobileProps.srcSet} />
                    <img {...heroDesktopProps} />
                  </picture>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={storyRef} className={styles.story} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.storyInner}>
              <div className={styles.storyGrid}>
                <div className={styles.storyLead}>
                  <motion.blockquote className={styles.quote} {...getRevealMotion(isStoryInView, 0.08)}>
                    <motion.span className={styles.quoteMark} {...getRevealMotion(isStoryInView, 0.14)}>
                      “
                    </motion.span>
                    <motion.p className={styles.quoteText} {...getRevealMotion(isStoryInView, 0.2)}>
                      A Binho Plastic foi fundada por profissionais formados dentro da
                      indústria plástica. Conhecíamos os processos antes de conhecer o
                      mercado comercial, e foi essa visão técnica que definiu a forma como
                      desenvolvemos cor desde o início.
                    </motion.p>
                  </motion.blockquote>

                  <motion.div {...getRevealMotion(isStoryInView, 0.32, 30, 0.82)}>
                    <button
                      type="button"
                      className={styles.foundationButton}
                      onClick={handleDuckClick}
                      aria-label="Reproduzir som do pato"
                    >
                      <div className={styles.foundationMedia}>
                        <Image
                          src={foundationImage}
                          alt="Pigmentos e materiais da Binho Plastic em composição de bancada."
                          className={styles.foundationImage}
                          sizes="(max-width: 900px) 100vw, 42vw"
                        />
                      </div>
                    </button>
                  </motion.div>
                </div>

                <motion.article className={styles.aboutCard} {...getRevealMotion(isStoryInView, 0.26)}>
                  <motion.span className={styles.cardEyebrow} {...getRevealMotion(isStoryInView, 0.34)}>
                    Sobre nós
                  </motion.span>
                  <motion.p className={styles.cardText} {...getRevealMotion(isStoryInView, 0.4)}>
                    Atendemos os principais processos de transformação plástica: injeção,
                    extrusão, sopro, rotomoldagem, filme e fios & cabos. Nossas soluções
                    são desenvolvidas ou adaptadas para cada aplicação, com aprovação
                    técnica obrigatória antes do início da produção.
                  </motion.p>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={metricsRef}
          className={styles.metricsBand}
          data-nav-tone="light"
        >
          <div className="site-shell">
            <div className={styles.metricsInner}>
              {metrics.map((item, index) => (
                <article key={item.value} className={styles.metricItem}>
                  {index > 0 ? (
                    <span className={styles.metricDivider} aria-hidden="true" />
                  ) : null}
                  <div className={styles.metricContent}>
                    <div className={styles.metricValue}>
                      <CountUpValue
                        active={metricsActive}
                        to={Number.parseInt(item.value, 10)}
                        suffix={item.value.replace(/^\d+/, '')}
                      />
                    </div>
                    <p className={styles.metricLabel}>
                      <span className={styles.metricLabelDesktop}>{item.label}</span>
                      {item.mobileLabel ? (
                        <span className={styles.metricLabelMobile}>{item.mobileLabel}</span>
                      ) : null}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.portraitSection} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.portraitInner}>
              <div className={styles.portraitFrame}>
                <Image
                  src={portraitImage}
                  alt="Retrato institucional em ambiente industrial."
                  className={styles.portraitImage}
                  sizes="(max-width: 900px) 100vw, 86vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.developmentSection} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.developmentInner}>
              <div className={styles.developmentGrid}>
                <div className={styles.developmentCopy}>
                  <span className={styles.developmentEyebrow}>Desenvolvimento sob medida</span>
                  <h2 className={styles.developmentTitle}>
                    Não encontrou exatamente o que precisa?
                  </h2>
                  <p className={styles.developmentText}>
                    Desenvolvemos a cor exclusiva do seu produto com match de padrão,
                    aprovação técnica e consistência garantida antes da produção.
                  </p>

                  <FlowButton
                    href="/solicitar-amostra"
                    className={styles.developmentButton}
                    text="Solicitar desenvolvimento de cor"
                  />
                </div>

                <div className={styles.featureList}>
                  {differentiators.map(({ title, description, icon: Icon, tone }) => (
                    <article
                      key={title}
                      className={styles.featureCard}
                      data-tone={tone}
                    >
                      <span className={styles.featureIcon}>
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <div className={styles.featureBody}>
                        <h3 className={styles.featureTitle}>{title}</h3>
                        <p className={styles.featureDescription}>{description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
