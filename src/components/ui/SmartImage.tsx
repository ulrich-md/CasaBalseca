import { useState, type ReactNode } from 'react';

type SmartImageProps = {
  /** Fuente principal (PNG). Sirve de fallback universal dentro de <picture>. */
  src: string;
  /** Fuente WebP opcional (más ligera); el navegador la prefiere si la soporta. */
  webp?: string;
  alt: string;
  className?: string;
  /** SVG/markup de respaldo si el asset aún no existe (404) o falla. */
  fallback: ReactNode;
  draggable?: boolean;
  eager?: boolean;
};

/**
 * Muestra el asset real de marca (WebP con fallback a PNG vía <picture>) y, si
 * no está disponible, cae con elegancia al SVG de respaldo. Así el sitio
 * funciona antes y después de subir los assets oficiales a /public/assets.
 */
export function SmartImage({
  src,
  webp,
  alt,
  className,
  fallback,
  draggable = false,
  eager = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        draggable={draggable}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
