import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const phoneRegex = /^\+?[0-9()\-\s]{8,20}$/;
const toTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const contactInput = z
  .object({
    lang: z.preprocess(
      (value) => (value === "es" || value === "en" ? value : "es"),
      z.enum(["es", "en"]),
    ),
    name: z.preprocess(toTrimmedString, z.string()),
    email: z.preprocess(toTrimmedString, z.string()),
    phone: z.preprocess(toTrimmedString, z.string()),
    message: z.preprocess(toTrimmedString, z.string()),
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

    if (!z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: isEs ? "Correo electrónico inválido." : "Invalid email address.",
      });
    }

    if (data.phone.length > 0) {
      const digits = data.phone.replace(/\D/g, "");
      if (!phoneRegex.test(data.phone) || digits.length < 8) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: isEs ? "Número de teléfono inválido." : "Invalid phone number.",
        });
      }
    }

    if (data.message.length < 25) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: isEs
          ? "El mensaje debe tener al menos 25 caracteres."
          : "Message must be at least 25 characters long.",
      });
    }
  });

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async ({ lang }) => {
      return {
        ok: true,
        message:
          lang === "es"
            ? "Acción ficticia ejecutada: validación en servidor correcta."
            : "Fake action executed: server-side validation passed.",
      };
    },
  }),
};
