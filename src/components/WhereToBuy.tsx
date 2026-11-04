import { Reveal } from './ui/Reveal';
import { Monogram } from './ui/Monogram';
import { BerberPattern } from './ui/BerberPattern';
import { wines } from '../data/wines';
import { CONTACT } from '../data/contact';

export function WhereToBuy() {
  return (
    <section id="donde-comprar" className="tex tex-paper relative bg-ivory pb-24 pt-16 md:pb-28 md:pt-20">
      <div className="shell">
        <div className="tex tex-burgundy relative overflow-hidden rounded-[6px] bg-gradient-to-br from-burgundy to-burgundy-deep px-6 py-16 text-center text-paper md:px-12 md:py-24">
          <BerberPattern className="absolute inset-0" color="#caa24c" opacity={0.08} tile={50} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(166,68,46,0.28),transparent_65%)]" />

          <div className="relative mx-auto max-w-2xl">
            <Reveal className="flex justify-center">
              <Monogram className="h-14 w-auto" color="#caa24c" title="Casa Balseca" />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="eyebrow mt-7 !text-gold-light">Dónde comprar</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.06] tracking-[-0.02em]">
                Llévate una edición{' '}
                <span className="italic text-gold-light">a casa</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-paper/70 text-pretty">
                Disponible a través de nuestro distribuidor. Sin carrito ni prisas:
                te atendemos como se atiende a quien aprecia el detalle.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                {wines.map((wine, i) => (
                  <a
                    key={wine.id}
                    href={wine.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${wine.name} ${wine.vintage} en MOG Selections (abre en una pestaña nueva)`}
                    className={`btn w-full sm:w-auto ${
                      i === 0
                        ? 'btn-terra'
                        : 'btn-outline !border-paper/40 !text-paper hover:!border-gold-light hover:!text-gold-light'
                    }`}
                  >
                    Comprar {wine.designation} {wine.vintage}
                  </a>
                ))}
              </div>
              {CONTACT.whatsapp && (
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-6 inline-block text-sm text-paper/80 transition-colors hover:text-gold-light"
                >
                  ¿Dudas? Escríbenos por WhatsApp
                </a>
              )}
            </Reveal>

            <Reveal delay={0.28}>
              <p className="eyebrow mt-9 !text-paper/60">
                Seleccionado y distribuido por MOG Selections
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
