import { useEffect, useState } from 'react';

/**
 * Devuelve true si el usuario pidió reducir el movimiento.
 * Se usa para desactivar parallax/animaciones y mostrar estados finales.
 */
const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion(): boolean {
  // Lazy init síncrono: el valor es correcto ya en el primer render, así
  // evitamos un "flash" de estado inicial (opacity:0) que quedaría congelado.
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
