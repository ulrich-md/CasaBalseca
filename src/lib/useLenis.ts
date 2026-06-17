import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll NATIVO suave con Lenis (lerp bajo). NO secuestra el scroll:
 * sólo suaviza el avance. Se sincroniza con GSAP ScrollTrigger.
 * Si el usuario pide reducir movimiento, no se inicializa (scroll normal).
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
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

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
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
