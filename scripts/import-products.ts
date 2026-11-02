// Importa data/import/productos.csv al catálogo (src/lib/mock-products.ts).
// --dry-run por defecto: valida, dedupea y genera data/import/reporte.md sin
// tocar el código fuente. Para escribir de verdad hay que pasar --write
// explícito (además del --dry-run que es el default, invertido: no hay doble
// negativo posible por accidente).
//
// Uso:
//   node scripts/import-products.ts                  (dry-run, reporte solo)
//   node scripts/import-products.ts --write           (importa de verdad)
//   node scripts/import-products.ts --write --update thermo-icap-tqs
//   node scripts/import-products.ts --dry-run --as-borrador  (fuerza borrador)
//
// Reglas (ver AGENTS.md / instrucción original):
// - Si slug o modelo normalizado ya existe en el catálogo: se omite, salvo
//   que su slug coincida exactamente con --update <slug>.
// - Celda vacía = campo ausente. Nunca se inventa texto para rellenar.
// - Ficha con requeridos incompletos -> status "borrador" (fuera de
//   catálogo público/buscador/sitemap, visible solo por URL directa).
// - --as-borrador: fuerza status "borrador" aunque el checklist esté
//   completo (para revisar un lote a mano antes de publicarlo). No cambia
//   el cálculo de completitud ni el checklist que se reporta.
// - PDFs e imágenes solo se descargan si su dominio está en
//   data/import/allowlist-dominios.txt (vacío por defecto a propósito).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { mockProducts, type Product, type ProductDetail } from "../src/lib/mock-products.ts";
import { parseCsv } from "./lib/csv.ts";
import { buildMatchKeys, matchAgainstCatalog, slugify } from "./lib/matching.ts";
import {
  evaluateCompleteness,
  parseImportRow,
  type ParsedImportRow,
} from "./lib/product-import-schema.ts";
import { downloadIfAllowed, isPdfUrl, loadAllowlist, publicPathFor } from "./lib/assets.ts";
import { toTsLiteral } from "./lib/ts-literal.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMPORT_DIR = resolve(ROOT, "data/import");
const PRODUCTOS_CSV = resolve(IMPORT_DIR, "productos.csv");
const ALLOWLIST_PATH = resolve(IMPORT_DIR, "allowlist-dominios.txt");
const MOCK_PRODUCTS_PATH = resolve(ROOT, "src/lib/mock-products.ts");
const REPORT_PATH = resolve(IMPORT_DIR, "reporte.md");

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const DRY_RUN = !WRITE;
const updateIndex = args.indexOf("--update");
const UPDATE_SLUG = updateIndex !== -1 ? args[updateIndex + 1] : null;
// Fuerza status "borrador" aunque el checklist de completitud diga que la
// ficha está completa — para lotes que se quieren revisar a mano antes de
// publicar, sin tener que vaciar un campo a propósito para forzar el
// borrador. No cambia el cálculo de completitud ni el checklist reportado.
const FORCE_BORRADOR = args.includes("--as-borrador");

if (!existsSync(PRODUCTOS_CSV)) {
  console.error(`No existe ${PRODUCTOS_CSV}.`);
  process.exit(1);
}

const allowlist = loadAllowlist(ALLOWLIST_PATH);
const rawRecords = parseCsv(readFileSync(PRODUCTOS_CSV, "utf-8"));

const catalogKeys = mockProducts.map((product) => ({
  product,
  key: buildMatchKeys({
    slug: product.slug ?? product.id,
    model: product.detail?.model,
    name: product.name,
    aliases: product.aliases,
  }),
  brand: product.detail?.brand,
}));

interface ReportEntry {
  row: ParsedImportRow;
  outcome: "importado" | "actualizado" | "omitido-duplicado" | "omitido-error" | "borrador";
  detail: string;
  missing?: string[];
  assetNotes: string[];
}

const report: ReportEntry[] = [];
const newProducts: Product[] = [];
let updateProduct: { slug: string; product: Product } | null = null;

for (let i = 0; i < rawRecords.length; i++) {
  const row = parseImportRow(rawRecords[i], i + 2); // +2: fila 1 es header

  if (row.errors.length > 0) {
    report.push({
      row,
      outcome: "omitido-error",
      detail: `Errores de forma: ${row.errors.join("; ")}`,
      assetNotes: [],
    });
    continue;
  }

  const match = catalogKeys
    .map((c) => ({ c, result: matchAgainstCatalog({ name: row.name, brand: row.brand, model: row.model }, { ...c.key, brand: c.brand }) }))
    .find((m) => m.result.kind === "exacto");

  if (match) {
    const matchedSlug = match.c.product.slug ?? match.c.product.id;
    const allowUpdate = UPDATE_SLUG && UPDATE_SLUG === matchedSlug && UPDATE_SLUG === row.slug;
    if (!allowUpdate) {
      report.push({
        row,
        outcome: "omitido-duplicado",
        detail: `Ya existe como "${matchedSlug}" (match por ${(match.result as { via: string }).via}). Usa --update ${matchedSlug} para actualizar explícitamente.`,
        assetNotes: [],
      });
      continue;
    }
  }

  const completeness = evaluateCompleteness(row);
  const assetNotes: string[] = [];

  // Imagen principal + galería.
  let imageUrl = "";
  const descriptionImages: { src: string; alt: string; caption: string }[] = [];
  for (let imgIdx = 0; imgIdx < row.images.length; imgIdx++) {
    const url = row.images[imgIdx];
    const ext = (url.split(".").pop() ?? "jpg").split("?")[0].toLowerCase();
    const filename = url.startsWith("/")
      ? ""
      : `imagen-${imgIdx + 1}.${ext}`;
    const dest = url.startsWith("/") ? null : publicPathFor(row.slug, filename);
    const result = await downloadIfAllowed(url, dest?.absolute ?? "", allowlist, DRY_RUN);
    if (!result.ok) {
      assetNotes.push(`imagen ${imgIdx + 1}: NO descargada — ${result.reason}`);
      continue;
    }
    const finalSrc = url.startsWith("/") ? url : dest!.relative;
    if (imgIdx === 0) {
      imageUrl = finalSrc;
    } else {
      descriptionImages.push({ src: finalSrc, alt: row.name, caption: row.name });
    }
    if (!DRY_RUN && !url.startsWith("/")) {
      assetNotes.push(`imagen ${imgIdx + 1}: descargada a ${dest!.relative}`);
    } else if (DRY_RUN && !url.startsWith("/")) {
      assetNotes.push(`imagen ${imgIdx + 1}: dry-run, allowlist OK, no se descargó (${url})`);
    }
  }
  if (!imageUrl) {
    // Sin imagen descargable: no inventamos un placeholder — queda vacío y
    // ya cuenta como campo faltante en `completeness`.
    imageUrl = "";
  }

  // PDF (documents genérico). Solo se acepta pdf_url que termine en ".pdf"
  // (sin query string) — antes la extensión local se hardcodeaba a "pdf" sin
  // mirar la URL real, así que una pdf_url que en verdad apuntara a un
  // .xlsx (u otro tipo) se descargaba y se guardaba igual con nombre
  // "*.pdf", mintiendo sobre el tipo de archivo. No se agrega soporte para
  // otros tipos: si no es .pdf, se rechaza y se reporta, el campo queda vacío.
  let documents: ProductDetail["documents"];
  if (row.pdf) {
    if (!isPdfUrl(row.pdf.url)) {
      assetNotes.push(
        `PDF: NO descargado — pdf_url no termina en .pdf (${row.pdf.url}); solo se aceptan PDFs`,
      );
    } else {
      const ext = "pdf";
      const filename = `${slugify(row.pdf.label)}.${ext}`;
      const dest = row.pdf.url.startsWith("/") ? null : publicPathFor(row.slug, filename);
      const result = await downloadIfAllowed(row.pdf.url, dest?.absolute ?? "", allowlist, DRY_RUN);
      if (!result.ok) {
        assetNotes.push(`PDF: NO descargado — ${result.reason}`);
      } else {
        const finalHref = row.pdf.url.startsWith("/") ? row.pdf.url : dest!.relative;
        documents = [
          {
            label: row.pdf.label,
            href: finalHref,
            idioma: row.pdf.idioma || undefined,
          },
        ];
        assetNotes.push(
          DRY_RUN
            ? `PDF: dry-run, allowlist OK, no se descargó (${row.pdf.url})`
            : `PDF: descargado a ${finalHref}`,
        );
      }
    }
  }

  const forcedBorrador = FORCE_BORRADOR && completeness.complete;
  if (forcedBorrador) {
    assetNotes.push("status forzado a borrador por --as-borrador (checklist completo)");
  }
  const status: Product["status"] =
    completeness.complete && !FORCE_BORRADOR ? undefined : "borrador";

  const product: Product = {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    // row.category no puede ser null aquí: si fuera inválido, row.errors ya
    // habría causado "omitido-error" antes de llegar a este punto.
    category: row.category!,
    filters: row.category ? [row.category] : undefined,
    description: row.description,
    features: row.features,
    imageUrl: imageUrl || "/productos/_sin-imagen.png",
    tags: row.tags.length ? row.tags : undefined,
    aliases: row.aliases.length ? row.aliases : undefined,
    status,
    detail: {
      brand: row.brand,
      model: row.model,
      fullTitle: row.name,
      subtitle: row.description,
      highlights: row.features,
      advantages: row.features,
      technicalParameters: [],
      detailBlocks: [],
      comparisonSpecs:
        row.tipoFicha === "A" && row.specs.length > 0 ? row.specs : undefined,
      comparisonTiers:
        row.tipoFicha === "B" && row.comparisonTiers.length > 0
          ? row.comparisonTiers
          : undefined,
      descriptionImages: descriptionImages.length ? descriptionImages : undefined,
      complianceNotes: row.complianceNotes.length
        ? row.complianceNotes.map((c) => ({
            title: c.title,
            text: row.fuenteCumplimiento
              ? `${c.text} (Fuente: ${row.fuenteCumplimiento})`
              : c.text,
          }))
        : undefined,
      applicationNotes: row.applications.length
        ? row.applications.map((a) => ({ label: a.title, text: a.text }))
        : undefined,
      documents,
    },
  };

  if (match && UPDATE_SLUG) {
    updateProduct = { slug: UPDATE_SLUG, product };
    report.push({
      row,
      outcome: "actualizado",
      detail: `--update ${UPDATE_SLUG}: ${DRY_RUN ? "(dry-run, no escrito)" : "escrito"}`,
      missing: completeness.missing,
      assetNotes,
    });
  } else {
    newProducts.push(product);
    report.push({
      row,
      outcome: completeness.complete && !FORCE_BORRADOR ? "importado" : "borrador",
      detail: forcedBorrador
        ? "Completo, pero forzado a borrador por --as-borrador."
        : completeness.complete
          ? "Completo, publicado."
          : "Incompleto: se importa como borrador (fuera de catálogo público/buscador/sitemap).",
      missing: completeness.missing,
      assetNotes,
    });
  }
}

// --- Escritura real (solo si --write) ---------------------------------
if (WRITE && (newProducts.length > 0 || updateProduct)) {
  const source = readFileSync(MOCK_PRODUCTS_PATH, "utf-8");
  // El archivo real está en CRLF (checkout de Windows) — un marcador con
  // "\n" a secas nunca matcheaba y --write abortaba siempre con "marcador
  // ausente", incluso con el archivo intacto. Se detecta el fin de línea
  // real en vez de asumirlo.
  const eol = source.includes("\r\n") ? "\r\n" : "\n";
  const marker = `${eol}];${eol}${eol}/** Subconjunto público:`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    console.error(
      "No se encontró el cierre del array mockProducts (marcador esperado ausente). Abortando sin escribir — revisar manualmente.",
    );
    process.exit(1);
  }

  let updated = source;
  if (newProducts.length > 0) {
    const literals = newProducts
      .map((p) => `  ${toTsLiteral(p, 1)},`)
      .join("\n");
    // toTsLiteral() genera "\n" a secas — normalizar al eol real del
    // archivo para no dejar líneas mezcladas LF/CRLF.
    const literalsEol = eol === "\r\n" ? literals.replace(/\n/g, "\r\n") : literals;
    updated =
      updated.slice(0, markerIndex) +
      `${eol}${literalsEol}` +
      updated.slice(markerIndex);
  }

  if (updateProduct) {
    const idAnchor = `id: "${updateProduct.slug}",`;
    const anchorIdx = updated.indexOf(idAnchor);
    if (anchorIdx === -1) {
      console.error(
        `--update ${updateProduct.slug}: no se encontró el anchor "${idAnchor}" en mock-products.ts. No se actualizó nada; revisar manualmente.`,
      );
    } else {
      const objStart = updated.lastIndexOf("{", anchorIdx);
      const objEnd = findMatchingBrace(updated, objStart);
      if (objEnd === -1) {
        console.error(
          `--update ${updateProduct.slug}: no se pudo determinar el cierre del objeto de forma segura. No se actualizó nada; revisar manualmente.`,
        );
      } else {
        const newLiteralRaw = toTsLiteral(updateProduct.product, 1);
        const newLiteral = eol === "\r\n" ? newLiteralRaw.replace(/\n/g, "\r\n") : newLiteralRaw;
        updated = updated.slice(0, objStart) + newLiteral + updated.slice(objEnd + 1);
      }
    }
  }

  writeFileSync(MOCK_PRODUCTS_PATH, updated, "utf-8");
  console.log(`Escrito ${MOCK_PRODUCTS_PATH}.`);

  // Assets copiados (si hubo) + código fuente: un commit por lote, solo si
  // el build/typecheck pasan limpios.
  try {
    // En Windows "npx" es en realidad "npx.cmd" (.cmd, no un ejecutable
    // real) y execFileSync() no puede spawnear eso directo: falla con
    // ENOENT, o con EINVAL si se apunta a "npx.cmd" a mano (visto en una
    // corrida real) — aunque "npx tsc" ande perfecto tipeado en la misma
    // terminal. Pasar shell:true lo arregla pero Node lo marca como riesgo
    // de seguridad (DEP0190) al combinarlo con args; en vez de eso, en
    // Windows se invoca a través de cmd.exe /c explícito — cmd.exe sí es un
    // ejecutable real, sin la opción shell, sin warning.
    if (process.platform === "win32") {
      execFileSync("cmd.exe", ["/c", "npx", "tsc", "--noEmit"], { cwd: ROOT, stdio: "inherit" });
    } else {
      execFileSync("npx", ["tsc", "--noEmit"], { cwd: ROOT, stdio: "inherit" });
    }
    execFileSync("git", ["add", "src/lib/mock-products.ts", "public/productos"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    const batchLabel = new Date().toISOString().slice(0, 16).replace("T", " ");
    execFileSync(
      "git",
      [
        "commit",
        "-m",
        `import: lote ${batchLabel} (${newProducts.length} nuevo(s)${updateProduct ? ", 1 actualizado" : ""})`,
      ],
      { cwd: ROOT, stdio: "inherit" },
    );
    console.log("Commit del lote creado.");
  } catch (err) {
    console.error(
      "tsc/commit del lote falló — el archivo QUEDÓ MODIFICADO sin commitear. Revisar manualmente antes de seguir importando.",
      (err as Error).message,
    );
  }
}

// --- Reporte -------------------------------------------------------------
mkdirSync(IMPORT_DIR, { recursive: true });
const lines: string[] = [
  `# Reporte de importación — ${new Date().toISOString()}`,
  "",
  `Modo: ${DRY_RUN ? "**dry-run** (nada se escribió)" : "**write** (se escribió mock-products.ts)"}`,
  UPDATE_SLUG ? `--update ${UPDATE_SLUG}` : "",
  FORCE_BORRADOR ? "--as-borrador: fuerza status borrador aunque el checklist esté completo" : "",
  "",
  `Filas leídas: ${rawRecords.length}`,
  `- Importadas (completas): ${report.filter((r) => r.outcome === "importado").length}`,
  `- Importadas como borrador (incompletas o forzadas por --as-borrador): ${report.filter((r) => r.outcome === "borrador").length}`,
  `- Actualizadas: ${report.filter((r) => r.outcome === "actualizado").length}`,
  `- Omitidas por duplicado: ${report.filter((r) => r.outcome === "omitido-duplicado").length}`,
  `- Omitidas por error de forma: ${report.filter((r) => r.outcome === "omitido-error").length}`,
  "",
  "## Detalle por fila",
  "",
];

for (const entry of report) {
  lines.push(`### Fila ${entry.row.rowNumber} — ${entry.row.name || "(sin nombre)"} [${entry.outcome}]`);
  lines.push(entry.detail);
  if (entry.missing && entry.missing.length > 0) {
    lines.push("Checklist incompleto:");
    for (const m of entry.missing) lines.push(`- [ ] ${m}`);
  }
  if (entry.assetNotes.length > 0) {
    lines.push("Assets:");
    for (const a of entry.assetNotes) lines.push(`- ${a}`);
  }
  lines.push("");
}

writeFileSync(REPORT_PATH, lines.join("\n"), "utf-8");
console.log(`Reporte escrito -> ${REPORT_PATH}`);
console.log(lines.slice(4, 11).join("\n"));

function findMatchingBrace(text: string, openIdx: number): number {
  let depth = 0;
  let inString: '"' | "'" | "`" | null = null;
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    const prev = text[i - 1];
    if (inString) {
      if (ch === inString && prev !== "\\") inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch as '"' | "'" | "`";
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
