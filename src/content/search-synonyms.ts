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
  [
    "fire assay",
    "ensayo al fuego",
    "ensaye al fuego",
    "cupelacion",
    "copelacion",
    "fundicion de oro",
    "oro",
    "plata",
    "metales preciosos",
    "ensayo de oro",
  ],
  ["digestion por microondas", "microondas", "digestor de microondas"],
  [
    "autosampler",
    "muestreador automatico",
    "automuestreador",
    "autosampler automatico",
  ],
  [
    "ic",
    "hpic",
    "cromatografia ionica",
    "cromatografia de intercambio ionico",
    "ic-ms",
  ],
  [
    "chns",
    "chnso",
    "chons",
    "analisis elemental organico",
    "carbono hidrogeno nitrogeno azufre",
  ],
  [
    "irms",
    "relacion isotopica",
    "isotopos estables",
    "espectrometria de masas de relacion isotopica",
  ],
  [
    "disolucion",
    "ensayo de disolucion",
    "perfil de disolucion",
    "dissolution testing",
    "disolutor",
    "muestreo de disolucion",
  ],
  [
    "biorreactor",
    "fermentador",
    "bioproceso",
    "bioprocesos",
    "cultivo celular",
    "fermentacion microbiana",
    "bioproceso upstream",
  ],
  ["dbo", "demanda bioquimica de oxigeno", "bod"],
  [
    "cfa",
    "quimica humeda",
    "flujo continuo",
    "analisis por inyeccion en flujo",
    "fia",
  ],
  ["nutrientes", "nitrato", "nitratos", "fosfato", "fosfatos", "amonio"],
  ["bano maria", "water bath", "bano termostatico"],
  [
    "estufa",
    "estufa de secado",
    "horno de secado",
    "horno de laboratorio",
    "horno",
  ],
  [
    "refrigerador de laboratorio",
    "cadena de frio",
    "conservacion de vacunas",
    "refrigerador farmaceutico",
    "refrigerador",
    "vacunas",
  ],
  [
    "campana extractora",
    "cabina de extraccion",
    "extraccion de gases",
    "fume hood",
  ],
  [
    "bano ultrasonico",
    "limpiador ultrasonico",
    "sonicacion",
    "desgasificacion",
    "ultrasonico",
  ],
  [
    "ase",
    "extraccion acelerada por solvente",
    "extraccion con fluido presurizado",
    "pfe",
  ],
  [
    "aox",
    "tox",
    "eox",
    "pox",
    "halogenos organicos adsorbibles",
    "halogenos organicos totales",
  ],
  ["toc", "carbono organico total", "cot"],
  [
    "trituracion",
    "molienda",
    "pulverizacion",
    "chancado",
    "chancadora",
    "machacado",
  ],
  ["tamizado", "tamiz", "analisis granulometrico"],
  [
    "cuarteo",
    "cuarteador",
    "division de muestras",
    "divisor de muestras",
  ],
  ["liofilizacion", "freeze drying", "secado por congelacion"],
  [
    "fotometria",
    "colorimetria",
    "fotometro",
    "colorimetro",
    "espectrofotometria",
  ],
  ["oxigeno disuelto", "od", "dissolved oxygen"],
  ["ise", "electrodo selectivo de iones", "ion selective electrode"],
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

function haystackHasTerm(normalizedHaystack: string, term: string): boolean {
  if (term.length <= 1) return false;
  if (term.length > 3) return normalizedHaystack.includes(term);
  // Misma cautela que en groupMatchesQuery, pero del lado del texto del
  // producto: una sigla corta ("od", "ic", "ms") solo cuenta si aparece como
  // palabra completa del haystack — en substring libre, "od" aparece dentro
  // de "modo", "codigo", "metodo" y dispara falsos positivos masivos que la
  // consulta original del cliente nunca mencionó.
  return normalizedHaystack.split(/[^a-z0-9]+/).includes(term);
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
  return expandSearchTerms(normalizedQuery).some((term) =>
    haystackHasTerm(normalizedHaystack, term),
  );
}
