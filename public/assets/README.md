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

## URLs originales (caducaron / bloqueadas en build)

- Logo:     https://d2ol7oe51mr4n9.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/d411b161-c620-49a5-83db-511520323a6b.png
- Botella A: https://d2ol7oe51mr4n9.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/07a62a03-5d14-471a-939d-50a09f63de2b.png
- Botella B: https://d2ol7oe51mr4n9.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/6b214f13-4f03-48fb-a490-b935a1f10664.png
- Barricas: https://d2ol7oe51mr4n9.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/403069bd-f916-44ad-a038-ed03d84106f4.png
