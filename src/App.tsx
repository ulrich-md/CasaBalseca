import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
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

// El intro de marca se muestra una sola vez por sesión
const INTRO_KEY = 'cb-intro-seen';
const introSeen = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
};

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [skipIntro] = useState(introSeen);
  // `ready` arranca las animaciones del hero; `introDone` desmonta el intro.
  const [ready, setReady] = useState(skipIntro);
  const [introDone, setIntroDone] = useState(skipIntro);

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
        <Intro
          onReveal={() => setReady(true)}
          onDone={() => {
            setIntroDone(true);
            try {
              sessionStorage.setItem(INTRO_KEY, '1');
            } catch {
              /* almacenamiento no disponible: el intro volverá a mostrarse */
            }
          }}
        />
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
      <Analytics />
    </MotionConfig>
  );
}
