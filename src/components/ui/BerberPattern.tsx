type BerberPatternProps = {
  className?: string;
  color?: string;
  opacity?: number;
  /** Tamaño del mosaico en px. */
  tile?: number;
  id?: string;
};

/**
 * Patrón geométrico bereber/diamante — elemento de marca, usado como textura
 * MUY sutil en líneas doradas finas (fondos de sección / divisores).
 * Nunca saturado.
 */
export function BerberPattern({
  className,
  color = 'var(--gold)',
  opacity = 0.08,
  tile = 48,
  id = 'berber',
}: BerberPatternProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="100%"
      height="100%"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <g
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
          >
            {/* Diamante exterior */}
            <path d={`M${tile / 2} 2 L${tile - 2} ${tile / 2} L${tile / 2} ${tile - 2} L2 ${tile / 2} Z`} />
            {/* Diamante interior */}
            <path
              d={`M${tile / 2} ${tile * 0.3} L${tile * 0.7} ${tile / 2} L${tile / 2} ${tile * 0.7} L${tile * 0.3} ${tile / 2} Z`}
            />
            {/* Cruces en vértices */}
            <path d={`M${tile / 2} 0 L${tile / 2} 4 M${tile / 2 - 2} 2 L${tile / 2 + 2} 2`} />
            <path d={`M0 ${tile / 2} L4 ${tile / 2} M2 ${tile / 2 - 2} L2 ${tile / 2 + 2}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
