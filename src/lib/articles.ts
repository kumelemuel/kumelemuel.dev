import { isLang, type Lang } from "../i18n/config";
import { articlePath, type Alternates } from "../i18n/routes";

/**
 * Pure article indexing (no astro:content here, so it can be unit tested).
 *
 * Articles live in `src/data/articles/<lang>/<slug>.md`; the file name is the URL slug,
 * so each language can have its own. Translations of the same article share a
 * `translationKey` in the frontmatter (if omitted, the slug is used as the key).
 */
export interface ArticleLike {
  id: string;
  data: { translationKey?: string };
}

export interface IndexedArticle<T extends ArticleLike> {
  article: T;
  lang: Lang;
  slug: string;
  key: string;
  /** URL of this article in every language it has been translated to (itself included). */
  alternates: Alternates;
}

export const parseArticleId = (id: string): { lang: Lang; slug: string } | null => {
  const [maybeLang, ...rest] = id.replace(/\.md$/, "").split("/");
  if (!isLang(maybeLang) || rest.length === 0) return null;
  return { lang: maybeLang, slug: rest.join("/") };
};

export function indexArticles<T extends ArticleLike>(articles: readonly T[]): IndexedArticle<T>[] {
  const entries = articles.flatMap((article) => {
    const parsed = parseArticleId(article.id);
    if (!parsed) {
      console.warn(`[articles] "${article.id}" is not inside a language folder (es/ or en/); skipping.`);
      return [];
    }
    return [{ article, ...parsed, key: article.data.translationKey ?? parsed.slug }];
  });

  // Two articles of the same language with one key would make the language switcher ambiguous.
  const seen = new Set<string>();
  for (const { lang, key, article } of entries) {
    const id = `${lang}:${key}`;
    if (seen.has(id)) {
      throw new Error(
        `[articles] more than one "${lang}" article uses translationKey "${key}" (${article.id}).`,
      );
    }
    seen.add(id);
  }

  return entries.map((entry) => ({
    ...entry,
    alternates: Object.fromEntries(
      entries
        .filter((other) => other.key === entry.key)
        .map((other) => [other.lang, articlePath(other.lang, other.slug)]),
    ),
  }));
}
