import Image, { type StaticImageData } from 'next/image';

import styles from '@/components/ui/sectors-mobile-slider.module.css';

type SectorSlide = {
  image: StaticImageData;
  label: string;
  alt: string;
};

type SectorsMobileSliderProps = {
  slides: readonly SectorSlide[];
};

export function SectorsMobileSlider({ slides }: SectorsMobileSliderProps) {
  const loopSlides = [...slides, ...slides];

  return (
    <section className={styles.section} aria-labelledby="mobile-sectors-title" data-nav-tone="dark">
      <div className="site-shell">
        <div className={styles.shell}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Presente em todos os setores</p>
            <h2 id="mobile-sectors-title" className={styles.title}>
              Especialista no seu processo
            </h2>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.sliderViewport}>
            <div className={styles.sliderTrack}>
              {loopSlides.map((slide, index) => (
                <article
                  key={`${slide.label}-${index}`}
                  className={styles.slide}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 248px, 0px"
                    className={styles.slideMedia}
                  />
                  <span className={styles.label}>{slide.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
