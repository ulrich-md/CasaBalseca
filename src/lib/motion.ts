import type { Variants } from 'framer-motion';

// ease ~ power3.out de GSAP
export const powerEase = [0.215, 0.61, 0.355, 1] as const;

/** Fade + translateY de 24–32px, 500–700ms. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: powerEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: powerEase } },
};

/** Contenedor con stagger para revelados encadenados. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: powerEase },
  },
};

/** Viewport por defecto: revela una sola vez, un poco antes de entrar del todo. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
