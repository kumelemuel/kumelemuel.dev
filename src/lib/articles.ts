import { articlePath } from "../i18n/routes";
import { indexLocalized, parseLocalizedId, type IndexedEntry, type LocalizedLike } from "./localized";

/**
 * Articles live in `src/data/articles/<lang>/<slug>.md`; translations are paired through
 * `translationKey` (see src/lib/localized.ts).
 */
export type ArticleLike = LocalizedLike;

export interface IndexedArticle<T extends ArticleLike> extends Omit<IndexedEntry<T>, "entry"> {
  article: T;
}

export const parseArticleId = parseLocalizedId;

export function indexArticles<T extends ArticleLike>(articles: readonly T[]): IndexedArticle<T>[] {
  return indexLocalized(articles, articlePath, "articles").map(({ entry, ...rest }) => ({
    article: entry,
    ...rest,
  }));
}
