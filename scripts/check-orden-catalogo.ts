// Verifica catalogCategoryOrder (src/content/catalog-order.ts) contra el
// catálogo real y contra sortFeatured (src/lib/catalog-sort.ts):
//   1. Cada slug de cada lista existe en mockProducts.
//   2. Cada slug referenciado está publicado (status !== "borrador").
//   3. Ninguna lista tiene slugs duplicados.
//   4. sortFeatured(productosDelFiltro, filtro) deja los productos listados
//      en catalogCategoryOrder exactamente en ese orden, al inicio del
//      resultado (antes que cualquier producto no listado).
//
// Usa los módulos reales del sitio (alias "@/..."): correr con
//   npx tsx scripts/check-orden-catalogo.ts
// Códigos de salida: 0 = todo correcto. 1 = se encontró al menos un problema.

import { mockProducts, ProductCategory } from "../src/lib/mock-products.ts";
import { catalogCategoryOrder } from "../src/content/catalog-order.ts";
import { sortFeatured } from "../src/lib/catalog-sort.ts";

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

if (failures > 0) {
  console.error(`\n✘ check:orden-catalogo — ${failures} problema(s) encontrado(s).`);
  process.exit(1);
}

console.log(
  `✓ check:orden-catalogo — ${Object.keys(catalogCategoryOrder).length} filtro(s) con orden explícito verificados contra el catálogo real.`,
);
