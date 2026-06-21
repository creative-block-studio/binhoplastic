'use client';

import { useEffect, useRef, useState } from 'react';

export function CountUpValue({
  active,
  suffix = '',
  to,
}: {
  active: boolean;
  suffix?: string;
  to: number;
}) {
  const [value, setValue] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!active || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    let frame = 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, to]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}
