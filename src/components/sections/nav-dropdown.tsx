"use client";

import { CaretDown } from "@phosphor-icons/react";
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

const panelTransition =
  "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0";

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
  columns = 1,
  variant = "desktop",
  isOpen,
  onOpenChange,
}: {
  label: string;
  href: string;
  items: NavDropdownItem[];
  columns?: 1 | 2;
  variant?: "desktop" | "mobile";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
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

  // Cierre al navegar a una sección
  useEffect(() => {
    onOpenChange(false);
    // Solo debe reaccionar a cambios de ruta, no a onOpenChange en sí.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        onOpenChange(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
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
  }, [isOpen, close, onOpenChange]);

  return (
    <div ref={containerRef} className={cn("relative", isMobile && "w-full")}>
      <div className={cn("flex items-center", isMobile && "w-full justify-between")}>
        <Link
          href={href}
          className={cn(
            "transition-colors duration-[220ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]",
            isMobile
              ? "rounded-[2px] py-3 pl-3 font-display text-[12px] font-bold uppercase tracking-wider text-slate-300 hover:text-white"
              : "text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D6532B]",
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
            "grid size-11 shrink-0 place-items-center rounded-full text-[#F5F5F5]/70 transition-colors duration-200 hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
            !isMobile && "-ml-1",
          )}
        >
          <CaretDown
            size={13}
            weight="bold"
            aria-hidden="true"
            className={cn(
              "transition-transform duration-150 ease-out motion-reduce:transition-none",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        id={panelId}
        role="group"
        aria-label={`Submenú de ${label.toLowerCase()}`}
        className={cn(
          panelTransition,
          isMobile
            ? cn(
                "grid overflow-hidden pl-3",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )
            : cn(
                "absolute left-0 top-full z-50 mt-2 rounded-sm border border-[#E5E7EB] bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.10)]",
                columns === 2 ? "w-[380px]" : "w-72",
                isOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible -translate-y-1 opacity-0 pointer-events-none",
              ),
        )}
      >
        <div className={cn(isMobile && "min-h-0")}>
          <ul
            className={cn(
              "gap-0.5",
              isMobile
                ? "flex flex-col pt-1"
                : columns === 2
                  ? "grid grid-cols-2"
                  : "flex flex-col",
            )}
          >
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex min-h-11 flex-col justify-center gap-0.5 rounded-sm px-3 py-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]",
                    isMobile ? "hover:bg-white/5" : "hover:bg-[#1F2933]/[0.05]",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isMobile ? "text-slate-200" : "text-[#1F2933]",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.description && (
                    <span
                      className={cn(
                        "line-clamp-2 text-xs md:line-clamp-1",
                        isMobile ? "text-slate-400" : "text-[#667085]",
                      )}
                    >
                      {item.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
