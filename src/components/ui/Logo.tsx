import { Monogram } from './Monogram';

type LogoProps = {
  className?: string;
  color?: string;
  /** Color del wordmark; por defecto hereda currentColor. */
  wordmarkColor?: string;
  compact?: boolean;
};

/**
 * Logo CASA BALSECA: monograma dorado + wordmark en versalitas.
 * // REEMPLAZAR: logo oficial.
 */
export function Logo({
  className,
  color = 'var(--gold)',
  wordmarkColor = 'currentColor',
  compact = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <Monogram
        className="h-8 w-auto shrink-0 md:h-9"
        color={color}
        dots
        title="Casa Balseca"
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
