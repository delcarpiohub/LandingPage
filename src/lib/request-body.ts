// Lectura acotada del cuerpo JSON para los endpoints de contacto
// (src/app/api/contacto/route.ts y src/app/api/whatsapp-fallback/route.ts).
//
// El formulario más grande del sitio (contacto con todos los campos
// opcionales al máximo permitido por contactSchema) queda muy por debajo de
// este tope incluso con caracteres multibyte. Sin el tope, cada solicitud
// podía traer hasta el máximo de la plataforma (4,5 MB) y se parseaba
// completa antes de validarse.
export const MAX_JSON_BODY_BYTES = 256 * 1024;

export type JsonBodyResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; status: 400 | 413 | 415 };

export async function readJsonBody(request: Request): Promise<JsonBodyResult> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, status: 415 };
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BODY_BYTES) {
    return { ok: false, status: 413 };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400 };
  }
  // Content-Length puede faltar o no ser fiable: se vuelve a medir lo leído.
  if (Buffer.byteLength(raw, "utf8") > MAX_JSON_BODY_BYTES) {
    return { ok: false, status: 413 };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, status: 400 };
    }
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, status: 400 };
  }
}
