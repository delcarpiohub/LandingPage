"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { industries } from "@/content/site";

// Los sectores del sitio: el catálogo los trata como un valor más de
// `?filtro=`, así que se reconocen por `industries[].catalogCategory`.
const INDUSTRY_FILTERS: readonly string[] = industries.map(
  (industry) => industry.catalogCategory,
);

const LINK_CLASS =
  "inline-flex items-center py-3.5 -my-3.5 hover:text-[#101820] transition-colors";
const SEPARATOR_CLASS = "text-[#707E83]/60";

/** `?from=` solo se acepta si es una URL del propio catálogo. */
function parseCatalogFrom(from: string | null): URL | null {
  if (!from || !/^\/productos(?:[?#]|$)/.test(from)) return null;
  try {
    return new URL(from, "https://catalogo.local");
  } catch {
    return null;
  }
}

function filterHref(filter: string) {
  return `/productos?filtro=${encodeURIComponent(filter)}`;
}

type Crumb = { label: string; href: string };

function BreadcrumbView({ links, model }: { links: Crumb[]; model: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 -translate-y-2">
      <ol className="inline-flex min-w-0 flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-[#707E83]">
        {links.map((link) => (
          <li key={link.label} className="contents">
            <Link href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
            <span aria-hidden className={SEPARATOR_CLASS}>
              /
            </span>
          </li>
        ))}
        <li
          aria-current="page"
          className="font-extrabold text-[#101820] truncate max-w-[200px] sm:max-w-none"
        >
          {model}
        </li>
      </ol>
    </nav>
  );
}

function baseLinks(category: string, productsHref: string): Crumb[] {
  return [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: productsHref },
    { label: category, href: filterHref(category) },
  ];
}

type BreadcrumbProps = { category: string; model: string };

/** Versión sin `?from=`: fallback de Suspense (render de servidor). */
export function ProductBreadcrumbFallback({ category, model }: BreadcrumbProps) {
  return (
    <BreadcrumbView links={baseLinks(category, "/productos")} model={model} />
  );
}

/**
 * Breadcrumb de la ficha: Inicio / Productos / [Industria] / Categoría / Modelo.
 *
 * - "Productos" vuelve a la vista del catálogo de origen (`?from=`, con su
 *   filtro, página y búsqueda); sin `from` va a /productos.
 * - La industria aparece solo si el `from` trae un filtro de industria
 *   distinto de la categoría primaria. No se deduce de los datos del producto.
 * - El JSON-LD BreadcrumbList vive en la página y usa solo la categoría
 *   primaria, para que no cambie según desde dónde llegó el visitante.
 */
export function ProductBreadcrumb({ category, model }: BreadcrumbProps) {
  const fromUrl = parseCatalogFrom(useSearchParams().get("from"));
  const productsHref = fromUrl
    ? `${fromUrl.pathname}${fromUrl.search}`
    : "/productos";
  const fromFilter = fromUrl?.searchParams.get("filtro") ?? null;
  const industry =
    fromFilter && fromFilter !== category && INDUSTRY_FILTERS.includes(fromFilter)
      ? fromFilter
      : null;

  const links = baseLinks(category, productsHref);
  if (industry) links.splice(2, 0, { label: industry, href: filterHref(industry) });

  return <BreadcrumbView links={links} model={model} />;
}
