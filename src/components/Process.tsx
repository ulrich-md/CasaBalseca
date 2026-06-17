import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from './ui/Reveal';
import { BerberPattern } from './ui/BerberPattern';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Vendimia',
    text: 'La uva se recoge en su punto justo. Selección en campo y en mesa, racimo a racimo.',
  },
  {
    n: '02',
    title: 'Crianza',
    text: '24 meses de guarda, un mínimo de 12 en barrica de roble, según la regla de la D.O.',
  },
  {
    n: '03',
    title: 'Reposo en botella',
    text: 'El vino descansa en botella hasta afinar sus aristas y encontrar el equilibrio.',
  },
  {
    n: '04',
    title: 'Numerado',
    text: 'Cada botella se numera a mano: una pieza única dentro de una serie finita.',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduce: boolean;
          };

          const fill = sectionRef.current?.querySelectorAll('.process-fill');
          if (!fill) return;

          if (reduce) {
            gsap.set(fill, { scaleX: 1, scaleY: 1 });
            return;
          }

          gsap.fromTo(
            fill,
            isDesktop ? { scaleX: 0 } : { scaleY: 0 },
            {
              [isDesktop ? 'scaleX' : 'scaleY']: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                end: 'bottom 75%',
                scrub: 1,
              },
            },
          );
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="el-proceso"
      ref={sectionRef}
      className="relative overflow-hidden bg-burgundy-deep py-24 text-paper md:py-32"
    >
      {/* Atmósfera */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(166,68,46,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_120%,rgba(176,133,46,0.12),transparent_60%)]" />
      <BerberPattern className="absolute inset-0" color="#caa24c" opacity={0.07} tile={54} />

      <div className="shell relative">
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow !text-gold/80">El proceso</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-paper">
              Del sarmiento al{' '}
              <span className="italic text-gold">número</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-md text-[0.97rem] leading-relaxed text-paper/65 text-pretty">
              Cuatro tiempos sin atajos. El calendario lo marca el vino, no la prisa.
            </p>
          </Reveal>
        </div>

        {/* Timeline desktop (horizontal) */}
        <div className="relative mt-20 hidden md:block">
          <div className="absolute left-[12.5%] right-[12.5%] top-[7px] h-px bg-paper/15">
            <div className="process-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-terra" />
          </div>
          <ol className="grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.12} className="text-center">
                <span className="relative z-10 mx-auto block h-3.5 w-3.5 rounded-full border border-gold bg-burgundy-deep ring-4 ring-burgundy-deep" />
                <span className="mt-6 block font-display text-sm tracking-[0.3em] text-gold">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-normal text-paper">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[15rem] text-[0.86rem] leading-relaxed text-paper/60 text-pretty">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Timeline móvil (vertical) */}
        <div className="relative mt-14 md:hidden">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-paper/15">
            <div className="process-fill h-full w-full origin-top scale-y-0 bg-gradient-to-b from-gold to-terra" />
          </div>
          <ol className="space-y-9">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.1} className="relative pl-10">
                <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border border-gold bg-burgundy-deep" />
                <span className="font-display text-xs tracking-[0.3em] text-gold">
                  {step.n}
                </span>
                <h3 className="mt-1 font-display text-lg text-paper">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[0.88rem] leading-relaxed text-paper/60">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
