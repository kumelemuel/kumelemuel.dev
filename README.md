# kumelemuel.dev

Sitio personal de **Diego Arenas** — ingeniero y artesano de software.
Construido con [Astro](https://astro.build) y desplegado en [Vercel](https://vercel.com) (plan Hobby).

## Requisitos

- Node.js **24** (ver `.nvmrc`; Astro 7 requiere Node ≥ 22.23)
- npm

```sh
nvm use
npm install
cp .env.example .env   # y completa RESEND_API_KEY
npm run dev            # http://localhost:4321
```

## Scripts

| Comando           | Acción                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo                                  |
| `npm run check`   | Chequeo de tipos (`astro check`)                        |
| `npm run build`   | Build de producción en `.vercel/output` (y `dist/`)     |

> El adaptador de Vercel no soporta `astro preview`. Para probar el build, usa `vercel dev` o despliega un preview.

## Estructura

```text
src/
├── actions/            # Astro Action del formulario de contacto (Resend + antispam)
├── assets/home/        # Imágenes optimizadas en build (astro:assets)
├── components/         # Header, Footer, SeoMeta (meta, OG, hreflang, JSON-LD), Icon, ContactForm
├── data/
│   ├── articles/es/    # Artículos en español  (<slug>.md)
│   ├── articles/en/    # Artículos en inglés   (mismo <slug>.md = traducción)
│   └── portfolio/      # Proyectos (página desactivada: src/pages/[lang]/_portfolio.astro)
├── i18n/               # Idiomas soportados y textos de la interfaz (ui.ts)
├── icons/              # SVG de Font Awesome Free 5 incrustados por <Icon name="…" />
├── layouts/            # Layout base
├── pages/[lang]/       # Páginas por idioma (/es/..., /en/...) + rss.xml
├── site.ts             # Identidad del sitio: autor y redes
├── styles/             # Paleta, tipografía, estilos globales (.button, .icon) y tema Prism
└── utils/              # Utilidades (artículos por idioma)
public/
├── favicon.svg|.ico, apple-touch-icon.png
└── og-image.png        # Imagen para redes sociales (1200×630)
```

## Contenido

### Artículos

Crea `src/data/articles/<lang>/<slug>.md`:

```md
---
title: "Título"
description: "Resumen para la tarjeta y SEO."
publishedAt: "2026-11-02"
tags: [arquitectura, gobernanza]
---

Contenido en Markdown…
```

Si existe el mismo `<slug>.md` en `es/` y `en/`, las páginas se enlazan como traducciones (hreflang y selector de idioma).

### Textos de la interfaz

Todos los textos de páginas viven en `src/i18n/ui.ts` (español e inglés).

### Colores

La paleta está en `src/styles/colors.css`. El verde de marca `--color-brand` no tiene contraste suficiente
como texto sobre el fondo crema; para texto usa `--color-brand-text` (texto pequeño y enlaces) o
`--color-brand-display` (títulos grandes e íconos). Ambos cumplen WCAG AA.

### Portafolio

Desactivado (el prefijo `_` lo saca del build). Para activarlo: renombra `_portfolio.astro` a `portfolio.astro`,
usa imágenes locales (la CSP no permite imágenes externas) y agrega el enlace al menú en `Header.astro`.

### Íconos

`<Icon name="github" />` incrusta `src/icons/github.svg` en el HTML (sin JS ni peticiones extra; toma el color del texto y el tamaño de `font-size`). Para un ícono nuevo, copia su SVG desde Font Awesome Free 5 a `src/icons/` conservando el comentario de licencia.

## Formulario de contacto

`src/actions/index.ts` valida en servidor y envía el mensaje con [Resend](https://resend.com).
Funciona con y sin JavaScript: con JS envía por `fetch` sin recargar; sin JS hace un POST normal a
`/<lang>/contact/sent/` (única página renderizada bajo demanda), que muestra el resultado o los errores.

Antispam: campo trampa (honeypot) + tiempo mínimo de llenado (este último solo cuando hay JS, que es quien
marca la hora de inicio); los bots reciben "éxito" sin envío.

Variables de entorno (ver `.env.example`):

| Variable             | Descripción                                                     |
| :------------------- | :-------------------------------------------------------------- |
| `RESEND_API_KEY`     | API key de Resend                                               |
| `CONTACT_TO_EMAIL`   | Correo que recibe los mensajes                                  |
| `CONTACT_FROM_EMAIL` | Remitente (por defecto `onboarding@resend.dev` hasta verificar el dominio) |

## Despliegue (Vercel)

1. Importa el repositorio en Vercel (framework: Astro, se detecta solo).
2. Configura las variables de entorno anteriores.
3. Activa **Analytics** en el panel del proyecto (Web Analytics, sin cookies).
4. Asigna el dominio `kumelemuel.dev`.

Seguridad: CSP generada por Astro con hashes (solo en build) + cabeceras en `vercel.json` (HSTS, nosniff, frame, referrer, permissions).
CI: `.github/workflows/ci.yml` corre type check, build y auditoría en cada push/PR.
