// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  site: 'https://kumelemuel.dev',
  // Static by default; only the contact action runs as a Vercel Function.
  output: 'static',
  // Every page lives at /path/ (matches canonical URLs and the sitemap; avoids duplicate URLs).
  trailingSlash: 'always',
  adapter: vercel({
    // Vercel Web Analytics (free on Hobby, cookieless). Enable it in the Vercel dashboard too.
    webAnalytics: { enabled: true },
    // Emit the CSP as an HTTP header for static pages (instead of only a <meta> tag).
    staticHeaders: true,
  }),
  // Real HTTP redirect on Vercel (instead of a meta-refresh page).
  redirects: {
    '/': '/es/',
  },
  security: {
    // Astro hashes every script/style it emits; everything else must come from our own origin.
    // Build-only: in `astro dev`, Vite injects inline styles/scripts that a strict CSP would block.
    csp: isBuild && {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ],
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/privacy/'),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en' },
      },
    }),
  ],
  // Fonts are downloaded at build time and self-hosted (no requests to Google from the browser).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant',
      cssVariable: '--font-cormorant',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      CONTACT_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        default: 'Kumelemuel.dev <onboarding@resend.dev>',
      }),
    },
  },
});
