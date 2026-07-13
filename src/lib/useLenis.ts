import { useEffect } from 'react';
import { loadGsap } from './scrollLibs';

/**
 * Scroll NATIVO suave con Lenis (lerp bajo). NO secuestra el scroll:
 * sólo suaviza el avance. Se sincroniza con GSAP ScrollTrigger.
 * Si el usuario pide reducir movimiento, no se inicializa (scroll normal).
 * Lenis y GSAP se cargan en diferido: no forman parte del bundle inicial.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import('lenis'), loadGsap()]).then(([lenisMod, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;

      const lenis = new lenisMod.default({
        lerp: 0.09, // suave pero ligero, sin sensación de "arrastre"
        wheelMultiplier: 1,
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const onRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onRaf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(onRaf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enabled]);
}

/**
 * Scroll suave a un ancla respetando el header fijo.
 * Funciona con o sin Lenis (fallback nativo).
 */
export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}
