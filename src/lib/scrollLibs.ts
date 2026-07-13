import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

type GsapBundle = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let cached: Promise<GsapBundle> | null = null;

/**
 * Carga GSAP + ScrollTrigger en un chunk diferido (code-splitting).
 * Los efectos de scroll no son críticos para el primer render, así que
 * el bundle inicial no debe pagarlos. La promesa se cachea: todos los
 * componentes comparten la misma instancia registrada.
 */
export function loadGsap(): Promise<GsapBundle> {
  cached ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    },
  );
  return cached;
}
