import { isLang, type Lang } from "../i18n/config";
import type { Alternates } from "../i18n/routes";

/**
 * Pure indexing of translated content entries (no astro:content here, so it can be unit tested).
 *
 * Entries live in `<collection folder>/<lang>/<slug>.md`; the file name is the URL slug, so
 * each language can have its own. Translations of the same entry share a `translationKey`
 * in the frontmatter (if omitted, the slug is used as the key).
 * Used by articles (src/lib/articles.ts) and portfolio projects (src/lib/portfolio.ts).
 */
export interface LocalizedLike {
  id: string;
  data: { translationKey?: string };
}

export interface IndexedEntry<T extends LocalizedLike> {
  entry: T;
  lang: Lang;
  slug: string;
  key: string;
  /** URL of this entry in every language it has been translated to (itself included). */
  alternates: Alternates;
}

export const parseLocalizedId = (id: string): { lang: Lang; slug: string } | null => {
  const [maybeLang, ...rest] = id.replace(/\.md$/, "").split("/");
  if (!isLang(maybeLang) || rest.length === 0) return null;
  return { lang: maybeLang, slug: rest.join("/") };
};

/**
 * @param pathFor URL of an entry from its language and slug.
 * @param label collection name used in warnings and errors (e.g. "articles").
 */
export function indexLocalized<T extends LocalizedLike>(
  entries: readonly T[],
  pathFor: (lang: Lang, slug: string) => string,
  label: string,
): IndexedEntry<T>[] {
  const parsedEntries = entries.flatMap((entry) => {
    const parsed = parseLocalizedId(entry.id);
    if (!parsed) {
      console.warn(`[${label}] "${entry.id}" is not inside a language folder (es/ or en/); skipping.`);
      return [];
    }
    return [{ entry, ...parsed, key: entry.data.translationKey ?? parsed.slug }];
  });

  // Two entries of the same language with one key would make the language switcher ambiguous.
  const seen = new Set<string>();
  for (const { lang, key, entry } of parsedEntries) {
    const id = `${lang}:${key}`;
    if (seen.has(id)) {
      throw new Error(`[${label}] more than one "${lang}" entry uses translationKey "${key}" (${entry.id}).`);
    }
    seen.add(id);
  }

  return parsedEntries.map((current) => ({
    ...current,
    alternates: Object.fromEntries(
      parsedEntries
        .filter((other) => other.key === current.key)
        .map((other) => [other.lang, pathFor(other.lang, other.slug)]),
    ),
  }));
}
