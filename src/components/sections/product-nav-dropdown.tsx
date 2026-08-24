"use client";

import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { NavDropdownItem } from "@/components/sections/nav-dropdown";
import { cn } from "@/lib/utils";

export type ProductMenuGroup = {
  id: string;
  label: string;
  items: NavDropdownItem[];
};

export type ProductFeaturedItem = {
  eyebrow: string;
  name: string;
  href: string;
  image: string;
  imageAlt: string;
};

const panelTransition =
  "transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:duration-0";

export function ProductNavDropdown({
  label,
  groups,
  featured,
  variant = "desktop",
  isOpen,
  onOpenChange,
  onNavigate,
}: {
  label: string;
  groups: ProductMenuGroup[];
  featured: ProductFeaturedItem;
  variant?: "desktop" | "mobile";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const previousPathnameRef = useRef(pathname);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    groups[0]?.id ?? null,
  );
  const isMobile = variant === "mobile";

  const close = useCallback(
    (restoreFocus = false) => {
      onOpenChange(false);

      if (restoreFocus) {
        window.requestAnimationFrame(() => toggleButtonRef.current?.focus());
      }
    },
    [onOpenChange],
  );

  const handleNavigation = useCallback(() => {
    close();
    onNavigate?.();
  }, [close, onNavigate]);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      onOpenChange(false);
    }
  }, [onOpenChange, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function isActiveViewportVariant() {
      const isDesktopViewport = window.matchMedia(
        "(min-width: 1024px)",
      ).matches;
      return isMobile ? !isDesktopViewport : isDesktopViewport;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!isActiveViewportVariant()) return;

      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        onOpenChange(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!isActiveViewportVariant()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isMobile, isOpen, onOpenChange]);

  return (
    <div
      ref={containerRef}
      className={cn(isMobile ? "relative w-full" : "static")}
    >
      <div
        className={cn(
          "flex items-center",
          isMobile ? "w-full justify-between" : "gap-1",
        )}
      >
        <Link
          href="/productos"
          aria-current={pathname.startsWith("/productos") ? "page" : undefined}
          onClick={handleNavigation}
          className={cn(
            "notranslate transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
            isMobile
              ? "flex min-h-11 flex-1 items-center rounded-[2px] pl-3 font-display text-[14px] font-semibold text-slate-100 hover:text-white"
              : "whitespace-nowrap text-[14px] font-semibold leading-none tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D6532B]",
          )}
        >
          {label}
        </Link>
        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={
            isOpen
              ? "Cerrar catálogo de productos"
              : "Abrir catálogo de productos"
          }
          onClick={() => onOpenChange(!isOpen)}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-[6px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
            isOpen
              ? "bg-white/10 text-[#D6532B]"
              : "text-[#F5F5F5]/70 hover:bg-white/[0.06] hover:text-[#D6532B]",
          )}
        >
          <CaretDown
            size={13}
            weight="bold"
            aria-hidden="true"
            className={cn(
              "transition-transform duration-200 motion-reduce:transition-none",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      {isMobile ? (
        <div
          id={panelId}
          role="group"
          aria-label="Catálogo de productos"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={cn(
            "grid overflow-hidden pl-3 transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none",
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <Link
              href="/productos"
              onClick={handleNavigation}
              className="mt-1 flex min-h-11 items-center justify-between rounded-[2px] px-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
            >
              <span>Ver todos los productos</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>

            <div className="mt-1 divide-y divide-white/10 border-y border-white/10">
              {groups.map((group) => {
                const isExpanded = expandedGroup === group.id;
                const groupPanelId = `${panelId}-${group.id}`;

                return (
                  <section key={group.id}>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={groupPanelId}
                      onClick={() =>
                        setExpandedGroup(isExpanded ? null : group.id)
                      }
                      className="flex min-h-11 w-full items-center rounded-[2px] px-3 py-2 text-left text-slate-100 transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                    >
                      <span className="flex-1 text-sm font-semibold">
                        {group.label}
                      </span>
                      <CaretDown
                        size={14}
                        weight="bold"
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-200 motion-reduce:transition-none",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      id={groupPanelId}
                      aria-hidden={!isExpanded}
                      inert={!isExpanded}
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none",
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0">
                        <ul className="pb-2 pl-8 pr-2">
                          {group.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                onClick={handleNavigation}
                                className="flex min-h-11 items-center rounded-[2px] px-3 py-2 text-[13px] leading-snug text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          id={panelId}
          role="group"
          aria-label="Explorador de productos"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={cn(
            panelTransition,
            "absolute left-1/2 top-full z-50 mt-3 w-[min(calc(100vw-3rem),85rem)] -translate-x-1/2 overflow-hidden rounded-[10px] border border-[#DDE1E5] bg-white shadow-[0_6px_12px_rgba(15,23,42,0.10)]",
            isOpen
              ? "visible translate-y-0 opacity-100 pointer-events-auto"
              : "invisible -translate-y-2 opacity-0 pointer-events-none",
          )}
        >
          <div className="grid min-h-[27rem] grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,0.9fr)] p-8 xl:p-10">
            <section className="flex min-w-0 flex-col justify-between border-r border-[#E4E7EA] pr-8 xl:pr-10">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D6532B]">
                  Catálogo de productos
                </p>
                <p className="mt-5 max-w-[17ch] font-display text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#101820]">
                  Equipamiento para análisis, medición y control.
                </p>
              </div>
              <Link
                href="/productos"
                onClick={handleNavigation}
                className="group mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-[4px] text-sm font-semibold text-[#101820] transition-colors hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
              >
                Ver todos los productos
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </section>

            <div className="grid min-w-0 grid-cols-2 pl-8 xl:pl-10">
              {groups.map((group, index) => (
                <section
                  key={group.id}
                  aria-labelledby={`${panelId}-${group.id}`}
                  className={cn(
                    "min-w-0 px-7 py-1 xl:px-9",
                    index % 2 === 1 && "border-l border-[#E4E7EA]",
                    index > 1 && "border-t border-[#E4E7EA] pt-7",
                    index < 2 && "pb-7",
                  )}
                >
                  <div>
                    <p
                      id={`${panelId}-${group.id}`}
                      className="font-display text-[17px] font-semibold leading-tight tracking-[-0.015em] text-[#1F2933]"
                    >
                      {group.label}
                    </p>
                  </div>
                  <ul className="mt-3">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={handleNavigation}
                          className="flex min-h-10 items-center rounded-[4px] px-3 py-2 text-[14px] font-medium leading-snug text-[#56616C] transition-colors duration-200 hover:bg-[#F3F2EE] hover:text-[#B84A28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <aside className="flex min-w-0 flex-col border-l border-[#E4E7EA] pl-8 xl:pl-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#69727C]">
                Producto destacado
              </p>
              <Link
                href={featured.href}
                onClick={handleNavigation}
                className="group mt-5 block rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-[#ECEDEB]">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 260px, 0px"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </span>
                <span className="mt-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B84A28]">
                  {featured.eyebrow}
                </span>
                <span className="mt-2 block font-display text-[17px] font-semibold leading-snug tracking-[-0.015em] text-[#1F2933] transition-colors group-hover:text-[#B84A28]">
                  {featured.name}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#56616C] transition-colors group-hover:text-[#B84A28]">
                  Ver producto
                  <ArrowRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
