# Casa Balseca — Landing page

Sitio de una sola página para **CASA BALSECA**, vino tinto premium de Ribera del
Duero. _Lo selecto se vive._

Hero limpio y aireado (estilo AMORE) sobre un cuerpo cálido y editorial (estilo
Nocturne): paleta terrosa, tipografía de alto contraste, mucho aire, movimiento
fluido y scroll suave **sin secuestrar el avance**.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (tokens de marca en `tailwind.config.ts` y variables en `src/index.css`)
- **Framer Motion** — reveals al viewport y micro-interacciones
- **GSAP ScrollTrigger** — parallax sutil del hero y línea de proceso que se "llena"
- **Lenis** — smooth scroll ligero (lerp bajo), nativo, sin scroll-jacking
- Fuentes (Google Fonts): **Fraunces** (display), **Inter** (UI), **Mr Dafoe** (script)

## Puesta en marcha

```bash
npm install      # instala dependencias
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # sirve el build de producción
```

Despliegue inmediato en **Vercel** o **Netlify** (build: `npm run build`,
carpeta de salida: `dist`).

## Estructura

```
src/
├── App.tsx                 # ensamblado + Lenis + MotionConfig (reduced-motion)
├── index.css               # tokens, base, componentes (botones, eyebrows, filetes)
├── data/wines.ts           # datos REALES de etiqueta (sin inventar nada)
├── lib/
│   ├── useLenis.ts             # smooth scroll + scrollToId
│   ├── usePrefersReducedMotion.ts
│   └── motion.ts               # variants de Framer Motion
└── components/
    ├── Header.tsx          # nav fija translúcida + menú móvil
    ├── Hero.tsx            # palabra fantasma, botella, derrame, CTAs
    ├── Wines.tsx          # tarjetas Crianza 2014 / Roble 2015
    ├── TheHouse.tsx       # "La casa" + collage editorial
    ├── Process.tsx        # 4 pasos sobre fondo burdeos (línea que se llena)
    ├── Figures.tsx        # cifras reales con count-up
    ├── WhereToBuy.tsx     # CTAs outbound (sin e-commerce)
    ├── Footer.tsx         # monograma, navegación, aviso de edad discreto
    └── ui/                # Monogram, Logo, Bottle, WineSplash, BerberPattern…
```

## Marca y contenido

- **Tagline:** "Lo selecto se vive".
- **Distribución:** seleccionado y distribuido por **MOG Selections**.
- **Vinos (datos de etiqueta, sin inventar):**
  - _Casa Balseca Crianza_ — Añada 2014 · Ribera del Duero · D.O. · Vino Tinto ·
    serie de **9210** botellas · 24 meses de crianza (≥12 en roble).
  - _Casa Balseca Roble_ — Añada 2015 · Ribera del Duero · D.O. · Vino Tinto ·
    serie de **17166** botellas.
- Las únicas cifras afirmadas son reales (2 ediciones, folios 9210 / 17166,
  24 meses). El número de botella concreto se deja como placeholder editable
  `Botella N.º ____`.

## Assets

> **Importante:** el entorno de build tenía el egress de red restringido, por lo
> que **no se pudieron descargar las imágenes originales** (CloudFront y bancos
> de imágenes bloqueados). El **logo, ambas botellas y el collage editorial se
> recrearon como SVG vectorial** fieles a la referencia de marca (cápsula dorada
> para Crianza, plateada para Roble; etiquetas crema/carbón; monograma
> geométrico bereber). El sitio queda autocontenido y sin imágenes rotas.

Para usar los archivos oficiales, coloca los PNG/JPG en `public/assets/` y busca
los comentarios `// REEMPLAZAR:` en `src/components/` (logo, botellas y fotos de
"La casa"). Detalles y URLs originales en [`public/assets/README.md`](public/assets/README.md).

## Accesibilidad y movimiento

- 100% responsive (mobile-first), HTML semántico, foco visible, skip-link.
- Contraste objetivo WCAG **AA**.
- **`prefers-reduced-motion`**: desactiva Lenis, parallax y animaciones, y
  muestra los estados finales. El movimiento también se reduce en móvil.
- Sin **age-gate / modal**: aviso de edad discreto en el footer.

## SEO

`<title>`, meta description, Open Graph y Twitter Card, favicon SVG, `alt`
descriptivos y marcado semántico (`header` / `main` / `section` / `footer`).
