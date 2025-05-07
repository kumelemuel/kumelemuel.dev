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

export const collections = { portfolio };
