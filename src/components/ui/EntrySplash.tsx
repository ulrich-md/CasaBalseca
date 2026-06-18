import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

type EntrySplashProps = {
  className?: string;
};

/**
 * Splash de vino del hero: el "pour" real (fotogramas del video de Higgsfield)
 * como WebP ANIMADO. Al ser una imagen, se reproduce solo en cualquier
 * navegador —sin políticas de autoplay, sin códecs, sin <video>— y es 100%
 * fiable. Se compone como corona en la base de la botella; el fondo blanco se
 * integra con mix-blend multiply. Con prefers-reduced-motion se muestra un
 * fotograma estático (póster). Sin SVG.
 */
export function EntrySplash({ className }: EntrySplashProps) {
  const reduced = usePrefersReducedMotion();
  const src = reduced
    ? '/assets/wine-splash-poster.webp'
    : '/assets/wine-splash-anim.webp';

  return (
    <div className={className} aria-hidden="true">
      <img
        src={src}
        alt=""
        draggable={false}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[min(32vh,22rem)] w-[min(52vw,40rem)] -translate-x-1/2 object-cover [object-position:50%_66%] mix-blend-multiply [mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(70%_88%_at_50%_54%,#000_40%,transparent_100%)]"
      />
    </div>
  );
}
