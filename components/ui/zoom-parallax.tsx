'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

type FrameAsset = HTMLImageElement | ImageBitmap;
type FrameCache = Array<FrameAsset | null>;

const canUseCreateImageBitmap = () =>
  typeof window !== 'undefined' && typeof window.createImageBitmap === 'function';

const supportsRequestIdleCallback = () =>
  typeof window !== 'undefined' && 'requestIdleCallback' in window;

const waitForImageLoad = (image: HTMLImageElement) =>
  new Promise<void>((resolve) => {
    image.onload = () => resolve();
    image.onerror = () => resolve();
  });

const yieldToMainThread = async () => {
  const schedulerWithYield = (window as Window & {
    scheduler?: { yield?: () => Promise<void> };
  }).scheduler;

  if (typeof schedulerWithYield?.yield === 'function') {
    await schedulerWithYield.yield();
    return;
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 0);
  });
};

const runWhenIdle = (callback: () => void) => {
  if (supportsRequestIdleCallback()) {
    const idleId = window.requestIdleCallback(callback, { timeout: 800 });

    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(callback, 32);

  return () => window.clearTimeout(timeoutId);
};

const disposeFrameAsset = (asset: FrameAsset | null) => {
  if (asset && 'close' in asset) {
    asset.close();
  }
};

const getFrameAssetSize = (asset: FrameAsset) => {
  if ('naturalWidth' in asset) {
    return {
      width: asset.naturalWidth || asset.width,
      height: asset.naturalHeight || asset.height,
    };
  }

  return {
    width: asset.width,
    height: asset.height,
  };
};

const decodeFrameAsset = async (src: string): Promise<FrameAsset> => {
  if (canUseCreateImageBitmap()) {
    const response = await fetch(src, { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch frame: ${src}`);
    }
    const blob = await response.blob();
    return window.createImageBitmap(blob);
  }

  const image = new window.Image();
  image.decoding = 'async';
  image.src = src;

  if (typeof image.decode === 'function') {
    try {
      await image.decode();
    } catch {
      await waitForImageLoad(image);
    }
  } else {
    await waitForImageLoad(image);
  }

  return image;
};

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
  const frameCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const frameContextRefs = useRef<(CanvasRenderingContext2D | null)[]>([]);
  const frameCacheRefs = useRef<(FrameCache | null)[]>([]);
  const frameIndexes = useRef<number[]>([]);
  const frameRafRefs = useRef<number[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [isPrimed, setIsPrimed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  const animationProgress = useTransform(
    scrollYProgress,
    [0, 0.88, 1],
    [0, 1, 1],
  );

  const scale4 = useTransform(animationProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(animationProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(animationProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(animationProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(animationProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
  const supportingItemsOpacity = useTransform(
    animationProgress,
    [0.72, 0.86],
    [1, 0],
  );
  const finalOverlayOpacityRaw = useTransform(
    animationProgress,
    [0.76, 0.94],
    [0, 1],
  );
  const finalOverlayOpacity = useSpring(finalOverlayOpacityRaw, {
    stiffness: 140,
    damping: 24,
    mass: 0.35,
  });
  const finalTextY = useTransform(animationProgress, [0.78, 0.94], [48, 0]);
  const focusedRadius = useTransform(animationProgress, [0.74, 0.92], [4, 0]);
  const focusedClipPath = useTransform(
    focusedRadius,
    (radius) => `inset(0 round ${radius}px)`,
  );
  const focusedImageScale = useTransform(
    animationProgress,
    [0.74, 1],
    [1.02, 1],
  );

  useEffect(() => {
    const target = container.current;
    if (!target || isPrimed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsPrimed(true);
        observer.disconnect();
      },
      {
        rootMargin: '1200px 0px',
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isPrimed]);

  useEffect(() => {
    if (!isPrimed) return;

    let cancelled = false;
    const idleCleanupRefs: Array<(() => void) | undefined> = [];
    const frameCaches = frameCacheRefs.current;

    const getCanvasRenderSize = (canvas: HTMLCanvasElement, index: number) => {
      const ratio = window.devicePixelRatio || 1;
      const layoutWidth = canvas.clientWidth;
      const layoutHeight = canvas.clientHeight;
      const width = Math.max(
        1,
        Math.round((index === 0 ? Math.max(layoutWidth, window.innerWidth) : layoutWidth) * ratio),
      );
      const height = Math.max(
        1,
        Math.round((index === 0 ? Math.max(layoutHeight, window.innerHeight) : layoutHeight) * ratio),
      );

      return { width, height };
    };

    const syncCanvasSize = (canvas: HTMLCanvasElement, index: number) => {
      const { width, height } = getCanvasRenderSize(canvas, index);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrameToCanvas = (index: number, frameIndex: number) => {
      const canvas = frameCanvasRefs.current[index];
      const context =
        frameContextRefs.current[index] ?? canvas?.getContext('2d') ?? null;
      const frames = frameCacheRefs.current[index];
      const frame = frames?.[frameIndex];

      if (!canvas || !context || !frame) return;

      frameContextRefs.current[index] = context;
      syncCanvasSize(canvas, index);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const { width: frameWidth, height: frameHeight } = getFrameAssetSize(frame);

      if (!frameWidth || !frameHeight) return;

      const coverScale = Math.max(canvasWidth / frameWidth, canvasHeight / frameHeight);
      const drawWidth = frameWidth * coverScale;
      const drawHeight = frameHeight * coverScale;
      const dx = (canvasWidth - drawWidth) / 2;
      const dy = (canvasHeight - drawHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(frame, dx, dy, drawWidth, drawHeight);
    };

    const frameRafIds = frameRafRefs.current;

    images.forEach((item, mediaIndex) => {
      if (item.kind !== 'frame-sequence') {
        const preloadImage = new window.Image();
        preloadImage.decoding = 'async';
        preloadImage.src = typeof item.src === 'string' ? item.src : item.src.src;
        return;
      }

      const preloadFrames = async () => {
        const decodedFrames: FrameCache = new Array(item.frames.length).fill(null);
        frameCaches[mediaIndex] = decodedFrames;
        frameIndexes.current[mediaIndex] = 0;

        const firstFrame = await decodeFrameAsset(item.frames[0]);
        if (cancelled) {
          disposeFrameAsset(firstFrame);
          return;
        }

        decodedFrames[0] = firstFrame;
        drawFrameToCanvas(mediaIndex, 0);

        const disposeIdleTask = runWhenIdle(() => {
          void (async () => {
            const maxConcurrentLoads = 2;
            let nextFrameIndex = 1;

            const loadNextFrame = async () => {
              while (!cancelled && nextFrameIndex < item.frames.length) {
                const currentFrameIndex = nextFrameIndex++;
                const decodedFrame = await decodeFrameAsset(item.frames[currentFrameIndex]);

                if (cancelled) {
                  disposeFrameAsset(decodedFrame);
                  return;
                }

                decodedFrames[currentFrameIndex] = decodedFrame;

                if ((frameIndexes.current[mediaIndex] ?? 0) === currentFrameIndex) {
                  drawFrameToCanvas(mediaIndex, currentFrameIndex);
                }

                await yieldToMainThread();
              }
            };

            await Promise.all(
              Array.from({ length: maxConcurrentLoads }, () => loadNextFrame()),
            );
          })();
        });

        idleCleanupRefs[mediaIndex] = disposeIdleTask;
      };

      void preloadFrames();
    });

    resizeObserverRef.current = new ResizeObserver(() => {
      images.forEach((item, index) => {
        if (item.kind !== 'frame-sequence') return;
        drawFrameToCanvas(index, frameIndexes.current[index] ?? 0);
      });
    });

    frameCanvasRefs.current.forEach((canvas) => {
      if (!canvas) return;
      resizeObserverRef.current?.observe(canvas);
    });

    return () => {
      cancelled = true;
      resizeObserverRef.current?.disconnect();
      idleCleanupRefs.forEach((cleanup) => cleanup?.());
      frameRafIds.forEach((frameId) => {
        if (frameId) cancelAnimationFrame(frameId);
      });
      frameCaches.forEach((frames) => {
        frames?.forEach((frame) => disposeFrameAsset(frame));
      });
    };
  }, [images, isPrimed]);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    images.forEach((item, index) => {
      if (item.kind !== 'frame-sequence') return;

      const frames = frameCacheRefs.current[index];
      if (!frames || item.frames.length === 0) return;

      const nextIndex = Math.min(
        item.frames.length - 1,
        Math.round(animationProgress.get() * (item.frames.length - 1)),
      );

      if (frameIndexes.current[index] === nextIndex) return;

      frameIndexes.current[index] = nextIndex;
      if (frameRafRefs.current[index]) {
        cancelAnimationFrame(frameRafRefs.current[index]);
      }

      frameRafRefs.current[index] = requestAnimationFrame(() => {
        const canvas = frameCanvasRefs.current[index];
        const frame = frameCacheRefs.current[index]?.[nextIndex];
        const context =
          frameContextRefs.current[index] ?? canvas?.getContext('2d') ?? null;

        if (!canvas || !frame || !context) return;
        frameContextRefs.current[index] = context;

        const width = canvas.width;
        const height = canvas.height;

        if (!width || !height) return;

        const { width: frameWidth, height: frameHeight } = getFrameAssetSize(frame);
        if (!frameWidth || !frameHeight) return;

        const coverScale = Math.max(width / frameWidth, height / frameHeight);
        const drawWidth = frameWidth * coverScale;
        const drawHeight = frameHeight * coverScale;
        const dx = (width - drawWidth) / 2;
        const dy = (height - drawHeight) / 2;

        context.clearRect(0, 0, width, height);
        context.drawImage(frame, dx, dy, drawWidth, drawHeight);
      });
    });
  });

  return (
    <div ref={container} className="relative h-[345vh] bg-[#0D0C1A]">
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
                    <motion.canvas
                      ref={(node) => {
                        frameCanvasRefs.current[index] = node;
                        if (node) {
                          resizeObserverRef.current?.observe(node);
                        }
                      }}
                      role="img"
                      aria-label={item.alt || `Parallax image ${index + 1}`}
                      className="h-full w-full [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
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
                      loading={isPrimed ? 'eager' : 'lazy'}
                      fetchPriority={isPrimed ? 'high' : 'auto'}
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
