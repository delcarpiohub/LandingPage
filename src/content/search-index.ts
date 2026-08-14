import { coreServices, industries, services } from "@/content/site";
import { mockProducts, productFilters, type ProductCategory } from "@/lib/mock-products";

// ---------------------------------------------------------------------------
// REGLA DE MANTENIMIENTO — leer antes de tocar este archivo
//
// Este índice NO es una lista aparte que haya que mantener a mano. Se
// construye en cada carga a partir de las fuentes de contenido reales que ya
// alimentan las páginas del sitio:
//   - Productos/categorías/marcas -> src/lib/mock-products.ts
//   - Soluciones por industria    -> src/content/site.ts (industries)
//   - Servicios                   -> src/content/site.ts (services, coreServices)
//
// Si agregas un producto a `mockProducts`, una industria a `industries` o un
// servicio a `services`/`coreServices`, el buscador global lo indexa solo, en
// el siguiente build/refresh — no hay que editar nada aquí.
//
// Solo edita este archivo si agregas un TIPO de contenido nuevo que no viva
// en ninguna de esas fuentes (por ejemplo, una página de recursos nueva). En
// ese caso, agrega la entrada a `resourceItems` más abajo, usando una ruta
// real que ya exista en `src/app`. Nunca inventes rutas ni resultados.
// ---------------------------------------------------------------------------

export type SearchItemType =
  | "producto"
  | "categoria"
  | "solucion"
  | "servicio"
  | "marca"
  | "recurso";

export type SearchItem = {
  id: string;
  title: string;
  description?: string;
  type: SearchItemType;
  href: string;
  keywords?: string[];
  image?: string;
};

export const SEARCH_TYPE_LABELS: Record<SearchItemType, string> = {
  producto: "Producto",
  categoria: "Categoría",
  solucion: "Solución",
  servicio: "Servicio",
  marca: "Marca",
  recurso: "Recurso",
};

// Rutas propias fuera del patrón /productos/[slug] (Restek tiene página
// dedicada por producto en vez de usar el segmento dinámico).
const RESTEK_ROUTE_SLUGS: Record<string, string> = {
  "restek/columnas-capilares-silice-fundida": "/productos/restek/columnas-capilares-silice-fundida",
  "restek/analytical-lc-columns": "/productos/restek/analytical-lc-columns",
  "restek/viales-con-filtro": "/productos/restek/viales-con-filtro",
};

function productHref(slug: string): string {
  return RESTEK_ROUTE_SLUGS[slug] ?? `/productos/${slug}`;
}

// Categorías confirmadas donde HPLC/GC son sinónimos reales — respaldado por
// site.ts (metrics: "HPLC · GC · técnicas cromatográficas") y por los
// servicios "Implementación HPLC" / "Métodos analíticos por GC".
const CATEGORY_KEYWORDS: Partial<Record<ProductCategory, string[]>> = {
  Cromatografía: ["HPLC", "cromatografia liquida", "GC", "cromatografia de gases", "columnas"],
  "Análisis elemental": ["Kjeldahl", "nitrogeno", "proteina", "digestion", "combustion"],
};

function buildProductItems(): SearchItem[] {
  return mockProducts.map((product) => ({
    id: `producto-${product.id}`,
    title: product.name,
    description: product.description,
    type: "producto",
    href: productHref(product.slug ?? product.id),
    keywords: [
      product.category,
      product.detail?.brand ?? "",
      product.detail?.model ?? "",
      ...(product.tags ?? []),
      ...(product.filters ?? []),
    ].filter(Boolean),
    image: product.imageUrl,
  }));
}

function buildCategoryItems(): SearchItem[] {
  return productFilters
    .filter((category) => category !== "Marcas")
    .map((category) => ({
      id: `categoria-${category}`,
      title: category,
      description: `Ver productos de la categoría ${category}`,
      type: "categoria",
      href: `/productos?filtro=${encodeURIComponent(category)}`,
      keywords: CATEGORY_KEYWORDS[category] ?? [],
    }));
}

function buildBrandItems(): SearchItem[] {
  const brands = Array.from(
    new Set(
      mockProducts
        .map((product) => product.detail?.brand)
        .filter((brand): brand is string => Boolean(brand))
    )
  );

  return brands.map((brand) => ({
    id: `marca-${brand}`,
    title: brand,
    description: `Ver equipos de la marca ${brand}`,
    type: "marca",
    href: `/productos?filtro=${encodeURIComponent(brand)}`,
  }));
}

function buildSolutionItems(): SearchItem[] {
  return industries.map((industry) => ({
    id: `solucion-${industry.slug}`,
    title: `Soluciones para ${industry.name}`,
    description: industry.detail,
    type: "solucion",
    href: `/soluciones/${industry.slug}`,
  }));
}

function buildServiceItems(): SearchItem[] {
  const detailPages: SearchItem[] = services.map((service) => ({
    id: `servicio-${service.slug}`,
    title: service.title,
    description: service.description,
    type: "servicio",
    href: `/servicios/${service.slug}`,
  }));

  const corePages: SearchItem[] = coreServices.map((service) => ({
    id: `servicio-core-${service.id}`,
    title: service.title,
    description: service.description,
    type: "servicio",
    href: `/servicios#${service.id}`,
  }));

  return [...detailPages, ...corePages];
}

// Páginas institucionales reales que no encajan en las categorías anteriores.
const resourceItems: SearchItem[] = [
  {
    id: "recurso-nosotros",
    title: "Nosotros",
    description: "Historia, trayectoria y equipo de Del Carpio Análisis y Asesorías.",
    type: "recurso",
    href: "/nosotros",
  },
  {
    id: "recurso-proyectos",
    title: "Proyectos de laboratorio completo",
    description: "Proyectos de implementación analítica ejecutados por Del Carpio.",
    type: "recurso",
    href: "/proyectos",
  },
  {
    id: "recurso-tour-virtual",
    title: "Tour virtual de laboratorio",
    description: "Recorrido virtual por las instalaciones de Del Carpio.",
    type: "recurso",
    href: "/contacto/tour-laboratorio",
  },
];

export const searchIndex: SearchItem[] = [
  ...buildProductItems(),
  ...buildCategoryItems(),
  ...buildSolutionItems(),
  ...buildServiceItems(),
  ...buildBrandItems(),
  ...resourceItems,
];

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}
