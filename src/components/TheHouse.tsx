import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { BerberPattern } from './ui/BerberPattern';

// Fotos reales de marca para el collage de "La casa".
const PHOTOS = {
  cinematico: '/assets/vino-cinematico.webp',
  uva: '/assets/botellas-uva.webp',
  tarjeta: '/assets/tarjeta.webp',
};

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
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted text-pretty">
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

        {/* Collage de 3 fotos reales */}
        <RevealGroup className="order-1 grid grid-cols-2 gap-4 lg:order-2 lg:gap-5">
          <RevealItem className="col-span-2 overflow-hidden rounded-[4px] ring-1 ring-ink/10 shadow-[0_30px_60px_-40px_rgba(62,17,23,0.55)]">
            <img
              src={PHOTOS.cinematico}
              alt="Botellas de Casa Balseca Crianza con el sello de la marca, Ribera del Duero"
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-power4 hover:scale-[1.04]"
            />
          </RevealItem>
          <RevealItem className="overflow-hidden rounded-[4px] ring-1 ring-ink/10 shadow-[0_30px_60px_-40px_rgba(62,17,23,0.55)]">
            <img
              src={PHOTOS.uva}
              alt="Casa Balseca Crianza y Roble junto a racimos de uva"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-power4 hover:scale-[1.04]"
            />
          </RevealItem>
          <RevealItem className="overflow-hidden rounded-[4px] ring-1 ring-ink/10 shadow-[0_30px_60px_-40px_rgba(62,17,23,0.55)]">
            <img
              src={PHOTOS.tarjeta}
              alt="Tarjeta de marca Casa Balseca con el patrón bereber y el monograma dorado"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-power4 hover:scale-[1.04]"
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
