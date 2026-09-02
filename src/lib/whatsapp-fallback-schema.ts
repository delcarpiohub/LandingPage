import { z } from "zod";

// Schema dedicado y liviano para el fallback "Prefiero que me contacten" del
// bot de WhatsApp (src/components/whatsapp-widget.tsx). No reutiliza
// `contactSchema` (src/lib/contact-schema.ts) a propósito: ese schema exige
// `telefono` y `correo` como campos obligatorios simultáneos, y este flujo
// pide uno u otro a elección del usuario — forzar ambos ahí habría cambiado
// la validación del formulario de contacto principal, que ya funciona.
export const CONTACT_METHODS = ["telefono", "correo"] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITE_CAMPO = "Este campo supera el largo máximo permitido";

export const whatsappFallbackSchema = z
  .object({
    nombre: z.string().min(2, "Falta el nombre").max(120, LIMITE_CAMPO),
    empresa: z.string().min(2, "Falta la empresa").max(160, LIMITE_CAMPO),
    area: z.string().min(2, "Falta el área de interés").max(160, LIMITE_CAMPO),
    contactMethod: z.enum(CONTACT_METHODS),
    contactValue: z.string().min(3, "Falta el dato de contacto").max(254, LIMITE_CAMPO),
    consentimientoPrivacidad: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.consentimientoPrivacidad) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Para enviar la solicitud, autoriza el tratamiento de los datos entregados.",
        path: ["consentimientoPrivacidad"],
      });
    }

    if (data.contactMethod === "correo" && !EMAIL_PATTERN.test(data.contactValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Ingresa un correo válido",
        path: ["contactValue"],
      });
    }
  });

export type WhatsappFallbackData = z.infer<typeof whatsappFallbackSchema>;
