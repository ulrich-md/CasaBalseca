import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Bottle } from './ui/Bottle';
import { BottleFigure } from './ui/BottleFigure';
import { EntrySplash } from './ui/EntrySplash';
import { scrollToId } from '../lib/useLenis';
import { loadGsap } from '../lib/scrollLibs';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { powerEase } from '../lib/motion';

// Foto real de marca — botella Crianza (WebP + PNG). Si no existe, cae al SVG.
const BOTTLE_PNG = '/assets/bottle-crianza.png';
const BOTTLE_WEBP = '/assets/bottle-crianza.webp';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: powerEase } },
};
const lineMask: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [bottlePng, setBottlePng] = useState(true);

  // Parallax MUY sutil con scrub (palabra fantasma y botella a distinta velocidad).
  // GSAP llega en un chunk diferido: el efecto se engancha cuando carga.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        tl.to(ghostRef.current, { yPercent: 26, ease: 'none' }, 0);
        tl.to(bottleRef.current, { yPercent: -10, ease: 'none' }, 0);
      }, sectionRef);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      data-header-theme="dark"
      className="tex tex-burgundy relative isolate flex min-h-[100svh] bg-night text-paper flex-col items-center overflow-hidden px-6 pb-10 pt-28 md:pt-32"
    >
      {/* Iluminación de escena: penumbra cálida, un foco cenital que cae
          sobre la botella y los bordes perdiéndose en la sombra */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(70%_60%_at_50%_38%,#3a1716_0%,#241010_42%,#160b0a_78%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(22%_75%_at_50%_-12%,rgba(255,214,160,0.16),rgba(255,200,140,0.05)_55%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(40%_30%_at_50%_80%,rgba(255,196,130,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 shadow-[inset_0_0_220px_60px_rgba(0,0,0,0.55)]" />

      {/* Palabra fantasma gigante */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] -z-20 w-[130%] -translate-x-1/2 -translate-y-1/2 select-none text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.08 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.4, ease: powerEase }}
          className="block font-display text-[26vw] font-medium leading-none tracking-[-0.045em] text-paper/[0.035] md:text-[22vw] lg:text-[19rem]"
        >
          BALSECA
        </motion.span>
      </div>

      {/* Eyebrows en esquinas (desktop), alineados a la retícula del header */}
      <div className="absolute inset-x-0 top-36 hidden lg:block">
        <div className="shell flex items-start justify-between">
          <p className="eyebrow leading-relaxed !text-paper/60">
            <span className="block">Ribera del Duero</span>
            <span className="script-accent block text-lg normal-case leading-tight tracking-normal !text-gold-light">
              Denominación de origen
            </span>
          </p>
          <p className="eyebrow text-right leading-relaxed !text-paper/60">
            <span className="block">Producto de España</span>
            <span className="script-accent block text-lg normal-case leading-tight tracking-normal !text-gold-light">
              Vino Tinto
            </span>
          </p>
        </div>
      </div>

      {/* Contenido */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        className="relative z-10 flex w-full max-w-shell flex-1 flex-col items-center"
      >
        <motion.p variants={fadeUpChild} className="eyebrow mb-5 text-center !text-paper/60">
          Casa Balseca · Edición limitada
        </motion.p>

        <h1 className="text-center font-display text-[clamp(3rem,9.5vw,8rem)] font-light leading-[0.92] tracking-[-0.035em] text-paper">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineMask} className="block">Lo selecto</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineMask} className="block italic font-normal text-gold-light">
              se vive
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUpChild}
          className="mt-6 max-w-xl text-center text-base leading-relaxed text-paper/70 text-pretty"
        >
          Vino tinto de Ribera del Duero en ediciones limitadas y numeradas.
          Tempranillo de guarda, criado con paciencia y firmado botella a botella.
        </motion.p>

        {/* CTAs: justo bajo el texto para que queden en el primer pantallazo */}
        <motion.div
          variants={fadeUpChild}
          className="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href="#los-vinos"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('#los-vinos');
            }}
            className="btn btn-light w-full max-w-xs sm:w-auto"
          >
            Descubre los vinos
          </a>
          <a
            href="#donde-comprar"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('#donde-comprar');
            }}
            className="btn btn-ghost-light hidden sm:inline-flex"
          >
            Dónde comprar
          </a>
        </motion.div>

        {/* Escenario de la botella */}
        <div className="relative mt-4 flex w-full items-end justify-center">
          {/* Spotlight cálido que crece al cargar */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 1.6, ease: powerEase, delay: 0.1 }}
            className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[42vh] w-[42vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,206,150,0.22),rgba(176,133,46,0.08)_45%,transparent_70%)] blur-2xl"
          />

          {/* Botella + reflejo */}
          <motion.div
            ref={bottleRef}
            initial={{ opacity: 0, y: 36 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 1, ease: powerEase, delay: 0.15 }}
            className="relative flex flex-col items-center"
          >
            {/* Suelo de piedra: el horizonte (≈45 % de la foto) coincide con la
                base de la botella; se funde hacia arriba con el fondo */}
            <img
              src="/assets/textures/stone-floor.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              className="pointer-events-none absolute left-1/2 top-[clamp(20rem,54vh,34rem)] -z-10 w-[max(100vw,900px)] max-w-none -translate-x-1/2 -translate-y-[47%] select-none opacity-90 brightness-[0.52] sepia-[0.35] saturate-[1.3] [mask-image:radial-gradient(30%_30%_at_50%_49%,#000_0%,rgba(0,0,0,0.5)_45%,transparent_100%)]"
            />
            <div className="relative">
              {/* Splash de vino al cargar — estallido detrás de la botella */}
              <EntrySplash
                variant="back"
                play={ready}
                className="absolute left-1/2 top-1/2 z-0 aspect-square h-[150%] -translate-x-1/2 -translate-y-1/2 opacity-60"
              />
              <div className="relative z-10">
                <BottleFigure
                  png={BOTTLE_PNG}
                  webp={BOTTLE_WEBP}
                  alt="Casa Balseca Crianza 2014 — vino tinto de Ribera del Duero"
                  sizeClassName="h-[clamp(20rem,54vh,34rem)]"
                  eager
                  rim
                  fetchPriority="high"
                  onFail={() => setBottlePng(false)}
                  fallback={
                    <Bottle
                      variant="crianza"
                      className="relative h-[clamp(20rem,54vh,34rem)] w-auto drop-shadow-[0_38px_50px_rgba(62,17,23,0.34)]"
                      title="Casa Balseca Crianza 2014"
                    />
                  }
                />
              </div>
            </div>

            {/* Reflejo en el suelo (solo con la foto real) */}
            {bottlePng && (
              <picture>
                <source srcSet={BOTTLE_WEBP} type="image/webp" />
                <img
                  src={BOTTLE_PNG}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="pointer-events-none -mt-1 h-[clamp(7rem,18vh,11rem)] w-auto -scale-y-100 object-contain object-top opacity-[0.14] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_70%)]"
                />
              </picture>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <a
        href="#los-vinos"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('#los-vinos');
        }}
        className="group relative z-10 mt-6 flex flex-col items-center gap-2"
        aria-label="Desplázate para descubrir"
      >
        <span className="eyebrow !text-[0.6875rem] !text-paper/60">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-paper/25">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-paper/60 animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}
