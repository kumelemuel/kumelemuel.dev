import { describe, expect, it } from "vitest";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MIN_FILL_TIME_MS,
  RATE_LIMIT_MAX_SENDS,
  RATE_LIMIT_WINDOW_SECONDS,
  contactInput,
  contactMessages,
  contactRateLimitKey,
  rateLimitDecision,
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

describe("rateLimitDecision", () => {
  it("allows up to the maximum number of sends in the window", () => {
    for (let count = 1; count <= RATE_LIMIT_MAX_SENDS; count++) {
      expect(rateLimitDecision({ count, ttlSeconds: RATE_LIMIT_WINDOW_SECONDS }).allowed).toBe(true);
    }
  });

  it("blocks the next send and says how many minutes are left, rounded up", () => {
    expect(rateLimitDecision({ count: RATE_LIMIT_MAX_SENDS + 1, ttlSeconds: 61 })).toEqual({
      allowed: false,
      retryAfterMinutes: 2,
    });
  });

  it("falls back to the whole window when the TTL is unknown", () => {
    expect(rateLimitDecision({ count: RATE_LIMIT_MAX_SENDS + 1, ttlSeconds: -1 })).toEqual({
      allowed: false,
      retryAfterMinutes: RATE_LIMIT_WINDOW_SECONDS / 60,
    });
  });

  it("allows a sub-minute wait to read as 1 minute", () => {
    expect(rateLimitDecision({ count: 10, ttlSeconds: 5 })).toEqual({ allowed: false, retryAfterMinutes: 1 });
  });
});

describe("contactRateLimitKey", () => {
  it("is stable per IP and never contains the raw address", async () => {
    const key = await contactRateLimitKey("203.0.113.7");
    expect(key).toBe(await contactRateLimitKey("203.0.113.7"));
    expect(key).not.toContain("203.0.113.7");
    expect(key).toMatch(/^contact:rl:[0-9a-f]{64}$/);
  });

  it("differs between IPs", async () => {
    expect(await contactRateLimitKey("203.0.113.7")).not.toBe(await contactRateLimitKey("203.0.113.8"));
  });
});

describe("contactMessages.rateLimited", () => {
  it("is localized and includes the wait", () => {
    expect(contactMessages("es").rateLimited(1)).toBe(
      "Has enviado varios mensajes seguidos. Podrás volver a escribir en 1 minuto.",
    );
    expect(contactMessages("en").rateLimited(42)).toBe(
      "You've sent several messages in a row. You can write again in 42 minutes.",
    );
  });
});
