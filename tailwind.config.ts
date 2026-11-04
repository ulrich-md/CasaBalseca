import type { Config } from 'tailwindcss';

/**
 * Tokens de marca CASA BALSECA.
 * Base CLARA dominante (marfil/papel), burdeos para secciones oscuras,
 * dorado y terracota SOLO como acentos.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Marfil atenuado: luz de galería, sin casi-blancos que deslumbren
        ivory: '#EDE3D1',
        paper: '#F2EADB',
        'ivory-2': '#E7D9C2',
        // Penumbra cálida para escenas oscuras (hero, intro)
        night: '#160B0A',
        burgundy: '#5A1A22',
        'burgundy-deep': '#3E1117',
        terra: '#A6442E',
        gold: '#B0852E',
        // Dorado para TEXTO: sobre claro (≥5:1) y sobre oscuro (≥5.4:1)
        'gold-ink': '#7A5418',
        'gold-light': '#CAA24C',
        ink: '#2A211C',
        muted: '#655749',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['"Mr Dafoe"', 'cursive'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
        wide2: '0.18em',
      },
      maxWidth: {
        shell: '1320px',
      },
      transitionTimingFunction: {
        // power3.out aproximado para CSS
        power3: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        power4: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '70%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
