import { expect, test, type Page } from "@playwright/test";
import { MIN_FILL_TIME_MS } from "../../src/lib/contact";

// Runs against `astro dev` (the contact action is on-demand). Success is only reached
// through the honeypot path, which returns a fake success without calling Resend.

const VALID = {
  name: "Diego Prueba",
  email: "diego@example.com",
  message: "Mensaje de prueba con más de veinticinco caracteres.",
};

async function fill(page: Page, values: Partial<typeof VALID>) {
  if (values.name !== undefined) await page.getByLabel("Tu nombre").fill(values.name);
  if (values.email !== undefined) await page.getByLabel("Correo electrónico").fill(values.email);
  if (values.message !== undefined) await page.getByLabel("Tu mensaje").fill(values.message);
}

const submit = (page: Page) => page.getByRole("button", { name: "Enviar mensaje" }).click();

test.describe("with JavaScript", () => {
  test("shows field errors inline, focuses the first one, and clears on input", async ({ page }) => {
    await page.goto("/es/contacto/", { waitUntil: "networkidle" });
    await fill(page, { name: "Al", email: "no-es-correo", message: "corto" });
    await submit(page);

    const name = page.getByLabel("Tu nombre");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toHaveAccessibleDescription("El nombre debe tener al menos 3 caracteres.");
    await expect(page.getByLabel("Correo electrónico")).toHaveAccessibleDescription(
      "Correo electrónico inválido.",
    );
    await expect(name).toBeFocused();
    await expect(page).toHaveURL(/\/es\/contacto\/$/); // no navigation

    await name.fill("Diego");
    await expect(name).not.toHaveAttribute("aria-invalid", "true");
    await expect(name).toHaveAccessibleDescription("");
  });

  test("a valid submission shows the confirmation and resets the form", async ({ page }) => {
    await page.goto("/es/contacto/", { waitUntil: "networkidle" });
    await fill(page, VALID);
    await page.locator('input[name="website"]').fill("honeypot", { force: true });
    await page.waitForTimeout(MIN_FILL_TIME_MS);
    await submit(page);

    await expect(page.getByRole("status")).toHaveText(/Mensaje enviado correctamente\./);
    await expect(page.getByLabel("Tu nombre")).toHaveValue("");
    await expect(page).toHaveURL(/\/es\/contacto\/$/);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("posts to /contacto/enviado/, keeps the typed values and shows the errors", async ({ page }) => {
    await page.goto("/es/contacto/");
    await fill(page, { name: "Di", email: "diego@", message: "Hola" });
    const [response] = await Promise.all([page.waitForResponse(/\/contacto\/enviado\//), submit(page)]);

    expect(response.status()).toBe(400);
    await expect(page).toHaveURL(/\/es\/contacto\/enviado\/\?_action=contact$/);
    await expect(page.getByLabel("Tu nombre")).toHaveValue("Di");
    await expect(page.getByLabel("Tu mensaje")).toHaveValue("Hola");
    await expect(page.getByLabel("Tu nombre")).toHaveAccessibleDescription(
      "El nombre debe tener al menos 3 caracteres.",
    );
    await expect(page.getByLabel("Tu mensaje")).toHaveAccessibleDescription(
      "El mensaje debe tener al menos 25 caracteres.",
    );
  });

  test("a valid submission shows the confirmation page", async ({ page }) => {
    await page.goto("/en/contact/");
    await page.getByLabel("Your name").fill(VALID.name);
    await page.getByLabel("Email address").fill(VALID.email);
    await page.getByLabel("Your message").fill(VALID.message);
    await page.locator('input[name="website"]').fill("honeypot", { force: true });
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText(/Message sent successfully\./);
    await expect(page.getByRole("main").getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en/");
  });

  test("visiting the sent page directly goes back to the form", async ({ page }) => {
    await page.goto("/es/contacto/enviado/");
    await expect(page).toHaveURL(/\/es\/contacto\/$/);
    await page.goto("/en/contact/sent/");
    await expect(page).toHaveURL(/\/en\/contact\/$/);
  });
});

test("there is no catch-all on-demand route: unknown paths are a 404", async ({ request }) => {
  const response = await request.get("/xx/contact/sent/");
  expect(response.status()).toBe(404);
});
