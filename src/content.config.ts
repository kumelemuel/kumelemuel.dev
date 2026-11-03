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
  // Articles go in ./src/data/articles/<lang>/<slug>.md (see src/utils/articles.ts).
  loader: glob({ pattern: "**/*.md", base: "./src/data/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).min(1),
    url: z.string().optional(),
  }),
});

export const collections = { portfolio, articles };
