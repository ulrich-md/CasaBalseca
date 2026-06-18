import { motion } from 'framer-motion';
import { Bottle } from './ui/Bottle';
import { SmartImage } from './ui/SmartImage';
import { Reveal } from './ui/Reveal';
import { EyebrowDotted } from './ui/Eyebrow';
import { wines, type Wine } from '../data/wines';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

// Fotos reales de marca — WebP + PNG por vino, con fallback al SVG.
const BOTTLE_SRC: Record<Wine['id'], { png: string; webp: string }> = {
  crianza: { png: '/assets/bottle-crianza.png', webp: '/assets/bottle-crianza.webp' },
  roble: { png: '/assets/bottle-roble.png', webp: '/assets/bottle-roble.webp' },
};

export function Wines() {
  return (
    <section id="los-vinos" className="relative bg-ivory py-24 md:py-32">
      <div className="shell">
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Los vinos · Ediciones numeradas</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-ink">
              Dos añadas,{' '}
              <span className="italic text-burgundy">una sola</span> exigencia
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-lg text-[0.97rem] leading-relaxed text-muted text-pretty">
              Cada botella se numera a mano y forma parte de una tirada finita.
              Lo que no se repite, se cuida.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 md:gap-8"
        >
          {wines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WineCard({ wine }: { wine: Wine }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-[4px] border border-ink/10 bg-gradient-to-b from-paper to-ivory-2/60 transition-all duration-500 ease-power4 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_40px_70px_-40px_rgba(62,17,23,0.45)]"
    >
      {/* Filete dorado superior que se dibuja al hover */}
      <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-power3 group-hover:w-full" />

      <div className="grid grid-cols-1 gap-2 p-7 sm:grid-cols-[40%_60%] sm:gap-6 sm:p-9">
        {/* Botella sobre pedestal */}
        <div className="relative flex items-end justify-center">
          <div className="pointer-events-none absolute bottom-6 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(176,133,46,0.18),transparent_70%)] blur-xl" />
          <SmartImage
            src={BOTTLE_SRC[wine.id].png}
            webp={BOTTLE_SRC[wine.id].webp}
            alt={`${wine.name} ${wine.vintage}`}
            className="h-[19rem] w-auto object-contain drop-shadow-[0_24px_30px_rgba(62,17,23,0.28)] transition-transform duration-700 ease-power4 group-hover:-translate-y-1 sm:h-[22rem]"
            fallback={
              <Bottle
                variant={wine.id}
                className="h-[19rem] w-auto transition-transform duration-700 ease-power4 group-hover:-translate-y-1 sm:h-[22rem]"
                title={`${wine.name} ${wine.vintage}`}
              />
            }
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col">
          <EyebrowDotted items={[wine.region, wine.type]} />

          <div className="mt-3 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[1.9rem] font-light leading-none tracking-[-0.01em] text-ink">
              {wine.name.replace('Casa Balseca ', '')}
            </h3>
            <span className="font-display text-2xl italic text-gold">
              {wine.vintage}
            </span>
          </div>

          <span className="mt-2 inline-flex w-fit items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-terra">
            <span className="h-px w-5 bg-terra/60" />
            {wine.designation}
          </span>

          <p className="mt-5 text-[0.92rem] leading-relaxed text-muted text-pretty">
            {wine.tasting}
          </p>

          {/* Chips de maridaje */}
          <div className="mt-6">
            <p className="eyebrow !text-[0.625rem] mb-2.5">Maridaje</p>
            <ul className="flex flex-wrap gap-2">
              {wine.pairings.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-ink/15 bg-paper/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Folio + ficha */}
          <div className="mt-7 flex items-end justify-between gap-3 border-t border-ink/10 pt-5">
            <div>
              <p className="eyebrow !text-[0.625rem]">Serie limitada</p>
              <p className="mt-1.5 font-display text-sm tracking-wide text-ink/85">
                Botella N.º{' '}
                <span className="text-muted">____</span> de{' '}
                <span className="text-gold">{wine.folioTotal}</span>
              </p>
            </div>
            <a
              href="#donde-comprar"
              className="group/link inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-terra"
            >
              Ver ficha
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
