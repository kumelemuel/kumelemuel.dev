/**
 * Contact form rules, kept free of Astro runtime imports so they can be unit tested.
 * Used by the contact action (src/actions/index.ts).
 */
import { z } from "astro/zod";

export const MIN_FILL_TIME_MS = 3000;
export const MAX_NAME_LENGTH = 120;
export const MAX_EMAIL_LENGTH = 254;
export const MIN_MESSAGE_LENGTH = 25;
export const MAX_MESSAGE_LENGTH = 5000;

type ContactLang = "es" | "en";

const toTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const MESSAGES = {
  es: {
    nameShort: "El nombre debe tener al menos 3 caracteres.",
    nameLong: `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`,
    email: "Correo electrónico inválido.",
    messageShort: `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres.`,
    messageLong: `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
    success: "Gracias por escribir. Te responderé a la brevedad.",
    sendFailed: "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
  },
  en: {
    nameShort: "Name must be at least 3 characters long.",
    nameLong: `Name cannot exceed ${MAX_NAME_LENGTH} characters.`,
    email: "Invalid email address.",
    messageShort: `Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`,
    messageLong: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    success: "Thanks for reaching out. I'll get back to you soon.",
    sendFailed: "We couldn't send your message. Please try again in a few minutes.",
  },
} as const satisfies Record<ContactLang, Record<string, string>>;

export const contactMessages = (lang: ContactLang) => MESSAGES[lang];

export const contactInput = z
  .object({
    lang: z.preprocess((value) => (value === "es" || value === "en" ? value : "es"), z.enum(["es", "en"])),
    name: z.preprocess(toTrimmedString, z.string()),
    email: z.preprocess(toTrimmedString, z.string()),
    message: z.preprocess(toTrimmedString, z.string()),
    // Anti-spam: hidden field that humans never fill, and form render timestamp.
    website: z.preprocess(toTrimmedString, z.string()),
    startedAt: z.preprocess((value) => Number(value) || 0, z.number()),
  })
  .superRefine((data, ctx) => {
    const t = MESSAGES[data.lang];
    const issue = (path: "name" | "email" | "message", message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    if (data.name.length < 3) issue("name", t.nameShort);
    else if (data.name.length > MAX_NAME_LENGTH) issue("name", t.nameLong);

    if (data.email.length > MAX_EMAIL_LENGTH || !z.email().safeParse(data.email).success) {
      issue("email", t.email);
    }

    if (data.message.length < MIN_MESSAGE_LENGTH) issue("message", t.messageShort);
    else if (data.message.length > MAX_MESSAGE_LENGTH) issue("message", t.messageLong);
  });

export type ContactInput = z.infer<typeof contactInput>;

/**
 * Bots get a fake success and nothing is sent.
 * - honeypot: humans never fill the hidden "website" field.
 * - fill time: the page script stamps startedAt. JS calls (/_actions/...) must carry it;
 *   plain HTML form posts (no JS) can't, so for those only the honeypot applies.
 */
export function isLikelyBot(
  input: Pick<ContactInput, "website" | "startedAt">,
  { isRpcCall, now = Date.now() }: { isRpcCall: boolean; now?: number },
): boolean {
  if (input.website.length > 0) return true;
  if (!input.startedAt) return isRpcCall;
  return now - input.startedAt < MIN_FILL_TIME_MS;
}

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Email subject from user input: no line breaks (header injection) and bounded length. */
export const contactSubject = (name: string) =>
  `[kumelemuel.dev] Nuevo mensaje de ${name.replace(/[\r\n]+/g, " ").slice(0, MAX_NAME_LENGTH)}`;
