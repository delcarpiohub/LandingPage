// ---------------------------------------------------------------------------
// Sinónimos y términos técnicos equivalentes para el buscador global
// (global-search.tsx) y el filtro de texto del catálogo (product-catalog.tsx).
//
// Cada grupo reúne formas en que un cliente real escribe la misma técnica,
// aplicación o abreviatura: sigla técnica, nombre comercial, método
// analítico o aplicación de laboratorio. Un grupo solo debe existir si el
// catálogo tiene productos reales (etiquetados en `tags`/`description`/
// `features` en mock-products.ts) que cumplan esa función — no agregar un
// grupo para una técnica que el catálogo no cubre.
//
// Todos los términos se escriben ya normalizados (minúscula, sin tildes),
// igual que el resultado de `normalizeSearchText` en search-index.ts, para
// no generar una dependencia circular entre ambos archivos.
// ---------------------------------------------------------------------------

export const SEARCH_SYNONYM_GROUPS: readonly string[][] = [
  [
    "hplc",
    "uhplc",
    "lc",
    "cromatografia liquida",
    "cromatografia de alta eficacia",
    "cromatografia liquida de alta eficacia",
    "columnas hplc",
    "columnas lc",
  ],
  [
    "gc",
    "cromatografia de gases",
    "cromatografia gaseosa",
    "gc-ms",
    "columnas gc",
    "columnas capilares gc",
  ],
  [
    "icp",
    "icp-ms",
    "icp-oes",
    "plasma acoplado inductivamente",
    "plasma inductivo",
    "elementos traza",
  ],
  [
    "espectrometria de masas",
    "espectrometro de masas",
    "masas",
    "ms",
    "triple cuadrupolo",
    "orbitrap",
  ],
  [
    "proteina",
    "proteinas",
    "nitrogeno",
    "nitrogeno total",
    "kjeldahl",
    "dumas",
    "medicion de proteinas",
    "determinacion de proteinas",
    "analisis de proteinas",
  ],
  [
    "analisis proximal",
    "proximal",
    "composicion proximal",
    "bromatologico",
    "bromatologia",
    "composicion bromatologica",
  ],
  [
    "grasa",
    "materia grasa",
    "extraccion de grasa",
    "soxhlet",
    "lipidos",
    "grasas totales",
  ],
  ["fibra", "fibra dietetica", "fibra cruda", "fibra detergente"],
  [
    "humedad",
    "contenido de humedad",
    "determinacion de humedad",
    "residuo seco",
  ],
  ["karl fischer", "titulacion de humedad", "humedad por karl fischer"],
  ["ph", "potenciometro", "medidor de ph", "phmetro"],
  ["dqo", "demanda quimica de oxigeno", "cod"],
  [
    "agua ultrapura",
    "purificador de agua",
    "agua tipo 1",
    "osmosis inversa",
    "agua desionizada",
    "agua destilada",
  ],
  ["fire assay", "ensayo al fuego", "ensaye al fuego", "copelacion"],
  ["digestion por microondas", "microondas", "digestor de microondas"],
  [
    "autosampler",
    "muestreador automatico",
    "automuestreador",
    "autosampler automatico",
  ],
];

function tokenize(normalizedQuery: string): string[] {
  return normalizedQuery.split(" ").filter(Boolean);
}

function groupMatchesQuery(
  group: readonly string[],
  normalizedQuery: string,
  queryTokens: string[],
): boolean {
  return group.some((term) => {
    if (term === normalizedQuery) return true;
    // Escritura parcial de un término largo ("cromatograf" -> "cromatografia liquida").
    if (term.includes(normalizedQuery) && normalizedQuery.length >= 4) return true;
    // Siglas de 3 caracteres o menos ("lc", "gc", "ms", "ph") solo valen como
    // palabra completa de la consulta — en substring libre generan falsos
    // positivos ("organico" no debe activar el grupo de "gc").
    if (term.length <= 3) return queryTokens.includes(term);
    return normalizedQuery.includes(term);
  });
}

/**
 * Dado un término de búsqueda ya normalizado (ver `normalizeSearchText` en
 * `search-index.ts`), devuelve los términos equivalentes de su(s) grupo(s)
 * de sinónimos, incluido el término original. Vacío si no coincide con
 * ningún grupo.
 */
export function expandSearchTerms(normalizedQuery: string): string[] {
  if (!normalizedQuery) return [];
  const queryTokens = tokenize(normalizedQuery);
  const expanded = new Set<string>();
  for (const group of SEARCH_SYNONYM_GROUPS) {
    if (groupMatchesQuery(group, normalizedQuery, queryTokens)) {
      for (const term of group) expanded.add(term);
    }
  }
  return Array.from(expanded);
}

/**
 * Compara una consulta ya normalizada contra un texto (también ya
 * normalizado) de producto/categoría/servicio. Primero intenta la
 * coincidencia literal (comportamiento previo); si falla, prueba los
 * sinónimos técnicos conocidos del catálogo real.
 */
export function textMatchesQuery(
  normalizedQuery: string,
  normalizedHaystack: string,
): boolean {
  if (!normalizedQuery) return true;
  if (normalizedHaystack.includes(normalizedQuery)) return true;
  return expandSearchTerms(normalizedQuery).some(
    (term) => term.length > 1 && normalizedHaystack.includes(term),
  );
}
