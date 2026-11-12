/**
 * Datos de orden editorial para "Destacados" del catálogo. Consumidos por
 * sortFeatured (src/lib/catalog-sort.ts). No agregar un filtro/categoría a
 * catalogCategoryOrder sin confirmar primero que cada slug existe, está
 * publicado y corresponde al producto real (ver nota de cada bloque).
 */

/**
 * Orden explícito por filtro o categoría. Si el filtro actual no tiene
 * entrada aquí, sortFeatured cae al comportamiento de siempre
 * (catalogProductPriority / catalogPriority). Los productos del filtro que
 * no aparezcan en la lista quedan al final, en el orden que determinen las
 * reglas siguientes (prioridad, marca, alfabético).
 *
 * "Área farmacéutica" (cargada 2026-11-11): lista pedida por el usuario,
 * ubicada por nombre contra mock-products.ts. Se excluyeron de la lista (ver
 * data/import/ranking-borrador.md y el reporte de la tarea para el detalle):
 * - Vanquish Core (thermo-vanquish-core): existe pero status "borrador", no
 *   publicado.
 * - Ethos M y Ethos Labstation: no existen en el catálogo.
 * - "Digestores Hanon ... y otros": solo se incluyó SH420F (el nombrado
 *   explícitamente); SH220F y SH520/SH508 son candidatos a "otros" pero no
 *   se agregaron sin confirmación de que correspondan.
 * - iCAP PRO XP (thermo-icap-pro-xp): SÍ se incluye aquí porque existe y está
 *   publicado, pero su propio campo `filters` en mock-products.ts no incluye
 *   "Área farmacéutica" hoy — por lo tanto no aparecerá en ese filtro hasta
 *   que también se le agregue esa etiqueta ahí (cambio no incluido en esta
 *   tarea).
 */
export const catalogCategoryOrder: Record<string, string[]> = {
  "Área farmacéutica": [
    "milestone-easyfill",
    "distek-sensir-3200",
    "distek-olera",
    "distek-olera-plus",
    "distek-olera-select",
    "distek-eclipse-5300",
    "distek-opt-diss-410",
    "infitek-titr-50vc",
    "hanon-k1160",
    "hanon-k9860",
    "hanon-k1100f",
    "hanon-sh420f",
    "hanon-e500",
    "thermo-icap-pro-xp",
    "thermo-gallery-enzyme-master",
  ],
};

/**
 * slug -> prioridad (más alto = más importante), igual semántica que
 * Product.catalogPriority pero editable sin tocar mock-products.ts.
 * sortFeatured usa catalogProductPriority[slug] ?? product.catalogPriority ?? 0.
 *
 * Contiene solo los productos que YA tenían catalogPriority: 1 en
 * mock-products.ts (las 6 fichas de cromatografía Thermo) — no se inventó
 * prioridad nueva para ningún otro producto.
 */
export const catalogProductPriority: Record<string, number> = {
  "thermo-dionex-ics-6000-hpic": 1,
  "thermo-dionex-ase-350": 1,
  "thermo-dionex-autotrace-280": 1,
  "thermo-dionex-inuvion": 1,
  "thermo-vanquish-horizon": 1,
  "thermo-vanquish-flex": 1,
};

/**
 * Marcas (Product.detail.brand), de más a menos reconocida, usada como
 * tercer criterio de orden. Pedido explícito del usuario (2026-11-12):
 * Thermo Scientific primero y Milestone segundo siempre, sin importar su
 * cantidad de fichas; el resto de las marcas ordenadas por cantidad de
 * fichas PUBLICADAS (status !== "borrador") de más a menos, y en empate
 * alfabético. Nombres exactos de Product.detail.brand (13 marcas distintas
 * en el catálogo publicado hoy, sin variantes de capitalización).
 *
 * Conteo de fichas publicadas al generar esta lista (ver también el reporte
 * de la tarea con el detalle completo):
 * Thermo Scientific 34, Decent 24, Hanon 15, Milestone 13, Infitek 12,
 * Distek 11, Trace Elemental 10, Hyperpurex 8, Sievers 6, Restek 5,
 * Skalar 5 (empate con Restek, resuelto alfabéticamente), ColdBlock 3,
 * EuroVector 1.
 */
export const catalogBrandOrder: string[] = [
  "Thermo Scientific",
  "Milestone",
  "Decent",
  "Hanon",
  "Infitek",
  "Distek",
  "Trace Elemental",
  "Hyperpurex",
  "Sievers",
  "Restek",
  "Skalar",
  "ColdBlock",
  "EuroVector",
];
