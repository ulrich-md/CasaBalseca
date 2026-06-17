import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { EditorialImage } from './ui/EditorialImage';
import { BerberPattern } from './ui/BerberPattern';

export function TheHouse() {
  return (
    <section id="la-casa" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <BerberPattern className="absolute inset-0" opacity={0.045} tile={56} />
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="shell relative grid gap-14 lg:grid-cols-[46%_54%] lg:items-center lg:gap-16">
        {/* Texto editorial */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">La casa</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Tempranillo de{' '}
              <span className="italic text-burgundy">Ribera del Duero</span>,
              firmado a mano
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-[1rem] leading-relaxed text-ink/80 text-pretty">
              Casa Balseca nace de una idea sencilla: lo selecto no se acumula,
              se vive. Nuestro tinto crece en los suelos de Ribera del Duero, donde
              el Tempranillo encuentra altura, frío nocturno y tiempo. Tres cosas
              que no se compran.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-lg text-[0.97rem] leading-relaxed text-muted text-pretty">
              Cada añada se embotella en una edición limitada y se numera una a
              una, porque lo que es finito merece quedar registrado. La casa la
              selecciona y distribuye{' '}
              <span className="font-medium text-ink">MOG Selections</span>.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="script-accent mt-8 text-3xl">Lo selecto se vive</p>
          </Reveal>
        </div>

        {/* Collage de 3 imágenes */}
        <RevealGroup className="order-1 grid grid-cols-2 gap-4 lg:order-2 lg:gap-5">
          <RevealItem className="col-span-2">
            {/* // REEMPLAZAR: foto real — viñedo en Ribera del Duero */}
            <EditorialImage
              scene="vinedo"
              alt="Viñedo de Tempranillo en Ribera del Duero al atardecer"
              className="aspect-[16/10] w-full rounded-[4px] shadow-[0_30px_60px_-40px_rgba(62,17,23,0.5)]"
            />
          </RevealItem>
          <RevealItem>
            {/* // REEMPLAZAR: foto real — barricas de roble */}
            <EditorialImage
              scene="barricas"
              alt="Barricas de roble en la sala de crianza"
              className="aspect-[3/4] w-full rounded-[4px] shadow-[0_30px_60px_-40px_rgba(62,17,23,0.5)]"
            />
          </RevealItem>
          <RevealItem className="flex flex-col justify-end">
            {/* // REEMPLAZAR: foto real — copa de vino tinto */}
            <EditorialImage
              scene="copa"
              alt="Copa de vino tinto Casa Balseca a contraluz"
              className="aspect-[3/4] w-full rounded-[4px] shadow-[0_30px_60px_-40px_rgba(62,17,23,0.5)]"
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
