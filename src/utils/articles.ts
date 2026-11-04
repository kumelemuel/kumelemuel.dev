import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/config";
import { indexArticles } from "../lib/articles";

/** See src/lib/articles.ts for the folder layout and how translations are paired. */
export type Article = CollectionEntry<"articles">;

export async function getLocalizedArticles() {
  return indexArticles(await getCollection("articles"));
}

/** Articles of one language, newest first, with their slug. */
export async function getArticlesByLang(lang: Lang) {
  return (await getLocalizedArticles())
    .filter((entry) => entry.lang === lang)
    .sort((a, b) => b.article.data.publishedAt.getTime() - a.article.data.publishedAt.getTime());
}

/** getStaticPaths of the article page of one language (/es/articulos/<slug>/, /en/articles/<slug>/). */
export async function getArticleStaticPaths(lang: Lang) {
  return (await getLocalizedArticles())
    .filter((entry) => entry.lang === lang)
    .map(({ article, slug, alternates }) => ({ params: { slug }, props: { article, alternates } }));
}
