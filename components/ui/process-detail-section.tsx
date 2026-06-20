'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import { FlowButton } from '@/components/ui/flow-button';
import styles from '@/components/ui/process-detail-section.module.css';

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type AnnotationPath = {
  d: string;
  delay: number;
};

type AnnotationRect = {
  x: number;
  y: number;
  delay: number;
};

type ProcessCodeCard = {
  background: string;
  label?: string;
  textColor?: string;
};

export const defaultProcessAnnotationPaths: AnnotationPath[] = [
  { d: 'M111 141H392L529 238', delay: 0.48 },
  { d: 'M732 129L774 182', delay: 0.84 },
  { d: 'M902 228L1129 169H1333', delay: 1.24 },
  { d: 'M458 524L556 428', delay: 0.96 },
  { d: 'M789 499L1080 614H1328', delay: 1.58 },
];

export const defaultProcessAnnotationRects: AnnotationRect[] = [
  { x: 529, y: 238, delay: 0.74 },
  { x: 774, y: 182, delay: 1.1 },
  { x: 875, y: 228, delay: 1.46 },
  { x: 556, y: 401, delay: 1.22 },
  { x: 762, y: 472, delay: 1.82 },
];

type ProcessDetailSectionProps = {
  backgroundColor: string;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  objectWidth?: string;
  objectImage: StaticImageData;
  objectAlt: string;
  foregroundColor?: string;
  eyebrowColor?: string;
  titleColor?: string;
  bodyColor?: string;
  productsColor?: string;
  productsTitleColor?: string;
  annotationColor?: string;
  annotationRectColor?: string;
  arrowColor?: string;
  eyebrow: string;
  title: string;
  description: string;
  products: readonly string[];
  chipTop: string;
  chipBottom: string;
  chipTopStyle?: CSSProperties;
  chipBottomStyle?: CSSProperties;
  codeCardLabel?: string;
  codeCardColor: string;
  codeCardTextColor?: string;
  codeCards?: readonly ProcessCodeCard[];
  codeCardContainerStyle?: CSSProperties;
  codeCardSize?: 'default' | 'compact';
  ghostTitleColor?: string;
  ghostTitleFontSize?: string;
  ctaColor?: string;
  ctaBorderColor?: string;
  ctaFillColor?: string;
  ctaHoverColor?: string;
  showCta?: boolean;
  annotationPaths?: readonly AnnotationPath[];
  annotationRects?: readonly AnnotationRect[];
};

export function ProcessDetailSection({
  backgroundColor,
  backgroundImage,
  backgroundImageOpacity = 1,
  objectWidth,
  objectImage,
  objectAlt,
  foregroundColor,
  eyebrowColor,
  titleColor,
  bodyColor,
  productsColor,
  productsTitleColor,
  annotationColor,
  annotationRectColor,
  arrowColor,
  eyebrow,
  title,
  description,
  products,
  chipTop,
  chipBottom,
  chipTopStyle,
  chipBottomStyle,
  codeCardLabel,
  codeCardColor,
  codeCardTextColor,
  codeCards,
  codeCardContainerStyle,
  codeCardSize = 'default',
  ghostTitleColor,
  ghostTitleFontSize,
  ctaColor,
  ctaBorderColor,
  ctaFillColor,
  ctaHoverColor,
  showCta = false,
  annotationPaths = defaultProcessAnnotationPaths,
  annotationRects = defaultProcessAnnotationRects,
}: ProcessDetailSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const resolvedObjectImageSizes =
    objectWidth && objectWidth.endsWith('%')
      ? `${Number.parseFloat(objectWidth)}vw`
      : '32.56vw';
  const isSequenceActive = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: '0px 0px -8% 0px',
  });

  const sectionStyle = {
    '--process-background': backgroundColor,
    '--process-background-image': backgroundImage
      ? `url("${backgroundImage}")`
      : 'none',
    '--process-background-opacity': backgroundImageOpacity,
    '--process-object-width': objectWidth ?? '32.56%',
    '--process-foreground': foregroundColor ?? '#ffffff',
    '--process-eyebrow-color': eyebrowColor ?? 'rgba(255, 255, 255, 0.58)',
    '--process-title-color': titleColor ?? '#ffffff',
    '--process-body-color': bodyColor ?? 'rgba(255, 255, 255, 0.86)',
    '--process-products-color':
      productsColor ?? 'rgba(255, 255, 255, 0.86)',
    '--process-products-title-color':
      productsTitleColor ?? 'rgba(255, 255, 255, 0.94)',
    '--process-annotation-color':
      annotationColor ?? 'rgba(255, 255, 255, 0.72)',
    '--process-annotation-rect-color': annotationRectColor ?? '#ffffff',
    '--process-arrow-color': arrowColor ?? 'rgba(255, 255, 255, 0.8)',
    '--process-card-background': codeCardColor,
    '--process-card-text-color':
      codeCardTextColor ?? 'rgba(255, 255, 255, 0.78)',
    '--process-ghost-font-size':
      ghostTitleFontSize ?? 'clamp(86px, 8.7vw, 125px)',
    '--process-cta-color': ctaColor ?? '#ffffff',
    '--process-cta-border-color':
      ctaBorderColor ?? 'rgba(255, 255, 255, 0.38)',
    '--process-cta-fill-color': ctaFillColor ?? '#ffffff',
    '--process-cta-hover-color': ctaHoverColor ?? backgroundColor,
    '--process-ghost-color': ghostTitleColor ?? 'rgba(224, 240, 241, 0.08)',
  } as CSSProperties;

  const resolvedCodeCards =
    codeCards && codeCards.length > 0
      ? codeCards
      : [
          {
            background: codeCardColor,
            label: codeCardLabel,
            textColor: codeCardTextColor,
          },
        ];

  return (
    <section ref={sectionRef} className={styles.section} style={sectionStyle}>
      <div className="site-shell">
        <div className={styles.stage}>
          <div className={styles.composition}>
            <div className={styles.copyLeft}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isSequenceActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 0.12, duration: 0.58, ease: revealEase }}
              >
                <small className={styles.eyebrow}>{eyebrow}</small>
                <h2 className={styles.title}>{title}</h2>
              </motion.div>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isSequenceActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 0.34, duration: 0.58, ease: revealEase }}
              >
                {description}
              </motion.p>
            </div>

            <div className={styles.objectShadow} aria-hidden="true" />

            <div className={styles.objectWrap}>
              <motion.div
                className={styles.objectMotion}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2.8,
                  ease: 'easeInOut',
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Image
                  src={objectImage}
                  alt={objectAlt}
                  fill
                  sizes={resolvedObjectImageSizes}
                  quality={100}
                  className={styles.object}
                />
              </motion.div>
            </div>

            <div className={styles.copyRight}>
              <motion.small
                className={styles.productsTitle}
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isSequenceActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 1.38, duration: 0.58, ease: revealEase }}
              >
                PRODUTOS
              </motion.small>

              <motion.p
                className={styles.productsList}
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isSequenceActive
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 1.52, duration: 0.58, ease: revealEase }}
              >
                {products.map((product, index) => (
                  <span key={product}>
                    {index > 0 ? <br /> : null}
                    {product}
                  </span>
                ))}
              </motion.p>
            </div>

            <motion.span
              className={`${styles.chip} ${styles.chipTop}`}
              style={chipTopStyle}
              initial={{ opacity: 0, y: 18 }}
              animate={
                isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
              }
              transition={{ delay: 0.98, duration: 0.58, ease: revealEase }}
            >
              {chipTop}
            </motion.span>

            <motion.span
              className={`${styles.chip} ${styles.chipBottom}`}
              style={chipBottomStyle}
              initial={{ opacity: 0, y: 18 }}
              animate={
                isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
              }
              transition={{ delay: 1.12, duration: 0.58, ease: revealEase }}
            >
              {chipBottom}
            </motion.span>

            <motion.div
              className={`${styles.codeCardWrap} ${codeCardSize === 'compact' ? styles.codeCardWrapCompact : ''}`}
              style={codeCardContainerStyle}
              initial={{ opacity: 0, y: 18 }}
              animate={
                isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
              }
              transition={{ delay: 1.72, duration: 0.58, ease: revealEase }}
            >
              {resolvedCodeCards.map((card, index) => (
                <span
                  key={`${card.background}-${index}`}
                  className={`${styles.codeCard} ${codeCardSize === 'compact' ? styles.codeCardCompact : ''}`}
                  style={
                    {
                      '--process-card-background': card.background,
                      '--process-card-text-color':
                        card.textColor ?? codeCardTextColor ?? 'rgba(255, 255, 255, 0.78)',
                    } as CSSProperties
                  }
                  aria-hidden={card.label ? undefined : true}
                >
                  {card.label}
                </span>
              ))}
            </motion.div>

            {showCta ? (
              <motion.div
                className={styles.cta}
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                transition={{ delay: 1.86, duration: 0.58, ease: revealEase }}
              >
                <FlowButton text="VER MAIS CORES" />
              </motion.div>
            ) : null}

            <svg
              className={styles.annotation}
              viewBox="0 0 1440 804"
              aria-hidden="true"
              focusable="false"
              preserveAspectRatio="none"
            >
              {annotationPaths.map((path) => (
                <motion.path
                  key={path.d}
                  d={path.d}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={
                    isSequenceActive
                      ? { opacity: 1, pathLength: 1 }
                      : { opacity: 0, pathLength: 0 }
                  }
                  transition={{
                    delay: path.delay,
                    duration: 0.62,
                    ease: revealEase,
                  }}
                />
              ))}

              {annotationRects.map((rect) => (
                <motion.rect
                  key={`${rect.x}-${rect.y}`}
                  x={rect.x}
                  y={rect.y}
                  width="27"
                  height="27"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={
                    isSequenceActive
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.72 }
                  }
                  transition={{
                    delay: rect.delay,
                    duration: 0.36,
                    ease: revealEase,
                  }}
                />
              ))}
            </svg>

            <motion.strong
              className={styles.ghostTitle}
              initial={{ opacity: 0 }}
              animate={isSequenceActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.96, duration: 0.6, ease: revealEase }}
            >
              {title}
            </motion.strong>

            <motion.div
              className={styles.arrow}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ delay: 2.05, duration: 0.52, ease: revealEase }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
