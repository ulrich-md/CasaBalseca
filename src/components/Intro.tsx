import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Monogram } from './ui/Monogram';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { powerEase } from '../lib/motion';

type IntroProps = {
  /** Se llama cuando la cortina empieza a retirarse: arranca el hero. */
  onReveal: () => void;
  /** Se llama cuando el intro termina del todo: se desmonta. */
  onDone: () => void;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const preloadImage = (src: string) =>
  new Promise<void>((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });

/**
 * Intro de marca: cubre la carga inicial (espera a fuentes + imagen del hero),
 * deja que todo se asiente y al retirarse dispara las animaciones del hero para
 * que corran smooth, sin competir con la carga.
 */
export function Intro({ onReveal, onDone }: IntroProps) {
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      cancelled = true; // que sólo dispare una vez
      onReveal();
      setLeaving(true);
    };
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    Promise.all([
      fontsReady,
      preloadImage('/assets/bottle-crianza.webp'),
      wait(reduced ? 350 : 1150),
    ]).then(reveal);
    // Salvaguarda: la cortina se retira pase lo que pase
    const safety = setTimeout(reveal, reduced ? 1200 : 4000);
    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [reduced, onReveal]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: reduced ? 0.3 : 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) onDone();
      }}
      role="status"
      aria-label="Casa Balseca — cargando"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,#fbf5ea_0%,#f4ecdb_60%,#ecdfc9_100%)]" />

      <motion.div
        className="relative flex flex-col items-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={leaving ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: powerEase }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: powerEase }}
        >
          <Monogram className="h-16 w-auto md:h-20" color="var(--gold)" title="Casa Balseca" />
        </motion.div>

        <motion.span
          className="mt-6 font-display text-sm font-medium uppercase tracking-[0.34em] text-ink md:text-base"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: powerEase }}
        >
          Casa&nbsp;Balseca
        </motion.span>

        {/* Filete dorado que se dibuja */}
        <motion.span
          className="mt-5 block h-px w-28 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: powerEase }}
        />
      </motion.div>
    </motion.div>
  );
}
