import { ethosFamily, isEthosModelSlug } from "@/content/milestone-ethos";
import type { Product } from "@/lib/mock-products";

/**
 * Tarjeta de la familia ETHOS en el listado de /productos (DESIGN.md sección
 * 23). No es una ficha: no está en `mockProducts`, así que no entra al
 * sitemap, al buscador ni al comparador. Los campos técnicos van vacíos.
 */
const ethosFamilyEntry: Product = {
  id: ethosFamily.slug,
  slug: ethosFamily.slug,
  name: ethosFamily.name,
  category: "Preparación de muestras",
  description: ethosFamily.lead,
  features: [],
  imageUrl: ethosFamily.image,
  detail: {
    brand: ethosFamily.brand,
    model: ethosFamily.model,
    fullTitle: ethosFamily.name,
    subtitle: ethosFamily.lead,
    highlights: [],
    advantages: [],
    technicalParameters: [],
    detailBlocks: [],
  },
};

/** true si la entrada del listado representa a una familia y no a una ficha. */
export function isFamilyEntry(entry: Product) {
  return entry === ethosFamilyEntry;
}

/**
 * Reemplaza los modelos de la familia por una sola tarjeta, en el lugar del
 * primero que aparezca. Recibe la lista ya filtrada (y, para "Destacados", ya
 * ordenada): así la familia hereda las categorías, búsquedas y posición de sus
 * modelos sin duplicar esos datos.
 */
export function collapseFamilies(products: Product[]): Product[] {
  let placed = false;
  return products.flatMap((product) => {
    if (!isEthosModelSlug(product.slug ?? product.id)) return [product];
    if (placed) return [];
    placed = true;
    return [ethosFamilyEntry];
  });
}
