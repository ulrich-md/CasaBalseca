import { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bottle } from './ui/Bottle';
import { EntrySplash } from './ui/EntrySplash';
import { BerberPattern } from './ui/BerberPattern';
import { scrollToId } from '../lib/useLenis';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { powerEase } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [bottlePng, setBottlePng] = useState(true);
  const [videoActive, setVideoActive] = useState(false);

  // Parallax MUY sutil con scrub (palabra fantasma y botella a distinta velocidad)
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
      tl.to(ghostRef.current, { yPercent: 26, ease: 'none' }, 0);
      tl.to(bottleRef.current, { yPercent: -10, ease: 'none' }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-10 pt-28 md:pt-32"
    >
      {/* Fondo: crema con gradientes cálidos + viñeta para dar profundidad */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(125%_90%_at_50%_-10%,#fcf7ee_0%,#f4ecdb_45%,#e9dcc4_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(55%_45%_at_80%_28%,rgba(166,68,46,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(45%_38%_at_16%_72%,rgba(90,26,34,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 shadow-[inset_0_-120px_140px_-90px_rgba(62,17,23,0.35)]" />
      <BerberPattern className="absolute inset-0 -z-30" opacity={0.05} tile={52} />

      {/* Líneas finas fluidas decorativas */}
      <svg
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-50 250 C 320 150, 520 370, 760 310 S 1240 130, 1520 290" fill="none" stroke="rgba(176,133,46,0.22)" strokeWidth="1" />
        <path d="M-50 670 C 300 730, 560 550, 820 630 S 1280 770, 1520 610" fill="none" stroke="rgba(176,133,46,0.15)" strokeWidth="1" />
      </svg>

      {/* Palabra fantasma gigante */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] -z-20 w-[130%] -translate-x-1/2 -translate-y-1/2 select-none text-center"
      >
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: powerEase }}
          className="block font-display text-[26vw] font-medium leading-none tracking-[-0.045em] text-burgundy/[0.08] md:text-[22vw] lg:text-[19rem]"
        >
          BALSECA
        </motion.span>
      </div>

      {/* Eyebrows en esquinas (desktop) */}
      <div className="absolute left-6 top-28 hidden max-w-[210px] md:block lg:left-10 lg:top-36">
        <p className="eyebrow leading-relaxed">
          Ribera del Duero ·{' '}
          <span className="script-accent text-base normal-case tracking-normal">Denominación de origen</span>
        </p>
      </div>
      <div className="absolute right-6 top-28 hidden max-w-[210px] text-right md:block lg:right-10 lg:top-36">
        <p className="eyebrow leading-relaxed">
          <span className="script-accent text-base normal-case tracking-normal">Vino Tinto</span>{' '}
          · Producto de España
        </p>
      </div>

      {/* Contenido */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-shell flex-1 flex-col items-center"
      >
        <motion.p variants={fadeUpChild} className="eyebrow mb-5 text-center">
          Casa Balseca · Edición limitada
        </motion.p>

        <h1 className="text-center font-display text-[clamp(3rem,9.5vw,8rem)] font-light leading-[0.92] tracking-[-0.035em] text-ink">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineMask} className="block">Lo selecto</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineMask} className="block italic font-normal text-burgundy">
              se vive
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUpChild}
          className="mt-6 max-w-xl text-center text-[0.98rem] leading-relaxed text-muted text-pretty"
        >
          Vino tinto de Ribera del Duero en ediciones limitadas y numeradas.
          Tempranillo de guarda, criado con paciencia y firmado botella a botella.
        </motion.p>

        {/* Escenario de la botella */}
        <div className="relative mt-1 flex w-full items-end justify-center">
          {/* Spotlight cálido que crece al cargar */}
          <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: powerEase, delay: 0.2 }}
            className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[42vh] w-[42vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,133,46,0.28),rgba(166,68,46,0.12)_45%,transparent_70%)] blur-2xl"
          />

          {/* Botella + reflejo */}
          <motion.div
            ref={bottleRef}
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: powerEase, delay: 0.35 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              {/* Splash de vino al cargar — estallido detrás de la botella */}
              <EntrySplash
                variant="back"
                onVideoChange={setVideoActive}
                className="absolute inset-0 z-0"
              />
              {bottlePng ? (
                <picture>
                  <source srcSet={BOTTLE_WEBP} type="image/webp" />
                  <img
                    src={BOTTLE_PNG}
                    alt="Casa Balseca Crianza 2014 — vino tinto de Ribera del Duero"
                    onError={() => setBottlePng(false)}
                    draggable={false}
                    fetchPriority="high"
                    className="relative z-10 h-[clamp(20rem,54vh,34rem)] w-auto object-contain drop-shadow-[0_38px_50px_rgba(62,17,23,0.34)]"
                  />
                </picture>
              ) : (
                <Bottle
                  variant="crianza"
                  className="relative z-10 h-[clamp(20rem,54vh,34rem)] w-auto drop-shadow-[0_38px_50px_rgba(62,17,23,0.34)]"
                  title="Casa Balseca Crianza 2014"
                />
              )}
              {/* Barrido de luz cálido sobre la botella */}
              {!reduced && (
                <span className="pointer-events-none absolute inset-y-[8%] left-1/2 z-10 w-[40%] -translate-x-1/2 overflow-hidden">
                  <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-sheen" />
                </span>
              )}
              {/* Gotas en primer plano — delante de la botella (se ocultan con el video) */}
              <EntrySplash
                variant="front"
                hidden={videoActive}
                className="pointer-events-none absolute inset-0 z-20"
              />
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
                  className="pointer-events-none -mt-1 h-[clamp(7rem,18vh,11rem)] w-auto -scale-y-100 object-contain object-top opacity-20 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_70%)]"
                />
              </picture>
            )}
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div variants={fadeUpChild} className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
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
        <span className="eyebrow !text-[0.625rem] text-muted/70">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-ink/25">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terra animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}
