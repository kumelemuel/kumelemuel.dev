import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
  // Projects go in ./src/data/portfolio/<lang>/<slug>.md, paired like articles (src/lib/localized.ts).
  // The Markdown body is the case study; screenshots live in src/assets/portfolio/.
  loader: glob({ pattern: "**/*.md", base: "./src/data/portfolio" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        translationKey: z.string().optional(),
        /** One or two sentences: card text and meta description. */
        summary: z.string(),
        /** featured = live projects (top block); lab = personal / GitHub projects. */
        kind: z.enum(["featured", "lab"]),
        status: z.enum(["live", "pwa", "open-source", "archived"]),
        role: z.string().optional(),
        year: z.number().int(),
        stack: z.array(z.string()).min(1),
        links: z
          .object({
            site: z.url().optional(),
            repo: z.url().optional(),
          })
          .default({}),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        /** Manual order inside each block (lower first). */
        order: z.number().default(0),
      })
      .refine((project) => project.kind !== "featured" || project.cover, {
        message: "featured projects need a cover image",
        path: ["cover"],
      })
      .refine((project) => !project.cover || project.coverAlt, {
        message: "coverAlt is required when there is a cover image",
        path: ["coverAlt"],
      }),
});

const articles = defineCollection({
  // Articles go in ./src/data/articles/<lang>/<slug>.md (see src/lib/articles.ts).
  loader: glob({ pattern: "**/*.md", base: "./src/data/articles" }),
  schema: z.object({
    title: z.string(),
    // Same value in every translation of an article (pairs them for the language switcher
    // and hreflang). Optional: defaults to the file name.
    translationKey: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1),
  }),
});

export const collections = { portfolio, articles };
