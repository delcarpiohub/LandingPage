// Compara data/import/menu-wordpress.csv (columnas: nombre, marca, categoria,
// url_wp — provisto por el usuario) contra data/import/catalogo-actual.csv
// (generado por export-catalog.ts). Match SOLO por slug derivado del nombre,
// modelo normalizado o alias — NUNCA por similitud de nombre. Salidas:
//   data/import/pendientes.csv   -> no está en el sitio nuevo
//   data/import/ya-existen.csv   -> match exacto, ya está
//   data/import/dudosos.md       -> match parcial, requiere decisión humana
//
// Uso: node scripts/diff-catalog.ts
//   (requiere haber corrido antes: node scripts/export-catalog.ts)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv } from "./lib/csv.ts";
import { buildMatchKeys, matchAgainstCatalog } from "./lib/matching.ts";

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
    `No existe ${WP_PATH}. Coloca ahí el CSV con columnas: nombre, marca, categoria, url_wp`,
  );
  process.exit(1);
}

const catalogRows = parseCsv(readFileSync(CATALOGO_PATH, "utf-8"));
const wpRows = parseCsv(readFileSync(WP_PATH, "utf-8"));

const catalogKeys = catalogRows.map((row) => ({
  row,
  key: buildMatchKeys({
    slug: row.slug,
    model: row.modelo,
    name: row.nombre,
    aliases: (row.aliases ?? "").split(";").filter(Boolean),
  }),
  brand: row.marca,
}));

const pendientes: Record<string, string>[] = [];
const yaExisten: Record<string, string>[] = [];
const dudosos: { wpRow: Record<string, string>; detail: string }[] = [];

for (const wpRow of wpRows) {
  const nombre = (wpRow.nombre ?? "").trim();
  const marca = (wpRow.marca ?? "").trim();
  if (!nombre) continue;

  let bestMatch: { kind: string; detail: string; slug: string } | null = null;
  let partialMatch: { detail: string; slug: string } | null = null;

  for (const candidate of catalogKeys) {
    const result = matchAgainstCatalog(
      { name: nombre, brand: marca, model: nombre },
      { ...candidate.key, brand: candidate.brand },
    );
    if (result.kind === "exacto") {
      bestMatch = { kind: result.via, detail: result.detail, slug: candidate.row.slug };
      break;
    }
    if (result.kind === "parcial" && !partialMatch) {
      partialMatch = { detail: result.detail, slug: candidate.row.slug };
    }
  }

  if (bestMatch) {
    yaExisten.push({ ...wpRow, match_via: bestMatch.kind, match_slug: bestMatch.slug });
  } else if (partialMatch) {
    dudosos.push({
      wpRow,
      detail: `Posible match con "${partialMatch.slug}" — ${partialMatch.detail}`,
    });
  } else {
    pendientes.push(wpRow);
  }
}

mkdirSync(IMPORT_DIR, { recursive: true });

writeFileSync(
  resolve(IMPORT_DIR, "pendientes.csv"),
  toCsv(["nombre", "marca", "categoria", "url_wp"], pendientes),
  "utf-8",
);
writeFileSync(
  resolve(IMPORT_DIR, "ya-existen.csv"),
  toCsv(["nombre", "marca", "categoria", "url_wp", "match_via", "match_slug"], yaExisten),
  "utf-8",
);

const dudososLines = [
  "# Matches dudosos — requieren decisión humana",
  "",
  "Ninguno de estos se marcó como duplicado automáticamente: solo coinciden",
  "parcialmente (misma marca + modelo contenido uno en otro). Revisar uno por",
  "uno antes de importar o descartar.",
  "",
];
if (dudosos.length === 0) {
  dudososLines.push("(ninguno en esta corrida)");
} else {
  for (const d of dudosos) {
    dudososLines.push(
      `- **${d.wpRow.nombre}** (${d.wpRow.marca ?? "sin marca"}, ${d.wpRow.url_wp ?? "sin url"})`,
    );
    dudososLines.push(`  ${d.detail}`);
  }
}
writeFileSync(resolve(IMPORT_DIR, "dudosos.md"), dudososLines.join("\n") + "\n", "utf-8");

console.log(`Comparados ${wpRows.length} ítems de menu-wordpress.csv contra ${catalogRows.length} del catálogo actual.`);
console.log(`  pendientes.csv: ${pendientes.length} (no están en el sitio nuevo)`);
console.log(`  ya-existen.csv: ${yaExisten.length} (match exacto por slug/modelo/alias)`);
console.log(`  dudosos.md: ${dudosos.length} (match parcial, decisión humana)`);
