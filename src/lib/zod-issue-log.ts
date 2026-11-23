import type { ZodError } from "zod";

// Resumen de un error de validación apto para logs del servidor: solo la ruta
// del campo y el código de Zod. Nunca el mensaje ni el valor recibido — los
// formularios traen nombre, correo y teléfono, y los logs de Vercel no son un
// lugar para datos personales.
export function summarizeZodIssues(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.map(String).join("."),
    code: issue.code,
  }));
}
