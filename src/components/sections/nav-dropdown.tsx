"use client";

import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

export type NavDropdownItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

export type NavDropdownGroup = {
  id: string;
  label: string;
  description?: string;
  items: NavDropdownItem[];
};

const panelTransition =
  "transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:duration-0";

/**
 * Dropdown de navegación controlado desde afuera (isOpen/onOpenChange), para
 * que un único estado central (ver navigation.tsx) garantice que solo un
 * dropdown del header pueda estar abierto a la vez. La etiqueta principal
 * siempre navega como link real; la flecha es el único disparador del panel.
 */
export function NavDropdown({
  label,
  href,
  items,
  groups,
  columns = 1,
  variant = "desktop",
  isOpen,
  onOpenChange,
  onNavigate,
}: {
  label: string;
  href: string;
  items: NavDropdownItem[];
  groups?: NavDropdownGroup[];
  columns?: 1 | 2;
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
  const isMobile = variant === "mobile";
  const isMegaMenu = !isMobile && Boolean(groups?.length);

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
  }, [isMobile, isOpen, close, onOpenChange]);

  return (
    <div
      ref={containerRef}
      className={cn(isMegaMenu ? "static" : "relative", isMobile && "w-full")}
    >
      <div
        className={cn(
          "flex items-center",
          isMobile ? "w-full justify-between" : "gap-1",
        )}
      >
        <Link
          href={href}
          aria-current={pathname.startsWith(href) ? "page" : undefined}
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
              ? `Cerrar submenú de ${label.toLowerCase()}`
              : `Abrir submenú de ${label.toLowerCase()}`
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

      <div
        id={panelId}
        role="group"
        aria-label={`Submenú de ${label.toLowerCase()}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          panelTransition,
          isMobile
            ? cn(
                "grid overflow-hidden pl-3",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )
            : cn(
                isMegaMenu
                  ? "absolute left-1/2 top-full z-50 mt-2 w-[calc(100vw-4rem)] max-w-[78rem] -translate-x-1/2 overflow-hidden rounded-sm border border-[#E5E7EB] bg-white p-0 shadow-[0_12px_30px_rgba(15,23,42,0.10)]"
                  : cn(
                      "absolute left-0 top-full z-50 mt-7 overflow-hidden rounded-[10px] border border-[#DDE1E5] bg-white shadow-[0_6px_12px_rgba(15,23,42,0.10)]",
                      columns === 2 ? "w-[38rem]" : "w-[34rem]",
                    ),
                isOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible -translate-y-2 opacity-0 pointer-events-none",
              ),
        )}
      >
        <div className={cn(isMobile && "min-h-0")}>
          {isMegaMenu && groups ? (
            <div className="grid grid-cols-4 divide-x divide-[#E5E7EB]">
              {groups.map((group) => (
                <section
                  key={group.id}
                  aria-labelledby={`${panelId}-${group.id}`}
                  className="min-w-0 px-5 py-6"
                >
                  <p
                    id={`${panelId}-${group.id}`}
                    className="font-display text-[17px] font-bold leading-tight text-[#1F2933]"
                  >
                    {group.label}
                  </p>
                  <ul className="mt-5 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => onOpenChange(false)}
                          className="flex min-h-10 items-center rounded-sm px-3 py-2 text-[13px] font-medium leading-snug text-[#4A5560] transition-colors duration-200 hover:bg-[#F7F6F2] hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : isMobile ? (
            <div className="pb-1 pt-1">
              <Link
                href={href}
                onClick={handleNavigation}
                className="flex min-h-11 items-center justify-between rounded-[2px] px-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
              >
                <span>Ver todos los servicios</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
              <ul className="mt-1 divide-y divide-white/10 border-y border-white/10">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={handleNavigation}
                      className="flex min-h-11 flex-col justify-center gap-1 rounded-[2px] px-3 py-3 transition-colors duration-200 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                    >
                      <span className="text-sm font-semibold text-slate-100">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs leading-relaxed text-slate-300">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex min-h-11 items-center justify-between gap-6 border-b border-[#E4E7EA] pb-4">
                <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-[#1F2933]">
                  {label}
                </p>
                <Link
                  href={href}
                  onClick={handleNavigation}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-[4px] text-sm font-semibold text-[#4F5964] transition-colors hover:text-[#B84A28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                >
                  Ver todos los servicios
                  <ArrowRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>
              <ul className="grid grid-cols-2">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className={cn(
                      index % 2 === 1 && "border-l border-[#E4E7EA]",
                      index > 1 && "border-t border-[#E4E7EA]",
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={handleNavigation}
                      className="flex min-h-[7.25rem] flex-col justify-center gap-2 rounded-[4px] px-5 py-4 transition-colors duration-200 hover:bg-[#F3F2EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                    >
                      <span className="font-display text-[15px] font-semibold leading-snug text-[#1F2933]">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-[13px] leading-relaxed text-[#59636E]">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
