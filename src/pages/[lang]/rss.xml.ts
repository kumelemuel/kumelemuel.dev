import type { APIRoute, GetStaticPaths } from "astro";
import { SUPPORTED_LANGS, type Lang } from "../../i18n/config";
import { articlePath, localePath } from "../../i18n/routes";
import { t } from "../../i18n/ui";
import { SITE } from "../../site";
import { getArticlesByLang } from "../../utils/articles";

// RSS 2.0 feed per language: /es/rss.xml and /en/rss.xml.
export const getStaticPaths = (() =>
  SUPPORTED_LANGS.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const RSS_LANGUAGE: Record<Lang, string> = { es: "es-mx", en: "en-us" };

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const messages = t(lang);
  const articles = await getArticlesByLang(lang);
  const abs = (path: string) => new URL(path, site).href;

  const items = articles
    .map(({ article, slug }) => {
      const link = abs(articlePath(lang, slug));
      const categories = article.data.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");
      return [
        "    <item>",
        `      <title>${escapeXml(article.data.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${article.data.publishedAt.toUTCString()}</pubDate>`,
        `      <description>${escapeXml(article.data.description)}</description>`,
        `      <dc:creator>${escapeXml(SITE.author.name)}</dc:creator>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuildDate = (articles[0]?.article.data.publishedAt ?? new Date()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(messages.rss.title)}</title>
    <link>${abs(localePath(lang, "articles"))}</link>
    <description>${escapeXml(messages.rss.description)}</description>
    <language>${RSS_LANGUAGE[lang]}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${abs(`/${lang}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
