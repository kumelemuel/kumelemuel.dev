import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/portfolio" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
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
