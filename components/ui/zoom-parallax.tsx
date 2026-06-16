'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { useRef } from 'react';

interface ImageItem {
  src: string | StaticImageData;
  alt?: string;
  label?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: readonly ImageItem[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
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

  return (
    <div ref={container} className="relative h-[300vh] bg-[#0D0C1A]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0D0C1A]">
        {images.map(({ src, alt, label }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <div className="relative isolate h-[25vh] w-[25vw] overflow-hidden rounded-[4px] [backface-visibility:hidden] [clip-path:inset(0_round_4px)] [transform:translateZ(0)] will-change-transform">
                <Image
                  src={src}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  draggable={false}
                  className="scale-[1.02] object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
                />
                {label ? (
                  <span className="pointer-events-none absolute left-[26px] top-5 inline-flex min-h-[38px] items-center rounded-[4px] bg-[rgba(106,114,130,0.26)] px-[9px] text-[13px] font-light leading-[1] text-white backdrop-blur-[2px]">
                    {label}
                  </span>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
