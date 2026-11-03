// Verifica, sobre el build de producción YA GENERADO en .next, que ninguna
// superficie pública (fichas publicadas, /productos, el home, el mega-menú
// y el sitemap) enlace a un producto con status "borrador".
//
// No parsea mock-products.ts con un AST (serían dependencias nuevas): usa
// el mismo patrón de indentación de 2 espacios que separa cada objeto
// top-level del array (ver nota CRLF del commit a9fd3c2 — por eso se
// normaliza \r\n antes de todo). Para las fichas, /productos y el home lee
// directo el HTML ya renderizado en .next/server/app/**. El sitemap.xml no
// queda como archivo estático dentro de .next (es un route handler
// compilado), así que para esa única superficie se levanta brevemente
// `next start` sobre el build ya hecho, se lee /sitemap.xml por HTTP, y se
// apaga. Sin dependencias nuevas: solo fs/path/child_process/fetch nativos
// de Node (24.x en esta máquina).
//
// Uso:
//   npm run build   (con NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY
//                     en el entorno si se compila en modo producción)
//   node scripts/check-borradores.ts
//
// Códigos de salida:
//   0 = no se encontró ninguna fuga.
//   1 = se encontró al menos una fuga (reportada en la tabla).
//   2 = no se pudo correr la verificación (falta el build, etc.) — no es
//       un veredicto sobre fugas, es un error de precondición.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, type ChildProcess } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MOCK_PRODUCTS_PATH = path.join(ROOT, "src/lib/mock-products.ts");
const NEXT_APP_DIR = path.join(ROOT, ".next/server/app");
const NEXT_BIN = path.join(ROOT, "node_modules/next/dist/bin/next");
const SITEMAP_PORT = 4178;

type ProductRef = { id: string; slug: string; isBorrador: boolean };

type Finding = {
  origen: string;
  destino: string;
  componente: string;
};

function parseMockProducts(): ProductRef[] {
  const raw = readFileSync(MOCK_PRODUCTS_PATH, "utf8").replace(/\r\n/g, "\n");

  const arrayStart = raw.indexOf("export const mockProducts");
  if (arrayStart === -1) {
    throw new Error("No se encontró 'export const mockProducts' en mock-products.ts");
  }
  const arrayEnd = raw.indexOf("\nexport const publishedProducts", arrayStart);
  if (arrayEnd === -1) {
    throw new Error("No se encontró 'export const publishedProducts' (límite del array) en mock-products.ts");
  }
  const body = raw.slice(arrayStart, arrayEnd);

  // Cada producto top-level arranca con una línea "  {" (2 espacios) y
  // termina con "  }," (2 espacios) antes del siguiente "  {". Los objetos
  // anidados (detail, comparisonTiers, images, etc.) están más indentados,
  // así que este separador no entra en ellos.
  const chunks = body.split(/\n {2}\},\n {2}\{\n/);

  const products: ProductRef[] = [];
  for (const chunk of chunks) {
    const idMatch = chunk.match(/ {2,4}id:\s*"([^"]+)"/);
    if (!idMatch) continue;
    const slugMatch = chunk.match(/ {2,4}slug:\s*"([^"]+)"/);
    const statusMatch = chunk.match(/ {2,4}status:\s*"borrador"/);
    products.push({
      id: idMatch[1],
      slug: slugMatch ? slugMatch[1] : idMatch[1],
      isBorrador: Boolean(statusMatch),
    });
  }

  if (products.length === 0) {
    throw new Error("El parseo de mock-products.ts no encontró ningún producto — revisar el separador de chunks");
  }
  return products;
}

// Clases CSS exclusivas de cada componente que hoy puede renderizar un
// enlace a /productos/<slug>. Si alguno de estos componentes cambia sus
// clases, el fingerprint dejará de reconocerlo y el hallazgo caerá en
// "desconocido" (igual se reporta el enlace, solo cambia el nombre).
const COMPONENT_FINGERPRINTS: { name: string; test: RegExp }[] = [
  {
    name: "Sidebar de categorías (ProductDetailSidebar)",
    test: /text-left text-\[12\.5px\] font-medium text-\[#4A5560\] transition-colors hover:bg-white/,
  },
  {
    name: "Productos Relacionados (RelatedProductsCarousel)",
    test: /bg-\[#B4563B\] text-white text-\[13px\] font-bold py-3 rounded-\[2px\]/,
  },
  {
    name: "Analizadores compatibles (CompatibleAnalyzersSection)",
    test: /hover:border-\[#D6532B\]\/50 hover:shadow-\[0_12px_30px_rgba\(74,85,96,0\.12\)\]/,
  },
  {
    name: "Mega-menú desktop (catalog-mega-menu)",
    test: /min-h-12 items-center justify-between gap-3 py-2 text-sm leading-5 hover:text-\[#D6532B\]/,
  },
  {
    name: "Mega-menú mobile (catalog-mega-menu)",
    test: /min-h-11 items-center px-3 py-2 text-sm leading-5 text-white/,
  },
];

function guessComponent(contextBefore: string): string {
  let best: { name: string; index: number } | undefined;
  for (const fp of COMPONENT_FINGERPRINTS) {
    const match = fp.test.exec(contextBefore);
    if (match) {
      const end = match.index + match[0].length;
      if (!best || end > best.index) best = { name: fp.name, index: end };
    }
  }
  return best?.name ?? "desconocido (ver contexto en el reporte verbose)";
}

const PRODUCT_HREF_RE = /href="\/productos\/([a-z0-9][a-z0-9-]*)"/g;
const CONTEXT_WINDOW = 600;

function scanHtmlForBorradorLinks(
  html: string,
  origen: string,
  borradorSlugs: Set<string>,
): Finding[] {
  const findings: Finding[] = [];
  let match: RegExpExecArray | null;
  PRODUCT_HREF_RE.lastIndex = 0;
  while ((match = PRODUCT_HREF_RE.exec(html))) {
    const slug = match[1];
    if (!borradorSlugs.has(slug)) continue;
    const contextBefore = html.slice(Math.max(0, match.index - CONTEXT_WINDOW), match.index);
    findings.push({
      origen,
      destino: slug,
      componente: guessComponent(contextBefore),
    });
  }
  return findings;
}

function checkPublishedPages(products: ProductRef[], borradorSlugs: Set<string>): Finding[] {
  const findings: Finding[] = [];
  const published = products.filter((p) => !p.isBorrador);

  for (const product of published) {
    const htmlPath = path.join(NEXT_APP_DIR, "productos", `${product.slug}.html`);
    if (!existsSync(htmlPath)) continue; // no se generó esa página estática; nada que auditar
    const html = readFileSync(htmlPath, "utf8");
    findings.push(
      ...scanHtmlForBorradorLinks(html, `/productos/${product.slug}`, borradorSlugs),
    );
  }

  const productosIndex = path.join(NEXT_APP_DIR, "productos.html");
  if (existsSync(productosIndex)) {
    const html = readFileSync(productosIndex, "utf8");
    findings.push(...scanHtmlForBorradorLinks(html, "/productos (listado)", borradorSlugs));
  }

  const home = path.join(NEXT_APP_DIR, "index.html");
  if (existsSync(home)) {
    const html = readFileSync(home, "utf8");
    findings.push(...scanHtmlForBorradorLinks(html, "/ (home)", borradorSlugs));
  }

  return findings;
}

function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error(`Timeout esperando que ${url} responda`));
          } else {
            setTimeout(tryOnce, 300);
          }
        });
    };
    tryOnce();
  });
}

async function checkSitemap(borradorSlugs: Set<string>): Promise<Finding[]> {
  if (!existsSync(NEXT_BIN)) {
    console.warn("Aviso: no se encontró node_modules/next/dist/bin/next — se omite la verificación del sitemap.");
    return [];
  }

  const env = {
    ...process.env,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA",
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ?? "1x0000000000000000000000000000000AA",
  };

  let server: ChildProcess | undefined;
  try {
    server = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(SITEMAP_PORT)], {
      cwd: ROOT,
      env,
      stdio: "ignore",
    });

    const url = `http://localhost:${SITEMAP_PORT}/sitemap.xml`;
    await waitForServer(url, 30_000);
    const res = await fetch(url);
    const xml = await res.text();

    const findings: Finding[] = [];
    const locRe = /<loc>https?:\/\/[^/<]+\/productos\/([a-z0-9][a-z0-9-]*)<\/loc>/g;
    let match: RegExpExecArray | null;
    while ((match = locRe.exec(xml))) {
      const slug = match[1];
      if (borradorSlugs.has(slug)) {
        findings.push({ origen: "sitemap.xml", destino: slug, componente: "sitemap (<loc>)" });
      }
    }
    return findings;
  } finally {
    // Esperar el evento "exit" (no solo llamar kill()) evita una condición
    // de carrera con libuv en Windows: si el proceso del script termina
    // mientras el handle del hijo todavía está cerrándose, node revienta
    // con "Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)".
    if (server && server.exitCode === null && !server.killed) {
      await new Promise<void>((resolve) => {
        server!.once("exit", () => resolve());
        server!.kill();
      });
    }
  }
}

function printReport(findings: Finding[]): void {
  if (findings.length === 0) {
    console.log("✓ check:borradores — no se encontraron fugas de productos borrador en superficies públicas.");
    return;
  }

  console.error(`✗ check:borradores — ${findings.length} fuga(s) encontrada(s):\n`);
  const colWidths = {
    origen: Math.max(6, ...findings.map((f) => f.origen.length)),
    destino: Math.max(7, ...findings.map((f) => f.destino.length)),
  };
  const pad = (s: string, w: number) => s.padEnd(w, " ");
  console.error(`${pad("ORIGEN", colWidths.origen)}  ${pad("DESTINO (borrador)", colWidths.destino)}  COMPONENTE PROBABLE`);
  for (const f of findings) {
    console.error(`${pad(f.origen, colWidths.origen)}  ${pad(f.destino, colWidths.destino)}  ${f.componente}`);
  }
}

async function main() {
  if (!existsSync(NEXT_APP_DIR)) {
    console.error(
      `No existe ${path.relative(ROOT, NEXT_APP_DIR)} — corré "npm run build" antes de este script.`,
    );
    process.exit(2);
  }

  let products: ProductRef[];
  try {
    products = parseMockProducts();
  } catch (err) {
    console.error(`Error leyendo mock-products.ts: ${(err as Error).message}`);
    process.exit(2);
    return;
  }

  const borradorSlugs = new Set(products.filter((p) => p.isBorrador).map((p) => p.slug));
  if (borradorSlugs.size === 0) {
    console.log("No hay productos con status \"borrador\" en mock-products.ts — nada que verificar.");
    process.exit(0);
  }

  const findings: Finding[] = [];
  findings.push(...checkPublishedPages(products, borradorSlugs));
  findings.push(...(await checkSitemap(borradorSlugs)));

  printReport(findings);
  // No se usa process.exit() acá: ya se esperó el "exit" del proceso hijo
  // de next start, así que dejar que el event loop drene solo es seguro y
  // evita forzar una salida mientras un handle todavía se está cerrando.
  process.exitCode = findings.length > 0 ? 1 : 0;
}

main().catch((err) => {
  console.error("Error inesperado corriendo check-borradores:", err);
  process.exit(2);
});
