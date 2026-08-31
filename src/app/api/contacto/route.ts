import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactSchema,
  sectorFields,
  serviceFields,
  type ContactFormData,
} from "@/lib/contact-schema";
import {
  TurnstileConfigurationError,
  verifyTurnstileToken,
} from "@/lib/turnstile";
import { isRateLimited } from "@/lib/rate-limit";

const RESEND_TEST_RECIPIENT = "cvillagran@delcarpio.cl";
const DEFAULT_RESEND_FROM = "Sitio Web Del Carpio <onboarding@resend.dev>";
const DEFAULT_RECIPIENT = "ventas@delcarpio.cl";

const recipientByFormOrigin = {
  "contacto-general": "ventas@delcarpio.cl",
  "contacto-ventas": "ventas@delcarpio.cl",
  "contacto-cotizar": "ventas@delcarpio.cl",
  "contacto-proyectos": "proyectos@delcarpio.cl",
  "contacto-otras-consultas": "ventas@delcarpio.cl",
  "servicios-rapido": "servicio@delcarpio.cl",
  "servicio-mantencion": "servicio@delcarpio.cl",
  "servicio-correctivo": "servicio@delcarpio.cl",
  "servicio-diagnostico": "servicio@delcarpio.cl",
  "servicio-capacitacion": "servicio@delcarpio.cl",
} as const;

const destinationLabelByRecipient: Record<string, string> = {
  "ventas@delcarpio.cl": "Ventas",
  "proyectos@delcarpio.cl": "Proyectos",
  "servicio@delcarpio.cl": "Servicio técnico",
};

function resolveMailRoute(formularioOrigen: ContactFormData["formularioOrigen"]) {
  const intendedRecipient = formularioOrigen
    ? recipientByFormOrigin[formularioOrigen as keyof typeof recipientByFormOrigin]
    : undefined;
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_RESEND_FROM;
  const isTestDelivery = !from.includes("@delcarpio.cl");
  const logicalRecipient = intendedRecipient ?? DEFAULT_RECIPIENT;

  return {
    from,
    intendedRecipient: logicalRecipient,
    deliveryRecipient: isTestDelivery ? RESEND_TEST_RECIPIENT : logicalRecipient,
    destinationLabel: destinationLabelByRecipient[logicalRecipient] ?? "Consulta general",
    isTestDelivery,
  };
}

const servicioTipoLabels: Record<string, string> = {
  mantencion:   "Mantención",
  correctivo:   "Correctivo",
  diagnostico:  "Diagnóstico",
  capacitacion: "Capacitación",
};

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

  const resend = new Resend(process.env.RESEND_API_KEY);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // El detalle de validación queda solo en logs del servidor; el cliente ya
    // valida con el mismo schema vía react-hook-form y no consume `issues`.
    console.warn("Validación de /api/contacto fallida:", parsed.error.issues);
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const {
    nombre,
    empresa,
    correo,
    telefono,
    areaFacultadRubro,
    sector,
    servicioTipo,
    tipoConsulta,
    formularioOrigen,
    tipoProyecto,
    mensaje,
    consentimientoPrivacidad,
    marca,
    modoCotizacion,
    accion,
    origen,
    camposRestekDesconocidos,
    ...camposExtra
  } = parsed.data;

  const isAsesoria = accion === "asesoria" || (mensaje && mensaje.includes("ASESORÍA TÉCNICA"));
  const tipoSolicitudLabel = isAsesoria ? "Asesoría Técnica" : "Cotización";
  const mailRoute = resolveMailRoute(formularioOrigen);

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

  const servicioTipoRow = servicioTipo
    ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Servicio solicitado</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${servicioTipoLabels[servicioTipo] ?? servicioTipo}</td>
        </tr>`
    : "";

  const serviceDefs = servicioTipo ? serviceFields[servicioTipo] : [];
  const serviceRows = serviceDefs
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

  const privacyConsentRow = consentimientoPrivacidad
    ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Consentimiento de privacidad</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">Autorizado expresamente para responder esta solicitud el ${new Date().toISOString()}</td>
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
    from:    mailRoute.from,
    to:      mailRoute.deliveryRecipient,
    replyTo: correo,
    subject: marca === "Restek"
      ? `[${mailRoute.destinationLabel}] Nueva solicitud Restek (${tipoSolicitudLabel}) — ${origen || "Columnas"}`
      : `[${mailRoute.destinationLabel}] Nueva solicitud de ${tipoSolicitudLabel} — ${origen || (tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General")}`,
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px">
        Nueva consulta desde el sitio web (${tipoSolicitudLabel})
      </h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
        ${mailRoute.isTestDelivery ? `
        <tr style="background-color:#fff7ed">
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700">DESTINO AL ACTIVAR RESEND</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${mailRoute.destinationLabel} (${mailRoute.intendedRecipient})</td>
        </tr>` : ""}
        <tr style="background-color:#f9fafb">
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700">TIPO DE SOLICITUD</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:800;color:${isAsesoria ? '#4A5560' : '#D6532B'}">
            ${isAsesoria ? "📋 ASESORÍA TÉCNICA" : "🏷️ COTIZACIÓN DE EQUIPO"}
          </td>
        </tr>
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
        ${privacyConsentRow}
        ${areaRow}
        ${restekContextRows}
        ${servicioTipoRow}
        ${sector ? `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Sector</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${sectorLabels[sector]}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Tipo de consulta</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb">${tipoConsulta ? tipoConsultaLabels[tipoConsulta] : "General"}</td>
        </tr>
        ${projectTypeRow}
        ${extraRows}
        ${serviceRows}
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
