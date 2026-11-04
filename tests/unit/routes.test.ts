import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SUPPORTED_LANGS } from "../../src/i18n/config";
import {
  ROUTES,
  articlePath,
  legacyRedirects,
  localePath,
  routeAlternates,
  type RouteKey,
} from "../../src/i18n/routes";
import { indexArticles, parseArticleId } from "../../src/lib/articles";

describe("localePath", () => {
  it("builds translated paths with a trailing slash", () => {
    expect(localePath("es", "who")).toBe("/es/quien-soy/");
    expect(localePath("en", "who")).toBe("/en/who-am-i/");
    expect(localePath("es", "contactSent")).toBe("/es/contacto/enviado/");
    expect(localePath("en", "contactSent")).toBe("/en/contact/sent/");
  });

  it("maps home to the language root", () => {
    expect(localePath("es", "home")).toBe("/es/");
    expect(localePath("en", "home")).toBe("/en/");
  });

  it("builds article paths under the translated section", () => {
    expect(articlePath("es", "gobernanza-digital")).toBe("/es/articulos/gobernanza-digital/");
    expect(articlePath("en", "digital-governance")).toBe("/en/articles/digital-governance/");
  });
});

describe("routeAlternates", () => {
  it("returns the page in every supported language", () => {
    expect(routeAlternates("privacy")).toEqual({ es: "/es/privacidad/", en: "/en/privacy/" });
  });
});

describe("legacyRedirects", () => {
  it("sends the old Spanish URLs (English slugs) to the translated ones", () => {
    expect(legacyRedirects()).toEqual({
      "/es/who-am-i/": "/es/quien-soy/",
      "/es/articles/": "/es/articulos/",
      "/es/contact/": "/es/contacto/",
      "/es/privacy/": "/es/privacidad/",
    });
  });
});

describe("every route has a page file in every language", () => {
  // home lives in src/pages/[lang]/index.astro; the rest have one file per language.
  const keys = (Object.keys(ROUTES) as RouteKey[]).filter((key) => key !== "home");

  for (const key of keys) {
    for (const lang of SUPPORTED_LANGS) {
      const base = `src/pages/${lang}/${ROUTES[key][lang]}`;
      it(`${key} (${lang}) → ${base}`, () => {
        expect(existsSync(`${base}.astro`) || existsSync(`${base}/index.astro`)).toBe(true);
      });
    }
  }
});

describe("parseArticleId", () => {
  it("splits language folder and slug", () => {
    expect(parseArticleId("es/gobernanza-digital")).toEqual({ lang: "es", slug: "gobernanza-digital" });
    expect(parseArticleId("en/digital-governance.md")).toEqual({ lang: "en", slug: "digital-governance" });
  });

  it("rejects files outside a language folder", () => {
    expect(parseArticleId("loose-article")).toBeNull();
    expect(parseArticleId("fr/article")).toBeNull();
  });
});

describe("indexArticles", () => {
  const article = (id: string, translationKey?: string) => ({ id, data: { translationKey } });

  it("pairs translations with different slugs through translationKey", () => {
    const [es, en] = indexArticles([
      article("es/gobernanza-digital", "digital-governance"),
      article("en/digital-governance", "digital-governance"),
    ]);
    const expected = {
      es: "/es/articulos/gobernanza-digital/",
      en: "/en/articles/digital-governance/",
    };
    expect(es.alternates).toEqual(expected);
    expect(en.alternates).toEqual(expected);
  });

  it("falls back to the slug as key when translationKey is missing", () => {
    const [es] = indexArticles([article("es/astro"), article("en/astro")]);
    expect(es.key).toBe("astro");
    expect(es.alternates).toEqual({ es: "/es/articulos/astro/", en: "/en/articles/astro/" });
  });

  it("keeps an untranslated article with only its own language", () => {
    const [only] = indexArticles([article("es/solo-en-espanol")]);
    expect(only.alternates).toEqual({ es: "/es/articulos/solo-en-espanol/" });
  });

  it("fails on two articles of the same language with the same key", () => {
    expect(() => indexArticles([article("es/uno", "x"), article("es/dos", "x")])).toThrow(
      /translationKey "x"/,
    );
  });
});
