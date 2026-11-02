// Baja el catálogo publicado del WordPress/WooCommerce viejo vía la Store
// API pública (solo GET, sin autenticación ni cookies — es la misma API que
// usa el carrito del sitio público, de solo lectura) y lo deja listo para
// diff-catalog.ts.
//
// Uso: node scripts/fetch-wp-products.ts
//
// Escribe:
//   data/import/wp-raw.json             (respuesta cruda completa, en .gitignore)
//   data/import/menu-wordpress.csv       (wp_id, nombre, slug_wp, marca, categorias,
//                                          sku, n_imagenes, largo_descripcion,
//                                          urls_pdf, url_wp)
//   data/import/wp-duplicados-internos.md (posibles duplicados dentro del propio WP)

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { toCsv } from "./lib/csv.ts";
import { buildMatchKeys, matchAgainstCatalog } from "./lib/matching.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMPORT_DIR = resolve(__dirname, "../data/import");
const BASE_URL = "https://www.delcarpio.cl/wp-json/wc/store/v1/products";
const PER_PAGE = 100;
const PAUSE_MS = 500;

// Valores de SKU que son relleno/placeholder, no un SKU real.
const SKU_FILLERS = new Set(["x", "xx", "xxx", "n/a", "na", "-", "none", "sin sku", "s/n"]);

interface WpImage {
  src: string;
  alt?: string;
}
interface WpTerm {
  id: number;
  name: string;
  slug: string;
}
interface WpProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  images: WpImage[];
  categories: WpTerm[];
  brands?: WpTerm[];
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPdfUrls(html: string): string[] {
  const urls = new Set<string>();
  const hrefRe = /href=["']([^"']+\.pdf)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(html)) !== null) {
    urls.add(m[1]);
  }
  return [...urls];
}

function cleanSku(sku: string): string {
  const trimmed = sku.trim();
  if (!trimmed) return "";
  return SKU_FILLERS.has(trimmed.toLowerCase()) ? "" : trimmed;
}

async function fetchAllProducts(): Promise<WpProduct[]> {
  const all: WpProduct[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${BASE_URL}?per_page=${PER_PAGE}&page=${page}`;
    console.log(`GET ${url}`);
    const res = await fetch(url, {
      method: "GET",
      credentials: "omit",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error(`  HTTP ${res.status} en página ${page} — se detiene la paginación acá.`);
      break;
    }
    const totalPagesHeader = res.headers.get("x-wp-totalpages");
    if (totalPagesHeader) totalPages = Number(totalPagesHeader) || totalPages;

    const batch = (await res.json()) as WpProduct[];
    if (!Array.isArray(batch) || batch.length === 0) {
      console.log(`  página ${page} vacía — fin de paginación.`);
      break;
    }
    all.push(...batch);
    console.log(`  +${batch.length} productos (acumulado: ${all.length}, totalPages=${totalPages})`);

    page++;
    if (page <= totalPages) await sleep(PAUSE_MS);
  }

  return all;
}

function findInternalDuplicates(products: WpProduct[]): string[] {
  const lines: string[] = [];
  const keyed = products.map((p) => ({
    product: p,
    key: buildMatchKeys({ slug: p.slug, name: p.name }),
    brand: p.brands?.[0]?.name,
  }));

  const reportedPairs = new Set<string>();
  for (let i = 0; i < keyed.length; i++) {
    for (let j = i + 1; j < keyed.length; j++) {
      const a = keyed[i];
      const b = keyed[j];
      if (a.product.id === b.product.id) continue;
      const result = matchAgainstCatalog(
        { name: b.product.name, brand: b.brand, model: b.product.name },
        { ...a.key, brand: a.brand },
      );
      if (result.kind === "ninguno") continue;
      const pairKey = [a.product.id, b.product.id].sort().join("-");
      if (reportedPairs.has(pairKey)) continue;
      reportedPairs.add(pairKey);
      lines.push(
        `- **${result.kind === "exacto" ? "DUPLICADO EXACTO" : "posible duplicado"}** (${(result as { via?: string }).via ?? "nombre"}): ` +
          `[${a.product.id}] "${a.product.name}" vs. [${b.product.id}] "${b.product.name}" — ${result.detail}`,
      );
    }
  }
  return lines;
}

async function main() {
  mkdirSync(IMPORT_DIR, { recursive: true });

  const products = await fetchAllProducts();
  console.log(`\nTotal productos bajados: ${products.length}`);

  writeFileSync(
    resolve(IMPORT_DIR, "wp-raw.json"),
    JSON.stringify(products, null, 2),
    "utf-8",
  );

  const rows = products.map((p) => ({
    wp_id: String(p.id),
    nombre: p.name,
    slug_wp: p.slug,
    marca: p.brands?.map((b) => b.name).join(";") ?? "",
    categorias: p.categories?.map((c) => c.name).join(";") ?? "",
    sku: cleanSku(p.sku ?? ""),
    n_imagenes: String(p.images?.length ?? 0),
    largo_descripcion: String(stripHtml(p.description ?? "").length),
    urls_pdf: extractPdfUrls(`${p.description ?? ""} ${p.short_description ?? ""}`).join(";"),
    url_wp: p.permalink,
  }));

  const columns = [
    "wp_id",
    "nombre",
    "slug_wp",
    "marca",
    "categorias",
    "sku",
    "n_imagenes",
    "largo_descripcion",
    "urls_pdf",
    "url_wp",
  ];
  writeFileSync(
    resolve(IMPORT_DIR, "menu-wordpress.csv"),
    toCsv(columns, rows),
    "utf-8",
  );
  console.log(`menu-wordpress.csv escrito con ${rows.length} filas.`);

  const dupLines = findInternalDuplicates(products);
  const mdLines = [
    "# Posibles duplicados dentro del propio WordPress",
    "",
    `Comparación por slug, nombre normalizado y marca (misma lógica que diff-catalog.ts —`,
    "nunca similitud difusa). Revisar antes de usar menu-wordpress.csv como fuente de verdad:",
    "si dos entradas son el mismo producto con distinto ID, probablemente solo una debe",
    "pasar a pendientes.csv.",
    "",
  ];
  if (dupLines.length === 0) {
    mdLines.push("(ninguno detectado)");
  } else {
    mdLines.push(...dupLines);
  }
  writeFileSync(
    resolve(IMPORT_DIR, "wp-duplicados-internos.md"),
    mdLines.join("\n") + "\n",
    "utf-8",
  );
  console.log(`wp-duplicados-internos.md: ${dupLines.length} posible(s) duplicado(s) interno(s).`);
}

main().catch((err) => {
  console.error("fetch-wp-products.ts falló:", err);
  process.exit(1);
});
