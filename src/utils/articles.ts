import { getCollection, type CollectionEntry } from "astro:content";
import { isLang, type Lang } from "../i18n/config";

/**
 * Articles live in `src/data/articles/<lang>/<slug>.md`.
 * The same file name in both language folders marks them as translations.
 */
export type Article = CollectionEntry<"articles">;

const parseId = (id: string): { lang: Lang; slug: string } | null => {
  const [maybeLang, ...rest] = id.replace(/\.md$/, "").split("/");
  if (!isLang(maybeLang) || rest.length === 0) return null;
  return { lang: maybeLang, slug: rest.join("/") };
};

export const getArticleSlug = (article: Article) => parseId(article.id)?.slug ?? article.id;

export async function getLocalizedArticles() {
  const articles = await getCollection("articles");
  return articles.flatMap((article) => {
    const parsed = parseId(article.id);
    if (!parsed) {
      console.warn(`[articles] "${article.id}" is not inside a language folder (es/ or en/); skipping.`);
      return [];
    }
    return [{ article, ...parsed }];
  });
}

export async function getArticlesByLang(lang: Lang) {
  return (await getLocalizedArticles())
    .filter((entry) => entry.lang === lang)
    .map((entry) => entry.article)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
