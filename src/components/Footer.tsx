import { Monogram } from './ui/Monogram';
import { scrollToId } from '../lib/useLenis';

const NAV = [
  { label: 'Los vinos', href: '#los-vinos' },
  { label: 'La casa', href: '#la-casa' },
  { label: 'El proceso', href: '#el-proceso' },
  { label: 'Dónde comprar', href: '#donde-comprar' },
];

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Contacto', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <Monogram className="h-9 w-auto" color="var(--gold)" title="Casa Balseca" />
              <span className="font-display text-base uppercase tracking-[0.22em]">
                Casa Balseca
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
              Vino tinto de Ribera del Duero en ediciones limitadas y numeradas.
            </p>
            <p className="eyebrow mt-5 !text-gold/70">
              Producto de España · Vino Tinto
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className="eyebrow !text-paper/40">Navegar</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.href);
                    }}
                    className="link-underline cursor-pointer text-sm text-paper/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto / redes (placeholder) */}
          <div>
            <p className="eyebrow !text-paper/40">Síguenos</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-underline cursor-pointer text-sm text-paper/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-paper/55">
              Distribuye{' '}
              <span className="font-medium text-paper/80">MOG Selections</span>
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/10 pt-7">
          <div className="flex flex-col gap-4 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Casa Balseca. Todos los derechos reservados.</p>
            {/* Aviso de edad discreto (sin modal / age-gate) */}
            <p className="max-w-md sm:text-right">
              Prohibida la venta de alcohol a menores de edad. Bebe con moderación.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
