import { useState, type ReactNode } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** SVG/markup de respaldo si el PNG aún no existe (404) o falla. */
  fallback: ReactNode;
  draggable?: boolean;
  eager?: boolean;
};

/**
 * Muestra el PNG real de marca y, si no está disponible, cae con elegancia al
 * SVG de respaldo. Así el sitio funciona antes y después de subir los assets
 * oficiales a /public/assets sin tocar código.
 */
export function SmartImage({
  src,
  alt,
  className,
  fallback,
  draggable = false,
  eager = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={draggable}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
