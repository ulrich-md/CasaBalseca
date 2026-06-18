import { Monogram } from './Monogram';
import { SmartImage } from './SmartImage';

type LogoProps = {
  className?: string;
  color?: string;
  /** Color del wordmark; por defecto hereda currentColor. */
  wordmarkColor?: string;
  compact?: boolean;
};

// REEMPLAZAR: logo oficial. Usa el PNG del monograma si existe, si no el SVG.
const LOGO_SRC = '/assets/logo.png';

/**
 * Logo CASA BALSECA: monograma dorado (PNG real con fallback a SVG) + wordmark
 * en versalitas.
 */
export function Logo({
  className,
  color = 'var(--gold)',
  wordmarkColor = 'currentColor',
  compact = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <SmartImage
        src={LOGO_SRC}
        webp="/assets/logo.webp"
        alt="Casa Balseca"
        eager
        className="h-8 w-auto shrink-0 object-contain md:h-9"
        fallback={
          <Monogram className="h-8 w-auto shrink-0 md:h-9" color={color} dots title="Casa Balseca" />
        }
      />
      {!compact && (
        <span
          className="font-display text-[0.95rem] font-medium uppercase leading-none tracking-[0.22em] md:text-base"
          style={{ color: wordmarkColor }}
        >
          Casa&nbsp;Balseca
        </span>
      )}
    </span>
  );
}
