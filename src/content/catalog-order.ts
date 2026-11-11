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
 * tercer criterio de orden. Hoy no existe ningún ranking editorial de marcas
 * en el sitio: el único dato real disponible es que las 6 fichas con
 * prioridad (arriba) son todas "Thermo Scientific". Por eso esta lista tiene
 * una sola marca — no es una afirmación de que las demás marcas (Hanon,
 * Distek, Milestone, Restek, etc.) sean menos importantes, solo que no hay
 * una decisión editorial tomada sobre ellas todavía. Ampliar esta lista
 * requiere una decisión explícita, no inferirla.
 */
export const catalogBrandOrder: string[] = ["Thermo Scientific"];
