/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Astro's Vite config so `astro/zod` and other project imports resolve like in the app.
export default getViteConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
  },
});
