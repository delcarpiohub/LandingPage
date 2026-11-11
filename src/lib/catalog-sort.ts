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
 * Orden "Destacados" del catálogo. No muta `products`: devuelve una copia
 * ordenada. Reglas, en este orden:
 * 1. Lista explícita en catalogCategoryOrder para `selectedFilter` (si existe).
 * 2. catalogProductPriority[slug] ?? product.catalogPriority ?? 0, descendente.
 * 3. Posición de la marca en catalogBrandOrder.
 * 4. Alfabético por nombre.
 */
export function sortFeatured(products: Product[], selectedFilter: string): Product[] {
  const explicitOrder = catalogCategoryOrder[selectedFilter];
  const sorted = [...products];

  sorted.sort((a, b) => {
    const rankDiff = explicitOrderRank(a, explicitOrder) - explicitOrderRank(b, explicitOrder);
    if (rankDiff !== 0) return rankDiff;

    const priorityDiff = priorityOf(b) - priorityOf(a);
    if (priorityDiff !== 0) return priorityDiff;

    const brandDiff = brandRank(a) - brandRank(b);
    if (brandDiff !== 0) return brandDiff;

    return a.name.localeCompare(b.name);
  });

  return sorted;
}
