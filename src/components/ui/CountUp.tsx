import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
  /** Formateo (p. ej. separador de miles). */
  format?: (n: number) => string;
};

/** Número con count-up al entrar en viewport. Respeta reduced-motion. */
export function CountUp({ to, duration = 1.6, className, format }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // power3.out

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(ease(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  // Por defecto sin separador de miles: los folios reales se imprimen "9210" / "17166".
  const display = format ? format(value) : String(value);
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {display}
    </span>
  );
}
