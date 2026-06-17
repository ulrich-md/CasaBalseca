import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bottle } from './ui/Bottle';
import { WineSplash } from './ui/WineSplash';
import { BerberPattern } from './ui/BerberPattern';
import { scrollToId } from '../lib/useLenis';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { powerEase } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Parallax MUY sutil con scrub suave (palabra fantasma y botella a distinta velocidad)
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to(ghostRef.current, { yPercent: 22, ease: 'none' }, 0);
      tl.to(bottleRef.current, { yPercent: -12, ease: 'none' }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: powerEase, delay },
        };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-12 pt-28 md:pt-32"
    >
      {/* Fondo: gradientes cálidos muy suaves */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(120%_85%_at_50%_-10%,#fbf5ea_0%,#f4ecdb_42%,#ecdfc9_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60%_50%_at_82%_30%,rgba(166,68,46,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(50%_40%_at_15%_70%,rgba(90,26,34,0.08),transparent_60%)]" />
      <BerberPattern className="absolute inset-0 -z-20" opacity={0.05} tile={52} />

      {/* Líneas finas fluidas decorativas */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-50 240 C 320 140, 520 360, 760 300 S 1240 120, 1520 280"
          fill="none"
          stroke="rgba(176,133,46,0.22)"
          strokeWidth="1"
        />
        <path
          d="M-50 660 C 300 720, 560 540, 820 620 S 1280 760, 1520 600"
          fill="none"
          stroke="rgba(176,133,46,0.16)"
          strokeWidth="1"
        />
      </svg>

      {/* Palabra fantasma gigante detrás */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -z-10 w-[120%] -translate-x-1/2 -translate-y-1/2 select-none text-center"
      >
        <span className="block font-display text-[24vw] font-medium leading-none tracking-[-0.04em] text-burgundy/[0.07] md:text-[20vw] lg:text-[17rem]">
          BALSECA
        </span>
      </div>

      {/* Eyebrows en esquinas (desktop) */}
      <div className="absolute left-6 top-28 hidden max-w-[200px] md:block lg:left-10 lg:top-36">
        <p className="eyebrow leading-relaxed">
          Ribera del Duero ·{' '}
          <span className="script-accent text-base normal-case tracking-normal">
            Denominación de origen
          </span>
        </p>
      </div>
      <div className="absolute right-6 top-28 hidden max-w-[200px] text-right md:block lg:right-10 lg:top-36">
        <p className="eyebrow leading-relaxed">
          <span className="script-accent text-base normal-case tracking-normal">
            Vino Tinto
          </span>{' '}
          · Producto de España
        </p>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex w-full max-w-shell flex-1 flex-col items-center">
        <motion.p {...fade(0.05)} className="eyebrow mb-5 text-center">
          Casa Balseca · Edición limitada
        </motion.p>

        <motion.h1
          {...fade(0.12)}
          className="text-center font-display text-[clamp(2.9rem,9vw,7.5rem)] font-light leading-[0.94] tracking-[-0.03em] text-ink"
        >
          Lo selecto{' '}
          <span className="italic font-normal text-burgundy">se vive</span>
        </motion.h1>

        <motion.p
          {...fade(0.22)}
          className="mt-6 max-w-xl text-center text-[0.98rem] leading-relaxed text-muted text-pretty"
        >
          Vino tinto de Ribera del Duero en ediciones limitadas y numeradas.
          Tempranillo de guarda, criado con paciencia y firmado botella a botella.
        </motion.p>

        {/* Botella + derrame */}
        <div ref={bottleRef} className="relative mt-2 flex items-end justify-center">
          <Bottle
            variant="crianza"
            className="h-[clamp(20rem,46vh,30rem)] w-auto drop-shadow-[0_30px_45px_rgba(62,17,23,0.28)]"
            title="Casa Balseca Crianza 2014"
          />
          {/* Barrido de luz cálido sobre la botella */}
          <div className="pointer-events-none absolute inset-y-6 left-1/2 w-1/2 -translate-x-1/2 overflow-hidden">
            {!reduced && (
              <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sheen" />
            )}
          </div>
          {/* Copa con derrame, a un costado */}
          <WineSplash className="absolute -right-2 bottom-0 hidden h-40 w-28 translate-x-1/2 sm:block md:-right-6 md:h-48 md:w-32" />
        </div>

        {/* CTAs */}
        <motion.div
          {...fade(0.35)}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#los-vinos"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('#los-vinos');
            }}
            className="btn btn-fill"
          >
            Descubre los vinos
          </a>
          <a
            href="#donde-comprar"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('#donde-comprar');
            }}
            className="btn btn-outline"
          >
            Dónde comprar
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#los-vinos"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('#los-vinos');
        }}
        className="group relative z-10 mt-8 flex flex-col items-center gap-2"
        aria-label="Desplázate para descubrir"
      >
        <span className="eyebrow !text-[0.625rem] text-muted/70">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-ink/25">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terra animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}
