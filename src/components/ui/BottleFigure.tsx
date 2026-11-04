import { useState, type CSSProperties, type ReactNode } from 'react';

type BottleFigureProps = {
  png: string;
  webp: string;
  alt: string;
  /** Clases de tamaño de la botella (alto); el ancho sale de la proporción. */
  sizeClassName: string;
  /** Clases extra para la capa que se mueve (p. ej. elevación al hover). */
  liftClassName?: string;
  /** Clases extra para la sombra de contacto (p. ej. se abre al elevar). */
  groundClassName?: string;
  /** Sombra proyectada en el suelo (luz desde arriba a la izquierda). */
  castShadow?: boolean;
  eager?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Respaldo (SVG) si el asset no carga. */
  fallback: ReactNode;
  /** Se llama si el asset falla, para que el padre oculte extras (reflejo). */
  onFail?: () => void;
  children?: ReactNode;
};

/**
 * Botella con profundidad: sombras en capas (contacto + ambiente), sombra
 * proyectada sobre el suelo y sombreado cilíndrico recortado a la silueta
 * (mask-image con el propio PNG) para que el vidrio tenga volumen.
 */
export function BottleFigure({
  png,
  webp,
  alt,
  sizeClassName,
  liftClassName = '',
  groundClassName = '',
  castShadow = true,
  eager = false,
  fetchPriority,
  fallback,
  onFail,
  children,
}: BottleFigureProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;

  // Sombreado cilíndrico: borde izquierdo en penumbra, brillo cálido suave
  // a un tercio y lado derecho en sombra (luz desde la izquierda).
  const shading: CSSProperties = {
    background:
      'linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 15%, rgba(255,236,210,0.10) 27%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.5) 100%)',
    WebkitMaskImage: `url(${webp})`,
    maskImage: `url(${webp})`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  };

  // Sombras en capas: una corta y densa que "pega" la botella al fondo
  // y otras largas y cálidas que dan aire.
  const layered: CSSProperties = {
    filter:
      'drop-shadow(0 2px 2px rgba(30,10,10,0.28)) drop-shadow(0 14px 18px rgba(62,17,23,0.22)) drop-shadow(18px 34px 44px rgba(62,17,23,0.20))',
  };

  return (
    <div className="relative inline-block">
      {/* Suelo: sombra proyectada en diagonal (no se mueve con el hover) */}
      {castShadow && (
        <img
          src={webp}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`pointer-events-none absolute bottom-0 left-0 w-auto origin-bottom select-none opacity-[0.13] blur-[9px] brightness-0 transition-all duration-700 ease-power4 [mask-image:linear-gradient(to_top,#000_10%,transparent_80%)] [transform:skewX(-36deg)_scaleY(0.24)] ${sizeClassName}`}
        />
      )}
      {/* Suelo: oclusión de contacto (densa) + penumbra (amplia) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[1.5%] left-1/2 h-[3.5%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(36,14,12,0.55),transparent)] blur-[2px] transition-all duration-700 ease-power4 ${groundClassName}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[4%] left-1/2 h-[8%] w-[210%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(62,17,23,0.22),transparent)] blur-md transition-all duration-700 ease-power4 ${groundClassName}`}
      />

      {/* Botella + volumen */}
      <div className={`relative ${liftClassName}`}>
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img
            src={png}
            alt={alt}
            draggable={false}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={fetchPriority}
            onError={() => {
              setFailed(true);
              onFail?.();
            }}
            style={layered}
            className={`relative block w-auto select-none object-contain ${sizeClassName}`}
          />
        </picture>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={shading} />
        {children}
      </div>
    </div>
  );
}
