type Scene = 'vinedo' | 'barricas' | 'copa';

type EditorialImageProps = {
  scene: Scene;
  className?: string;
  alt: string;
};

/**
 * Imágenes editoriales recreadas como escenas SVG duotono en la paleta de marca.
 * Reemplazan a las fotos reales (Unsplash bloqueado en build).
 * // REEMPLAZAR: foto real — sustituir por <img src="/assets/(vinedo|barricas|copa).jpg" alt={alt} />.
 */
export function EditorialImage({ scene, className, alt }: EditorialImageProps) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      role="img"
      aria-label={alt}
    >
      {scene === 'vinedo' && <Vinedo />}
      {scene === 'barricas' && <Barricas />}
      {scene === 'copa' && <Copa />}
      {/* Viñeta cálida para integrar con el papel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_55%,rgba(62,17,23,0.22))]" />
    </div>
  );
}

function Vinedo() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9cf9d" />
          <stop offset="40%" stopColor="#d8b27e" />
          <stop offset="62%" stopColor="#a9713f" />
          <stop offset="100%" stopColor="#5a1a22" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#vsky)" />
      {/* sol bajo */}
      <circle cx="270" cy="150" r="46" fill="#f2e4c0" opacity="0.55" />
      {/* colinas */}
      <path d="M0 230 Q120 200 230 224 T400 214 L400 280 L0 280 Z" fill="#7a3a2a" opacity="0.5" />
      {/* hileras de viñedo en perspectiva */}
      <g stroke="#3e1117" strokeWidth="3" opacity="0.7">
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 40 + i * 32;
          return <line key={i} x1={x} y1="280" x2={200 + (x - 200) * 3.4} y2="500" />;
        })}
      </g>
      <g stroke="#2a211c" strokeWidth="2" opacity="0.35">
        {[320, 380, 450].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>
    </svg>
  );
}

function Barricas() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cellar" cx="50%" cy="36%" r="80%">
          <stop offset="0%" stopColor="#7a4a2c" />
          <stop offset="60%" stopColor="#4d2a1b" />
          <stop offset="100%" stopColor="#2a160f" />
        </radialGradient>
        <linearGradient id="oak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a2014" />
          <stop offset="50%" stopColor="#8a5a32" />
          <stop offset="100%" stopColor="#3a2014" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#cellar)" />
      {/* filas de barricas (frentes circulares) */}
      {[0, 1, 2].map((row) => {
        const cy = 150 + row * 130;
        const rx = 70 + row * 10;
        const ry = rx * 0.92;
        return [0, 1].map((col) => {
          const cx = 110 + col * 180;
          return (
            <g key={`${row}-${col}`}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#oak)" stroke="#1f120a" strokeWidth="3" />
              <ellipse cx={cx} cy={cy} rx={rx * 0.66} ry={ry * 0.66} fill="none" stroke="#b0852e" strokeWidth="2.5" opacity="0.8" />
              <ellipse cx={cx} cy={cy} rx={rx * 0.34} ry={ry * 0.34} fill="none" stroke="#b0852e" strokeWidth="2" opacity="0.7" />
              <circle cx={cx} cy={cy} r="5" fill="#1f120a" />
            </g>
          );
        });
      })}
      <rect width="400" height="500" fill="#2a160f" opacity="0.12" />
    </svg>
  );
}

function Copa() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="backlight" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#caa24c" />
          <stop offset="45%" stopColor="#8a3320" />
          <stop offset="100%" stopColor="#2a0d10" />
        </radialGradient>
        <linearGradient id="cwine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1f24" />
          <stop offset="100%" stopColor="#3e1117" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#backlight)" />
      {/* copa */}
      <g transform="translate(200 60)">
        <path d="M-70 0 C-70 120, -30 165, 0 165 C30 165, 70 120, 70 0 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
        <path d="M-70 14 C-66 112, -28 150, 0 150 C28 150, 66 112, 70 14 Z" fill="url(#cwine)" opacity="0.92" />
        <ellipse cx="0" cy="14" rx="70" ry="9" fill="#7a1f24" opacity="0.9" />
        <line x1="0" y1="165" x2="0" y2="320" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        <path d="M-52 330 C-52 322, -24 318, 0 318 C24 318, 52 322, 52 330" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        <path d="M-54 24 C-50 100, -28 134, -8 142" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
