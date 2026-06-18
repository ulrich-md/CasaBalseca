import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type EntrySplashProps = {
  className?: string;
  /** 'back' = estallido detrás de la botella · 'front' = gotas en primer plano. */
  variant?: 'back' | 'front';
  /** La capa 'back' avisa si el video de Higgsfield está activo. */
  onVideoChange?: (active: boolean) => void;
  /** La capa 'front' se oculta cuando el video toma el relevo (evita duplicar). */
  hidden?: boolean;
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
 * Splash de vino al cargar la página. 100% en código (SVG + Framer Motion):
 * estallido radial centrado en la botella, con "bloom" de vino, cinta del
 * derrame y gotas que vuelan hacia los lados (visibles sobre la crema). La capa
 * 'back' admite además un video de Higgsfield superpuesto (fondo blanco ->
 * multiply). Respeta prefers-reduced-motion.
 */
export function EntrySplash({
  className,
  variant = 'back',
  onVideoChange,
  hidden = false,
}: EntrySplashProps) {
  const reduced = usePrefersReducedMotion();
  const [videoOk, setVideoOk] = useState(false);
  const [ended, setEnded] = useState(false);
  const isBack = variant === 'back';
  const list = isBack ? BACK_DROPLETS : FRONT_DROPLETS;

  if (!isBack && hidden) return null;

  return (
    <div className={className} aria-hidden="true">
      {/* Video opcional (Higgsfield), solo en la capa de fondo. Se reproduce una
          vez y se desvanece, dejando el hero limpio. Fondo blanco/alfa integrado. */}
      {isBack && (
        <video
          className="pointer-events-none absolute bottom-0 left-1/2 h-[min(32vh,22rem)] w-[min(52vw,40rem)] -translate-x-1/2 object-cover [object-position:50%_66%] mix-blend-multiply [mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)]"
          style={{ opacity: videoOk && !ended ? 1 : 0, transition: 'opacity 800ms ease' }}
          autoPlay={!reduced}
          muted
          playsInline
          preload={reduced ? 'none' : 'auto'}
          onCanPlay={() => {
            if (reduced) return;
            setVideoOk(true);
            onVideoChange?.(true);
          }}
          onEnded={() => setEnded(true)}
          onError={() => setVideoOk(false)}
        >
          <source src="/assets/wine-splash.webm" type="video/webm" />
          <source src="/assets/wine-splash.mp4" type="video/mp4" />
        </video>
      )}

      <svg
        viewBox="0 0 600 600"
        className="absolute left-1/2 top-1/2 aspect-square h-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: videoOk ? 0 : 1, transition: 'opacity 400ms ease' }}
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
          <linearGradient id={`ribbon-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a6442e" />
            <stop offset="100%" stopColor="#5a1a22" />
          </linearGradient>
          <filter id={`liquid-${variant}`} x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Bloom de vino (mancha radial que se expande) */}
        {isBack && (
          <motion.circle
            cx="300"
            cy="300"
            r="180"
            fill={`url(#bloom-${variant})`}
            initial={reduced ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: reduced ? 0.35 : [0, 0.7, 0.18], scale: reduced ? 1 : [0.3, 1.25, 1.1] }}
            transition={reduced ? { duration: 0 } : { duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '300px 300px' }}
          />
        )}

        {!reduced && (
          <>
            {/* Cinta del derrame que cae desde arriba */}
            {isBack && (
              <motion.path
                d="M300 -60 C300 70, 284 180, 300 290 C312 330, 300 300, 300 300"
                stroke={`url(#ribbon-${variant})`}
                strokeWidth="13"
                strokeLinecap="round"
                fill="none"
                filter={`url(#liquid-${variant})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.3, ease: 'easeIn', times: [0, 0.5, 1] }}
              />
            )}

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
                  animate={{
                    x: [0, x * 0.7, x],
                    y: [0, y * 0.7, y + 30],
                    opacity: [0, 1, 1, 0],
                    scale: [0.3, 1.25, 1.1, 0.6],
                  }}
                  transition={{
                    duration: isBack ? 1.5 : 1.6,
                    delay: 0.3 + (i % 5) * 0.04,
                    ease: 'easeOut',
                    times: [0, 0.28, 0.62, 1],
                  }}
                />
              );
            })}

            {/* Corona central que estalla (detrás) */}
            {isBack && (
              <motion.path
                d="M232 300 C232 262 252 240 268 234 C276 262 286 280 300 286 C314 280 324 262 332 234 C348 240 368 262 368 300 C368 326 340 340 300 340 C260 340 232 326 232 300 Z"
                fill={`url(#drop-${variant})`}
                filter={`url(#liquid-${variant})`}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: [0.3, 1.15, 0.95], opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: '300px 300px' }}
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
