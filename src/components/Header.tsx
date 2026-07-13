import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './ui/Logo';
import { BerberPattern } from './ui/BerberPattern';
import { scrollToId } from '../lib/useLenis';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

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
  const reduced = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

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

  // Gestión de foco del diálogo: al abrir, foco al primer link;
  // al cerrar, el foco vuelve al botón hamburguesa
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
      });
    } else if (wasOpen.current) {
      wasOpen.current = false;
      burgerRef.current?.focus();
    }
  }, [open]);

  // Escape cierra el menú; Tab queda atrapado dentro del diálogo
  // (los focusables son el botón de cierre + los links del menú)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const menu = menuRef.current;
      const burger = burgerRef.current;
      if (!menu || !burger) return;
      const items = [burger, ...Array.from(menu.querySelectorAll<HTMLElement>('a[href]'))];
      const activeEl = document.activeElement as HTMLElement | null;
      const idx = activeEl ? items.indexOf(activeEl) : -1;
      if (idx === -1) {
        e.preventDefault();
        items[0].focus();
      } else if (e.shiftKey && idx === 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && idx === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? 'border-b border-transparent bg-transparent'
            : scrolled
              ? 'border-b border-ink/10 bg-ivory/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ivory/65'
              : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between md:h-[76px]">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => onNavClick(e, '#inicio')}
            className="cursor-pointer text-ink"
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
            ref={burgerRef}
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
      </header>

      {/* Menú móvil — fuera del <header> para que `fixed` no quede atrapado
          en el containing block que crea su backdrop-filter */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col overflow-hidden bg-paper lg:hidden"
          >
            {/* Atmósfera: gradiente cálido + patrón bereber sutil */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-5%,#fcf7ee_0%,#f7f0e2_52%,#eee0c7_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_92%,rgba(166,68,46,0.09),transparent_65%)]" />
            <BerberPattern className="absolute inset-0" opacity={0.045} tile={52} />

            <nav
              aria-label="Menú principal"
              className="relative flex flex-1 flex-col justify-center px-8 pt-[68px]"
            >
              {NAV.map((item, i) => {
                const isActive = active === item.href.slice(1);
                return (
                  <div key={item.href} className="overflow-hidden border-b border-ink/10">
                    <motion.a
                      href={item.href}
                      onClick={(e) => onNavClick(e, item.href)}
                      aria-current={isActive ? 'true' : undefined}
                      initial={reduced ? false : { y: '108%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '108%', transition: { duration: 0.22, ease: 'easeIn' } }}
                      transition={{
                        delay: 0.08 + i * 0.06,
                        duration: 0.55,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="flex items-center gap-5 py-6 transition-opacity active:opacity-60"
                    >
                      <span className="font-display text-xs tracking-[0.3em] text-gold">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-[2.1rem] font-light leading-none tracking-[-0.01em] ${
                          isActive ? 'text-terra' : 'text-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-terra" />
                      )}
                    </motion.a>
                  </div>
                );
              })}
            </nav>

            {/* Pie del menú */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.34, duration: 0.5, ease: 'easeOut' }}
              className="relative px-8 pb-[calc(2.25rem+env(safe-area-inset-bottom))]"
            >
              <div className="hairline mb-6" />
              <p className="eyebrow !text-[0.625rem]">Seleccionado y distribuido por</p>
              <p className="mt-1.5 font-display text-xl leading-none text-ink">
                MOG Selections
              </p>
              <p className="eyebrow !text-[0.625rem] mt-4 text-muted/80">
                Ribera del Duero · Vino Tinto · Producto de España
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
