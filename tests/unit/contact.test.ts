import { describe, expect, it } from "vitest";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MIN_FILL_TIME_MS,
  contactInput,
  contactSubject,
  escapeHtml,
  isLikelyBot,
} from "../../src/lib/contact";

const valid = {
  lang: "es",
  name: "Diego Arenas",
  email: "diego@example.com",
  message: "Hola, me gustaría conversar sobre un proyecto open source.",
  website: "",
  startedAt: "1700000000000",
};

/** Field → first error message, like the form shows it. */
const errorsOf = (input: Record<string, unknown>) => {
  const result = contactInput.safeParse(input);
  if (result.success) return {};
  return Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
};

describe("contactInput", () => {
  it("accepts a valid message and trims every text field", () => {
    const result = contactInput.parse({ ...valid, name: "  Diego  ", email: " diego@example.com " });
    expect(result.name).toBe("Diego");
    expect(result.email).toBe("diego@example.com");
    expect(result.startedAt).toBe(1700000000000);
  });

  it("reports every invalid field at once, in Spanish", () => {
    expect(errorsOf({ ...valid, name: "Al", email: "no-es-correo", message: "corto" })).toEqual({
      name: "El nombre debe tener al menos 3 caracteres.",
      email: "Correo electrónico inválido.",
      message: "El mensaje debe tener al menos 25 caracteres.",
    });
  });

  it("uses English messages when lang is en", () => {
    expect(errorsOf({ ...valid, lang: "en", name: "Al" })).toEqual({
      name: "Name must be at least 3 characters long.",
    });
  });

  it("falls back to Spanish for an unknown language", () => {
    expect(contactInput.parse({ ...valid, lang: "fr" }).lang).toBe("es");
  });

  it("localizes the maximum-length errors too", () => {
    expect(errorsOf({ ...valid, name: "x".repeat(MAX_NAME_LENGTH + 1) }).name).toBe(
      `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`,
    );
    expect(errorsOf({ ...valid, lang: "en", message: "x".repeat(MAX_MESSAGE_LENGTH + 1) }).message).toBe(
      `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    );
  });

  it("rejects an email longer than 254 characters", () => {
    expect(errorsOf({ ...valid, email: `${"a".repeat(250)}@example.com` }).email).toBe(
      "Correo electrónico inválido.",
    );
  });

  it("treats a missing or non-numeric startedAt as 0", () => {
    expect(contactInput.parse({ ...valid, startedAt: "" }).startedAt).toBe(0);
    expect(contactInput.parse({ ...valid, startedAt: "abc" }).startedAt).toBe(0);
  });
});

describe("isLikelyBot", () => {
  const now = 1_700_000_100_000;

  it("flags a filled honeypot, whatever the timing", () => {
    expect(isLikelyBot({ website: "spam.example", startedAt: now - 60_000 }, { isRpcCall: true, now })).toBe(
      true,
    );
  });

  it("flags submissions faster than the minimum fill time", () => {
    expect(
      isLikelyBot({ website: "", startedAt: now - (MIN_FILL_TIME_MS - 1) }, { isRpcCall: true, now }),
    ).toBe(true);
    expect(isLikelyBot({ website: "", startedAt: now - MIN_FILL_TIME_MS }, { isRpcCall: true, now })).toBe(
      false,
    );
  });

  it("requires the timestamp on JS (RPC) calls but not on plain form posts", () => {
    expect(isLikelyBot({ website: "", startedAt: 0 }, { isRpcCall: true, now })).toBe(true);
    expect(isLikelyBot({ website: "", startedAt: 0 }, { isRpcCall: false, now })).toBe(false);
  });
});

describe("email helpers", () => {
  it("escapes HTML in user content", () => {
    expect(escapeHtml(`<script>alert("x") & 'y'</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  it("keeps the subject on one line (no header injection)", () => {
    const subject = contactSubject("Diego\r\nBcc: victim@example.com");
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toBe("[kumelemuel.dev] Nuevo mensaje de Diego Bcc: victim@example.com");
  });
});
