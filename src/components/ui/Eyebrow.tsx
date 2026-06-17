import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
};

/** Label en versalitas Inter, 11–12px, tracking .28em, color muted. */
export function Eyebrow({ children, className, as = 'span' }: EyebrowProps) {
  const Tag = as;
  return <Tag className={`eyebrow ${className ?? ''}`}>{children}</Tag>;
}

/** Une items con separador "·" del mismo tono. */
export function EyebrowDotted({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <Eyebrow className={className}>
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && <span className="mx-2 text-gold/70">·</span>}
        </span>
      ))}
    </Eyebrow>
  );
}
