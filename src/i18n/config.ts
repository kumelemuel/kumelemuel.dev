export const SUPPORTED_LANGS = ["es", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

export function isLang(value: string | undefined): value is Lang {
  return !!value && SUPPORTED_LANGS.includes(value as Lang);
}

/** BCP 47 locale used for Intl formatting (dates, numbers) in each language. */
export const INTL_LOCALES: Record<Lang, string> = {
  es: "es-MX",
  en: "en-US",
};
