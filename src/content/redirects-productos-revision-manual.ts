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
// Actualización (encargo 2026-11-11, segunda pasada — regla
// "exacto-sin-prefijo"): de las 51 originales, 16 cuyo slug viejo
// coincidía exactamente con el slug de la ficha nueva al quitarle el
// prefijo de marca (milestone-, thermo-, sievers-, distek-,
// te-instruments-, etc.) y cuya ficha estaba publicada (no borrador) ya
// se promovieron a redirect directo y se quitaron de esta lista.
//
// Actualización (encargo 2026-11-16): de las 35 restantes, 30 se
// revisaron caso por caso contra el catálogo real (nombre de producto,
// modelo, campo `aliases` y estado publicado/borrador en
// src/lib/mock-products.ts) y se promovieron a redirect directo. En
// varios casos el candidato automático de esta lista resultó ser el
// modelo equivocado dentro de una misma familia de productos (ver nota
// en wordpress-legacy-redirects.ts) y se promovió a la ficha correcta en
// vez de al `slugCandidato` original aquí anotado. Quedan 4 sin promover,
// genuinamente ambiguas:
// - "purificador-de-agua-de-osmosis-inversa-ld-discovery-hyperpurex": la
//   ficha candidata "Hyperpurex LU Discovery" está documentada como
//   específica del modelo LU; el slug viejo dice "LD" (modelo distinto
//   dentro de la misma serie, sin ficha propia publicada).
// - "horno-de-copelacion": genérico, podría ser el horno estándar
//   (decent-hornos-cupelacion, hasta 1200°C) o el de alta temperatura
//   (decent-horno-copelacion-alta-temperatura, hasta 1500°C); no hay forma
//   de distinguir solo por el slug.
// - "ezfill-2": podría ser un duplicado de WordPress de "easyfill"
//   (Milestone) o referirse a "Distek ezfill+" (producto no relacionado,
//   mismo texto parecido); ninguna de las dos lecturas es inequívoca.
// - "m5310-c": hay tres fichas publicadas de Sievers M5310 C (laboratorio,
//   en línea, portátil) y el slug viejo no indica cuál.
//
// Fuente: data/import/redirects-wordpress-revision-aprox.csv tiene el
// mismo contenido en CSV (sin seguimiento, para revisión fuera del repo);
// este archivo es la versión versionada en el código. (Nota: ese CSV no
// se actualizó en esta pasada — ver aviso en el reporte de esta tarea.)

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
  { oldSlug: "purificador-de-agua-de-osmosis-inversa-ld-discovery-hyperpurex", slugCandidato: "hyperpurex-serie-lu-discovery", nombreCandidato: "Hyperpurex LU Discovery", score: 0.5844155844155844 },
  { oldSlug: "horno-de-copelacion", slugCandidato: "decent-horno-copelacion-alta-temperatura", nombreCandidato: "Horno de cupelación DE-100CF-1500", score: 0.6625 },
  { oldSlug: "ezfill-2", slugCandidato: "distek-ezfill-plus", nombreCandidato: "Distek ezfill+", score: 0.7166666666666667 },
  { oldSlug: "m5310-c", slugCandidato: "sievers-m5310-c-laboratorio", nombreCandidato: "Analizador de COT de Laboratorio Sievers M5310 C", score: 0.7166666666666667 },
];
