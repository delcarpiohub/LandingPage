import { TIPOS_SOLICITUD, type TipoSolicitud } from "./contact-schema";

// Única fuente de verdad para el asunto, el encabezado <h2> y la fila
// "TIPO DE SOLICITUD" del correo de /api/contacto. Cada formulario fija un
// tipoSolicitud explícito (campo requerido en contactSchema, sin rama
// default) y estas tres piezas del correo se derivan siempre del mismo
// valor, para que nunca puedan mostrar un tipo distinto entre sí.
export const tipoSolicitudMeta: Record<
  TipoSolicitud,
  { subjectLabel: string; rowLabel: string; rowColor: string }
> = {
  "cotizacion-equipo":    { subjectLabel: "Cotización",              rowLabel: "🏷️ COTIZACIÓN DE EQUIPO",         rowColor: "#D6532B" },
  "asesoria-tecnica":     { subjectLabel: "Asesoría Técnica",        rowLabel: "📋 ASESORÍA TÉCNICA",              rowColor: "#4A5560" },
  "ficha-tecnica":        { subjectLabel: "Ficha Técnica",           rowLabel: "📄 SOLICITUD DE FICHA TÉCNICA",    rowColor: "#4A5560" },
  "proyecto-laboratorio": { subjectLabel: "Proyecto de Laboratorio", rowLabel: "🧪 PROYECTO DE LABORATORIO",       rowColor: "#53843A" },
  "servicio-tecnico":     { subjectLabel: "Servicio Técnico",        rowLabel: "🔧 SERVICIO TÉCNICO",              rowColor: "#4A5560" },
  "consulta-general":     { subjectLabel: "Consulta General",       rowLabel: "✉️ CONSULTA GENERAL",              rowColor: "#4A5560" },
};

export function buildTipoSolicitudSubject({
  tipoSolicitud,
  destinationLabel,
  marca,
  origen,
  tipoConsultaFallback,
}: {
  tipoSolicitud: TipoSolicitud;
  destinationLabel: string;
  marca?: string;
  origen?: string;
  tipoConsultaFallback?: string;
}): string {
  const { subjectLabel } = tipoSolicitudMeta[tipoSolicitud];
  if (marca === "Restek") {
    return `[${destinationLabel}] Nueva solicitud Restek (${subjectLabel}) — ${origen || "Columnas"}`;
  }
  return `[${destinationLabel}] Nueva solicitud de ${subjectLabel} — ${origen || tipoConsultaFallback || "General"}`;
}

export function buildTipoSolicitudHeading(tipoSolicitud: TipoSolicitud): string {
  return `Nueva consulta desde el sitio web (${tipoSolicitudMeta[tipoSolicitud].subjectLabel})`;
}

export function buildTipoSolicitudRow(tipoSolicitud: TipoSolicitud): {
  label: string;
  color: string;
} {
  const meta = tipoSolicitudMeta[tipoSolicitud];
  return { label: meta.rowLabel, color: meta.rowColor };
}

export { TIPOS_SOLICITUD };
export type { TipoSolicitud };
