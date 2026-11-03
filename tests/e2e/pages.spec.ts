import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const PAGES = ["", "who-am-i/", "articles/", "contact/", "privacy/"] as const;
const LANGS = ["es", "en"] as const;

/**
 * Collects CSP violations and JS errors. Vercel Analytics only exists on Vercel,
 * so its script is stubbed instead of producing a 404.
 */
async function watchPage(page: Page) {
  const problems: string[] = [];
  await page.route("**/_vercel/insights/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: "" }),
  );
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      console.error(`CSP violation: ${event.violatedDirective} blocked ${event.blockedURI || "inline"}`);
    });
  });
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  return problems;
}

async function expectNoA11yViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const summary = violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(" ")).join("\n    ")}`,
  );
  expect(summary, "axe violations").toEqual([]);
}

for (const lang of LANGS) {
  for (const path of PAGES) {
    const url = `/${lang}/${path}`;

    test(`${url} renders cleanly: CSP, JS, structure, axe`, async ({ page }) => {
      const problems = await watchPage(page);
      const response = await page.goto(url, { waitUntil: "networkidle" });

      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Kumelemuel/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{20,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        /^https:\/\/kumelemuel\.dev\//,
      );

      // Scroll through so lazy images and scroll-triggered fades are evaluated too.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      await expectNoA11yViolations(page);
      expect(problems, "console errors / CSP violations").toEqual([]);
    });
  }
}

test("404 page: status, bilingual content, no CSP or a11y issues", async ({ page }) => {
  const problems = await watchPage(page);
  const response = await page.goto("/es/does-not-exist/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/es/");
  await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/en/");
  await expectNoA11yViolations(page);
  // The only expected console error is the document's own 404 status.
  expect(problems.filter((p) => !p.includes("status of 404"))).toEqual([]);
});

test("root redirects to /es/ and paths get a trailing slash", async ({ request }) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(301);
  expect(root.headers()["location"]).toBe("/es/");

  const noSlash = await request.get("/en/contact", { maxRedirects: 0 });
  expect(noSlash.status()).toBe(308);
  expect(noSlash.headers()["location"]).toBe("/en/contact/");
});

test("skip link is the first stop and moves focus to the main content", async ({ page }) => {
  await page.goto("/es/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  const nav = page.getByRole("navigation", { name: "Navegación principal" });

  await expect(nav).not.toBeInViewport();
  await toggle.click();
  await expect(page.locator("#menu-toggle")).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Contacto" })).toBeInViewport();

  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-toggle")).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#menu-toggle")).toBeFocused();
});

test("language switcher keeps the current page", async ({ page }) => {
  await page.goto("/es/who-am-i/");
  await page.getByRole("link", { name: "EN — Ver en inglés" }).click();
  await expect(page).toHaveURL(/\/en\/who-am-i\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("RSS feeds and sitemap are published", async ({ request }) => {
  for (const lang of LANGS) {
    const rss = await request.get(`/${lang}/rss.xml`);
    expect(rss.status()).toBe(200);
    const body = await rss.text();
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain(`<atom:link href="https://kumelemuel.dev/${lang}/rss.xml"`);
  }
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).toContain("<loc>https://kumelemuel.dev/es/</loc>");
  expect(sitemap).not.toContain("/privacy/");
});
