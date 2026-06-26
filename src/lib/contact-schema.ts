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
      required: true,
      placeholder: "ej. agua, carne, lácteos, vegetales",
    },
    {
      name: "analitoIdentificar",
      label: "¿Qué desea identificar?",
      type: "textarea",
      required: true,
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

// Deriva los nombres únicos de todos los campos extra definidos en sectorFields.
// Se expande automáticamente al agregar nuevos sectores.
const allExtraFieldNames = [
  ...new Set(Object.values(sectorFields).flat().map((f) => f.name)),
];

const extraFieldsSchema = Object.fromEntries(
  allExtraFieldNames.map((name) => [name, z.string().optional()]),
) as Record<string, z.ZodOptional<z.ZodString>>;

export const contactSchema = z
  .object({
    nombre:       z.string().min(2, "Indica tu nombre"),
    empresa:      z.string().min(2, "Indica la empresa"),
    correo:       z.string().email("Ingresa un email válido"),
    telefono:     z.string().min(1, "Indica tu teléfono"),
    sector:       z.enum(SECTORES,       { error: "Selecciona un sector" }),
    tipoConsulta: z.enum(TIPOS_CONSULTA, { error: "Selecciona el tipo de consulta" }),
    mensaje:      z.string().min(12, "El mensaje es demasiado corto"),
    ...extraFieldsSchema,
  })
  .superRefine((data, ctx) => {
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
