import { hasAcceptedCookies } from "@/lib/cookie-consent";
import type { TipoSolicitud } from "@/lib/contact-schema";

// Eventos de conversión hacia Google Tag Manager (dataLayer).
//
// Reglas (no relajar sin revisar la política de privacidad):
// - Solo valores de listas cerradas, definidas abajo. Nunca se envía nombre,
//   correo, teléfono, empresa, mensaje, IP ni texto libre: las funciones solo
//   aceptan los tipos de estas listas, así que pasar otra cosa no compila.
// - Solo si el visitante aceptó las cookies Y GTM está cargado
//   (src/components/analytics/google-tag-manager.tsx crea window.dataLayer
//   únicamente en ese caso). Sin eso no hace nada y no crea window.dataLayer.

// Tipo de formulario: salen de la ruta /contacto/[tipo] (ver
// generateStaticParams en src/app/contacto/[tipo]/page.tsx) más el fallback
// del widget de WhatsApp ("Prefiero que me contacten").
const LEAD_FORM_TYPES = [
  "ventas",
  "proyectos",
  "otras-consultas",
  "cotizar",
  "mantencion",
  "correctivo",
  "diagnostico",
  "capacitacion",
  "servicio-tecnico",
  "whatsapp_fallback",
] as const;

export type LeadFormType = (typeof LEAD_FORM_TYPES)[number];

// Origen del envío. `?accion` se acepta solo si coincide exactamente con uno
// de estos valores. `?origen` llega como texto libre (nombre de producto) y
// además lo puede escribir cualquiera en la URL, así que NUNCA se envía tal
// cual: se traduce a una categoría cerrada (ver toLeadFormSource).
const LEAD_FORM_SOURCES = [
  "cotizar",
  "asesoria",
  "ficha",
  "ficha_producto",
  "restek",
] as const;

export type LeadFormSource = (typeof LEAD_FORM_SOURCES)[number];

export function toLeadFormType(tipo: string): LeadFormType {
  // /contacto/[tipo] con un tipo desconocido ya cae en la configuración de
  // "otras-consultas" (contact-client-page.tsx); se mide igual.
  return (LEAD_FORM_TYPES as readonly string[]).includes(tipo) &&
    tipo !== "whatsapp_fallback"
    ? (tipo as LeadFormType)
    : "otras-consultas";
}

// Para los formularios que no viven en /contacto/[tipo] (nosotros, formulario
// general, consulta rápida de servicios): usan el `tipoSolicitud` que ya envían
// al API, que es un enum cerrado, traducido al vocabulario de form_type.
const LEAD_FORM_TYPE_BY_SOLICITUD: Partial<Record<TipoSolicitud, LeadFormType>> = {
  "cotizacion-equipo": "cotizar",
  "proyecto-laboratorio": "proyectos",
  "servicio-tecnico": "servicio-tecnico",
  "consulta-general": "otras-consultas",
};

export function toLeadFormTypeFromSolicitud(
  tipoSolicitud: TipoSolicitud,
): LeadFormType {
  return LEAD_FORM_TYPE_BY_SOLICITUD[tipoSolicitud] ?? "otras-consultas";
}

export function toLeadFormSource({
  accion,
  origen,
  isRestekQuote,
}: {
  accion?: string | null;
  origen?: string | null;
  isRestekQuote?: boolean;
}): LeadFormSource | undefined {
  if (accion && (LEAD_FORM_SOURCES as readonly string[]).includes(accion)) {
    return accion as LeadFormSource;
  }
  if (origen) {
    if (isRestekQuote) return "restek";
    if (origen.startsWith("Ficha de ")) return "ficha_producto";
  }
  return undefined;
}

export function trackGenerateLead(
  formType: LeadFormType,
  formSource?: LeadFormSource,
) {
  if (typeof window === "undefined") return;
  if (!hasAcceptedCookies()) return;

  const dataLayer = window.dataLayer;
  if (!Array.isArray(dataLayer)) return;

  dataLayer.push({
    event: "generate_lead",
    form_type: formType,
    ...(formSource ? { form_source: formSource } : {}),
  });
}
