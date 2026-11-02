// Matching CON PUNTAJE para diff-catalog.ts.
//
// matchAgainstCatalog() en matching.ts sigue existiendo y sigue siendo el
// único usado para DEDUPE AUTOMÁTICO (import-products.ts, detección de
// duplicados internos en fetch-wp-products.ts) — ahí un falso positivo
// borraría trabajo, así que se queda estricto (slug/modelo/nombre/alias
// exactos, nunca similitud).
//
// Este módulo es distinto: solo alimenta candidatos.csv y dudosos.md para
// REVISIÓN HUMANA, nunca descarta nada por sí mismo. Existe porque con
// matchAgainstCatalog a secas, 173 de 178 productos de WordPress caían en
// "pendientes" (nuevo) y 0 en "dudosos" — la causa real es que WordPress casi
// nunca llena el campo `brands` (queda [] y `marca` vacía) y el nombre
// completo del producto rara vez coincide literalmente con el `modelo` del
// catálogo. La marca real vive en las categorías ("ThermoFisher Scientific",
// "Hyper Purex", "Decent"...) y el modelo real vive en una categoría hoja
// ("TSQ Altis Plus", "Orbitrap Exploris 480") o en el SKU.

import { normalizeModel } from "./matching.ts";

const GENERIC_PHRASES = [
  "espectrometro de masas",
  "sistema de",
  "analizador",
  "cromatografo de gases",
];

const STOPWORDS = new Set([
  "de",
  "la",
  "el",
  "los",
  "las",
  "y",
  "con",
  "para",
  "en",
  "del",
  "un",
  "una",
  "series",
  "serie",
  "the",
  "for",
  "with",
  "a",
]);

// Categorías de WordPress que son ruido de taxonomía (grupo genérico de
// catálogo, no marca ni modelo) y nunca deben tratarse como alias de
// producto. "marca" es literal: en el WP viejo las marcas cuelgan de un
// término padre llamado exactamente así.
const NOISE_CATEGORY_KEYS = new Set(
  ["marca", "lc y lc-ms", "lc-ms", "lc-ms-ms", "gc y gc-ms", "gc-ms", "gc-ms-ms"].map(
    normalizeModel,
  ),
);

// Marca derivada desde categorías de WordPress cuando `marca` viene vacío —
// confirmado en la corrida real contra delcarpio.cl: Hyperpurex, Decent,
// Hanon, ThermoFisher Scientific, etc. llegan con brands:[] pero el nombre
// de la marca está en la categoría.
const BRAND_CATEGORY_PATTERNS: Array<{ pattern: RegExp; brand: string }> = [
  { pattern: /thermo\s*fisher\s*scientific/, brand: "Thermo Scientific" },
  { pattern: /hyper\s*purex/, brand: "Hyperpurex" },
  { pattern: /\bdecent\b/, brand: "Decent" },
  { pattern: /\bdistek\b/, brand: "Distek" },
  { pattern: /\bsievers\b/, brand: "Sievers" },
  { pattern: /\bmilestone\b/, brand: "Milestone" },
  { pattern: /trace\s*elemental/, brand: "Trace Elemental" },
  { pattern: /\brestek\b/, brand: "Restek" },
  { pattern: /\bpeak\b/, brand: "Peak" },
  { pattern: /\bthermcraft\b/, brand: "Thermcraft" },
  { pattern: /\blabtech\b/, brand: "Labtech" },
  { pattern: /\bbmg\b/, brand: "BMG" },
  { pattern: /\bpsa\b/, brand: "PSA" },
  { pattern: /\bmicap\b/, brand: "MICAP" },
  { pattern: /\blaqua\b/, brand: "LAQUA" },
  { pattern: /\bhanon\b/, brand: "Hanon" },
];

function cleanLower(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[™®©]/g, "")
    .toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenize(text: string): string[] {
  let cleaned = cleanLower(text);
  for (const phrase of GENERIC_PHRASES) {
    cleaned = cleaned.replace(new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "g"), " ");
  }
  return cleaned
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

/** marca = la explícita si existe; si no, la primera que se reconozca en las
 * categorías de WordPress. Nunca inventa marcas fuera de la lista anterior. */
export function deriveBrand(
  explicitBrand: string | undefined,
  categories: string[],
): string | undefined {
  const explicit = (explicitBrand ?? "").trim();
  if (explicit) return explicit;
  for (const category of categories) {
    const normalized = cleanLower(category);
    for (const { pattern, brand } of BRAND_CATEGORY_PATTERNS) {
      if (pattern.test(normalized)) return brand;
    }
  }
  return undefined;
}

function isBrandCategory(category: string): boolean {
  const normalized = cleanLower(category);
  return BRAND_CATEGORY_PATTERNS.some(({ pattern }) => pattern.test(normalized));
}

/** Categorías hoja útiles como alias de modelo: descarta ruido de taxonomía
 * y categorías que solo indican la marca (esa ya se usa vía deriveBrand). */
export function usableCategoryAliases(categories: string[]): string[] {
  return categories.filter((category) => {
    const key = normalizeModel(category);
    if (!key) return false;
    if (NOISE_CATEGORY_KEYS.has(key)) return false;
    if (isBrandCategory(category)) return false;
    return true;
  });
}

/** Un SKU que es literalmente una copia del nombre del producto (visto en la
 * corrida real: WordPress a veces pega el nombre completo en el campo SKU)
 * no es un identificador real — se descarta para no inflar el puntaje. */
export function usableSku(sku: string, nombre: string): string {
  const trimmed = sku.trim();
  if (!trimmed) return "";
  if (normalizeModel(trimmed) === normalizeModel(nombre)) return "";
  return trimmed;
}

export interface TokenSet {
  all: Set<string>;
  codes: Set<string>; // tokens con al menos un dígito — identificador de modelo real (p.ej. "tsq9610", "480")
  words: Set<string>; // tokens sin dígitos — descriptivos, peso menor
}

export function buildTokenSet(parts: string[]): TokenSet {
  const all = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    for (const token of tokenize(part)) all.add(token);
  }
  const codes = new Set<string>();
  const words = new Set<string>();
  for (const token of all) (/\d/.test(token) ? codes : words).add(token);
  return { all, codes, words };
}

function intersectSize(a: Set<string>, b: Set<string>): number {
  let count = 0;
  for (const value of a) if (b.has(value)) count++;
  return count;
}

function intersectValues(a: Set<string>, b: Set<string>): string[] {
  return [...a].filter((value) => b.has(value));
}

export interface ScoreResult {
  score: number;
  evidence: string[];
}

/**
 * Puntúa un producto del catálogo contra los tokens de una fila externa
 * (WordPress). `core` son los tokens de modelo/alias del catálogo — el
 * identificador preciso; `extended` agrega los tokens del nombre completo
 * (descriptivo, peso menor). Nunca decide nada por sí sola: solo calcula
 * puntaje + evidencia para que diff-catalog.ts clasifique.
 *
 * Señal fuerte deliberada: si ambos lados tienen "tokens de código" (con
 * dígito, p.ej. modelos distintos de la misma marca como K9860 vs. K1160) y
 * NINGUNO coincide, el puntaje se tope bajo sin importar cuántas palabras
 * genéricas compartan — comparten marca y vocabulario descriptivo, pero son
 * productos distintos.
 */
export function scoreCandidate(
  external: TokenSet,
  core: TokenSet,
  extended: TokenSet,
  externalBrand: string | undefined,
  catalogBrand: string | undefined,
): ScoreResult {
  const evidence: string[] = [];

  const coreWords = core.words.size ? core.words : extended.words;
  const wordOverlap = intersectValues(external.words, coreWords);
  const containmentCore = coreWords.size ? wordOverlap.length / coreWords.size : 0;

  const extendedAll = new Set([...extended.all, ...core.all]);
  const explainedOverlap = intersectSize(external.all, extendedAll);
  const containmentExternal = external.all.size ? explainedOverlap / external.all.size : 0;

  let score = containmentCore * 0.65 + containmentExternal * 0.15;
  if (wordOverlap.length > 0) {
    evidence.push(`palabras en común: ${wordOverlap.join(", ")}`);
  }

  const coreCodes = core.codes.size ? core.codes : extended.codes;
  let codeConflict = false;
  if (coreCodes.size && external.codes.size) {
    const codeOverlap = intersectValues(external.codes, coreCodes);
    if (codeOverlap.length > 0) {
      score += 0.05;
      evidence.push(`códigos en común: ${codeOverlap.join(", ")}`);
    } else {
      codeConflict = true;
      evidence.push(
        `códigos NO coinciden: wp=[${[...external.codes].join(", ")}] catálogo=[${[...coreCodes].join(", ")}]`,
      );
    }
  }

  if (externalBrand && catalogBrand) {
    if (normalizeModel(externalBrand) === normalizeModel(catalogBrand)) {
      score += 0.15;
      evidence.push(`marca coincide (${catalogBrand})`);
    } else {
      score = Math.min(score, 0.45);
      evidence.push(`marca distinta (wp: ${externalBrand} vs. catálogo: ${catalogBrand})`);
    }
  }

  if (codeConflict) {
    score = Math.min(score, 0.35);
  }

  score = Math.max(0, Math.min(1, score));
  return { score, evidence };
}

export type MatchClass = "exacto" | "probable" | "posible" | "nuevo";

export function classify(score: number): MatchClass {
  if (score >= 0.8) return "probable";
  if (score >= 0.5) return "posible";
  return "nuevo";
}
