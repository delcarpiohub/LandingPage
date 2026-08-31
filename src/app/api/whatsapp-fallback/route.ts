import { NextResponse } from "next/server";
import { Resend } from "resend";
import { whatsappFallbackSchema } from "@/lib/whatsapp-fallback-schema";
import {
  TurnstileConfigurationError,
  verifyTurnstileToken,
} from "@/lib/turnstile";
import { isRateLimited } from "@/lib/rate-limit";

// Endpoint dedicado al fallback "Prefiero que me contacten" del bot de
// WhatsApp (src/components/whatsapp-widget.tsx). Reutiliza la misma
// integración de Resend que src/app/api/contacto/route.ts (mismas env vars,
// mismo patrón de entrega de prueba a RESEND_TEST_RECIPIENT mientras el
// dominio @delcarpio.cl no esté verificado) pero como ruta separada — el
// schema de datos es distinto (ver whatsapp-fallback-schema.ts) y no
// convenía forzar ese formulario dentro de `contactSchema`.
const RESEND_TEST_RECIPIENT = "cvillagran@delcarpio.cl";
const DEFAULT_RESEND_FROM = "Sitio Web Del Carpio <onboarding@resend.dev>";
const SALES_RECIPIENT = "ventas@delcarpio.cl";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta nuevamente en unos minutos." },
      { status: 429 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no está configurada");
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido" }, { status: 400 });
  }

  const turnstileToken = (body as Record<string, unknown> | null)?.turnstileToken;
  let turnstileVerified: boolean;
  try {
    turnstileVerified = await verifyTurnstileToken(turnstileToken, ip);
  } catch (error) {
    if (error instanceof TurnstileConfigurationError) {
      return NextResponse.json(
        { error: "La verificación de seguridad no está disponible. Intenta nuevamente más tarde." },
        { status: 503 },
      );
    }
    throw error;
  }

  if (!turnstileVerified) {
    return NextResponse.json(
      { error: "No pudimos verificar la solicitud. Recarga la página e inténtalo de nuevo." },
      { status: 400 },
    );
  }

  const parsed = whatsappFallbackSchema.safeParse(body);
  if (!parsed.success) {
    // Detalle solo en logs del servidor; el widget valida en cliente y no
    // consume `issues` — misma política que /api/contacto.
    console.warn("Validación de /api/whatsapp-fallback fallida:", parsed.error.issues);
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { nombre, empresa, area, contactMethod, contactValue } = parsed.data;

  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_RESEND_FROM;
  const isTestDelivery = !from.includes("@delcarpio.cl");
  const deliveryRecipient = isTestDelivery ? RESEND_TEST_RECIPIENT : SALES_RECIPIENT;
  const contactMethodLabel = contactMethod === "telefono" ? "Teléfono" : "Correo";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to: deliveryRecipient,
    subject: "Lead urgente – prefiere que lo contacten",
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px">
        Lead urgente desde el bot de WhatsApp — prefiere que lo contacten
      </h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
        ${isTestDelivery ? `
        <tr style="background-color:#fff7ed">
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700">DESTINO AL ACTIVAR RESEND</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">Ventas (${SALES_RECIPIENT})</td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Nombre</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(nombre)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Empresa</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(empresa)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Área de interés</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(area)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Prefiere contacto por</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${contactMethodLabel}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">${contactMethodLabel}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(contactValue)}</td>
        </tr>
      </table>
      <p style="font-family:sans-serif;color:#666;margin-top:16px;font-size:13px">
        No abrió WhatsApp Web desde el bot del sitio — pidió que lo contactara el equipo directamente.
      </p>
    `,
  });

  if (error) {
    console.error("Resend error (whatsapp-fallback):", error);
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
