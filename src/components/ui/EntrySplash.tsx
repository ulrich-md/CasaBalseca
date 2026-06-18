import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type EntrySplashProps = {
  className?: string;
};

/**
 * Splash de vino del hero: un "pour" real (video de Higgsfield) compuesto como
 * corona en la base de la botella. El fondo blanco del MP4 se integra con
 * mix-blend multiply; el WebM con alfa es alternativa. Se reproduce una vez y se
 * desvanece. Mientras carga (o si el navegador bloquea el autoplay, o con
 * prefers-reduced-motion) se muestra un PÓSTER estático del mismo splash, así
 * nunca queda vacío. Sin SVG de respaldo.
 */
export function EntrySplash({ className }: EntrySplashProps) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  // Algunos navegadores no arrancan el autoplay solos: lo forzamos (silenciado).
  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const t = setTimeout(() => v.play().catch(() => {}), 60);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className={className} aria-hidden="true">
      <video
        ref={videoRef}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[min(32vh,22rem)] w-[min(52vw,40rem)] -translate-x-1/2 object-cover [object-position:50%_66%] mix-blend-multiply [mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)]"
        style={{ opacity: ended ? 0 : 1, transition: 'opacity 800ms ease' }}
        poster="/assets/wine-splash-poster.webp"
        autoPlay={!reduced}
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
      >
        {/* MP4 (H.264) primero: universal. WebM con alfa como alternativa. */}
        <source src="/assets/wine-splash.mp4" type="video/mp4" />
        <source src="/assets/wine-splash.webm" type='video/webm; codecs="vp9"' />
      </video>
    </div>
  );
}
