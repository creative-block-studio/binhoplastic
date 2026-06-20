'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';

type MediaItem = {
  alt?: string;
  label?: string;
} & (
  | {
      kind?: 'image';
      src: string | StaticImageData;
    }
  | {
      kind: 'frame-sequence';
      frames: readonly string[];
    }
);

interface ZoomParallaxProps {
  /** Array of media to be displayed in the parallax effect max 7 items */
  images: readonly MediaItem[];
  finalReveal?: {
    eyebrow: string;
    headlineTopPrefix?: string;
    headlineTopEmphasis: string;
    headlineBottom: string;
    caption?: string;
  };
}

export function ZoomParallax({ images, finalReveal }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const frameImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const frameIndexes = useRef<number[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
  const supportingItemsOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.86],
    [1, 0],
  );
  const finalOverlayOpacityRaw = useTransform(
    scrollYProgress,
    [0.76, 0.94],
    [0, 1],
  );
  const finalOverlayOpacity = useSpring(finalOverlayOpacityRaw, {
    stiffness: 140,
    damping: 24,
    mass: 0.35,
  });
  const finalTextY = useTransform(scrollYProgress, [0.78, 0.94], [48, 0]);
  const focusedRadius = useTransform(scrollYProgress, [0.74, 0.92], [4, 0]);
  const focusedClipPath = useTransform(
    focusedRadius,
    (radius) => `inset(0 round ${radius}px)`,
  );
  const focusedImageScale = useTransform(scrollYProgress, [0.74, 1], [1.02, 1]);

  useEffect(() => {
    images.forEach((item) => {
      if (item.kind !== 'frame-sequence') return;

      item.frames.forEach((src) => {
        const image = new window.Image();
        image.src = src;
      });
    });
  }, [images]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    images.forEach((item, index) => {
      if (item.kind !== 'frame-sequence') return;

      const image = frameImageRefs.current[index];
      if (!image || item.frames.length === 0) return;

      const nextIndex = Math.min(
        item.frames.length - 1,
        Math.round(latest * (item.frames.length - 1)),
      );

      if (frameIndexes.current[index] === nextIndex) return;

      image.src = item.frames[nextIndex];
      frameIndexes.current[index] = nextIndex;
    });
  });

  return (
    <div ref={container} className="relative h-[300vh] bg-[#0D0C1A]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0D0C1A]">
        {finalReveal && images[0]?.kind === 'frame-sequence' ? (
          <motion.div
            style={{ opacity: finalOverlayOpacity }}
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,40,76,0.92)_0%,rgba(34,43,88,0.54)_44%,rgba(13,12,26,0.86)_100%)]" />
            <motion.div
              style={{ y: finalTextY, opacity: finalOverlayOpacity }}
              className="site-shell absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <div className="flex w-full max-w-[72rem] flex-col items-center">
                <p className="text-[clamp(1rem,1.5vw,1.9rem)] font-normal tracking-[0.17em] text-[#62C3D1]">
                  {finalReveal.eyebrow}
                </p>
                <h2 className="mt-5 text-[clamp(2.4rem,5.85vw,5.25rem)] font-normal leading-[0.94] tracking-[-0.045em] text-[#D9D9D9]">
                  <span className="block">
                    {finalReveal.headlineTopPrefix ? (
                      <span>{finalReveal.headlineTopPrefix} </span>
                    ) : null}
                    <span className="font-bold">{finalReveal.headlineTopEmphasis}</span>
                  </span>
                  <span className="mt-2 block">{finalReveal.headlineBottom}</span>
                </h2>
                <div className="mt-10 h-px w-full max-w-[46rem] bg-[rgba(217,217,217,0.84)]" />
                {finalReveal.caption ? (
                  <p className="mt-5 text-[clamp(1.05rem,1.55vw,2rem)] font-normal tracking-[-0.03em] text-[#D9D9D9]">
                    {finalReveal.caption}
                  </p>
                ) : null}
                <div className="mt-10 flex h-5 w-5 items-center justify-center">
                  <div className="relative h-[1.05rem] w-[1.05rem] translate-y-[-8%] rotate-45 border-b border-r border-[rgba(217,217,217,0.82)]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        <div className="absolute inset-0">
          {images.map((item, index) => {
            const scale = scales[index % scales.length];
            const isFocusedItem = index === 0;

            return (
              <motion.div
                key={index}
                style={{
                  scale,
                  opacity: isFocusedItem ? 1 : supportingItemsOpacity,
                }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
              >
                <motion.div
                  style={
                    isFocusedItem
                      ? {
                          borderRadius: focusedRadius,
                          clipPath: focusedClipPath,
                        }
                      : undefined
                  }
                  className="relative isolate h-[25vh] w-[25vw] overflow-hidden rounded-[4px] [backface-visibility:hidden] [clip-path:inset(0_round_4px)] [transform:translateZ(0)] will-change-transform"
                >
                  {item.kind === 'frame-sequence' ? (
                    <motion.img
                      ref={(node) => {
                        frameImageRefs.current[index] = node;
                        frameIndexes.current[index] = 0;
                      }}
                      src={item.frames[0]}
                      alt={item.alt || `Parallax image ${index + 1}`}
                      draggable={false}
                      className="h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
                      style={
                        isFocusedItem
                          ? { scale: focusedImageScale }
                          : undefined
                      }
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt || `Parallax image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      draggable={false}
                      className="scale-[1.02] object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
                    />
                  )}
                  {item.label ? (
                    <span className="pointer-events-none absolute left-[26px] top-5 inline-flex min-h-[38px] items-center rounded-[4px] bg-[rgba(106,114,130,0.26)] px-[9px] text-[13px] font-light leading-[1] text-white backdrop-blur-[2px]">
                      {item.label}
                    </span>
                  ) : null}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
