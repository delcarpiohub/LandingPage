// Verifica catalogCategoryOrder (src/content/catalog-order.ts) contra el
// catálogo real y contra sortFeatured/compareFeatured (src/lib/catalog-sort.ts):
//   1. Cada slug de cada lista existe en mockProducts.
//   2. Cada slug referenciado está publicado (status !== "borrador").
//   3. Ninguna lista tiene slugs duplicados.
//   4. sortFeatured(productosDelFiltro, filtro) deja los productos listados
//      en catalogCategoryOrder exactamente en ese orden, al inicio del
//      resultado (antes que cualquier producto no listado).
//   5. Regresión del bug de NaN (corregido 2026-11-12): en un filtro SIN
//      lista explícita, dos productos sin esa lista comparten rango
//      Infinity; `Infinity - Infinity` es NaN, y un comparador que devuelve
//      NaN se trata como "no reordenar" en V8 — así que priority/brand/
//      alfabético quedaban sin aplicarse nunca fuera de "Área farmacéutica".
//      Se verifica con datos reales que: (a) un producto con prioridad 1 va
//      antes que uno sin prioridad, (b) un producto Thermo Scientific va
//      antes que uno de otra marca cuando ambos tienen prioridad 0, y
//      (c) compareFeatured nunca devuelve NaN para ningún par de productos
//      en ningún filtro (con o sin lista explícita).
//
// Usa los módulos reales del sitio (alias "@/..."): correr con
//   npx tsx scripts/check-orden-catalogo.ts
// Códigos de salida: 0 = todo correcto. 1 = se encontró al menos un problema.

import { mockProducts, publishedProducts, productFilters, ProductCategory } from "../src/lib/mock-products.ts";
import { catalogCategoryOrder } from "../src/content/catalog-order.ts";
import { sortFeatured, compareFeatured } from "../src/lib/catalog-sort.ts";

let failures = 0;

function fail(message: string) {
  failures += 1;
  console.error(`✘ ${message}`);
}

const byKey = new Map(mockProducts.map((p) => [p.slug ?? p.id, p]));

for (const [filter, slugs] of Object.entries(catalogCategoryOrder)) {
  const seen = new Set<string>();

  for (const slug of slugs) {
    if (seen.has(slug)) {
      fail(`[${filter}] slug duplicado en catalogCategoryOrder: "${slug}".`);
    }
    seen.add(slug);

    const product = byKey.get(slug);
    if (!product) {
      fail(`[${filter}] slug "${slug}" no existe en mockProducts.`);
      continue;
    }
    if (product.status === "borrador") {
      fail(`[${filter}] slug "${slug}" existe pero está en borrador (no publicado).`);
    }
  }

  const productsInFilter = mockProducts.filter(
    (p) =>
      p.status !== "borrador" &&
      (p.category === filter || p.filters?.includes(filter as ProductCategory)),
  );

  const sorted = sortFeatured(productsInFilter, filter);
  const sortedKeys = sorted.map((p) => p.slug ?? p.id);
  const expectedLeading = slugs.filter((slug) => sortedKeys.includes(slug));

  const actualLeading = sortedKeys.slice(0, expectedLeading.length);
  if (JSON.stringify(actualLeading) !== JSON.stringify(expectedLeading)) {
    fail(
      `[${filter}] sortFeatured no deja la lista explícita al inicio en el orden esperado.\n` +
        `  Esperado: ${JSON.stringify(expectedLeading)}\n` +
        `  Obtenido: ${JSON.stringify(actualLeading)}`,
    );
  }
}

// --- Regresión del bug de NaN en compareFeatured (corregido 2026-11-12) ---
// Filtro real sin lista explícita en catalogCategoryOrder, para forzar el
// caso "ambos productos sin esa lista" (rango Infinity en ambos).
const NO_EXPLICIT_ORDER_FILTER = "Preparación de muestras";
if (catalogCategoryOrder[NO_EXPLICIT_ORDER_FILTER]) {
  fail(
    `[regresión NaN] "${NO_EXPLICIT_ORDER_FILTER}" ahora tiene una lista explícita en ` +
      `catalogCategoryOrder; el caso de prueba necesita un filtro SIN lista para forzar ` +
      `el empate en Infinity. Actualizar NO_EXPLICIT_ORDER_FILTER en este script.`,
  );
}

function getProduct(slug: string) {
  const product = byKey.get(slug);
  if (!product) {
    fail(`[regresión NaN] slug de prueba "${slug}" no existe en mockProducts.`);
  }
  return product;
}

// (a) Prioridad 1 (thermo-dionex-ase-350) debe ir antes que prioridad 0
// (hanon-sox606) aunque ninguno esté en una lista explícita. Con el bug,
// ambos comparten rango Infinity → NaN → el comparador nunca llegaba a
// mirar la prioridad.
const asePrioridad1 = getProduct("thermo-dionex-ase-350");
const hanonSinPrioridad = getProduct("hanon-sox606");
if (asePrioridad1 && hanonSinPrioridad) {
  const result = compareFeatured(asePrioridad1, hanonSinPrioridad, NO_EXPLICIT_ORDER_FILTER);
  if (!(result < 0)) {
    fail(
      `[regresión NaN] en "${NO_EXPLICIT_ORDER_FILTER}", "thermo-dionex-ase-350" ` +
        `(prioridad 1) debería ordenarse antes que "hanon-sox606" (sin prioridad). ` +
        `compareFeatured devolvió ${result}.`,
    );
  }
}

// (b) Con ambos en prioridad 0, Thermo Scientific (thermo-extreva-ase) debe
// ir antes que otra marca (milestone-ethos-up) por catalogBrandOrder. Con el
// bug, el mismo empate en Infinity del criterio 1 nunca dejaba llegar la
// comparación hasta la marca.
const thermoSinPrioridad = getProduct("thermo-extreva-ase");
const milestoneSinPrioridad = getProduct("milestone-ethos-up");
if (thermoSinPrioridad && milestoneSinPrioridad) {
  const result = compareFeatured(
    thermoSinPrioridad,
    milestoneSinPrioridad,
    NO_EXPLICIT_ORDER_FILTER,
  );
  if (!(result < 0)) {
    fail(
      `[regresión NaN] en "${NO_EXPLICIT_ORDER_FILTER}", "thermo-extreva-ase" (Thermo ` +
        `Scientific, prioridad 0) debería ordenarse antes que "milestone-ethos-up" ` +
        `(Milestone, prioridad 0). compareFeatured devolvió ${result}.`,
    );
  }
}

// (c) compareFeatured nunca debe devolver NaN, para ningún par de productos
// publicados en ningún filtro (con o sin lista explícita) — en ambos
// sentidos de la comparación.
let pairsChecked = 0;
for (const filter of productFilters) {
  if (filter === "Marcas") continue;
  const productsInFilter = publishedProducts.filter(
    (p) => p.category === filter || p.filters?.includes(filter),
  );
  for (let i = 0; i < productsInFilter.length; i += 1) {
    for (let j = i + 1; j < productsInFilter.length; j += 1) {
      const a = productsInFilter[i];
      const b = productsInFilter[j];
      const forward = compareFeatured(a, b, filter);
      const backward = compareFeatured(b, a, filter);
      pairsChecked += 1;
      if (Number.isNaN(forward) || Number.isNaN(backward)) {
        fail(
          `[regresión NaN] compareFeatured(${a.slug ?? a.id}, ${b.slug ?? b.id}, "${filter}") ` +
            `devolvió NaN (forward=${forward}, backward=${backward}).`,
        );
      }
    }
  }
}
if (pairsChecked === 0) {
  fail("[regresión NaN] no se probó ningún par de productos — revisar productFilters/publishedProducts.");
}

if (failures > 0) {
  console.error(`\n✘ check:orden-catalogo — ${failures} problema(s) encontrado(s).`);
  process.exit(1);
}

console.log(
  `✓ check:orden-catalogo — ${Object.keys(catalogCategoryOrder).length} filtro(s) con orden ` +
    `explícito verificados contra el catálogo real; ${pairsChecked} pares de productos ` +
    `verificados sin NaN en compareFeatured.`,
);
