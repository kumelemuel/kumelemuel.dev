import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  RESEND_API_KEY,
} from "astro:env/server";
import { Resend } from "resend";

const MIN_FILL_TIME_MS = 3000;
const MAX_MESSAGE_LENGTH = 5000;

const toTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const contactInput = z
  .object({
    lang: z.preprocess(
      (value) => (value === "es" || value === "en" ? value : "es"),
      z.enum(["es", "en"]),
    ),
    name: z.preprocess(toTrimmedString, z.string().max(120)),
    email: z.preprocess(toTrimmedString, z.string().max(254)),
    message: z.preprocess(toTrimmedString, z.string()),
    // Anti-spam: hidden field that humans never fill, and form render timestamp.
    website: z.preprocess(toTrimmedString, z.string()),
    startedAt: z.preprocess((value) => Number(value) || 0, z.number()),
  })
  .superRefine((data, ctx) => {
    const isEs = data.lang === "es";

    if (data.name.length < 3) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: isEs
          ? "El nombre debe tener al menos 3 caracteres."
          : "Name must be at least 3 characters long.",
      });
    }

    if (!z.email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: isEs ? "Correo electrónico inválido." : "Invalid email address.",
      });
    }

    if (data.message.length < 25) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: isEs
          ? "El mensaje debe tener al menos 25 caracteres."
          : "Message must be at least 25 characters long.",
      });
    } else if (data.message.length > MAX_MESSAGE_LENGTH) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: isEs
          ? `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`
          : `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
      });
    }
  });

const successMessage = (lang: "es" | "en") =>
  lang === "es"
    ? "Gracias por escribir. Te responderé a la brevedad."
    : "Thanks for reaching out. I'll get back to you soon.";

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async ({ lang, name, email, message, website, startedAt }, context) => {
      const isEs = lang === "es";

      // Bots: pretend success so they don't retry, but send nothing.
      // - honeypot: humans never fill the hidden "website" field.
      // - fill time: the page script stamps startedAt. JS calls (/_actions/...) must carry it;
      //   plain HTML form posts (no JS) can't, so for those only the honeypot applies.
      const isRpcCall = context.url.pathname.startsWith("/_actions/");
      const missingStamp = !startedAt;
      const tooFast = missingStamp ? isRpcCall : Date.now() - startedAt < MIN_FILL_TIME_MS;
      if (website.length > 0 || tooFast) {
        return { ok: true, message: successMessage(lang) };
      }

      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `[kumelemuel.dev] Nuevo mensaje de ${name}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Idioma: ${lang}`,
          "",
          message,
        ].join("\n"),
        html: `
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Idioma:</strong> ${lang}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
      });

      if (error) {
        console.error("[contact] Resend error:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: isEs
            ? "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos."
            : "We couldn't send your message. Please try again in a few minutes.",
        });
      }

      return { ok: true, message: successMessage(lang) };
    },
  }),
};
