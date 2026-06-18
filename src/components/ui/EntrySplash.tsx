import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type EntrySplashProps = {
  className?: string;
};

// Vectores deterministas para las gotas que salen disparadas del centro.
const DROPLETS = [
  { a: -78, d: 210, r: 7 },
  { a: -52, d: 250, r: 5 },
  { a: -24, d: 280, r: 9 },
  { a: -8, d: 240, r: 4 },
  { a: 14, d: 285, r: 8 },
  { a: 30, d: 235, r: 5 },
  { a: 56, d: 255, r: 7 },
  { a: 82, d: 205, r: 5 },
  { a: 110, d: 180, r: 4 },
  { a: -120, d: 175, r: 4 },
  { a: 160, d: 150, r: 6 },
  { a: -160, d: 150, r: 6 },
];

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Splash de vino al cargar la página. Estalla detrás de la botella y se asienta
 * en un charco sutil. 100% en código (SVG + Framer Motion): nítido, ligero y
 * transparente. Si existe /assets/wine-splash.(webm|mp4) (p. ej. render de
 * Higgsfield con fondo BLANCO) se superpone con mix-blend multiply y reemplaza
 * al splash de código. Respeta prefers-reduced-motion.
 */
export function EntrySplash({ className }: EntrySplashProps) {
  const reduced = usePrefersReducedMotion();
  const [videoOk, setVideoOk] = useState(false);

  return (
    <div className={className} aria-hidden="true">
      {/* Video opcional (Higgsfield). Fondo blanco -> multiply lo integra sobre la crema. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        style={{ opacity: videoOk ? 1 : 0, transition: 'opacity 600ms ease' }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => !reduced && setVideoOk(true)}
        onError={() => setVideoOk(false)}
      >
        <source src="/assets/wine-splash.webm" type="video/webm" />
        <source src="/assets/wine-splash.mp4" type="video/mp4" />
      </video>

      {/* Splash de código (se oculta si el video carga) */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: videoOk ? 0 : 1, transition: 'opacity 400ms ease' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="splash-fill" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#7a1f24" />
            <stop offset="55%" stopColor="#5a1a22" />
            <stop offset="100%" stopColor="#3e1117" />
          </radialGradient>
          <linearGradient id="ribbon-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a6442e" />
            <stop offset="100%" stopColor="#5a1a22" />
          </linearGradient>
          <filter id="liquid" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Charco asentado (queda como estado de reposo) */}
        <motion.ellipse
          cx="300"
          cy="430"
          rx="120"
          ry="26"
          fill="url(#splash-fill)"
          initial={reduced ? { opacity: 0.5 } : { opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: reduced ? 0.5 : [0, 0.6, 0.42], scaleX: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '300px 430px' }}
        />

        {!reduced && (
          <>
            {/* Cinta del derrame que cae desde arriba */}
            <motion.path
              d="M300 -40 C300 80, 286 180, 300 300 C312 360, 300 410, 300 430"
              stroke="url(#ribbon-fill)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              filter="url(#liquid)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeIn', times: [0, 0.45, 1] }}
            />

            {/* Corona central que estalla */}
            <motion.path
              d="M300 300 C250 300 220 360 232 408 C244 452 280 470 300 470 C320 470 356 452 368 408 C380 360 350 300 300 300 Z"
              fill="url(#splash-fill)"
              filter="url(#liquid)"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.18, 1], opacity: [0, 1, 0.9] }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: '300px 410px' }}
            />

            {/* Gotas radiales */}
            {DROPLETS.map((dp, i) => {
              const x = Math.cos(rad(dp.a - 90)) * dp.d;
              const y = Math.sin(rad(dp.a - 90)) * dp.d;
              return (
                <motion.circle
                  key={i}
                  cx="300"
                  cy="360"
                  r={dp.r}
                  fill="url(#splash-fill)"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{
                    x: [0, x * 0.7, x],
                    y: [0, y * 0.6 - 40, y + 30],
                    opacity: [0, 1, 0],
                    scale: [0.4, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.34 + (i % 5) * 0.03,
                    ease: 'easeOut',
                  }}
                />
              );
            })}

            {/* Brillo especular sobre la corona */}
            <motion.path
              d="M270 340 C262 372 270 404 286 420"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.9, delay: 0.42, ease: 'easeOut' }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
