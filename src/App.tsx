import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
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
  // Lenis sólo si el usuario no pidió reducir el movimiento
  useLenis(!reduced);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#los-vinos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
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
