import type { Product } from "@/lib/mock-products";
import {
  catalogBrandOrder,
  catalogCategoryOrder,
  catalogProductPriority,
} from "@/content/catalog-order";

function productKey(product: Product): string {
  return product.slug ?? product.id;
}

function explicitOrderRank(product: Product, explicitOrder: string[] | undefined): number {
  if (!explicitOrder) return Number.POSITIVE_INFINITY;
  const index = explicitOrder.indexOf(productKey(product));
  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

function priorityOf(product: Product): number {
  return catalogProductPriority[productKey(product)] ?? product.catalogPriority ?? 0;
}

function brandRank(product: Product): number {
  const brand = product.detail?.brand;
  if (!brand) return Number.POSITIVE_INFINITY;
  const index = catalogBrandOrder.indexOf(brand);
  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

/**
 * Resta segura para comparadores de sort: dos rangos Infinity (ninguno de los
 * dos productos está en la lista/orden correspondiente) son un empate, no
 * `Infinity - Infinity = NaN`. Un comparador que devuelve NaN se trata como
 * "no reordenar" (posición de inserción) en V8, saltándose en silencio todos
 * los criterios siguientes — por eso se compara por igualdad antes de restar.
 */
function compareRanks(a: number, b: number): number {
  if (a === b) return 0;
  return a - b;
}

/**
 * Comparador de "Destacados" para `selectedFilter`, en este orden de
 * criterios:
 * 1. Lista explícita en catalogCategoryOrder para `selectedFilter` (si existe).
 * 2. catalogProductPriority[slug] ?? product.catalogPriority ?? 0, descendente.
 * 3. Posición de la marca en catalogBrandOrder.
 * 4. Alfabético por nombre.
 * Exportado (además de a través de sortFeatured) para que los checks puedan
 * probar pares de productos directamente, incluyendo que nunca devuelva NaN.
 */
export function compareFeatured(
  a: Product,
  b: Product,
  selectedFilter: string,
): number {
  const explicitOrder = catalogCategoryOrder[selectedFilter];

  const rankDiff = compareRanks(
    explicitOrderRank(a, explicitOrder),
    explicitOrderRank(b, explicitOrder),
  );
  if (rankDiff !== 0) return rankDiff;

  const priorityDiff = compareRanks(priorityOf(b), priorityOf(a));
  if (priorityDiff !== 0) return priorityDiff;

  const brandDiff = compareRanks(brandRank(a), brandRank(b));
  if (brandDiff !== 0) return brandDiff;

  return a.name.localeCompare(b.name);
}

/**
 * Orden "Destacados" del catálogo. No muta `products`: devuelve una copia
 * ordenada. Ver `compareFeatured` para los criterios.
 */
export function sortFeatured(products: Product[], selectedFilter: string): Product[] {
  const sorted = [...products];
  sorted.sort((a, b) => compareFeatured(a, b, selectedFilter));
  return sorted;
}
