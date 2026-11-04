import { Logo } from './ui/Logo';
import { scrollToId } from '../lib/useLenis';
import { MOG_URL, SOCIAL_LINKS } from '../data/contact';

const NAV = [
  { label: 'Los vinos', href: '#los-vinos' },
  { label: 'La casa', href: '#la-casa' },
  { label: 'El proceso', href: '#el-proceso' },
  { label: 'Dónde comprar', href: '#donde-comprar' },
];

export function Footer() {
  return (
    <footer className="tex tex-linen relative bg-ink text-paper" data-header-theme="dark">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
              Vino tinto de Ribera del Duero en ediciones limitadas y numeradas.
            </p>
            <p className="eyebrow mt-5 !text-gold-light">
              Producto de España · Vino Tinto
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className="eyebrow !text-paper/60">Navegar</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.href);
                    }}
                    className="link-underline cursor-pointer text-sm text-paper/70 transition-colors hover:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes / contacto: sólo los canales configurados en data/contact.ts */}
          <div>
            <p className="eyebrow !text-paper/60">
              {SOCIAL_LINKS.length > 0 ? 'Síguenos' : 'Distribución'}
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="link-underline cursor-pointer text-sm text-paper/70 transition-colors hover:text-gold-light"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className={`${SOCIAL_LINKS.length > 0 ? 'mt-5' : 'mt-4'} text-sm text-paper/65`}>
              Distribuye{' '}
              <a
                href={MOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-paper/85 transition-colors hover:text-gold-light"
              >
                MOG Selections
              </a>
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
