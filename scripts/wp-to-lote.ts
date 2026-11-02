// Genera un lote de importación (CSV) a partir de data/import/wp-raw.json
// para una lista de wp_id de una sola marca, con las columnas exactas que
// espera scripts/import-products.ts. Solo lectura de wp-raw.json — no toca
// mock-products.ts, no corre tsc, no hace commit, no descarga nada. Sin
// dependencias nuevas: HTML de description/short_description se parsea con
// regex simple (sin cheerio/jsdom), a propósito.
//
// Uso:
//   node scripts/wp-to-lote.ts <marca> <wp_id...>
//   node scripts/wp-to-lote.ts Sievers 111455 111451 111449 111446 111435 111433 111430
//   node scripts/wp-to-lote.ts "Trace Elemental" 109457 109453 109452 109451 109444 109447
//   node scripts/wp-to-lote.ts Distek 111499 111481 111467 111461
//
// Salida: data/import/<marca-kebab>-lote-01.csv (lote) y
// data/import/<marca-kebab>-lote-01-notas.csv (wp_id, url_wp, advertencias).
//
// Reglas de extracción (ver instrucción original):
// - modelo: lo que sigue a "Numero de Parte:" en short_description; si no
//   hay, el sku; si no, el nombre.
// - resumen: short_description sin ese prefijo, primeras 2 oraciones; si
//   queda vacío, el primer párrafo de description.
// - features: ítems <li> de description (máx. 6, ≤120 caracteres).
// - specs: cada <tr> con exactamente 2 <td> como Label=Valor. Se quitan
//   notas al pie de la etiqueta (<sup> y dígitos/†/‡/* sueltos al final).
//   En el valor: ";" -> ",", "|" -> "/", "=" -> ":". Filas con valor vacío
//   se saltan.
// - imagen_url: todas las imágenes de WP, en el orden dado (principal
//   primero), separadas por coma.
// - slug: "<prefijo-de-marca>-<modelo en kebab>".
// - tipo_ficha=A; cumplimiento, fuente_cumplimiento, pdf_*, tags, aliases y
//   familia quedan vacíos a propósito (fuera de alcance de este script).
//
// Cualquier ambigüedad real (nota al pie quitada, specs sin tabla, feature
// descartada por larga, etc.) se registra en el CSV de notas en vez de
// resolverse en silencio — el lote generado no se importa solo: hay que
// revisarlo a mano antes de pegarlo en productos.csv.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "./lib/matching.ts";
import { toCsv } from "./lib/csv.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMPORT_DIR = resolve(ROOT, "data/import");
const WP_RAW_PATH = resolve(IMPORT_DIR, "wp-raw.json");

interface WpImage {
  src?: string;
}

interface WpProduct {
  id: number | string;
  name?: string;
  sku?: string;
  short_description?: string;
  description?: string;
  images?: WpImage[];
  permalink?: string;
}

interface BrandConfig {
  marca: string;
  slugPrefix: string;
  categoria: string;
}

// Prefijo de slug = convención ya usada por las fichas existentes de cada
// marca en mock-products.ts (sievers-, te-instruments-, distek-) — no es el
// mismo texto que el nombre de marca para Trace Elemental.
const BRANDS: Record<string, BrandConfig> = {
  sievers: { marca: "Sievers", slugPrefix: "sievers", categoria: "Análisis de agua" },
  "trace elemental": {
    marca: "Trace Elemental",
    slugPrefix: "te-instruments",
    categoria: "Análisis elemental",
  },
  distek: { marca: "Distek", slugPrefix: "distek", categoria: "Área farmacéutica" },
};

const CSV_COLUMNS = [
  "slug",
  "marca",
  "categoria",
  "nombre",
  "modelo",
  "resumen",
  "features",
  "specs",
  "tipo_ficha",
  "modelos_comparados",
  "imagen_url",
  "cumplimiento",
  "fuente_cumplimiento",
  "aplicaciones",
  "pdf_url",
  "pdf_label",
  "pdf_idioma",
  "tags",
  "aliases",
  "familia",
];

const [marcaArg, ...wpIdArgs] = process.argv.slice(2);
if (!marcaArg || wpIdArgs.length === 0) {
  console.error("Uso: node scripts/wp-to-lote.ts <marca> <wp_id...>");
  process.exit(1);
}

const brandConfig = BRANDS[marcaArg.trim().toLowerCase()];
if (!brandConfig) {
  console.error(
    `Marca desconocida: "${marcaArg}". Marcas soportadas: ${Object.values(BRANDS)
      .map((b) => b.marca)
      .join(", ")}.`,
  );
  process.exit(1);
}

if (!existsSync(WP_RAW_PATH)) {
  console.error(`No existe ${WP_RAW_PATH}. Corre scripts/fetch-wp-products.ts primero.`);
  process.exit(1);
}

const wpRaw = JSON.parse(readFileSync(WP_RAW_PATH, "utf-8")) as WpProduct[];
const byId = new Map<string, WpProduct>(wpRaw.map((p) => [String(p.id), p]));

// --- helpers HTML (regex, sin dependencias nuevas) -------------------------

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (full: string, name: string) => NAMED_ENTITIES[name] ?? full);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function htmlToText(html: string): string {
  return collapseWhitespace(decodeEntities(stripTags(html)));
}

function firstTwoSentences(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];
  return sentences.slice(0, 2).join(" ").trim();
}

// --- extracción por campo ---------------------------------------------------

function extractModelo(
  shortDescriptionHtml: string,
  sku: string,
  nombre: string,
  warnings: string[],
): string {
  const match = shortDescriptionHtml.match(/Numero de Parte:\s*([\s\S]*?)(?:<\/strong>|<\/p>)/i);
  if (match) {
    const modelo = htmlToText(match[1]);
    if (modelo) {
      if (/^modelo\b/i.test(modelo)) {
        warnings.push(
          `modelo incluye la palabra "Modelo" tal como viene de WP ("${modelo}") — revisar si hay que limpiarlo antes de importar (afecta también el slug)`,
        );
      }
      return modelo;
    }
  }
  if (sku.trim()) return sku.trim();
  warnings.push('sin "Numero de Parte:" en short_description ni sku en WP — modelo tomado del nombre completo');
  return nombre.trim();
}

function removeNumeroDeParteParagraph(html: string): string {
  return html.replace(/<p[^>]*>\s*<strong>\s*Numero de Parte:[\s\S]*?<\/strong>\s*<\/p>/i, "");
}

function extractResumen(shortDescriptionHtml: string, descriptionHtml: string, warnings: string[]): string {
  const withoutPrefix = removeNumeroDeParteParagraph(shortDescriptionHtml);
  let text = htmlToText(withoutPrefix);
  if (!text) {
    const firstParagraph = descriptionHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    text = firstParagraph ? htmlToText(firstParagraph[1]) : "";
    if (text) {
      warnings.push(
        "resumen tomado del primer párrafo de description (short_description quedó vacío tras quitar el prefijo)",
      );
    }
  }
  if (!text) {
    warnings.push("resumen vacío: no hay short_description utilizable ni párrafo en description");
  }
  return firstTwoSentences(text);
}

function extractFeatures(descriptionHtml: string, warnings: string[]): string[] {
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  const all: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = liRegex.exec(descriptionHtml))) {
    const text = htmlToText(m[1]);
    if (text) all.push(text);
  }
  const kept = all.filter((f) => f.length <= 120);
  const omittedLong = all.length - kept.length;
  if (omittedLong > 0) {
    warnings.push(`${omittedLong} feature(s) omitida(s) por superar 120 caracteres`);
  }
  if (kept.length > 6) {
    warnings.push(`${kept.length - 6} feature(s) adicionales disponibles en description pero no incluidas (tope de 6)`);
  }
  if (all.length === 0) {
    warnings.push("sin features (<li>) en description");
  }
  return kept.slice(0, 6);
}

interface ExtractedSpec {
  label: string;
  value: string;
}

function extractSpecs(descriptionHtml: string, warnings: string[]): ExtractedSpec[] {
  const specs: ExtractedSpec[] = [];
  const seenLabels = new Set<string>();
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch: RegExpExecArray | null;
  while ((trMatch = trRegex.exec(descriptionHtml))) {
    const rowHtml = trMatch[1];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
    let tdMatch: RegExpExecArray | null;
    while ((tdMatch = tdRegex.exec(rowHtml))) cells.push(tdMatch[1]);
    if (cells.length !== 2) continue; // <th> de sección (1 celda) u otra forma: no es un par label/valor

    const [rawLabel, rawValue] = cells;

    // Notas al pie: se quitan los <sup> completos (con su contenido) de la
    // etiqueta, y luego cualquier dígito/†/‡/* suelto que haya quedado al
    // final. El valor NO pasa por esto a propósito: ahí un <sup> puede ser
    // contenido real (ej. "R²"), no una nota al pie.
    const labelNoSup = rawLabel.replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "");
    const labelBeforeTrim = htmlToText(labelNoSup);
    const label = labelBeforeTrim.replace(/[\d†‡*]+$/, "").trim();
    if (label !== labelBeforeTrim) {
      warnings.push(`spec: nota al pie quitada de la etiqueta ("${labelBeforeTrim}" -> "${label}")`);
    }
    if (!label) continue;

    const rawValueText = htmlToText(rawValue);
    if (!rawValueText) continue; // salta filas con valor vacío

    const value = rawValueText.replace(/;/g, ",").replace(/\|/g, "/").replace(/=/g, ":");
    if (value !== rawValueText) {
      warnings.push(`spec "${label}": valor normalizado ("${rawValueText}" -> "${value}")`);
    }

    if (seenLabels.has(label)) {
      warnings.push(`spec con etiqueta duplicada: "${label}" (aparece más de una vez en la tabla de origen)`);
    }
    seenLabels.add(label);

    specs.push({ label, value });
  }
  if (specs.length === 0) {
    warnings.push("sin specs: no se encontró ninguna <tr> con 2 <td> en description");
  }
  return specs;
}

function extractImages(record: WpProduct): string[] {
  const images = Array.isArray(record.images) ? record.images : [];
  return images
    .map((img) => img.src)
    .filter((src): src is string => typeof src === "string" && src.length > 0);
}

// --- main --------------------------------------------------------------

const rows: Record<string, string>[] = [];
const notas: Record<string, string>[] = [];

for (const wpId of wpIdArgs) {
  const record = byId.get(wpId);
  if (!record) {
    notas.push({ wp_id: wpId, url_wp: "", advertencias: "wp_id no encontrado en wp-raw.json — fila omitida" });
    console.error(`wp_id ${wpId}: no encontrado en wp-raw.json, se omite.`);
    continue;
  }

  const warnings: string[] = [];
  const shortDescription = record.short_description ?? "";
  const description = record.description ?? "";
  const sku = record.sku ?? "";
  const nombre = record.name ?? "";
  if (!nombre) warnings.push("sin nombre (campo name vacío en WP)");

  const modelo = extractModelo(shortDescription, sku, nombre, warnings);
  const resumen = extractResumen(shortDescription, description, warnings);
  const features = extractFeatures(description, warnings);
  const specs = extractSpecs(description, warnings);
  const images = extractImages(record);
  if (images.length === 0) warnings.push("sin imágenes en WP");

  const modeloKebab = slugify(modelo);
  const slug = `${brandConfig.slugPrefix}-${modeloKebab}`;
  if (slug.includes(`${brandConfig.slugPrefix}-${brandConfig.slugPrefix}`)) {
    warnings.push(`slug con marca repetida ("${slug}") — el modelo ya traía el nombre de marca, revisar antes de importar`);
  }

  rows.push({
    slug,
    marca: brandConfig.marca,
    categoria: brandConfig.categoria,
    nombre,
    modelo,
    resumen,
    features: features.join(";"),
    specs: specs.map((s) => `${s.label}=${s.value}`).join(";"),
    tipo_ficha: "A",
    modelos_comparados: "",
    imagen_url: images.join(","),
    cumplimiento: "",
    fuente_cumplimiento: "",
    aplicaciones: "",
    pdf_url: "",
    pdf_label: "",
    pdf_idioma: "",
    tags: "",
    aliases: "",
    familia: "",
  });

  notas.push({
    wp_id: wpId,
    url_wp: record.permalink ?? "",
    advertencias: warnings.join(" | "),
  });
}

const kebabMarca = slugify(brandConfig.marca);
const lotePath = resolve(IMPORT_DIR, `${kebabMarca}-lote-01.csv`);
const notasPath = resolve(IMPORT_DIR, `${kebabMarca}-lote-01-notas.csv`);

writeFileSync(lotePath, toCsv(CSV_COLUMNS, rows), "utf-8");
writeFileSync(notasPath, toCsv(["wp_id", "url_wp", "advertencias"], notas), "utf-8");

console.log(`Escrito ${lotePath} (${rows.length} fila(s)).`);
console.log(`Escrito ${notasPath}.`);
