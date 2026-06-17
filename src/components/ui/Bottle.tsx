type Variant = 'crianza' | 'roble';

type BottleProps = {
  variant: Variant;
  className?: string;
  /** Sombra de contacto suave bajo la botella. */
  shadow?: boolean;
  title?: string;
};

/**
 * Botella CASA BALSECA recreada en SVG a partir de las fotos de marca.
 * Crianza: cápsula DORADA + etiqueta carbón.  Roble: cápsula PLATEADA + etiqueta crema.
 * Vidrio burdeos-negro con realce de luz, etiqueta con monograma, patrón bereber
 * sutil y sombra de contacto realista.
 * // REEMPLAZAR: foto real de botella (cambiar este SVG por <img src="/assets/bottle-*.png">).
 */
export function Bottle({ variant, className, shadow = true, title }: BottleProps) {
  const isCrianza = variant === 'crianza';
  const uid = variant; // ids únicos por variante

  const capsuleStops = isCrianza
    ? ['#e6c878', '#c79a3c', '#9c7426', '#caa24c']
    : ['#eef0f2', '#c5c8cd', '#8f939a', '#d7dade'];

  const labelBg = isCrianza ? '#211a17' : '#f1e8d6';
  const labelStroke = isCrianza ? 'rgba(176,133,46,0.55)' : 'rgba(124,98,40,0.4)';
  const nameColor = isCrianza ? '#f2e9d8' : '#2a211c';
  const metaColor = isCrianza ? 'rgba(229,213,178,0.78)' : '#6e6053';
  const goldText = '#b0852e';
  const patternColor = isCrianza ? 'rgba(176,133,46,0.16)' : 'rgba(90,26,34,0.10)';

  const region = 'RIBERA DEL DUERO';
  const designation = isCrianza ? 'CRIANZA' : 'ROBLE';
  const vintage = isCrianza ? '2014' : '2015';
  const folioTotal = isCrianza ? '9210' : '17166';
  const label = title ?? `Casa Balseca ${isCrianza ? 'Crianza 2014' : 'Roble 2015'}`;

  return (
    <svg
      viewBox="0 0 200 770"
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <defs>
        {/* Vidrio: degradado horizontal tipo cilindro */}
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#150a0c" />
          <stop offset="20%" stopColor="#2c1014" />
          <stop offset="44%" stopColor="#4a1a21" />
          <stop offset="56%" stopColor="#3a1217" />
          <stop offset="80%" stopColor="#220c10" />
          <stop offset="100%" stopColor="#120809" />
        </linearGradient>
        {/* Matiz vertical (hombro algo más claro) */}
        <linearGradient id={`glassV-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="14%" stopColor="#000000" stopOpacity="0" />
          <stop offset="88%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={`capsule-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={capsuleStops[2]} />
          <stop offset="32%" stopColor={capsuleStops[0]} />
          <stop offset="58%" stopColor={capsuleStops[1]} />
          <stop offset="100%" stopColor={capsuleStops[3]} />
        </linearGradient>
        <pattern
          id={`berber-${uid}`}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={patternColor} strokeWidth="1">
            <path d="M11 2 L20 11 L11 20 L2 11 Z" />
            <path d="M11 7 L15 11 L11 15 L7 11 Z" />
          </g>
        </pattern>
        <clipPath id={`bodyclip-${uid}`}>
          <path d="M28 270 C30 220 82 215 82 182 L82 92 L118 92 L118 182 C118 215 170 220 172 270 L172 678 C172 700 160 706 100 706 C40 706 28 700 28 678 Z" />
        </clipPath>
        <filter id={`soft-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
      </defs>

      {/* Sombra de contacto */}
      {shadow && (
        <ellipse
          cx="100"
          cy="724"
          rx="74"
          ry="15"
          fill="rgba(42,17,13,0.5)"
          filter={`url(#soft-${uid})`}
        />
      )}

      {/* Cápsula / foil */}
      <g>
        <rect x="80" y="40" width="40" height="14" rx="3" fill={`url(#capsule-${uid})`} />
        <rect x="82" y="52" width="36" height="118" fill={`url(#capsule-${uid})`} />
        <rect x="82" y="164" width="36" height="6" fill="rgba(0,0,0,0.22)" />
        <rect x="82" y="52" width="6" height="118" fill="rgba(255,255,255,0.28)" />
      </g>

      {/* Vidrio */}
      <path
        d="M28 270 C30 220 82 215 82 182 L82 92 L118 92 L118 182 C118 215 170 220 172 270 L172 678 C172 700 160 706 100 706 C40 706 28 700 28 678 Z"
        fill={`url(#glass-${uid})`}
      />
      <path
        d="M28 270 C30 220 82 215 82 182 L82 92 L118 92 L118 182 C118 215 170 220 172 270 L172 678 C172 700 160 706 100 706 C40 706 28 700 28 678 Z"
        fill={`url(#glassV-${uid})`}
      />
      {/* Realce de luz (barrido) */}
      <g clipPath={`url(#bodyclip-${uid})`}>
        <rect x="58" y="92" width="15" height="600" fill="rgba(255,255,255,0.16)" />
        <rect x="74" y="92" width="5" height="600" fill="rgba(255,255,255,0.10)" />
        <rect x="138" y="92" width="9" height="600" fill="rgba(255,255,255,0.05)" />
      </g>
      {/* Borde sutil del vidrio */}
      <path
        d="M28 270 C30 220 82 215 82 182 L82 92 L118 92 L118 182 C118 215 170 220 172 270 L172 678 C172 700 160 706 100 706 C40 706 28 700 28 678 Z"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
      />

      {/* Etiqueta */}
      <g>
        <rect
          x="38"
          y="372"
          width="124"
          height="250"
          rx="5"
          fill={labelBg}
          stroke={labelStroke}
          strokeWidth="1"
        />
        <rect x="38" y="372" width="124" height="250" rx="5" fill={`url(#berber-${uid})`} />

        {/* Monograma */}
        <g
          transform="translate(89 386) scale(0.17)"
          stroke={goldText}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M26 138 L26 58 L46 82 L60 60 L74 82 L94 58 L94 138" />
          <path d="M18 138 L40 138" />
          <path d="M80 138 L102 138" />
          <path d="M44 98 L60 80 L76 98" />
          <path d="M42 114 L60 96 L78 114" />
          <path d="M52 138 L52 124 L60 116 L68 124 L68 138" />
        </g>
        <g fill={goldText}>
          <circle cx="93" cy="388" r="1.4" />
          <circle cx="100" cy="388" r="1.4" />
          <circle cx="107" cy="388" r="1.4" />
        </g>

        <text
          x="100"
          y="438"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="15"
          fontWeight="500"
          letterSpacing="1"
          fill={nameColor}
        >
          CASA BALSECA
        </text>

        <line x1="66" y1="452" x2="134" y2="452" stroke={goldText} strokeWidth="0.7" opacity="0.7" />

        <text
          x="100"
          y="474"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="7"
          letterSpacing="2.4"
          fill={metaColor}
        >
          {region}
        </text>
        <text
          x="100"
          y="492"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="7"
          letterSpacing="3"
          fill={goldText}
        >
          · {designation} ·
        </text>

        <text
          x="100"
          y="528"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
          fontSize="22"
          fill={goldText}
        >
          {vintage}
        </text>

        <text
          x="100"
          y="572"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="6"
          letterSpacing="1.2"
          fill={metaColor}
        >
          Botella N.º ____ de {folioTotal}
        </text>
        <text
          x="100"
          y="592"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="5.4"
          letterSpacing="1.8"
          fill={metaColor}
        >
          VINO TINTO · PRODUCTO DE ESPAÑA
        </text>
        <text
          x="100"
          y="608"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="5"
          letterSpacing="1.6"
          fill={metaColor}
          opacity="0.85"
        >
          MOG SELECTIONS
        </text>
      </g>
    </svg>
  );
}
