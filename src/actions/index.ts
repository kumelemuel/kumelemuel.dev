import { ActionError, defineAction } from "astro:actions";
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";
import {
  contactInput,
  contactMessages,
  contactRateLimitKey,
  contactSubject,
  escapeHtml,
  isLikelyBot,
  rateLimitDecision,
} from "../lib/contact";
import { hitRateLimit } from "./rate-limit";

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async (input, context) => {
      const { lang, name, email, message } = input;
      const t = contactMessages(lang);

      // Bots: pretend success so they don't retry, but send nothing.
      if (isLikelyBot(input, { isRpcCall: context.url.pathname.startsWith("/_actions/") })) {
        return { ok: true, message: t.success };
      }

      // Per-IP limit. If Redis is unreachable the message still goes out (fail open):
      // losing a real message is worse than letting a few extra through.
      try {
        const usage = await hitRateLimit(await contactRateLimitKey(context.clientAddress));
        const decision = rateLimitDecision(usage);
        if (!decision.allowed) {
          throw new ActionError({
            code: "TOO_MANY_REQUESTS",
            message: t.rateLimited(decision.retryAfterMinutes),
          });
        }
      } catch (caught) {
        if (caught instanceof ActionError) throw caught;
        console.error("[contact] Rate limit unavailable:", caught);
      }

      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        subject: contactSubject(name),
        text: [`Nombre: ${name}`, `Email: ${email}`, `Idioma: ${lang}`, "", message].join("\n"),
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
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: t.sendFailed });
      }

      return { ok: true, message: t.success };
    },
  }),
};
