// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { readdirSync } from "node:fs";
import { SUPPORTED_LANGS } from "./src/i18n/config.ts";
import { legacyRedirects, localePath } from "./src/i18n/routes.ts";

const isBuild = process.argv.includes("build");

// Keep the (empty) article listings out of the sitemap until the first article exists.
const hasArticles = readdirSync(new URL("./src/data/articles/", import.meta.url), { recursive: true }).some(
  (file) => String(file).endsWith(".md"),
);

// https://astro.build/config
export default defineConfig({
  site: "https://kumelemuel.dev",
  // Static by default; only the contact action runs as a Vercel Function.
  output: "static",
  // Every page lives at /path/ (matches canonical URLs and the sitemap; avoids duplicate URLs).
  trailingSlash: "always",
  adapter: vercel({
    // Vercel Web Analytics (free on Hobby, cookieless). Enable it in the Vercel dashboard too.
    webAnalytics: { enabled: true },
    // Emit the CSP as an HTTP header for static pages (instead of only a <meta> tag).
    staticHeaders: true,
  }),
  // Prism emits CSS classes; Shiki (the default) uses inline styles that the strict CSP blocks.
  markdown: {
    syntaxHighlight: "prism",
  },
  // Real HTTP redirect on Vercel (instead of a meta-refresh page).
  redirects: {
    "/": "/es/",
    // Spanish pages used the English slugs before they were translated (/es/who-am-i/ → /es/quien-soy/).
    ...Object.fromEntries(
      Object.entries(legacyRedirects()).map(([from, to]) => [from, { status: 301, destination: to }]),
    ),
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
      filter: (page) => {
        const path = new URL(page).pathname;
        const isUnder = (/** @type {"privacy" | "contactSent" | "articles"} */ key) =>
          SUPPORTED_LANGS.some((lang) => path.startsWith(localePath(lang, key)));
        // Privacy and the no-JS "message sent" page are noindex; articles only once there is one.
        return !isUnder("privacy") && !isUnder("contactSent") && (hasArticles || !isUnder("articles"));
      },
      // No `i18n` option: it pairs translations by identical paths after the language prefix,
      // which no longer holds with translated slugs. Every page declares its translations
      // with <link rel="alternate" hreflang> instead (src/components/SeoMeta.astro).
    }),
  ],
  // Fonts are downloaded at build time and self-hosted (no requests to Google from the browser).
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Gruppo",
      cssVariable: "--font-gruppo",
      // Gruppo is only published in weight 400.
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Scope One",
      cssVariable: "--font-scope-one",
      // Scope One is only published in weight 400.
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      CONTACT_TO_EMAIL: envField.string({ context: "server", access: "secret" }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        default: "Kumelemuel.dev <onboarding@resend.dev>",
      }),
    },
  },
});
