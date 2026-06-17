type MonogramProps = {
  className?: string;
  color?: string;
  /** Muestra los 3 puntos superiores (corona). */
  dots?: boolean;
  strokeWidth?: number;
  title?: string;
};

/**
 * Monograma geométrico CASA BALSECA — banner/templo angular con corona de
 * 3 puntos, chevrons anidados y casa central. Recreado en SVG a partir de la
 * referencia de marca.
 * // REEMPLAZAR: logo oficial (sustituir por SVG/PNG definitivo cuando esté).
 */
export function Monogram({
  className,
  color = 'var(--gold)',
  dots = true,
  strokeWidth = 6,
  title = 'Monograma Casa Balseca',
}: MonogramProps) {
  return (
    <svg
      viewBox="0 0 120 156"
      className={className}
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Marco + corona angular (W/M) */}
        <path d="M26 138 L26 58 L46 82 L60 60 L74 82 L94 58 L94 138" />
        {/* Pies */}
        <path d="M18 138 L40 138" />
        <path d="M80 138 L102 138" />
        {/* Chevrons anidados */}
        <path d="M44 98 L60 80 L76 98" />
        <path d="M42 114 L60 96 L78 114" />
        {/* Casa / portal central */}
        <path d="M52 138 L52 124 L60 116 L68 124 L68 138" />
      </g>
      {dots && (
        <g fill={color}>
          <circle cx="36" cy="16" r="5" />
          <circle cx="60" cy="16" r="5" />
          <circle cx="84" cy="16" r="5" />
        </g>
      )}
    </svg>
  );
}
