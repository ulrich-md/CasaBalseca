import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type EntrySplashProps = {
  className?: string;
  /** 'back' = estallido detrás de la botella · 'front' = gotas en primer plano. */
  variant?: 'back' | 'front';
  /** Arranca la animación (se activa cuando el intro se retira, para que corra smooth). */
  play?: boolean;
};

const rad = (deg: number) => (deg * Math.PI) / 180;

// Gotas que salen disparadas del centro (radial, sesgado a los lados/arriba).
const BACK_DROPLETS = [
  { a: -110, d: 360, r: 10 },
  { a: -90, d: 320, r: 7 },
  { a: -68, d: 300, r: 6 },
  { a: -135, d: 300, r: 7 },
  { a: -50, d: 250, r: 5 },
  { a: -160, d: 250, r: 6 },
  { a: 110, d: 360, r: 10 },
  { a: 90, d: 320, r: 7 },
  { a: 68, d: 300, r: 6 },
  { a: 135, d: 300, r: 7 },
  { a: 50, d: 250, r: 5 },
  { a: 160, d: 250, r: 6 },
  { a: -30, d: 200, r: 4 },
  { a: 30, d: 200, r: 4 },
];

const FRONT_DROPLETS = [
  { a: -100, d: 320, r: 9 },
  { a: -120, d: 270, r: 6 },
  { a: -78, d: 240, r: 5 },
  { a: 100, d: 320, r: 9 },
  { a: 120, d: 270, r: 6 },
  { a: 78, d: 240, r: 5 },
  { a: -150, d: 210, r: 5 },
  { a: 150, d: 210, r: 5 },
];

/**
 * Splash de vino del hero. 100% en código (SVG + Framer Motion): estallido
 * radial centrado en la botella — "bloom" de vino, corona y gotas en dos capas
 * que vuelan a los lados y se asientan en un aura cálida. Sin chorro/cinta y sin
 * filtros pesados (transform/opacity puro -> compositado por GPU = smooth).
 * Arranca con `play` (cuando el intro se retira). Respeta prefers-reduced-motion.
 */
export function EntrySplash({ className, variant = 'back', play = true }: EntrySplashProps) {
  const reduced = usePrefersReducedMotion();
  const isBack = variant === 'back';
  const list = isBack ? BACK_DROPLETS : FRONT_DROPLETS;
  const go = play && !reduced;

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`bloom-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7a1f24" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#5a1a22" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#5a1a22" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`drop-${variant}`} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#8f2730" />
            <stop offset="60%" stopColor="#5a1a22" />
            <stop offset="100%" stopColor="#3e1117" />
          </radialGradient>
        </defs>

        {/* Bloom de vino (mancha radial que se expande y queda como aura) */}
        {isBack && (
          <motion.circle
            cx="300"
            cy="300"
            r="180"
            fill={`url(#bloom-${variant})`}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={
              reduced
                ? { opacity: 0.35, scale: 1 }
                : go
                  ? { opacity: [0, 0.7, 0.22], scale: [0.3, 1.22, 1.12] }
                  : { opacity: 0, scale: 0.3 }
            }
            transition={
              reduced || !go ? { duration: 0 } : { duration: 2.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ transformOrigin: '300px 300px', willChange: 'transform, opacity' }}
          />
        )}

        {!reduced && (
          <>
            {/* Gotas radiales */}
            {list.map((dp, i) => {
              const x = Math.cos(rad(dp.a - 90)) * dp.d;
              const y = Math.sin(rad(dp.a - 90)) * dp.d;
              return (
                <motion.circle
                  key={`${variant}-${i}`}
                  cx="300"
                  cy="300"
                  r={dp.r}
                  fill={`url(#drop-${variant})`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  animate={
                    go
                      ? {
                          x: [0, x * 0.7, x],
                          y: [0, y * 0.7, y + 30],
                          opacity: [0, 1, 1, 0],
                          scale: [0.3, 1.25, 1.1, 0.55],
                        }
                      : { x: 0, y: 0, opacity: 0, scale: 0.3 }
                  }
                  transition={
                    go
                      ? {
                          duration: isBack ? 2.6 : 2.7,
                          delay: 0.15 + (i % 5) * 0.06,
                          ease: 'easeOut',
                          times: [0, 0.22, 0.56, 1],
                        }
                      : { duration: 0 }
                  }
                  style={{ willChange: 'transform, opacity' }}
                />
              );
            })}

            {/* Corona central que estalla (detrás) */}
            {isBack && (
              <motion.path
                d="M232 300 C232 262 252 240 268 234 C276 262 286 280 300 286 C314 280 324 262 332 234 C348 240 368 262 368 300 C368 326 340 340 300 340 C260 340 232 326 232 300 Z"
                fill={`url(#drop-${variant})`}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={go ? { scale: [0.3, 1.15, 0.95], opacity: [0, 1, 0] } : { scale: 0.3, opacity: 0 }}
                transition={go ? { duration: 1.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0 }}
                style={{ transformOrigin: '300px 300px', willChange: 'transform, opacity' }}
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
