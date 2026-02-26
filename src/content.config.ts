import { defineCollection, z } from "astro:content";
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
