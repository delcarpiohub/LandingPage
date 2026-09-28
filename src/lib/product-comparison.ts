import type { Product, ProductDetail } from "@/lib/mock-products";

export type ComparableSpec = {
  key: string;
  label: string;
  value: string;
  group: string;
};

export type ComparableTier = {
  id: string;
  label: string;
  imageUrl?: string;
  specs: ComparableSpec[];
};

export const MAX_COMPARISON_PRODUCTS = 4;

const SPEC_KEY_ALIASES: Record<string, string> = { "rango-de-masa-ambas-variantes": "rango-de-masa" };

const fallbackKey = (label: string) => {
  const key = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return SPEC_KEY_ALIASES[key] ?? key;
};

export const normalizeComparableValue = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es")
  .replace(/[×x]/g, "x")
  .replace(/\b(srm|da)\s*\/\s*(segundo|segundos|s)\b/g, "$1/s")
  .replace(/\b(srm|da)\s+por\s+segundo\b/g, "$1/s")
  .replace(/\bhertz\b/g, "hz")
  .replace(/\s+/g, " ")
  .trim();

export const getProductSlug = (product: Product) => product.slug ?? product.id;

const normalizeSpecs = (specs: NonNullable<ProductDetail["comparisonSpecs"]>): ComparableSpec[] => specs
  .filter((spec) => spec.key && spec.label && spec.value)
  .map((spec) => ({ ...spec, key: fallbackKey(spec.key), group: spec.group ?? "Especificaciones técnicas" }));

const getBaseComparableSpecifications = (product: Product): ComparableSpec[] => {
  const explicitSpecs = product.detail?.comparisonSpecs;
  if (explicitSpecs?.length) return normalizeSpecs(explicitSpecs);

  const seenKeys = new Map<string, number>();
  return (product.detail?.technicalParameters ?? []).flatMap((row) => [
    { label: row.leftParameter, value: row.leftValue },
    { label: row.rightParameter, value: row.rightValue },
  ].filter((spec) => spec.label && spec.value).map((spec) => {
    const baseKey = fallbackKey(spec.label);
    const occurrence = (seenKeys.get(baseKey) ?? 0) + 1;
    seenKeys.set(baseKey, occurrence);
    return {
      key: occurrence === 1 ? baseKey : `${baseKey}-${occurrence}`,
      label: spec.label,
      value: spec.value,
      group: "Especificaciones técnicas",
    };
  }));
};

const slugifyTier = (label: string) => fallbackKey(label);
const getImageForTier = (product: Product, tierLabel: string) => product.detail?.descriptionImages?.find((image) => image.title === tierLabel)?.src;

/** Las variantes de bomba no se convierten en tiers porque no aportan specs divergentes. */
export const getComparisonTiers = (product: Product): ComparableTier[] => {
  const detail = product.detail;
  if (!detail) return [];

  if (detail.comparisonTiers?.length) {
    return detail.comparisonTiers.map((tier) => ({ id: tier.id, label: tier.label, imageUrl: tier.imageUrl, specs: normalizeSpecs(tier.specs) }));
  }

  if (detail.familyTiers?.length) {
    return detail.familyTiers.map((tier) => ({
      id: slugifyTier(tier.model), label: tier.model, imageUrl: getImageForTier(product, tier.model),
      specs: normalizeSpecs([
        { key: "codigo-de-catalogo", label: "Código de catálogo", value: tier.catalogCode },
        { key: "resolucion", label: "Resolución", value: tier.resolution },
        { key: "rango-de-masa", label: "Rango de masa", value: tier.massRange },
        { key: "velocidad-de-escaneo", label: "Velocidad de escaneo", value: tier.scanRate },
        { key: "requisitos-de-instalacion", label: "Requisitos de instalación", value: tier.installation },
      ]),
    }));
  }

  if (detail.analyzerTiers?.length) {
    return detail.analyzerTiers.map((tier) => ({
      id: slugifyTier(tier.model), label: tier.model, imageUrl: getImageForTier(product, tier.model),
      specs: normalizeSpecs([
        { key: "codigos-de-catalogo", label: "Códigos de catálogo", value: tier.catalogCodes },
        { key: "capacidad-de-muestras", label: "Capacidad de muestras", value: tier.sampleCapacity },
        { key: "capacidad-de-reactivos", label: "Capacidad de reactivos", value: tier.reagentCapacity },
        { key: "rendimiento", label: "Rendimiento", value: tier.throughput },
        { key: "filtros-dedicados", label: "Filtros dedicados", value: tier.dedicatedFilters },
      ]),
    }));
  }

  if (detail.massRangeVariants?.length) {
    const baseSpecs = getBaseComparableSpecifications(product).filter((spec) => spec.key !== "rango-de-masa");
    return detail.massRangeVariants.map((variant) => ({
      id: slugifyTier(variant.catalogCode), label: variant.catalogCode,
      specs: [...baseSpecs,
        { key: "codigo-de-catalogo", label: "Código de catálogo", value: variant.catalogCode, group: "Especificaciones técnicas" },
        { key: "rango-de-masa", label: "Rango de masa", value: variant.massRange, group: "Especificaciones técnicas" },
      ],
    }));
  }

  return [];
};

export const hasDivergentComparisonTiers = (product: Product) => {
  const tiers = getComparisonTiers(product);
  if (tiers.length < 2) return false;

  const keys = new Set(tiers.flatMap((tier) => tier.specs.map((spec) => spec.key)).filter((key) => !key.includes("catalog")));
  return Array.from(keys).some((key) => new Set(tiers.map((tier) => normalizeComparableValue(tier.specs.find((spec) => spec.key === key)?.value ?? "—"))).size > 1);
};

export const getComparableSpecifications = (product: Product, tierId?: string): ComparableSpec[] => {
  if (tierId) return getComparisonTiers(product).find((tier) => tier.id === tierId)?.specs ?? getBaseComparableSpecifications(product);
  return getBaseComparableSpecifications(product);
};

export const isProductComparable = (product: Product) => getComparableSpecifications(product).length > 0 || getComparisonTiers(product).some((tier) => tier.specs.length > 0);

export const getComparisonAvailabilityLabel = (product: Product) => isProductComparable(product) ? "Disponible para comparar" : "Especificaciones completas próximamente";
