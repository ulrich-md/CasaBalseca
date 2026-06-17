import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type WineSplashProps = {
  className?: string;
};

/**
 * Copa con derrame de vino: el chorro se "dibuja", el nivel sube y queda con un
 * ripple lento en loop. Decorativo (aria-hidden). Respeta prefers-reduced-motion
 * mostrando la copa ya servida y sin chorro.
 */
export function WineSplash({ className }: WineSplashProps) {
  const reduced = usePrefersReducedMotion();

  // Interior del bowl: y va de ~36 (borde) a ~150 (fondo). Lleno ~ y=70.
  const fillTop = 74;
  const bowlBottom = 150;

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1f24" />
          <stop offset="55%" stopColor="#5a1a22" />
          <stop offset="100%" stopColor="#3e1117" />
        </linearGradient>
        <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bowl-clip">
          <path d="M48 36 C48 116, 70 150, 100 150 C130 150, 152 116, 152 36 Z" />
        </clipPath>
      </defs>

      {/* Vino (clip al bowl), nivel sube al cargar */}
      <g clipPath="url(#bowl-clip)">
        <motion.rect
          x="40"
          width="120"
          fill="url(#wine-grad)"
          initial={reduced ? false : { y: bowlBottom, height: 0 }}
          animate={{ y: fillTop, height: bowlBottom - fillTop + 6 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
          }
        />
        {/* Superficie del vino, sube con el nivel */}
        <motion.ellipse
          cx="100"
          rx="52"
          ry="5"
          fill="#7a1f24"
          initial={reduced ? false : { cy: bowlBottom }}
          animate={{ cy: fillTop }}
          transition={
            reduced ? { duration: 0 } : { duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
          }
        />
        {/* Ripple sutil en loop (transform, no toca atributos del SVG) */}
        {!reduced && (
          <motion.ellipse
            cx="100"
            cy={fillTop}
            rx="52"
            ry="5"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            style={{ transformOrigin: '100px ' + fillTop + 'px' }}
            initial={{ scaleX: 1, opacity: 0 }}
            animate={{ scaleX: [1, 1.03, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        )}
      </g>

      {/* Chorro / derrame que se dibuja desde arriba */}
      {!reduced && (
        <motion.path
          d="M100 -10 C100 8, 96 22, 100 40"
          stroke="#5a1a22"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, ease: 'easeInOut', times: [0, 0.3, 0.78, 1] }}
        />
      )}

      {/* Gotas de splash */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={88 + i * 12}
            r={2.2 - i * 0.4}
            fill="#5a1a22"
            initial={{ cy: 60, opacity: 0 }}
            animate={{ cy: [60, 52 - i * 4, 78], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.1,
              ease: 'easeOut',
              delay: 2.2 + i * 0.12,
            }}
          />
        ))}

      {/* Copa: bowl, tallo, base */}
      <g fill="none" stroke="rgba(42,33,28,0.42)" strokeWidth="2.4">
        <path d="M48 36 C48 116, 70 150, 100 150 C130 150, 152 116, 152 36" />
        <line x1="100" y1="150" x2="100" y2="250" />
        <path d="M64 256 C64 250, 78 248, 100 248 C122 248, 136 250, 136 256" />
        <ellipse cx="100" cy="258" rx="38" ry="6" />
      </g>
      {/* Reflejo del cristal */}
      <path
        d="M48 36 C48 116, 70 150, 100 150 C130 150, 152 116, 152 36 Z"
        fill="url(#glass-sheen)"
        opacity="0.5"
      />
      <path
        d="M60 44 C60 100, 72 132, 90 142"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
