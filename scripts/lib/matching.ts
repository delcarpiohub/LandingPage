// Normalización compartida para matching de dedupe entre el catálogo actual
// y filas externas (WordPress, CSV de importación). A propósito NUNCA
// compara por similitud difusa de nombre — solo por slug, modelo
// normalizado o alias normalizado, como exige la tarea.

export function normalizeModel(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[\s\-_]+/g, "")
    .trim();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface MatchKey {
  slug: string;
  normalizedModel: string;
  normalizedName: string;
  normalizedAliases: string[];
}

export function buildMatchKeys(params: {
  slug?: string;
  model?: string;
  name?: string;
  aliases?: string[];
}): MatchKey {
  return {
    slug: params.slug ? slugify(params.slug) : "",
    normalizedModel: params.model ? normalizeModel(params.model) : "",
    normalizedName: params.name ? normalizeModel(params.name) : "",
    normalizedAliases: (params.aliases ?? []).map(normalizeModel).filter(Boolean),
  };
}

export type MatchResult =
  | { kind: "exacto"; via: "slug" | "modelo" | "alias"; detail: string }
  | { kind: "parcial"; detail: string }
  | { kind: "ninguno" };

/** Compara una fila externa contra un producto del catálogo. Match EXACTO
 * solo por slug, modelo normalizado o alias normalizado — nunca por
 * similitud de nombre. Match PARCIAL (para revisión humana, nunca auto-skip)
 * cuando la marca coincide y el nombre normalizado comparte una subcadena
 * significativa, o cuando el modelo normalizado está contenido uno dentro
 * del otro sin ser igual. */
export function matchAgainstCatalog(
  external: { name: string; brand?: string; model?: string },
  catalogKey: MatchKey & { brand?: string },
): MatchResult {
  const extKeys = buildMatchKeys({
    name: external.name,
    model: external.model ?? external.name,
  });

  if (extKeys.slug && catalogKey.slug && extKeys.slug === catalogKey.slug) {
    return { kind: "exacto", via: "slug", detail: catalogKey.slug };
  }
  if (
    extKeys.normalizedModel &&
    catalogKey.normalizedModel &&
    extKeys.normalizedModel === catalogKey.normalizedModel
  ) {
    return { kind: "exacto", via: "modelo", detail: catalogKey.normalizedModel };
  }
  // El CSV externo (ej. menú de WordPress) suele traer solo un "nombre"
  // completo, no un "modelo" limpio por separado — comparar también el
  // nombre externo normalizado contra el nombre completo del catálogo
  // (sigue siendo igualdad exacta tras normalizar, no similitud difusa).
  if (
    extKeys.normalizedName &&
    catalogKey.normalizedName &&
    extKeys.normalizedName === catalogKey.normalizedName
  ) {
    return { kind: "exacto", via: "modelo", detail: catalogKey.normalizedName };
  }
  if (
    extKeys.normalizedModel &&
    catalogKey.normalizedAliases.includes(extKeys.normalizedModel)
  ) {
    return { kind: "exacto", via: "alias", detail: extKeys.normalizedModel };
  }
  if (
    extKeys.normalizedName &&
    catalogKey.normalizedAliases.includes(extKeys.normalizedName)
  ) {
    return { kind: "exacto", via: "alias", detail: extKeys.normalizedName };
  }

  const sameBrand =
    external.brand &&
    catalogKey.brand &&
    normalizeModel(external.brand) === normalizeModel(catalogKey.brand);

  if (
    sameBrand &&
    extKeys.normalizedModel &&
    catalogKey.normalizedModel &&
    extKeys.normalizedModel.length >= 3 &&
    catalogKey.normalizedModel.length >= 3 &&
    (extKeys.normalizedModel.includes(catalogKey.normalizedModel) ||
      catalogKey.normalizedModel.includes(extKeys.normalizedModel))
  ) {
    return {
      kind: "parcial",
      detail: `modelo "${external.model ?? external.name}" vs. catálogo "${catalogKey.normalizedModel}" (misma marca, substring, no exacto)`,
    };
  }

  return { kind: "ninguno" };
}
