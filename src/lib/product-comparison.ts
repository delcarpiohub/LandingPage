import type { Product } from "@/lib/mock-products";

export type ComparableSpec = {
  key: string;
  label: string;
  value: string;
  group: string;
};

// Estos slugs ya muestran technicalParameters como fuente estructurada en la
// ficha publicada. Los demás se habilitan al agregar comparisonSpecs.
const FALLBACK_READY_SLUGS = new Set([
  "hyperpurex-serie-su-smart",
  "hyperpurex-serie-eue",
  "hyperpurex-serie-lu-discovery",
  "hyperpurex-serie-x-flagship",
  "hyperpurex-serie-p-pursuit",
  "hyperpurex-serie-fx-flagship",
  "hyperpurex-serie-fe-eminente",
  "hyperpurex-serie-fs-smart",
  "distek-ezfill-plus",
  "distek-olera",
  "distek-olera-plus",
  "distek-olera-select",
  "distek-opt-diss-410",
  "distek-eclipse-5300",
  "distek-bione-bioreactor",
  "distek-bione-fermentor",
  "distek-bione-1250",
  "distek-bione-mixing-system",
  "eurovector-ea3100",
  "coldblock-pro-series-cbl",
  "coldblock-pro-series-cbm",
  "coldblock-pro-series-cbs",
  "skalar-serie-san-plus-plus",
  "hanon-f2000",
  "hanon-df06",
  "infitek-wb-series",
  "infitek-pr5-series",
  "infitek-titr-50vc",
  "te-instruments-xplorer-aox-tox",
  "te-instruments-xplorer-tn",
  "te-instruments-vectra",
  "te-instruments-newton",
  "decent-cargador-electrico-crisoles",
  "decent-cargador-manual-crisoles",
  "decent-copelas-magnesio",
  "decent-dosificador-automatico-litargirio",
  "decent-hornos-cupelacion",
  "decent-horno-copelacion-alta-temperatura",
  "decent-hornos-fusion-ensayo-fuego",
  "decent-mezclador-crisoles",
  "decent-molino-pulverizador-dp1000",
  "decent-drsd05",
  "decent-drsd40",
  "decent-trituradora-martillo",
  "decent-rodillo-botella",
  "decent-dsw350",
  "decent-mezclador-tipo-v",
  "decent-trituradora-doble-rodillo",
  "decent-agitador-tamiz-estandar",
  "decent-hornos-secado",
  "thermo-gallery-discrete-analyzer",
  "thermo-gallery-aqua-master",
  "thermo-ics6000-detector",
  "thermo-dionex-ase-celdas",
  "thermo-isq-em",
  "thermo-isq-ec",
  "thermo-delta-q-irms",
  "thermo-tsq-fortis-plus",
  "thermo-tsq-altis-plus",
  "thermo-tsq-quantis-plus",
  "thermo-q-exactive-plus",
  "thermo-orbitrap-iqx",
  "thermo-extreva-ase",
  "thermo-orbitrap-exploris-gc",
  "thermo-orbitrap-eclipse-tribrid",
  "thermo-orbitrap-astral",
  "thermo-orbitrap-exploris",
]);

export const MAX_COMPARISON_PRODUCTS = 4;

const fallbackKey = (label: string) =>
  label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProductSlug = (product: Product) => product.slug ?? product.id;

export const getComparableSpecifications = (product: Product): ComparableSpec[] => {
  const explicitSpecs = product.detail?.comparisonSpecs;

  if (explicitSpecs?.length) {
    return explicitSpecs
      .filter((spec) => spec.key && spec.label && spec.value)
      .map((spec) => ({ ...spec, group: spec.group ?? "Especificaciones técnicas" }));
  }

  if (!FALLBACK_READY_SLUGS.has(getProductSlug(product))) return [];

  return (product.detail?.technicalParameters ?? []).flatMap((row) =>
    [
      { label: row.leftParameter, value: row.leftValue },
      { label: row.rightParameter, value: row.rightValue },
    ]
      .filter((spec) => spec.label && spec.value)
      .map((spec) => ({
        key: fallbackKey(spec.label),
        label: spec.label,
        value: spec.value,
        group: "Especificaciones técnicas",
      })),
  );
};

export const isProductComparable = (product: Product) =>
  getComparableSpecifications(product).length > 0;

export const getComparisonAvailabilityLabel = (product: Product) =>
  isProductComparable(product)
    ? "Disponible para comparar"
    : "Especificaciones completas próximamente";