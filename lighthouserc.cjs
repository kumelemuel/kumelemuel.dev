// Lighthouse CI: performance / accessibility / best practices / SEO budgets on the
// production build, served with Vercel's headers. Run after `npm run build`:
//   npx @lhci/cli@0.16.0 autorun
// Reports are written to .lighthouseci/ (never uploaded to public storage).
const PORT = 4620;
const pages = ["/es/", "/en/", "/es/quien-soy/", "/es/contacto/", "/es/articulos/"];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node tests/support/serve-static.mjs ${PORT}`,
      startServerReadyPattern: "static output",
      url: pages.map((page) => `http://localhost:${PORT}${page}`),
      numberOfRuns: 3,
      settings: {
        // Vercel Analytics only exists on Vercel; skip the request instead of logging a 404.
        blockedUrlPatterns: ["*/_vercel/insights/*"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 200 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
