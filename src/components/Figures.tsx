import { CountUp } from './ui/CountUp';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

type Stat = {
  to: number;
  suffix?: string;
  label: string;
  sub: string;
};

// Sólo cifras REALES y verificables.
const STATS: Stat[] = [
  { to: 2, label: 'Ediciones', sub: 'Crianza · Roble' },
  { to: 9210, label: 'Botellas', sub: 'Crianza 2014' },
  { to: 17166, label: 'Botellas', sub: 'Roble 2015' },
  { to: 24, suffix: ' meses', label: 'De crianza', sub: '≥ 12 en roble' },
];

export function Figures() {
  return (
    <section id="en-cifras" className="relative bg-ivory-2/70 py-20 md:py-24">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow">En cifras · Sólo hechos</p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-y-12 md:mt-14 md:grid-cols-4 md:gap-0">
          {STATS.map((stat, i) => (
            <RevealItem
              key={stat.label + i}
              className={`px-4 text-center md:px-8 ${
                i > 0 ? 'md:border-l md:border-ink/10' : ''
              }`}
            >
              <p className="font-display text-[clamp(2.8rem,7vw,4.5rem)] font-light leading-none tracking-[-0.02em] text-ink">
                <CountUp to={stat.to} />
                {stat.suffix && (
                  <span className="font-sans text-base font-normal tracking-normal text-muted">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="mt-4 font-display text-base text-burgundy">{stat.label}</p>
              <p className="eyebrow !text-[0.625rem] mt-1.5">{stat.sub}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
