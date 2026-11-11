// Datos puros (sin lógica, no se importa desde proxy.ts ni desde ningún
// código de runtime). Encargo 2026-11-11: las 51 coincidencias "aproximado"
// con score < 0.75 dejaron de redirigir automáticamente a una ficha
// específica (ver src/content/wordpress-legacy-redirects.ts, esas 51 claves
// ahora valen "/productos") porque un score bajo el umbral significa que el
// candidato automático no es confiable sin revisión humana.
//
// Esta lista conserva, para cada una, el mejor candidato que encontró el
// clasificador automático, para que alguien revise caso por caso y
// promueva manualmente los que correspondan editando directamente la clave
// correspondiente en wordpress-legacy-redirects.ts (de "/productos" a
// "/productos/<slugCandidato>"). Ordenada por score ascendente.
//
// Fuente: data/import/redirects-wordpress-revision-aprox.csv tiene el
// mismo contenido en CSV (sin seguimiento, para revisión fuera del repo);
// este archivo es la versión versionada en el código.

export type RedirectProductoRevisionManual = {
  /** Slug de la URL vieja: WordPress servía esto como /producto/<oldSlug>/ */
  oldSlug: string;
  /** Slug de la ficha candidata en el catálogo nuevo (src/lib/mock-products.ts) */
  slugCandidato: string;
  /** Nombre de la ficha candidata, para identificarla sin tener que buscarla */
  nombreCandidato: string;
  /** Score de similitud del clasificador automático (0.55–0.7416...) */
  score: number;
};

export const redirectsProductosRevisionManual: RedirectProductoRevisionManual[] = [
  { oldSlug: "galeria-enzyme-master", slugCandidato: "thermo-gallery-enzyme-master", nombreCandidato: "Gallery Enzyme Master", score: 0.55 },
  { oldSlug: "purificador-agua-ultrapura-pu-pursuit-hyperpurex", slugCandidato: "hyperpurex-serie-p-pursuit", nombreCandidato: "Hyperpurex P Pursuit", score: 0.5833333333333333 },
  { oldSlug: "purificador-de-agua-de-osmosis-inversa-ld-discovery-hyperpurex", slugCandidato: "hyperpurex-serie-lu-discovery", nombreCandidato: "Hyperpurex LU Discovery", score: 0.5844155844155844 },
  { oldSlug: "analizador-discontinuo-gallery-aqua-master", slugCandidato: "thermo-gallery-aqua-master", nombreCandidato: "Analizador discreto Gallery Aqua Master / Plus", score: 0.5916666666666667 },
  { oldSlug: "espectrometro-de-masas-de-triple-cuadrupolo-tsq-altis-plus", slugCandidato: "thermo-tsq-altis-plus", nombreCandidato: "TSQ Altis Plus Triple Quadrupole Mass Spectrometer", score: 0.5935064935064935 },
  { oldSlug: "espectrometro-de-masas-de-triple-cuadrupolo-tsq-fortis-plus", slugCandidato: "thermo-tsq-fortis-plus", nombreCandidato: "TSQ Fortis Plus Triple Quadrupole Mass Spectrometer", score: 0.5935064935064935 },
  { oldSlug: "espectrometro-de-masas-de-triple-cuadrupolo-tsq-quantis-plus", slugCandidato: "thermo-tsq-quantis-plus", nombreCandidato: "TSQ Quantis Plus Triple Quadrupole Mass Spectrometer", score: 0.5935064935064935 },
  { oldSlug: "m500", slugCandidato: "sievers-m500", nombreCandidato: "Analizador de carbono orgánico total en línea Sievers M500", score: 0.6083333333333334 },
  { oldSlug: "easyfill", slugCandidato: "milestone-easyfill", nombreCandidato: "Estación de dosificación automatizada easyFILL", score: 0.63 },
  { oldSlug: "ethos-x", slugCandidato: "milestone-ethos-x", nombreCandidato: "Sistema de extracción por microondas ETHOS X", score: 0.63 },
  { oldSlug: "ethos-x-2-0", slugCandidato: "milestone-ethos-x", nombreCandidato: "Sistema de extracción por microondas ETHOS X", score: 0.63 },
  { oldSlug: "ultraclave", slugCandidato: "milestone-ultraclave", nombreCandidato: "Sistema de digestión por microondas ultraCLAVE", score: 0.63 },
  { oldSlug: "ultrawave", slugCandidato: "milestone-ultrawave", nombreCandidato: "Sistema de digestión por microondas ultraWAVE", score: 0.63 },
  { oldSlug: "ultrawave-3", slugCandidato: "milestone-ultrawave", nombreCandidato: "Sistema de digestión por microondas ultraWAVE", score: 0.63 },
  { oldSlug: "trace-1610", slugCandidato: "thermo-trace-1600-series", nombreCandidato: "Cromatógrafo de gases TRACE 1600 / 1610", score: 0.6444444444444444 },
  { oldSlug: "cromatografo-de-gases-serie-trace-1600", slugCandidato: "thermo-trace-1600-series", nombreCandidato: "Cromatógrafo de gases TRACE 1600 / 1610", score: 0.66 },
  { oldSlug: "horno-de-copelacion", slugCandidato: "decent-horno-copelacion-alta-temperatura", nombreCandidato: "Horno de cupelación DE-100CF-1500", score: 0.6625 },
  { oldSlug: "horno-de-fusion", slugCandidato: "decent-hornos-fusion-ensayo-fuego", nombreCandidato: "Horno de fusión DE-20FF / DE-25FF", score: 0.6625 },
  { oldSlug: "newton", slugCandidato: "te-instruments-newton", nombreCandidato: "Autosampler NEWTON", score: 0.6625 },
  { oldSlug: "xplorer-ts", slugCandidato: "te-instruments-xplorer-tx-ts", nombreCandidato: "Analizador de cloruro y azufre total Xplorer TX/TS", score: 0.6625 },
  { oldSlug: "horno-de-secado-electrico", slugCandidato: "decent-horno-secado-electrico", nombreCandidato: "Hornos de secado eléctricos DDO", score: 0.6772727272727272 },
  { oldSlug: "sistema-de-uhplc-vanquish-horizon-sistema-integrado-y-biocompatible", slugCandidato: "thermo-vanquish-horizon", nombreCandidato: "Vanquish™ Horizon UHPLC System", score: 0.6785714285714286 },
  { oldSlug: "copelas-de-magnesio", slugCandidato: "decent-copelas-magnesio", nombreCandidato: "Copelas de magnesia Serie 2X–14", score: 0.6857142857142857 },
  { oldSlug: "duopur-y-subpur", slugCandidato: "milestone-duopur-subpur", nombreCandidato: "Sistema de destilación por sub-ebullición duoPUR y subPUR", score: 0.6857142857142857 },
  { oldSlug: "duopur-y-subpur-2", slugCandidato: "milestone-duopur-subpur", nombreCandidato: "Sistema de destilación por sub-ebullición duoPUR y subPUR", score: 0.6857142857142857 },
  { oldSlug: "ethos-lean", slugCandidato: "milestone-ethos-lean", nombreCandidato: "Sistema de digestión por microondas compacto ETHOS LEAN", score: 0.6857142857142857 },
  { oldSlug: "sensir-3200", slugCandidato: "distek-sensir-3200", nombreCandidato: "Probador de desintegración sin baño sensIR 3200", score: 0.6857142857142857 },
  { oldSlug: "xplorer-tn-ts", slugCandidato: "te-instruments-xplorer-tn", nombreCandidato: "Nitrógeno XplorerPlus TN", score: 0.6857142857142857 },
  { oldSlug: "xplorer-v-ns", slugCandidato: "te-instruments-xplorer-ns", nombreCandidato: "Analizador de nitrógeno y azufre total Xplorer-NS", score: 0.6857142857142857 },
  { oldSlug: "sistema-purificacion-agua-lu-discovery-ultrapura-hyperpurex", slugCandidato: "hyperpurex-serie-lu-discovery", nombreCandidato: "Hyperpurex LU Discovery", score: 0.6952380952380952 },
  { oldSlug: "sistema-purificacion-agua-su-smart-ultrapura-hyperpurex", slugCandidato: "hyperpurex-serie-su-smart", nombreCandidato: "Hyperpurex SU Smart", score: 0.6952380952380952 },
  { oldSlug: "galeria-plus-enzyme-master", slugCandidato: "thermo-gallery-enzyme-master", nombreCandidato: "Gallery Enzyme Master", score: 0.7 },
  { oldSlug: "sistemas-de-uhplc-vanquish-flex", slugCandidato: "thermo-vanquish-flex", nombreCandidato: "Vanquish™ Flex UHPLC Systems", score: 0.7 },
  { oldSlug: "tq-icp-ms-icap", slugCandidato: "thermo-icap-tqs", nombreCandidato: "iCAP TQs ICP-MS", score: 0.7 },
  { oldSlug: "extractor-de-disolvente-acelerado-dionex-ase-350", slugCandidato: "thermo-dionex-ase-350", nombreCandidato: "Dionex™ ASE™ 350 Accelerated Solvent Extractor", score: 0.7055555555555555 },
  { oldSlug: "2500-rtd", slugCandidato: "distek-2500-rtd", nombreCandidato: "Sistema de disolución en baño de agua 2500 RTD", score: 0.7166666666666667 },
  { oldSlug: "columnas-de-gc", slugCandidato: "restek/columnas-capilares-silice-fundida", nombreCandidato: "Columnas capilares de sílice fundida Restek", score: 0.7166666666666667 },
  { oldSlug: "ethos-easy", slugCandidato: "milestone-ethos-easy", nombreCandidato: "Sistema de digestión por microondas ETHOS EASY", score: 0.7166666666666667 },
  { oldSlug: "ethos-up", slugCandidato: "milestone-ethos-up", nombreCandidato: "Sistema de digestión por microondas ETHOS UP", score: 0.7166666666666667 },
  { oldSlug: "ethos-xl", slugCandidato: "milestone-ethos-xl", nombreCandidato: "Sistema de extracción por microondas ETHOS XL", score: 0.7166666666666667 },
  { oldSlug: "ezfill-2", slugCandidato: "distek-ezfill-plus", nombreCandidato: "Distek ezfill+", score: 0.7166666666666667 },
  { oldSlug: "horno-de-secado-a-gas", slugCandidato: "decent-horno-secado-gas", nombreCandidato: "Hornos de secado a gas DDO", score: 0.7166666666666667 },
  { oldSlug: "innovox-es", slugCandidato: "sievers-innovox-es", nombreCandidato: "Analizador de carbono orgánico total de laboratorio Sievers InnovOx ES", score: 0.7166666666666667 },
  { oldSlug: "m5310-c", slugCandidato: "sievers-m5310-c-laboratorio", nombreCandidato: "Analizador de COT de Laboratorio Sievers M5310 C", score: 0.7166666666666667 },
  { oldSlug: "mezclador-de-crisoles", slugCandidato: "decent-mezclador-crisoles", nombreCandidato: "Mezclador DPT25 / DPT50 / DPT84", score: 0.7166666666666667 },
  { oldSlug: "xplorer-tn", slugCandidato: "te-instruments-xplorer-tn", nombreCandidato: "Nitrógeno XplorerPlus TN", score: 0.7166666666666667 },
  { oldSlug: "hr-icp-ms-serie-element", slugCandidato: "thermo-element-series", nombreCandidato: "Element Series HR-ICP-MS", score: 0.7250000000000001 },
  { oldSlug: "espectrometro-de-masas-de-cuadrupolo-simple-isq-ec", slugCandidato: "thermo-isq-ec", nombreCandidato: "Espectrómetro de masa de cuadrupolo simple ISQ EC", score: 0.7416666666666667 },
  { oldSlug: "orbitrap-exploris-120", slugCandidato: "thermo-orbitrap-exploris", nombreCandidato: "Orbitrap Exploris Mass Spectrometer", score: 0.74375 },
  { oldSlug: "tsq-fortis-plus", slugCandidato: "thermo-tsq-fortis-plus", nombreCandidato: "TSQ Fortis Plus Triple Quadrupole Mass Spectrometer", score: 0.74375 },
  { oldSlug: "xplorer-tx-ts", slugCandidato: "te-instruments-xplorer-tx-ts", nombreCandidato: "Analizador de cloruro y azufre total Xplorer TX/TS", score: 0.74375 },
];
