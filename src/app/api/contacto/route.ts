import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, sectorFields } from "@/lib/contact-schema";

const sectorLabels: Record<string, string> = {
  alimentos:    "Alimentos",
  mineria:      "Minería",
  farmaceutica: "Farmacéutica",
  aguas:        "Aguas",
  ambiental:    "Ambiental",
  academia:     "Academia / I+D",
};

const tipoConsultaLabels: Record<string, string> = {
  "cotizacion-equipo":    "Cotización de equipo",
  "proyecto-laboratorio": "Proyecto de laboratorio completo",
  "soporte-tecnico":      "Soporte técnico / mantención",
  "otro":                 "Otra consulta",
};

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { nombre, empresa, correo, telefono, sector, tipoConsulta, mensaje, ...camposExtra } =
    parsed.data;

  const extraDefs = sectorFields[sector as keyof typeof sectorFields] ?? [];
  const extraRows = extraDefs
    .map((f) => {
      const valor = (camposExtra as Record<string, string | undefined>)[f.name];
      if (!valor) return "";
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">${f.label}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${valor}</td>
        </tr>`;
    })
    .join("");

  const { error } = await resend.emails.send({
    from:    "Sitio Web Del Carpio <onboarding@resend.dev>",
    to:      "cvillagran@delcarpio.cl", // temporal — Resend en modo prueba solo envía al correo de la cuenta. Cambiar a ventas@delcarpio.cl cuando el dominio delcarpio.cl esté verificado en Resend
    replyTo: correo,
    subject: `Nueva consulta web — ${tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General"}`,
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px">
        Nueva consulta desde el sitio web
      </h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Nombre</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${nombre}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Empresa</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${empresa}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Correo</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${correo}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Teléfono</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${telefono ?? "No indicado"}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Sector</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${sector ? sectorLabels[sector] : "No especificado"}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Tipo de consulta</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General"}</td>
        </tr>
        ${extraRows}
      </table>
      <h3 style="font-family:sans-serif;margin-top:24px">Mensaje</h3>
      <p style="font-family:sans-serif;line-height:1.6;background:#f9fafb;padding:16px;border-radius:8px">
        ${mensaje ? mensaje.replace(/\n/g, "<br>") : "Sin mensaje"}
      </p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
