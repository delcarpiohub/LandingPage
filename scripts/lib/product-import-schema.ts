import { z } from "zod";
import type { ProductCategory } from "../../src/lib/mock-products.ts";
import { productFilters } from "../../src/lib/mock-products.ts";
import { slugify } from "./matching.ts";

// Esquema Zod para una fila cruda de data/import/productos.csv. No existía
// un Zod de productos en el proyecto (src/lib/mock-products.ts valida solo
// por tipado estructural de TypeScript, sin runtime check) — este esquema
// es nuevo, derivado de los tipos `Product`/`ProductDetail` existentes en
// mock-products.ts, no de un Zod previo que no existe. Reportado al usuario.

const categorySet = new Set<string>(productFilters);

function isProductCategory(value: string): value is ProductCategory {
  return categorySet.has(value);
}

const rawRowSchema = z.object({
  slug: z.string().optional().default(""),
  marca: z.string().min(1, "marca es requerido"),
  categoria: z.string().min(1, "categoria es requerido"),
  nombre: z.string().min(1, "nombre es requerido"),
  modelo: z.string().min(1, "modelo es requerido"),
  resumen: z.string().optional().default(""),
  features: z.string().optional().default(""),
  specs: z.string().optional().default(""),
  tipo_ficha: z.string().optional().default("A"),
  modelos_comparados: z.string().optional().default(""),
  imagen_url: z.string().optional().default(""),
  cumplimiento: z.string().optional().default(""),
  fuente_cumplimiento: z.string().optional().default(""),
  aplicaciones: z.string().optional().default(""),
  pdf_url: z.string().optional().default(""),
  pdf_label: z.string().optional().default(""),
  pdf_idioma: z.string().optional().default(""),
  tags: z.string().optional().default(""),
  aliases: z.string().optional().default(""),
  familia: z.string().optional().default(""),
});

export type RawImportRow = z.infer<typeof rawRowSchema>;

export interface ParsedImportRow {
  raw: RawImportRow;
  rowNumber: number;
  slug: string;
  brand: string;
  category: ProductCategory | null;
  categoryRaw: string;
  name: string;
  model: string;
  description: string;
  features: string[];
  tipoFicha: "A" | "B";
  specs: { key: string; label: string; value: string }[];
  comparisonTiers: {
    id: string;
    label: string;
    specs: { key: string; label: string; value: string }[];
  }[];
  images: string[];
  complianceNotes: { title: string; text: string }[];
  fuenteCumplimiento: string;
  applications: { title: string; text: string }[];
  pdf: { url: string; label: string; idioma: string } | null;
  tags: string[];
  aliases: string[];
  familia: string;
  isRestek: boolean;
  errors: string[];
}

function splitList(value: string, sep = ";"): string[] {
  return value
    .split(sep)
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseLabelValue(pair: string, sep: string): { label: string; value: string } | null {
  const idx = pair.indexOf(sep);
  if (idx === -1) return null;
  return { label: pair.slice(0, idx).trim(), value: pair.slice(idx + sep.length).trim() };
}

function parseSpecs(value: string): { key: string; label: string; value: string }[] {
  return splitList(value)
    .map((pair) => {
      const lv = parseLabelValue(pair, "=");
      if (!lv) return null;
      return { key: slugify(lv.label), label: lv.label, value: lv.value };
    })
    .filter((v): v is { key: string; label: string; value: string } => v !== null);
}

function parseComparedModels(value: string): ParsedImportRow["comparisonTiers"] {
  if (!value.trim()) return [];
  return value
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((tier) => {
      const [id, label, specsBlock] = tier.split("|");
      const specs = (specsBlock ?? "")
        .split(",")
        .map((pair) => {
          const lv = parseLabelValue(pair.trim(), "=");
          if (!lv) return null;
          return { key: slugify(lv.label), label: lv.label, value: lv.value };
        })
        .filter((v): v is { key: string; label: string; value: string } => v !== null);
      return {
        id: (id ?? "").trim() || slugify(label ?? ""),
        label: (label ?? "").trim(),
        specs,
      };
    });
}

function parseTitleText(value: string): { title: string; text: string }[] {
  return splitList(value)
    .map((pair) => {
      const lv = parseLabelValue(pair, "|");
      if (!lv) return null;
      return { title: lv.label, text: lv.value };
    })
    .filter((v): v is { title: string; text: string } => v !== null);
}

/** Convierte y valida una fila cruda del CSV. No usa el resultado hasta
 * revisar `errors`: una fila con errores de forma (no de completitud de
 * negocio) debe rechazarse antes de intentar dedupe/import. */
export function parseImportRow(record: Record<string, string>, rowNumber: number): ParsedImportRow {
  const errors: string[] = [];
  const parsed = rawRowSchema.safeParse(record);
  if (!parsed.success) {
    errors.push(...parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
  }
  const raw = parsed.success ? parsed.data : rawRowSchema.parse({ ...record });

  const brand = raw.marca.trim();
  const isRestek = normalizeBrand(brand) === "restek";
  const categoryRaw = raw.categoria.trim();
  const category = isProductCategory(categoryRaw) ? categoryRaw : null;
  if (!category) {
    errors.push(
      `categoria "${categoryRaw}" no es una ProductCategory válida (ver productFilters en mock-products.ts)`,
    );
  }

  const tipoFicha: "A" | "B" = raw.tipo_ficha.trim().toUpperCase() === "B" ? "B" : "A";
  const images = splitList(raw.imagen_url, ",");
  const pdf = raw.pdf_url.trim()
    ? { url: raw.pdf_url.trim(), label: raw.pdf_label.trim() || "Ficha técnica", idioma: raw.pdf_idioma.trim() }
    : null;

  const slug = raw.slug.trim() ? slugify(raw.slug) : slugify(`${brand}-${raw.modelo}`);

  return {
    raw,
    rowNumber,
    slug,
    brand,
    category,
    categoryRaw,
    name: raw.nombre.trim(),
    model: raw.modelo.trim(),
    description: raw.resumen.trim(),
    features: splitList(raw.features),
    tipoFicha,
    specs: parseSpecs(raw.specs),
    comparisonTiers: parseComparedModels(raw.modelos_comparados),
    images,
    complianceNotes: parseTitleText(raw.cumplimiento),
    fuenteCumplimiento: raw.fuente_cumplimiento.trim(),
    applications: parseTitleText(raw.aplicaciones),
    pdf,
    tags: splitList(raw.tags),
    aliases: splitList(raw.aliases),
    familia: raw.familia.trim(),
    isRestek,
    errors,
  };
}

export function normalizeBrand(brand: string): string {
  return brand.trim().toLowerCase();
}

export interface CompletenessResult {
  complete: boolean;
  missing: string[];
}

/** Checklist de completitud de la tarea:
 * requeridos siempre = marca, categoría, nombre, modelo, resumen, specs, ≥1 imagen.
 * Si el fabricante lo respalda = cumplimiento con fuente_cumplimiento, aplicaciones, PDF (idioma etiquetado).
 * Familias B = tabla comparativa (comparisonTiers con ≥2 modelos).
 * Restek = patrón consultivo, sin specs ni PDF (exento de esos dos). */
export function evaluateCompleteness(row: ParsedImportRow): CompletenessResult {
  const missing: string[] = [];

  if (!row.brand) missing.push("marca");
  if (!row.category) missing.push("categoria (valor inválido o vacío)");
  if (!row.name) missing.push("nombre");
  if (!row.model) missing.push("modelo");
  if (!row.description) missing.push("resumen");
  if (!row.isRestek && row.specs.length === 0 && row.comparisonTiers.length === 0) {
    missing.push("specs (o modelos_comparados si tipo_ficha=B)");
  }
  if (row.images.length === 0) missing.push("imagen_url (al menos 1)");

  if (row.tipoFicha === "B" && row.comparisonTiers.length < 2) {
    missing.push("modelos_comparados (tipo_ficha=B requiere ≥2 modelos en la tabla comparativa)");
  }

  if (row.complianceNotes.length > 0 && !row.fuenteCumplimiento) {
    missing.push("fuente_cumplimiento (requerido porque hay texto de cumplimiento)");
  }

  if (!row.isRestek && row.pdf === null && row.complianceNotes.length > 0) {
    // El cumplimiento documentado normalmente viene de un folleto del
    // fabricante; si no hay PDF asociado, lo marcamos como incompleto para
    // revisión humana (no bloquea solo, pero se reporta).
    missing.push("pdf_url (hay cumplimiento declarado pero no hay folleto fuente adjunto)");
  }
  if (!row.isRestek && row.pdf && !row.pdf.idioma) {
    missing.push("pdf_idioma (todo PDF debe llevar idioma etiquetado)");
  }

  return { complete: missing.length === 0, missing };
}
