"use client";

import { ArrowUpRight, CaretDown, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

import { useMegaMenuScopes } from "@/components/sections/mega-menu-context";
import type { MegaMenuScope } from "@/content/mega-menu-data";

type Language = "es" | "en" | "pt";

const labels = {
  es: {
    catalog: "Catálogo completo",
    explore: "Explorar catálogo",
    categories: "Categorías",
    brands: "Marcas",
    references: "referencias",
    viewCatalog: "Ver todos los productos",
    viewSector: "Ver página de industria",
  },
  en: {
    catalog: "Full catalog",
    explore: "Explore catalog",
    categories: "Categories",
    brands: "Brands",
    references: "products",
    viewCatalog: "View all products",
    viewSector: "View industry page",
  },
  pt: {
    catalog: "Catálogo completo",
    explore: "Explorar catálogo",
    categories: "Categorias",
    brands: "Marcas",
    references: "produtos",
    viewCatalog: "Ver todos os produtos",
    viewSector: "Ver página do setor",
  },
} satisfies Record<Language, Record<string, string>>;

function getScopeLabel(scope: MegaMenuScope, language: Language, industryLabels: Record<string, string>) {
  return scope.id === "catalogo" ? labels[language].catalog : industryLabels[scope.id] ?? scope.label;
}

export function CatalogMegaMenuDesktop({
  language,
  industryLabels,
  isOpen,
  onOpenChange,
}: {
  language: Language;
  industryLabels: Record<string, string>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const scopes = useMegaMenuScopes();
  const pathname = usePathname();
  const panelId = useId();
  const barRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const [scopeId, setScopeId] = useState("catalogo");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");

  const scope = scopes.find((item) => item.id === scopeId) ?? scopes[0];
  const category = scope.categories.find((item) => item.name === categoryName) ?? scope.categories[0];
  const brand = category.brands.find((item) => item.name === brandName) ?? category.brands[0];
  const hasMultipleBrands = category.brands.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (barRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      onOpenChange(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onOpenChange(false);
      window.requestAnimationFrame(() => activeButtonRef.current?.focus());
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  return (
    <>
      <nav ref={barRef} aria-label={labels[language].explore} className="flex min-w-0 flex-1 items-center overflow-x-auto">
        {scopes.map((item) => {
          const selected = isOpen && item.id === scope.id;
          const currentPage = item.id === "catalogo"
            ? pathname.startsWith("/productos")
            : pathname === item.href;

          return (
            <button
              key={item.id}
              ref={item.id === scope.id ? activeButtonRef : undefined}
              type="button"
              aria-controls={isOpen ? panelId : undefined}
              aria-expanded={selected}
              aria-pressed={selected}
              onClick={() => {
                if (selected) {
                  onOpenChange(false);
                  return;
                }
                setScopeId(item.id);
                setCategoryName(item.categories[0].name);
                setBrandName(item.categories[0].brands[0].name);
                onOpenChange(true);
              }}
              className={`min-h-11 shrink-0 whitespace-nowrap px-3 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] xl:px-4 ${
                selected
                  ? "bg-[#4A5560] text-white"
                  : currentPage
                    ? "text-[#4A5560] underline decoration-[#D6532B] underline-offset-4 hover:bg-white"
                    : "text-[#4A5560] hover:bg-white hover:text-[#D6532B]"
              }`}
            >
              {getScopeLabel(item, language, industryLabels)}
            </button>
          );
        })}
      </nav>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-label={`${labels[language].explore}: ${getScopeLabel(scope, language, industryLabels)}`}
          className="fixed inset-x-3 top-[124px] z-[1001] mx-auto max-w-[1320px] overflow-hidden border border-[#707E83]/25 bg-white text-[#4A5560] xl:inset-x-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-lg font-bold leading-tight">
                {getScopeLabel(scope, language, industryLabels)}
              </h2>
              <span className="text-xs text-[#707E83]">{scope.count} {labels[language].references}</span>
            </div>
            <Link
              href={scope.href}
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#D6532B] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6532B]"
            >
              {scope.id === "catalogo" ? labels[language].viewCatalog : labels[language].viewSector}
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-y border-[#707E83]/20">
            <div role="group" aria-label={labels[language].categories} className="flex overflow-x-auto px-3">
              {scope.categories.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={item.name === category.name}
                  onClick={() => {
                    setCategoryName(item.name);
                    setBrandName(item.brands[0].name);
                  }}
                  className={`min-h-12 shrink-0 border-b-2 px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] ${
                    item.name === category.name
                      ? "border-[#D6532B] text-[#D6532B]"
                      : "border-transparent text-[#4A5560] hover:text-[#D6532B]"
                  }`}
                >
                  {item.name} <span className="ml-1 text-xs text-[#707E83]">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`grid max-h-[52vh] min-h-56 ${hasMultipleBrands ? "grid-cols-[minmax(11rem,0.36fr)_minmax(0,1fr)]" : "grid-cols-1"}`}>
            {hasMultipleBrands && (
              <div role="group" aria-label={labels[language].brands} className="overflow-y-auto border-r border-[#707E83]/20 px-3 py-4">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#707E83]">{labels[language].brands}</p>
                {category.brands.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={item.name === brand.name}
                    onMouseEnter={() => setBrandName(item.name)}
                    onFocus={() => setBrandName(item.name)}
                    onClick={() => setBrandName(item.name)}
                    className={`flex min-h-11 w-full items-center justify-between gap-3 border-l-2 px-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] ${
                      item.name === brand.name
                        ? "border-[#D6532B] bg-[#F4F4F4] font-semibold text-[#D6532B]"
                        : "border-transparent hover:bg-[#F4F4F4]"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="flex items-center gap-2 text-xs text-[#707E83]">
                      {item.products.length}<CaretRight size={12} aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div className="min-h-0 overflow-y-auto px-6 py-5">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h3 aria-live="polite" className="font-display text-base font-bold">{brand.name}</h3>
                <span className="text-xs text-[#707E83]">{brand.products.length} {labels[language].references}</span>
              </div>
              <ul className="max-w-4xl">
                {brand.products.map((product) => (
                  <li key={product.id} className="border-t border-[#707E83]/20">
                    <Link
                      href={product.href}
                      onClick={() => onOpenChange(false)}
                      className="group flex min-h-11 items-center justify-between gap-4 py-2 text-sm hover:text-[#D6532B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B]"
                    >
                      <span>{product.name}</span>
                      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="shrink-0 text-[#D6532B]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

export function CatalogMegaMenuMobile({
  language,
  industryLabels,
  onNavigate,
}: {
  language: Language;
  industryLabels: Record<string, string>;
  onNavigate: () => void;
}) {
  const scopes = useMegaMenuScopes();
  const [rootOpen, setRootOpen] = useState(false);
  const [scopeId, setScopeId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);

  return (
    <div className="notranslate border-t border-white/10 pt-4">
      <button
        type="button"
        aria-expanded={rootOpen}
        onClick={() => setRootOpen((open) => !open)}
        className="flex min-h-11 w-full items-center justify-between rounded-[2px] px-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
      >
        {labels[language].explore}
        <CaretDown size={15} weight="bold" aria-hidden="true" className={rootOpen ? "rotate-180" : ""} />
      </button>

      {rootOpen && (
        <div className="mt-1 pl-2">
          {scopes.map((scope) => {
            const scopeOpen = scope.id === scopeId;

            return (
              <div key={scope.id} className="border-t border-white/10 first:border-t-0">
                <button
                  type="button"
                  aria-expanded={scopeOpen}
                  onClick={() => {
                    setScopeId(scopeOpen ? null : scope.id);
                    setCategoryName(null);
                    setBrandName(null);
                  }}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B] ${scopeOpen ? "text-white" : "text-slate-300"}`}
                >
                  <span>{getScopeLabel(scope, language, industryLabels)}</span>
                  <span className="flex items-center gap-2 text-xs text-slate-400">
                    {scope.count}<CaretDown size={13} aria-hidden="true" className={scopeOpen ? "rotate-180" : ""} />
                  </span>
                </button>
                {scopeOpen && (
                  <div className="border-l-2 border-[#D6532B] pl-3">
                    <Link
                      href={scope.href}
                      onClick={onNavigate}
                      className="flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                    >
                      {scope.id === "catalogo" ? labels[language].viewCatalog : labels[language].viewSector}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    {scope.categories.map((category) => {
                      const categoryOpen = category.name === categoryName;
                      const onlyBrand = category.brands.length === 1 ? category.brands[0] : null;

                      return (
                        <div key={category.name} className="border-t border-white/10">
                          <button
                            type="button"
                            aria-expanded={categoryOpen}
                            onClick={() => {
                              setCategoryName(categoryOpen ? null : category.name);
                              setBrandName(null);
                            }}
                            className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                          >
                            <span>{category.name}</span>
                            <span className="flex items-center gap-2 text-xs text-slate-400">
                              {category.count}<CaretDown size={13} aria-hidden="true" className={categoryOpen ? "rotate-180" : ""} />
                            </span>
                          </button>
                          {categoryOpen && (
                            <div className="pl-3">
                              {onlyBrand ? (
                                <MobileProductList brand={onlyBrand} onNavigate={onNavigate} />
                              ) : category.brands.map((brand) => {
                                const brandOpen = brand.name === brandName;
                                return (
                                  <div key={brand.name} className="border-t border-white/10">
                                    <button
                                      type="button"
                                      aria-expanded={brandOpen}
                                      onClick={() => setBrandName(brandOpen ? null : brand.name)}
                                      className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                                    >
                                      <span>{brand.name}</span>
                                      <span className="flex items-center gap-2 text-xs text-slate-400">
                                        {brand.products.length}<CaretDown size={13} aria-hidden="true" className={brandOpen ? "rotate-180" : ""} />
                                      </span>
                                    </button>
                                    {brandOpen && <MobileProductList brand={brand} onNavigate={onNavigate} />}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileProductList({
  brand,
  onNavigate,
}: {
  brand: MegaMenuScope["categories"][number]["brands"][number];
  onNavigate: () => void;
}) {
  return (
    <div className="pb-2 pl-3">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{brand.name}</p>
      <ul>
        {brand.products.map((product) => (
          <li key={product.id}>
            <Link
              href={product.href}
              onClick={onNavigate}
              className="flex min-h-11 items-center px-3 py-2 text-sm leading-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
