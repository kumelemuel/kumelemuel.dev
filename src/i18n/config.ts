export const SUPPORTED_LANGS = ["es", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

export function isLang(value: string | undefined): value is Lang {
  return !!value && SUPPORTED_LANGS.includes(value as Lang);
}
