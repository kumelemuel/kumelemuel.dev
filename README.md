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

| Comando                 | Acción                                                            |
| :---------------------- | :---------------------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo                                            |
| `npm run check`         | Chequeo de tipos (`astro check`)                                  |
| `npm run build`         | Build de producción en `.vercel/output`                           |
| `npm run lint`          | ESLint                                                            |
| `npm run format`        | Formatea con Prettier (`format:check` solo verifica)              |
| `npm test`              | Pruebas unitarias (Vitest)                                        |
| `npm run test:e2e`      | Pruebas de extremo a extremo (Playwright + axe); requiere `build` |
| `npx @lhci/cli autorun` | Presupuestos de Lighthouse sobre el build                         |

> El adaptador de Vercel no soporta `astro preview`. Para ver el build con las cabeceras de Vercel (CSP incluida):
> `node tests/support/serve-static.mjs 4600` (solo páginas estáticas; el formulario necesita `npm run dev`).

## Calidad

- **Unitarias** (`tests/unit/`): reglas del formulario en `src/lib/contact.ts` (validación, mensajes por idioma,
  antispam, escape de HTML, asunto sin saltos de línea).
- **Extremo a extremo** (`tests/e2e/`):
  - `pages.spec.ts` contra el build real con sus cabeceras: cada página en ambos idiomas sin violaciones de CSP ni
    errores de JS, un solo `<h1>`, metadatos, **axe (WCAG 2.2 AA)**, enlace de salto, menú móvil, redirecciones,
    RSS y sitemap.
  - `contact.spec.ts` contra `astro dev`: formulario con y sin JavaScript. El éxito se prueba por la vía del campo
    trampa, que nunca llama a Resend.
- **Lighthouse** (`lighthouserc.cjs`): rendimiento ≥ 90, accesibilidad = 100, buenas prácticas ≥ 95, SEO ≥ 90, CLS ≤ 0.1.
  No es dependencia del proyecto a propósito (arrastra paquetes con avisos de seguridad); se ejecuta con `npx`.
  Los reportes quedan en `.lighthouseci/` (no se suben a almacenamiento público).
- **Dependabot** (`.github/dependabot.yml`): actualizaciones semanales agrupadas. Los `overrides` de `package.json`
  (path-to-regexp, glob, minimatch) parchean dependencias transitivas; quítalos cuando las versiones upstream los incluyan.

## Estructura

```text
src/
├── actions/            # Astro Action del formulario de contacto (Resend + antispam)
├── assets/home/        # Imágenes optimizadas en build (astro:assets)
├── components/         # Header, Footer, SeoMeta (meta, OG, hreflang, JSON-LD), Icon, ContactForm
├── data/
│   ├── articles/es/    # Artículos en español  (<slug>.md; el nombre es el slug de la URL)
│   ├── articles/en/    # Artículos en inglés   (traducciones enlazadas por `translationKey`)
│   └── portfolio/      # Proyectos (página desactivada: src/pages/[lang]/_portfolio.astro)
├── i18n/               # Idiomas, slugs traducidos de cada página (routes.ts) y textos (ui.ts)
├── icons/              # SVG de Phosphor Icons (peso light, MIT) incrustados por <Icon name="…" />
├── layouts/            # Layout base
├── lib/                # Lógica pura con pruebas unitarias (formulario, índice de artículos)
├── pages/
│   ├── [lang]/         # Páginas con la misma ruta en ambos idiomas: home y rss.xml
│   ├── es/             # Páginas con slug en español (/es/quien-soy/, /es/articulos/…)
│   └── en/             # Páginas con slug en inglés  (/en/who-am-i/, /en/articles/…)
├── site.ts             # Identidad del sitio: autor y redes
├── styles/             # Paleta, tipografía, estilos globales (.button, .icon) y tema Prism
├── utils/              # Utilidades (artículos por idioma desde astro:content)
└── views/              # Contenido de cada página, compartido por sus versiones es/ y en/
public/
├── favicon.svg|.ico, apple-touch-icon.png
└── og-image.png        # Imagen para redes sociales (1200×630)
```

## Contenido

### Artículos

Crea `src/data/articles/<lang>/<slug>.md`. El nombre del archivo es el slug de la URL, así que cada idioma
puede tener el suyo (`/es/articulos/gobernanza-digital/`, `/en/articles/digital-governance/`):

```md
---
title: "Título"
translationKey: digital-governance # mismo valor en todas las traducciones del artículo
description: "Resumen para la tarjeta y SEO."
publishedAt: "2026-11-02"
tags: [arquitectura, gobernanza]
---

Contenido en Markdown…
```

Los artículos con el mismo `translationKey` se enlazan como traducciones (hreflang y selector de idioma). Si se
omite, se usa el nombre del archivo como clave. Un artículo sin traducción funciona igual: el selector de idioma
lleva a la portada del otro idioma.

### Rutas y slugs traducidos

`src/i18n/routes.ts` define el slug de cada página por idioma y es la única fuente de URLs (menú, selector de
idioma, hreflang, sitemap, RSS y pruebas); usa `localePath(lang, "contact")` en vez de escribir rutas a mano.
Para agregar una página traducida:

1. Agrega la clave en `ROUTES` (`{ es: "…", en: "…" }`).
2. Crea su vista en `src/views/` y un archivo por idioma en `src/pages/es/` y `src/pages/en/` que la renderice.
3. `tests/unit/routes.test.ts` falla si alguna ruta de `ROUTES` no tiene su archivo de página.

Las URLs antiguas en español (que usaban los slugs en inglés, p. ej. `/es/who-am-i/`) redirigen con 301 a las nuevas.

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

`<Icon name="github-logo" />` incrusta `src/icons/github-logo.svg` en el HTML (sin JS ni peticiones extra; toma el color del texto y el tamaño de `font-size`). Para un ícono nuevo, copia el SVG del peso _light_ desde [Phosphor Icons](https://phosphoricons.com) (o `@phosphor-icons/core`, `assets/light/`) a `src/icons/<nombre>.svg`, sin el sufijo `-light` y quitando `fill="currentColor"` del `<svg>` (lo añade el componente).

## Formulario de contacto

`src/actions/index.ts` valida en servidor y envía el mensaje con [Resend](https://resend.com).
Funciona con y sin JavaScript: con JS envía por `fetch` sin recargar; sin JS hace un POST normal a
`/es/contacto/enviado/` o `/en/contact/sent/` (únicas páginas renderizadas bajo demanda), que muestran el
resultado o los errores.

Antispam: campo trampa (honeypot) + tiempo mínimo de llenado (este último solo cuando hay JS, que es quien
marca la hora de inicio); los bots reciben "éxito" sin envío.

Variables de entorno (ver `.env.example`):

| Variable             | Descripción                                                                |
| :------------------- | :------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | API key de Resend                                                          |
| `CONTACT_TO_EMAIL`   | Correo que recibe los mensajes                                             |
| `CONTACT_FROM_EMAIL` | Remitente (por defecto `onboarding@resend.dev` hasta verificar el dominio) |

## Ramas

| Rama   | Uso                                                           | Protección (`.github/rulesets/`)                                                                 |
| :----- | :------------------------------------------------------------ | :----------------------------------------------------------------------------------------------- |
| `main` | Producción: cada push despliega `kumelemuel.dev`              | Solo por PR desde `dev` (merge commit), CI `check-and-build` en verde, sin force push ni borrado |
| `dev`  | Integración: trabajo diario y destino de Dependabot (preview) | Sin force push ni borrado                                                                        |

Publicar: abre un PR `dev` → `main` y, con CI en verde, fusiónalo con **Create a merge commit**
(no squash ni rebase, para que `main` siga siendo ancestro de `dev`).

Las reglas se importan en GitHub → Settings → Rules → Rulesets → New ruleset → **Import a ruleset**.

## Despliegue (Vercel)

1. Importa el repositorio en Vercel (framework: Astro, se detecta solo). Production Branch: `main`.
2. Configura las variables de entorno anteriores.
3. Activa **Analytics** en el panel del proyecto (Web Analytics, sin cookies).
4. Asigna el dominio `kumelemuel.dev`.

Seguridad: CSP generada por Astro con hashes (solo en build) + cabeceras en `vercel.json` (HSTS, nosniff, frame, referrer, permissions).
CI: `.github/workflows/ci.yml` corre lint, formato, tipos, unitarias, build, auditoría (falla con altas/críticas),
Playwright + axe y Lighthouse en cada push/PR.
