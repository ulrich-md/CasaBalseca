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
        ivory: '#F2E9D8',
        paper: '#F7F0E2',
        'ivory-2': '#ECDFC9',
        burgundy: '#5A1A22',
        'burgundy-deep': '#3E1117',
        terra: '#A6442E',
        gold: '#B0852E',
        ink: '#2A211C',
        muted: '#6E6053',
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
        'sheen-sweep': {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)', opacity: '0' },
          '15%': { opacity: '0.55' },
          '60%': { opacity: '0.25' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)', opacity: '0' },
        },
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
        sheen: 'sheen-sweep 6.5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
