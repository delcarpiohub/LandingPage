"use client";

import { ArrowUpRight, CaretDown, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

import { useMegaMenuScopes } from "@/components/sections/mega-menu-context";
import type { MegaMenuCategory, MegaMenuProduct } from "@/content/mega-menu-data";

type Language = "es" | "en" | "pt";

const labels = {
  es: {
    explore: "Industrias",
    viewSector: "Conocer la industria",
  },
  en: {
    explore: "Industries",
    viewSector: "Explore this industry",
  },
  pt: {
    explore: "Indústrias",
    viewSector: "Conhecer o setor",
  },
} satisfies Record<Language, Record<string, string>>;

function productsIn(category: MegaMenuCategory): MegaMenuProduct[] {
  return category.brands.flatMap((brand) => brand.products);
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
  const [scopeId, setScopeId] = useState(scopes[0]?.id ?? "");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");

  const scope = scopes.find((item) => item.id === scopeId) ?? scopes[0];
  const category = scope?.categories.find((item) => item.name === categoryName) ?? scope?.categories[0];
  const brand = category?.brands.find((item) => item.name === brandName) ?? category?.brands[0];
  const hasMultipleBrands = (category?.brands.length ?? 0) > 1;

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
          const currentPage = pathname === item.href;

          return (
            <button
              key={item.id}
              ref={item.id === scope.id ? activeButtonRef : undefined}
              type="button"
              aria-controls={isOpen ? panelId : undefined}
              aria-expanded={selected}
              onClick={() => {
                if (selected) {
                  onOpenChange(false);
                  return;
                }
                setScopeId(item.id);
                setCategoryName(item.categories[0]?.name ?? "");
                setBrandName(item.categories[0]?.brands[0]?.name ?? "");
                onOpenChange(true);
              }}
              className={`min-h-11 shrink-0 whitespace-nowrap border-b-2 px-3 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] xl:px-4 ${
                selected
                  ? "border-[#4A5560] bg-[#4A5560] text-white"
                  : currentPage
                    ? "border-[#D6532B] text-[#4A5560]"
                    : "border-transparent text-[#4A5560] hover:text-[#D6532B]"
              }`}
            >
              {industryLabels[item.id] ?? item.label}
            </button>
          );
        })}
      </nav>

      {isOpen && scope && category && brand && typeof document !== "undefined" && createPortal(
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-label={`${labels[language].explore}: ${industryLabels[scope.id] ?? scope.label}`}
          className="fixed inset-x-3 top-[124px] z-[1001] mx-auto max-w-[1320px] border border-[#707E83]/15 bg-white text-[#4A5560] shadow-[0_24px_64px_rgba(16,24,32,0.14)] xl:inset-x-8"
        >
          <div className="flex min-w-0 items-center justify-between gap-5 border-b border-[#707E83]/15 px-7">
            <div role="group" aria-label={`${industryLabels[scope.id] ?? scope.label}: categorías`} className="flex min-w-0 items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {scope.categories.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={item.name === category.name}
                  onClick={() => {
                    setCategoryName(item.name);
                    setBrandName(item.brands[0]?.name ?? "");
                  }}
                  className={`min-h-12 shrink-0 border-b-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] ${
                    item.name === category.name
                      ? "border-[#D6532B] text-[#D6532B]"
                      : "border-transparent text-[#4A5560] hover:text-[#D6532B]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <Link
              href={scope.href}
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-12 shrink-0 items-center gap-1.5 text-xs font-semibold text-[#D6532B] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6532B]"
            >
              {labels[language].viewSector}
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <div className={`grid max-h-[min(55vh,520px)] min-h-48 gap-8 px-7 py-5 ${hasMultipleBrands ? "grid-cols-[minmax(13rem,0.27fr)_minmax(0,1fr)]" : "grid-cols-1"}`}>
            {hasMultipleBrands && (
              <div role="group" aria-label={`${category.name}: marcas`} className="min-h-0 overflow-y-auto">
                {category.brands.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={item.name === brand.name}
                    onMouseEnter={() => setBrandName(item.name)}
                    onFocus={() => setBrandName(item.name)}
                    onClick={() => setBrandName(item.name)}
                    className={`flex min-h-12 w-full items-center justify-between gap-3 border-b border-[#707E83]/25 text-left text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B] ${
                      item.name === brand.name
                        ? "font-semibold text-[#D6532B]"
                        : "text-[#4A5560] hover:text-[#D6532B]"
                    }`}
                  >
                    {item.name}
                    <CaretRight size={14} aria-hidden="true" className="shrink-0" />
                  </button>
                ))}
              </div>
            )}
            <div className="min-h-0 overflow-y-auto">
              {hasMultipleBrands && (
                <h2 aria-live="polite" className="border-b border-[#707E83]/35 pb-3 text-sm font-semibold text-[#D6532B]">{brand.name}</h2>
              )}
              <ul aria-live={hasMultipleBrands ? undefined : "polite"} className={hasMultipleBrands ? "" : "grid grid-cols-2 gap-x-8"}>
                {brand.products.map((product) => (
                  <li key={product.id} className="border-b border-[#707E83]/15 last:border-b-0">
                    <Link
                      href={product.href}
                      onClick={() => onOpenChange(false)}
                      className="group flex min-h-12 items-center justify-between gap-3 py-2 text-sm leading-5 hover:text-[#D6532B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6532B]"
                    >
                      <span>{product.name}</span>
                      <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-[#D6532B] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
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

  return (
    <div className="notranslate border-t border-white/10 pt-4">
      <button
        type="button"
        aria-expanded={rootOpen}
        onClick={() => setRootOpen((open) => !open)}
        className="flex min-h-11 w-full items-center justify-between px-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
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
                  }}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B] ${scopeOpen ? "text-white" : "text-slate-300"}`}
                >
                  <span>{industryLabels[scope.id] ?? scope.label}</span>
                  <CaretDown size={13} aria-hidden="true" className={scopeOpen ? "rotate-180" : ""} />
                </button>
                {scopeOpen && (
                  <div className="border-l-2 border-[#D6532B] pl-3">
                    <Link
                      href={scope.href}
                      onClick={onNavigate}
                      className="flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                    >
                      {labels[language].viewSector}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                    {scope.categories.map((category) => {
                      const categoryOpen = category.name === categoryName;
                      return (
                        <div key={category.name} className="border-t border-white/10">
                          <button
                            type="button"
                            aria-expanded={categoryOpen}
                            onClick={() => {
                              setCategoryName(categoryOpen ? null : category.name);
                            }}
                            className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                          >
                            <span>{category.name}</span>
                            <CaretDown size={13} aria-hidden="true" className={categoryOpen ? "rotate-180" : ""} />
                          </button>
                          {categoryOpen && (
                            <ul className="pb-2 pl-3">
                              {productsIn(category).map((product) => (
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
