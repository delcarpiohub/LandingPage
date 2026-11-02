// Compara data/import/menu-wordpress.csv contra data/import/catalogo-actual.csv
// (generado por export-catalog.ts). Dos capas de matching, ninguna por
// similitud difusa de nombre libre:
//   1) EXACTO — slug / modelo normalizado / nombre normalizado / alias
//      normalizado iguales (matchAgainstCatalog, scripts/lib/matching.ts).
//   2) PUNTAJE — para todo lo que no matcheó exacto: tokens de modelo +
//      marca derivada de categorías cuando `marca` viene vacío
//      (scripts/lib/catalog-match.ts). Nunca descarta nada solo: clasifica
//      en probable (>=0.8), posible (0.5-0.8) o nuevo (<0.5) y manda
//      probable+posible a revisión humana.
//
// Salidas:
//   data/import/candidatos.csv   -> TODAS las filas de WordPress, el mejor
//                                    match del catálogo, puntaje y evidencia
//   data/import/pendientes.csv   -> clase "nuevo" (no está en el sitio nuevo)
//   data/import/ya-existen.csv   -> clase "exacto"
//   data/import/dudosos.md       -> clase "probable" + "posible", requiere
//                                    decisión humana, nunca se auto-descarta
//
// Uso: node scripts/diff-catalog.ts
//   (requiere haber corrido antes: node scripts/export-catalog.ts)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv } from "./lib/csv.ts";
import { buildMatchKeys, matchAgainstCatalog } from "./lib/matching.ts";
import {
  buildTokenSet,
  classify,
  deriveBrand,
  scoreCandidate,
  usableCategoryAliases,
  usableSku,
  type MatchClass,
  type TokenSet,
} from "./lib/catalog-match.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMPORT_DIR = resolve(__dirname, "../data/import");
const CATALOGO_PATH = resolve(IMPORT_DIR, "catalogo-actual.csv");
const WP_PATH = resolve(IMPORT_DIR, "menu-wordpress.csv");

if (!existsSync(CATALOGO_PATH)) {
  console.error(
    `No existe ${CATALOGO_PATH}. Corre primero: node scripts/export-catalog.ts`,
  );
  process.exit(1);
}
if (!existsSync(WP_PATH)) {
  console.error(
    `No existe ${WP_PATH}. Corre node scripts/fetch-wp-products.ts o coloca ahí un CSV con columnas: nombre, marca, categoria, url_wp`,
  );
  process.exit(1);
}

const catalogRows = parseCsv(readFileSync(CATALOGO_PATH, "utf-8"));
const wpRows = parseCsv(readFileSync(WP_PATH, "utf-8"));

interface CatalogEntry {
  row: Record<string, string>;
  matchKey: ReturnType<typeof buildMatchKeys>;
  brand: string;
  core: TokenSet;
  extended: TokenSet;
}

const catalogIndex: CatalogEntry[] = catalogRows.map((row) => {
  const aliases = (row.aliases ?? "").split(";").map((a) => a.trim()).filter(Boolean);
  return {
    row,
    matchKey: buildMatchKeys({
      slug: row.slug,
      model: row.modelo,
      name: row.nombre,
      aliases,
    }),
    brand: (row.marca ?? "").trim(),
    core: buildTokenSet([row.modelo ?? "", ...aliases]),
    extended: buildTokenSet([row.nombre ?? ""]),
  };
});

interface CandidateResult {
  wpRow: Record<string, string>;
  clase: MatchClass;
  score: number;
  slug: string;
  marcaCatalogo: string;
  modeloCatalogo: string;
  evidence: string[];
  wpBrandDerivada: string;
}

const results: CandidateResult[] = [];

for (const wpRow of wpRows) {
  const nombre = (wpRow.nombre ?? "").trim();
  if (!nombre) continue;

  const explicitBrand = (wpRow.marca ?? "").trim();
  const categories = (wpRow.categorias ?? "")
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
  const derivedBrand = deriveBrand(explicitBrand, categories);
  const aliasCategories = usableCategoryAliases(categories);
  const sku = usableSku(wpRow.sku ?? "", nombre);

  // Capa 1: match exacto (slug/modelo/nombre/alias normalizados) contra cada
  // producto del catálogo, igual que antes — si aparece, es lo más confiable
  // y no hace falta puntuar nada.
  let exact: { slug: string; marca: string; modelo: string; via: string; detail: string } | null =
    null;
  for (const candidate of catalogIndex) {
    const result = matchAgainstCatalog(
      { name: nombre, brand: derivedBrand ?? explicitBrand, model: nombre },
      { ...candidate.matchKey, brand: candidate.brand },
    );
    if (result.kind === "exacto") {
      exact = {
        slug: candidate.row.slug,
        marca: candidate.brand,
        modelo: candidate.row.modelo ?? "",
        via: result.via,
        detail: result.detail,
      };
      break;
    }
  }

  if (exact) {
    results.push({
      wpRow,
      clase: "exacto",
      score: 1,
      slug: exact.slug,
      marcaCatalogo: exact.marca,
      modeloCatalogo: exact.modelo,
      evidence: [`match exacto vía ${exact.via}: ${exact.detail}`],
      wpBrandDerivada: derivedBrand ?? "",
    });
    continue;
  }

  // Capa 2: puntaje por tokens de modelo + marca derivada de categorías.
  // Recorre TODO el catálogo y se queda con el mejor candidato — nunca se
  // descarta un producto solo porque el mejor puntaje sea bajo, solo se
  // clasifica como "nuevo".
  const externalTokens = buildTokenSet([nombre, ...aliasCategories, sku]);

  let best: { entry: CatalogEntry; score: number; evidence: string[] } | null = null;
  for (const candidate of catalogIndex) {
    const { score, evidence } = scoreCandidate(
      externalTokens,
      candidate.core,
      candidate.extended,
      derivedBrand,
      candidate.brand,
    );
    if (!best || score > best.score) {
      best = { entry: candidate, score, evidence };
    }
  }

  if (!best) {
    results.push({
      wpRow,
      clase: "nuevo",
      score: 0,
      slug: "",
      marcaCatalogo: "",
      modeloCatalogo: "",
      evidence: ["catálogo vacío"],
      wpBrandDerivada: derivedBrand ?? "",
    });
    continue;
  }

  results.push({
    wpRow,
    clase: classify(best.score),
    score: best.score,
    slug: best.entry.row.slug,
    marcaCatalogo: best.entry.brand,
    modeloCatalogo: best.entry.row.modelo ?? "",
    evidence: best.evidence,
    wpBrandDerivada: derivedBrand ?? "",
  });
}

mkdirSync(IMPORT_DIR, { recursive: true });

// Las columnas de salida siguen las de menu-wordpress.csv tal cual vengan
// (el CSV simple nombre/marca/categoria/url_wp del encargo original, o el
// más rico que escribe fetch-wp-products.ts) — así no se pierden columnas
// ni quedan vacías por un nombre hardcodeado que no coincide con el header
// real.
const wpColumns =
  wpRows.length > 0 ? Object.keys(wpRows[0]) : ["nombre", "marca", "categoria", "url_wp"];

// candidatos.csv: TODAS las filas de WordPress con su mejor match, puntaje y
// evidencia — el insumo para auditar el matching en sí, no solo sus salidas.
const candidatosColumns = [
  ...wpColumns,
  "marca_derivada",
  "clase",
  "score",
  "slug_candidato",
  "marca_catalogo",
  "modelo_catalogo",
  "evidencia",
];
const candidatosRows = results.map((r) => ({
  ...r.wpRow,
  marca_derivada: r.wpBrandDerivada,
  clase: r.clase,
  score: r.score.toFixed(2),
  slug_candidato: r.slug,
  marca_catalogo: r.marcaCatalogo,
  modelo_catalogo: r.modeloCatalogo,
  evidencia: r.evidence.join(" | "),
}));
writeFileSync(
  resolve(IMPORT_DIR, "candidatos.csv"),
  toCsv(candidatosColumns, candidatosRows),
  "utf-8",
);

const pendientes = results.filter((r) => r.clase === "nuevo").map((r) => r.wpRow);
writeFileSync(resolve(IMPORT_DIR, "pendientes.csv"), toCsv(wpColumns, pendientes), "utf-8");

const yaExisten = results
  .filter((r) => r.clase === "exacto")
  .map((r) => ({ ...r.wpRow, match_via: r.evidence[0] ?? "", match_slug: r.slug }));
writeFileSync(
  resolve(IMPORT_DIR, "ya-existen.csv"),
  toCsv([...wpColumns, "match_via", "match_slug"], yaExisten),
  "utf-8",
);

const dudosos = results.filter((r) => r.clase === "probable" || r.clase === "posible");
const probables = dudosos.filter((r) => r.clase === "probable").sort((a, b) => b.score - a.score);
const posibles = dudosos.filter((r) => r.clase === "posible").sort((a, b) => b.score - a.score);

function renderDudoso(r: CandidateResult): string[] {
  return [
    `- **${r.wpRow.nombre}** (${r.wpRow.marca || r.wpBrandDerivada || "sin marca"}, ${r.wpRow.url_wp ?? "sin url"})`,
    `  Puntaje: ${r.score.toFixed(2)} — candidato: \`${r.slug}\` (${r.marcaCatalogo} ${r.modeloCatalogo})`,
    `  ${r.evidence.join(" | ")}`,
  ];
}

const dudososLines = [
  "# Matches dudosos — requieren decisión humana",
  "",
  "Ninguno de estos se marcó como duplicado automáticamente: son el mejor",
  "candidato del catálogo por puntaje de tokens de modelo + marca (derivada de",
  "categorías cuando WordPress no trae `marca`), no por similitud de nombre.",
  "Revisar uno por uno antes de importar o descartar — ver el detalle de cada",
  "puntaje en `candidatos.csv`.",
  "",
  `## Probable (score >= 0.8) — ${probables.length}`,
  "",
];
if (probables.length === 0) {
  dudososLines.push("(ninguno en esta corrida)");
} else {
  for (const r of probables) dudososLines.push(...renderDudoso(r));
}
dudososLines.push("", `## Posible (0.5 <= score < 0.8) — ${posibles.length}`, "");
if (posibles.length === 0) {
  dudososLines.push("(ninguno en esta corrida)");
} else {
  for (const r of posibles) dudososLines.push(...renderDudoso(r));
}
writeFileSync(resolve(IMPORT_DIR, "dudosos.md"), dudososLines.join("\n") + "\n", "utf-8");

const nuevos = results.filter((r) => r.clase === "nuevo");
const exactos = results.filter((r) => r.clase === "exacto");

console.log(
  `Comparados ${wpRows.length} ítems de menu-wordpress.csv contra ${catalogRows.length} del catálogo actual.`,
);
console.log(`  exacto:   ${exactos.length} -> ya-existen.csv`);
console.log(`  probable: ${probables.length} (score >= 0.8) -> dudosos.md`);
console.log(`  posible:  ${posibles.length} (0.5 <= score < 0.8) -> dudosos.md`);
console.log(`  nuevo:    ${nuevos.length} (score < 0.5) -> pendientes.csv`);
console.log(`  candidatos.csv: ${results.length} filas (todas, con puntaje y evidencia)`);

if (probables.length > 0) {
  console.log(`\nTop ${Math.min(20, probables.length)} "probable" por puntaje:`);
  for (const r of probables.slice(0, 20)) {
    console.log(
      `  ${r.score.toFixed(2)}  "${r.wpRow.nombre}"  ->  ${r.slug} (${r.marcaCatalogo} ${r.modeloCatalogo})`,
    );
  }
}
