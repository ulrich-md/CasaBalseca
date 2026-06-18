import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Wines } from './components/Wines';
import { TheHouse } from './components/TheHouse';
import { Process } from './components/Process';
import { Figures } from './components/Figures';
import { WhereToBuy } from './components/WhereToBuy';
import { Footer } from './components/Footer';
import { useLenis } from './lib/useLenis';
import { usePrefersReducedMotion } from './lib/usePrefersReducedMotion';

export default function App() {
  const reduced = usePrefersReducedMotion();
  // `ready` arranca las animaciones del hero; `introDone` desmonta el intro.
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // Lenis sólo tras el intro y si no se pidió reducir el movimiento
  useLenis(introDone && !reduced);

  // Bloquea el scroll mientras el intro está en pantalla
  useEffect(() => {
    if (introDone) return;
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDone]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#los-vinos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Saltar al contenido
      </a>

      {!introDone && (
        <Intro onReveal={() => setReady(true)} onDone={() => setIntroDone(true)} />
      )}

      <Header />
      <main>
        <Hero ready={ready} />
        <Wines />
        <TheHouse />
        <Process />
        <Figures />
        <WhereToBuy />
      </main>
      <Footer />
    </MotionConfig>
  );
}
