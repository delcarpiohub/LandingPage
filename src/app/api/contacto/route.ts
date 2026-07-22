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

const restekTechnicalLabels: Record<string, string> = {
  codigoRestek: "Código Restek",
  faseEstacionaria: "Fase estacionaria",
  diametroInterno: "Diámetro interno",
  longitudColumna: "Longitud de la columna",
  espesorPelicula: "Espesor de película",
  tamanoParticula: "Tamaño de partícula",
  cantidad: "Cantidad",
  equipoGC: "Equipo GC",
  sistemaLC: "Sistema LC",
  detector: "Detector",
  metodoNorma: "Método o norma",
  columnaActual: "Columna actual",
  matrizMuestra: "Matriz o tipo de muestra",
  analitos: "Analitos o compuestos",
  problemaResolver: "Necesidad o problema",
  tipoVialFiltro: "Formato del vial",
  materialMembrana: "Material de la membrana",
  porosidadFiltro: "Porosidad del filtro",
  tipoTapa: "Tipo de tapa",
  solventeFaseMovil: "Solvente o fase móvil",
  volumenMuestra: "Volumen de muestra",
  contenidoSolidos: "Contenido de partículas o sólidos",
  observacionesRestek: "Observaciones técnicas",
};

const restekUnknownLabels: Record<string, string> = {
  codigoRestek: "Código Restek",
  faseEstacionaria: "Fase estacionaria",
  diametroInterno: "Diámetro interno",
  longitudColumna: "Longitud de la columna",
  espesorPelicula: "Espesor de película",
  tamanoParticula: "Tamaño de partícula",
  cantidad: "Cantidad",
  equipoGC: "Equipo GC",
  sistemaLC: "Sistema LC",
  detector: "Detector",
  metodoNorma: "Método o norma",
  columnaActual: "Columna actual",
  matrizMuestra: "Matriz o tipo de muestra",
  analitos: "Analitos o compuestos",
  problemaResolver: "Necesidad o problema",
  tipoVialFiltro: "Formato del vial",
  materialMembrana: "Material de la membrana",
  porosidadFiltro: "Porosidad del filtro",
  tipoTapa: "Tipo de tapa",
  solventeFaseMovil: "Solvente o fase móvil",
  volumenMuestra: "Volumen de muestra",
  contenidoSolidos: "Contenido de partículas o sólidos",
};

// Todo valor provisto por el usuario debe pasar por aquí antes de
// interpolarse en el HTML del correo.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Rate limiting best-effort por IP. En Fluid Compute las instancias se
// reutilizan entre requests, así que este mapa persiste lo suficiente para
// frenar ráfagas de spam sin necesitar almacenamiento externo.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (requestLog.size > 1000) requestLog.clear();
  requestLog.set(ip, [...recent, now]);
  return recent.length >= RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
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

  const resend = new Resend(process.env.RESEND_API_KEY);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const {
    nombre,
    empresa,
    correo,
    telefono,
    areaFacultadRubro,
    sector,
    tipoConsulta,
    tipoProyecto,
    mensaje,
    marca,
    modoCotizacion,
    origen,
    camposRestekDesconocidos,
    ...camposExtra
  } = parsed.data;

  const extraDefs = sectorFields[sector as keyof typeof sectorFields] ?? [];
  const extraRows = extraDefs
    .map((f) => {
      const valor = (camposExtra as Record<string, string | undefined>)[f.name];
      if (!valor) return "";
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">${f.label}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(valor)}</td>
        </tr>`;
    })
    .join("");

  const projectTypeRow =
    tipoProyecto && tipoProyecto.length > 0
      ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Tipo de Proyecto</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${tipoProyecto.join(", ")}</td>
        </tr>`
      : "";

  const areaRow = areaFacultadRubro
    ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Área / Facultad / Rubro</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(areaFacultadRubro)}</td>
        </tr>`
    : "";

  const restekContextRows = marca
    ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Marca</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(marca)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Modo de solicitud</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${modoCotizacion === "medidas" ? "Cotización por medidas" : "Asesoría de selección"}</td>
        </tr>
        ${origen ? `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Origen</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(origen)}</td></tr>` : ""}`
    : "";

  const restekTechnicalRows = Object.entries(restekTechnicalLabels)
    .map(([key, label]) => {
      const value = (camposExtra as Record<string, string | undefined>)[key];
      if (!value) return "";
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">${label}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(value)}</td>
        </tr>`;
    })
    .join("");

  const unknownFieldsRow = camposRestekDesconocidos?.length
    ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Datos por confirmar</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(
            camposRestekDesconocidos.map((field) => restekUnknownLabels[field] ?? field).join(", "),
          )}</td>
        </tr>`
    : "";

  const { error } = await resend.emails.send({
    from:    "Sitio Web Del Carpio <onboarding@resend.dev>",
    to:      "cvillagran@delcarpio.cl", // temporal — Resend en modo prueba solo envía al correo de la cuenta. Cambiar a ventas@delcarpio.cl cuando el dominio delcarpio.cl esté verificado en Resend
    replyTo: correo,
    subject: marca === "Restek"
      ? `Nueva solicitud Restek — ${origen || "Columnas"} — ${modoCotizacion === "medidas" ? "Medidas" : "Asesoría"}`
      : `Nueva consulta web — ${tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General"}`,
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px">
        Nueva consulta desde el sitio web
      </h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Nombre</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(nombre)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Empresa</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(empresa)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Correo</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(correo)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Teléfono</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${telefono ? escapeHtml(telefono) : "No indicado"}</td>
        </tr>
        ${areaRow}
        ${restekContextRows}
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Sector</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${sector ? sectorLabels[sector] : "No especificado"}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Tipo de consulta</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General"}</td>
        </tr>
        ${projectTypeRow}
        ${extraRows}
        ${restekTechnicalRows}
        ${unknownFieldsRow}
      </table>
      <h3 style="font-family:sans-serif;margin-top:24px">Mensaje</h3>
      <p style="font-family:sans-serif;line-height:1.6;background:#f9fafb;padding:16px;border-radius:8px">
        ${mensaje ? escapeHtml(mensaje).replace(/\n/g, "<br>") : "Sin mensaje"}
      </p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
