import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './ui/Logo';
import { scrollToId } from '../lib/useLenis';

const NAV = [
  { label: 'Los vinos', href: '#los-vinos' },
  { label: 'La casa', href: '#la-casa' },
  { label: 'El proceso', href: '#el-proceso' },
  { label: 'Dónde comprar', href: '#donde-comprar' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ScrollSpy: marca la sección activa en la nav
  useEffect(() => {
    const ids = ['inicio', 'los-vinos', 'la-casa', 'el-proceso', 'donde-comprar'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Bloquea el scroll del fondo con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink/8 bg-ivory/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ivory/65'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between md:h-[76px]">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => onNavClick(e, '#inicio')}
          className="text-ink"
          aria-label="Casa Balseca — inicio"
        >
          <Logo />
        </a>

        {/* Nav centro (desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative cursor-pointer text-[0.82rem] font-medium uppercase tracking-[0.16em] transition-colors hover:text-ink ${
                  isActive ? 'text-ink' : 'text-ink/75'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-terra transition-all duration-500 ease-power3 group-hover:w-full ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Sello MOG (desktop) */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <span className="eyebrow !text-[0.625rem] text-muted/80">Distribuye</span>
          <span className="h-3 w-px bg-ink/20" />
          <span className="font-display text-sm tracking-wide text-ink">
            MOG Selections
          </span>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px bg-ink transition-all duration-300 ${
                open ? 'w-0 opacity-0' : 'w-6 opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-paper/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="border-b border-ink/10 py-5 font-display text-3xl font-light text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-2.5"
              >
                <span className="eyebrow">Seleccionado y distribuido por</span>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46 }}
                className="font-display text-xl text-ink"
              >
                MOG Selections
              </motion.span>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
