"use client";

import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ServiceEntry = {
  id: string;
  label: string;
  description: string;
};

// Confirmado en /servicios (cards reales) y /contacto/[tipo] (formularios
// dedicados: mantencion, correctivo, diagnostico, capacitacion). No incluye
// "Instalación y puesta en marcha" (solo mencionado de paso en metadata,
// sin card ni formulario propio) ni servicios sin evidencia en el proyecto.
const SERVICE_ENTRIES: ServiceEntry[] = [
  {
    id: "mantencion",
    label: "Mantención preventiva",
    description: "Mantenimiento preventivo periódico de instrumentos de laboratorio.",
  },
  {
    id: "correctivo",
    label: "Servicio correctivo",
    description: "Diagnóstico y reparación de equipos ante fallas o averías.",
  },
  {
    id: "diagnostico",
    label: "Diagnóstico técnico",
    description: "Auditoría técnica del parque de instrumentos y sus métodos.",
  },
  {
    id: "capacitacion",
    label: "Capacitación técnica",
    description: "Formación técnica teórica y práctica para su equipo.",
  },
];

const panelTransition =
  "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0";

export function ServicesNavDropdown({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => toggleButtonRef.current?.focus());
    }
  }, []);

  // Cierre al navegar a una sección
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
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
  }, [isOpen, close]);

  const isMobile = variant === "mobile";

  return (
    <div
      ref={containerRef}
      className={cn("relative", isMobile && "w-full")}
      onPointerEnter={(event) => {
        if (!isMobile && event.pointerType === "mouse") {
          setIsOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (!isMobile && event.pointerType === "mouse") {
          setIsOpen(false);
        }
      }}
    >
      <div className={cn("flex items-center", isMobile && "w-full justify-between")}>
        <Link
          href="/servicios"
          className={cn(
            "transition-colors duration-[220ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]",
            isMobile
              ? "rounded-[2px] py-3 pl-3 font-display text-[12px] font-bold uppercase tracking-wider text-slate-300 hover:text-white"
              : "text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D6532B]",
          )}
        >
          Servicios
        </Link>
        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={isOpen ? "Cerrar submenú de servicios" : "Abrir submenú de servicios"}
          onClick={() => setIsOpen((value) => !value)}
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
        aria-label="Submenú de servicios"
        className={cn(
          panelTransition,
          isMobile
            ? cn(
                "grid overflow-hidden pl-3",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )
            : cn(
                "absolute left-0 top-full z-50 mt-2 w-72 rounded-sm border border-white/8 bg-[#101820]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-[18px]",
                isOpen
                  ? "visible translate-y-0 opacity-100 pointer-events-auto"
                  : "invisible -translate-y-1 opacity-0 pointer-events-none",
              ),
        )}
      >
        <div className={cn(isMobile && "min-h-0")}>
          <ul className={cn("flex flex-col gap-0.5", isMobile && "pt-1")}>
            {SERVICE_ENTRIES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/servicios#${service.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex min-h-11 flex-col justify-center gap-0.5 rounded-sm px-3 py-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]",
                    isMobile ? "hover:bg-white/5" : "hover:bg-white/5",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isMobile ? "text-slate-200" : "text-white",
                    )}
                  >
                    {service.label}
                  </span>
                  <span className="line-clamp-2 text-xs text-slate-400 md:line-clamp-1">
                    {service.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-white/8 pt-2">
            <Link
              href="/servicios"
              onClick={() => setIsOpen(false)}
              className="flex min-h-11 items-center justify-between gap-2 rounded-sm px-3 text-xs font-semibold uppercase tracking-wider text-[#D6532B] transition-colors duration-200 hover:text-[#D6532B]"
            >
              Ver todos los servicios
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
