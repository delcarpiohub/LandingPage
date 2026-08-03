import { z } from "zod";

export const SECTORES = [
  "alimentos",
  "mineria",
  "farmaceutica",
  "aguas",
  "ambiental",
  "academia",
] as const;

export const TIPOS_CONSULTA = [
  "cotizacion-equipo",
  "proyecto-laboratorio",
  "soporte-tecnico",
  "otro",
] as const;

// Identifica el punto de entrada del formulario para que la API pueda enrutar
// cada solicitud a su área responsable sin aceptar correos desde el cliente.
export const FORMULARIO_ORIGENES = [
  "contacto-general",
  "contacto-ventas",
  "contacto-cotizar",
  "contacto-proyectos",
  "contacto-otras-consultas",
  "servicios-rapido",
  "servicio-mantencion",
  "servicio-correctivo",
  "servicio-diagnostico",
  "servicio-capacitacion",
] as const;

export const TIPOS_PROYECTO = [
  "Línea de Gas",
  "Ductos de Gas",
  "Campanas de Extracción",
  "Campanas de Bioseguridad",
  "Tabiquería",
  "Mobiliario de Laboratorio",
  "Aire acondicionado",
] as const;

export const RESTEK_QUOTE_MODES = ["medidas", "asesoria"] as const;

export const RESTEK_UNKNOWN_FIELDS = [
  "codigoRestek",
  "faseEstacionaria",
  "diametroInterno",
  "longitudColumna",
  "espesorPelicula",
  "tamanoParticula",
  "cantidad",
  "equipoGC",
  "sistemaLC",
  "detector",
  "metodoNorma",
  "columnaActual",
  "matrizMuestra",
  "analitos",
  "problemaResolver",
  "tipoVialFiltro",
  "materialMembrana",
  "porosidadFiltro",
  "tipoTapa",
  "solventeFaseMovil",
  "volumenMuestra",
  "contenidoSolidos",
] as const;

export type RestekUnknownField = (typeof RESTEK_UNKNOWN_FIELDS)[number];

export type FieldDef = {
  name: string;
  label: string;
  type: "input" | "textarea";
  required: boolean;
  placeholder: string;
};

// Fuente única de campos dinámicos por sector.
// Para agregar un sector nuevo: agregar una entrada aquí. El schema y el
// formulario los toman automáticamente, sin tocar otra línea.
export const sectorFields: Partial<Record<typeof SECTORES[number], FieldDef[]>> = {
  alimentos: [
    {
      name: "tipoMuestra",
      label: "Tipo de muestra",
      type: "input",
      required: false,
      placeholder: "ej. agua, carne, lácteos, vegetales",
    },
    {
      name: "analitoIdentificar",
      label: "¿Qué desea identificar?",
      type: "textarea",
      required: false,
      placeholder: "ej. pesticidas, metales pesados, microorganismos",
    },
    {
      name: "rangoConcentracion",
      label: "Rango de concentración esperado",
      type: "input",
      required: false,
      placeholder: "ej. trazas, ppm, %. Si no lo sabes, dejalo en blanco",
    },
  ],
};

export const SERVICE_TIPOS = [
  "mantencion",
  "correctivo",
  "diagnostico",
  "capacitacion",
] as const;

// Fuente única de campos dinámicos por tarjeta de servicio en /servicios.
// Cada servicio pide solo el dato mínimo que Del Carpio necesita para dar
// una primera respuesta técnica útil; el resto queda opcional a propósito.
export const serviceFields: Record<typeof SERVICE_TIPOS[number], FieldDef[]> = {
  mantencion: [
    {
      name: "equipoMantencion",
      label: "Equipo o instrumento (marca y modelo)",
      type: "input",
      required: true,
      placeholder: "ej. HPLC Agilent 1260 Infinity II",
    },
    {
      name: "tipoMantencionDeseada",
      label: "¿Mantención puntual o contrato periódico?",
      type: "input",
      required: false,
      placeholder: "ej. mantención puntual, contrato anual",
    },
    {
      name: "ultimaMantencion",
      label: "Fecha aproximada de la última mantención",
      type: "input",
      required: false,
      placeholder: "ej. hace 6 meses, no recuerdo",
    },
  ],
  correctivo: [
    {
      name: "equipoFalla",
      label: "Equipo o instrumento con falla (marca y modelo)",
      type: "input",
      required: true,
      placeholder: "ej. GC Shimadzu 2010 Plus",
    },
    {
      name: "descripcionFalla",
      label: "Descripción de la falla o síntoma",
      type: "textarea",
      required: true,
      placeholder: "ej. el detector no enciende, ruido excesivo en la línea base, fuga en el sistema fluídico",
    },
    {
      name: "estadoEquipo",
      label: "Estado actual del equipo",
      type: "input",
      required: false,
      placeholder: "ej. detenido, funciona con limitaciones, falla intermitente",
    },
  ],
  diagnostico: [
    {
      name: "equipoDiagnostico",
      label: "Equipo(s) o sistema a evaluar",
      type: "input",
      required: true,
      placeholder: "ej. parque completo de HPLC, un sistema GC-MS específico",
    },
    {
      name: "objetivoDiagnostico",
      label: "Objetivo del diagnóstico",
      type: "textarea",
      required: false,
      placeholder: "ej. evaluación de desempeño, auditoría de parque, revisión de método existente",
    },
    {
      name: "normaReferencia",
      label: "Norma o estándar de referencia",
      type: "input",
      required: false,
      placeholder: "ej. NCh-ISO 17025, USP, no aplica",
    },
  ],
  capacitacion: [
    {
      name: "temaCapacitacion",
      label: "Tema o área de interés",
      type: "input",
      required: true,
      placeholder: "ej. software, mantenimiento de rutina, troubleshooting cromatográfico",
    },
    {
      name: "numeroParticipantes",
      label: "Número aproximado de participantes",
      type: "input",
      required: false,
      placeholder: "ej. 5 analistas",
    },
    {
      name: "modalidadPreferida",
      label: "Modalidad preferida",
      type: "input",
      required: false,
      placeholder: "ej. en sitio, remota",
    },
  ],
};

// Deriva los nombres únicos de todos los campos extra definidos en sectorFields
// y serviceFields. Se expande automáticamente al agregar nuevos sectores o
// servicios.
const allExtraFieldNames = [
  ...new Set([
    ...Object.values(sectorFields).flat().map((f) => f.name),
    ...Object.values(serviceFields).flat().map((f) => f.name),
  ]),
];

const LIMITE_CAMPO = "Este campo supera el largo máximo permitido";

const extraFieldsSchema = Object.fromEntries(
  allExtraFieldNames.map((name) => [name, z.string().max(1000, LIMITE_CAMPO).optional()]),
) as Record<string, z.ZodOptional<z.ZodString>>;

export const contactSchema = z
  .object({
    nombre:            z.string().min(2, "Indica tu nombre").max(120, LIMITE_CAMPO),
    empresa:           z.string().min(2, "Indica la empresa").max(160, LIMITE_CAMPO),
    correo:            z.string().email("Ingresa un email válido").max(254, LIMITE_CAMPO),
    telefono:          z.string().min(1, "Indica tu teléfono").max(40, LIMITE_CAMPO),
    areaFacultadRubro: z.string().max(160, LIMITE_CAMPO).optional(),
    sector:            z.enum(SECTORES).optional(),
    servicioTipo:      z.enum(SERVICE_TIPOS).optional(),
    tipoConsulta:      z.enum(TIPOS_CONSULTA).optional(),
    formularioOrigen:  z.enum(FORMULARIO_ORIGENES).optional(),
    tipoProyecto:      z.array(z.enum(TIPOS_PROYECTO)).optional(),
    mensaje:           z.string().max(5000, LIMITE_CAMPO).optional().or(z.literal("")),
    marca:              z.string().max(80, LIMITE_CAMPO).optional(),
    modoCotizacion:     z.enum(RESTEK_QUOTE_MODES).optional(),
    accion:             z.string().max(40, LIMITE_CAMPO).optional(),
    origen:             z.string().max(120, LIMITE_CAMPO).optional(),
    codigoRestek:       z.string().max(120, LIMITE_CAMPO).optional(),
    faseEstacionaria:   z.string().max(160, LIMITE_CAMPO).optional(),
    diametroInterno:    z.string().max(120, LIMITE_CAMPO).optional(),
    longitudColumna:    z.string().max(120, LIMITE_CAMPO).optional(),
    espesorPelicula:    z.string().max(120, LIMITE_CAMPO).optional(),
    tamanoParticula:    z.string().max(120, LIMITE_CAMPO).optional(),
    cantidad:           z.string().max(80, LIMITE_CAMPO).optional(),
    equipoGC:           z.string().max(160, LIMITE_CAMPO).optional(),
    sistemaLC:          z.string().max(160, LIMITE_CAMPO).optional(),
    detector:           z.string().max(160, LIMITE_CAMPO).optional(),
    metodoNorma:        z.string().max(500, LIMITE_CAMPO).optional(),
    columnaActual:      z.string().max(300, LIMITE_CAMPO).optional(),
    matrizMuestra:      z.string().max(300, LIMITE_CAMPO).optional(),
    analitos:           z.string().max(500, LIMITE_CAMPO).optional(),
    problemaResolver:   z.string().max(1000, LIMITE_CAMPO).optional(),
    tipoVialFiltro:     z.string().max(120, LIMITE_CAMPO).optional(),
    materialMembrana:   z.string().max(120, LIMITE_CAMPO).optional(),
    porosidadFiltro:    z.string().max(80, LIMITE_CAMPO).optional(),
    tipoTapa:           z.string().max(120, LIMITE_CAMPO).optional(),
    solventeFaseMovil:  z.string().max(500, LIMITE_CAMPO).optional(),
    volumenMuestra:     z.string().max(120, LIMITE_CAMPO).optional(),
    contenidoSolidos:   z.string().max(160, LIMITE_CAMPO).optional(),
    observacionesRestek:z.string().max(3000, LIMITE_CAMPO).optional(),
    camposRestekDesconocidos: z.array(z.enum(RESTEK_UNKNOWN_FIELDS)).max(20).optional(),
    ...extraFieldsSchema,
  })
  .superRefine((data, ctx) => {
    if (data.tipoConsulta === "proyecto-laboratorio") {
      const messageLength = data.mensaje?.trim().length ?? 0;
      if (messageLength < 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El mensaje debe tener al menos 12 caracteres",
          path: ["mensaje"],
        });
      }
    }

    if (data.tipoConsulta === "otro") {
      const messageLength = data.mensaje?.trim().length ?? 0;
      if (messageLength < 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El mensaje debe tener al menos 15 caracteres",
          path: ["mensaje"],
        });
      }
    }

    if (data.servicioTipo) {
      const serviceFieldDefs = serviceFields[data.servicioTipo];
      for (const field of serviceFieldDefs) {
        if (field.required && !data[field.name as keyof typeof data]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Este campo es obligatorio",
            path: [field.name],
          });
        }
      }
    }

    if (!data.sector) return;
    const fields = sectorFields[data.sector as typeof SECTORES[number]] ?? [];
    for (const field of fields) {
      if (field.required && !data[field.name as keyof typeof data]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Este campo es obligatorio",
          path: [field.name],
        });
      }
    }
  });

export type ContactFormData = z.infer<typeof contactSchema>;
