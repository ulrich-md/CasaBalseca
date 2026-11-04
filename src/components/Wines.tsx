import { motion } from 'framer-motion';
import { Bottle } from './ui/Bottle';
import { BottleFigure } from './ui/BottleFigure';
import { Reveal } from './ui/Reveal';
import { wines, type Wine } from '../data/wines';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

// Fotos reales de marca — WebP + PNG por vino, con fallback al SVG.
const BOTTLE_SRC: Record<Wine['id'], { png: string; webp: string }> = {
  crianza: { png: '/assets/bottle-crianza.png', webp: '/assets/bottle-crianza.webp' },
  roble: { png: '/assets/bottle-roble.png', webp: '/assets/bottle-roble.webp' },
};

export function Wines() {
  return (
    <section id="los-vinos" className="tex tex-paper relative bg-ivory py-24 md:py-32">
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
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted text-pretty">
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
          className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/10"
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
  // Ficha como una carta de vinos: sólo datos reales de etiqueta.
  const specs = [
    { k: 'Denominación', v: `${wine.region} · D.O.` },
    { k: 'Tipo', v: wine.type },
    { k: 'Serie', v: `${wine.folioTotal} botellas numeradas` },
    { k: 'Maridaje', v: wine.pairings.join(' · ') },
  ];

  return (
    <motion.article
      variants={fadeUp}
      className="relative flex flex-col items-center py-6 text-center md:px-10 lg:px-16"
    >
      {/* Botella sin caja: escenario propio con contraluz y suelo */}
      <div className="relative flex h-[23rem] w-full items-end justify-center sm:h-[27rem]">
        <div className="pointer-events-none absolute left-1/2 top-[12%] h-60 w-60 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,133,46,0.2),transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-12 w-72 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(62,17,23,0.08),transparent)]" />
        <BottleFigure
          png={BOTTLE_SRC[wine.id].png}
          webp={BOTTLE_SRC[wine.id].webp}
          alt={`${wine.name} ${wine.vintage}`}
          sizeClassName="h-[21rem] sm:h-[25rem]"
          fallback={
            <Bottle
              variant={wine.id}
              className="h-[21rem] w-auto sm:h-[25rem]"
              title={`${wine.name} ${wine.vintage}`}
            />
          }
        />
      </div>

      <h3 className="mt-12 font-display text-[2.6rem] font-light leading-none tracking-[-0.015em] text-ink">
        {wine.name.replace('Casa Balseca ', '')}
      </h3>
      <p className="mt-3 font-display text-lg italic text-gold-ink">Añada {wine.vintage}</p>

      {/* flex-1: la nota más corta absorbe el hueco y las dos tablas quedan alineadas */}
      <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted text-pretty md:flex-1">
        {wine.tasting}
      </p>

      <dl className="mt-9 w-full max-w-sm border-t border-ink/15 text-left">
        {specs.map((row) => (
          <div
            key={row.k}
            className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-3.5"
          >
            <dt className="eyebrow !text-[0.6875rem] shrink-0">{row.k}</dt>
            <dd className="text-right font-display text-[0.95rem] text-ink/85">{row.v}</dd>
          </div>
        ))}
      </dl>

      <a
        href={wine.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ficha de ${wine.name} ${wine.vintage} en MOG Selections (abre en una pestaña nueva)`}
        className="link-cta mt-7 text-ink"
      >
        Ver ficha
      </a>
    </motion.article>
  );
}
