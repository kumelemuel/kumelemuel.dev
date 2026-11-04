import { SUPPORTED_LANGS, type Lang } from "./config";

/**
 * URL segment of every page in each language: the single source of truth for links,
 * the language switcher, hreflang, the sitemap and the tests.
 *
 * Pages whose segment is translated have one thin file per language that renders a shared
 * view from src/views/ (e.g. src/pages/es/quien-soy.astro and src/pages/en/who-am-i.astro).
 * Pages with the same path in every language (home, RSS) live in src/pages/[lang]/.
 * tests/unit/routes.test.ts fails if a segment here has no matching page file.
 */
export const ROUTES = {
  home: { es: "", en: "" },
  who: { es: "quien-soy", en: "who-am-i" },
  articles: { es: "articulos", en: "articles" },
  contact: { es: "contacto", en: "contact" },
  contactSent: { es: "contacto/enviado", en: "contact/sent" },
  privacy: { es: "privacidad", en: "privacy" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof ROUTES;

/** Path of the same page in each language it exists in (missing language = no translation). */
export type Alternates = Partial<Record<Lang, string>>;

const toPath = (...segments: string[]) => `/${segments.filter(Boolean).join("/")}/`;

/** `/es/quien-soy/`, `/en/who-am-i/`, `/es/` … (always with trailing slash). */
export const localePath = (lang: Lang, key: RouteKey) => toPath(lang, ROUTES[key][lang]);

export const articlePath = (lang: Lang, slug: string) => toPath(lang, ROUTES.articles[lang], slug);

export const routeAlternates = (key: RouteKey): Alternates =>
  Object.fromEntries(SUPPORTED_LANGS.map((lang) => [lang, localePath(lang, key)]));

/**
 * Old Spanish URLs (before the slugs were translated they were the English ones)
 * → new Spanish URL, for permanent redirects.
 */
export const legacyRedirects = (): Record<string, string> =>
  Object.fromEntries(
    (["who", "articles", "contact", "privacy"] as const).map((key) => [
      toPath("es", ROUTES[key].en),
      localePath("es", key),
    ]),
  );
