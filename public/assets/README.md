# Assets de marca — CASA BALSECA

> **Nota de producción:** el entorno de construcción tenía el egress de red
> restringido (CloudFront y bancos de imágenes bloqueados por allowlist), por lo
> que **no fue posible descargar los archivos originales**. En su lugar, el logo,
> ambas botellas y las imágenes editoriales se **recrearon como SVG vectorial**
> fieles a la referencia de marca (cápsula dorada para Crianza, plateada para
> Roble, etiquetas crema/carbón, monograma geométrico). Esto deja el sitio
> autocontenido y sin imágenes rotas.

## Cómo reemplazar por los archivos oficiales

1. Coloca aquí los PNG/JPG originales:
   - `logo.png`            — monograma + wordmark oficial
   - `bottle-crianza.png`  — Casa Balseca Crianza 2014 (cápsula dorada)
   - `bottle-roble.png`    — Casa Balseca Roble 2015 (cápsula plateada)
   - `vinedo.jpg`          — viñedo (La casa)
   - `barricas.jpg`        — barricas de roble (La casa)
   - `copa.jpg`            — copa de vino (La casa)
2. Busca los comentarios `// REEMPLAZAR:` en `src/components/` y cambia el
   componente SVG por una etiqueta `<img src="/assets/...">` cuando tengas el
   archivo real.

