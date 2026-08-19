"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import {
  SEARCH_TYPE_LABELS,
  normalizeSearchText,
  searchIndex,
  type SearchItem,
  type SearchItemType,
} from "@/content/search-index";
import { cn } from "@/lib/utils";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 200;
const RESULTS_CAP = 8;

// Orden fijo de agrupación — coincide con la prioridad editorial pedida:
// productos primero, luego navegación por categoría/solución/servicio/marca.
const TYPE_ORDER: SearchItemType[] = [
  "producto",
  "categoria",
  "solucion",
  "servicio",
  "marca",
  "recurso",
];

type RankedItem = SearchItem & { rank: number };

function rankItems(query: string): RankedItem[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < MIN_QUERY_LENGTH) return [];

  const ranked: RankedItem[] = [];

  for (const item of searchIndex) {
    const normalizedTitle = normalizeSearchText(item.title);
    const haystack = normalizeSearchText(
      [item.title, item.description ?? "", ...(item.keywords ?? [])].join(" ")
    );

    if (!haystack.includes(normalizedQuery)) continue;

    let rank = 2;
    if (normalizedTitle.startsWith(normalizedQuery)) rank = 0;
    else if (normalizedTitle.includes(normalizedQuery)) rank = 1;

    ranked.push({ ...item, rank });
  }

  ranked.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    const typeDiff = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
    if (typeDiff !== 0) return typeDiff;
    return a.title.localeCompare(b.title, "es");
  });

  return ranked;
}

type GlobalSearchProps = {
  /** "compact" = trigger de una sola línea para encajar en el header (fondo oscuro, pill). */
  variant?: "default" | "compact";
  /** Enfoca el input al montar — usado cuando el buscador del header se despliega. */
  autoFocus?: boolean;
  /** Se llama al navegar a un resultado, enviar el formulario o presionar Escape. Colapsa el buscador del header. */
  onClose?: () => void;
  /**
   * "fill" (default): el panel de resultados iguala el ancho del wrapper.
   * "wide": el panel ignora el ancho (angosto) del wrapper y se ancla a la
   * derecha con un ancho fijo legible — para el pill compacto y siempre
   * visible del header, que es más angosto que sus resultados.
   */
  dropdownWidth?: "fill" | "wide";
  /**
   * Alto adicional (px) a sumar debajo del input antes de abrir el panel.
   * El header del pill compacto (variant="compact" dropdownWidth="wide")
   * tiene una barra de industrias/idioma justo debajo del input que NO es
   * parte de este componente — sin este offset, el panel se abre pegado al
   * input y termina superpuesto a esa barra (el selector de idioma queda
   * tapado a medias). Pasar la altura actual de esa barra (0 si está
   * colapsada por scroll) evita la superposición en cualquier ancho de
   * viewport, en vez de ajustar el ancho del panel por breakpoint.
   */
  dropdownOffsetTop?: number;
};

export function GlobalSearch({
  variant = "default",
  autoFocus = false,
  onClose,
  dropdownWidth = "fill",
  dropdownOffsetTop = 0,
}: GlobalSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const listboxId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isCompact = variant === "compact";

  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!autoFocus) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [autoFocus]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(rawQuery);
      setActiveIndex(-1);
      setIsOpen(normalizeSearchText(rawQuery).length >= MIN_QUERY_LENGTH);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [rawQuery]);

  const totalMatches = useMemo(() => rankItems(debouncedQuery), [debouncedQuery]);
  const visibleResults = useMemo(() => totalMatches.slice(0, RESULTS_CAP), [totalMatches]);
  const hasQuery = normalizeSearchText(debouncedQuery).length >= MIN_QUERY_LENGTH;
  const hasResults = visibleResults.length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const groups = useMemo(() => {
    return TYPE_ORDER.map((type) => ({
      type,
      items: visibleResults.filter((item) => item.type === type),
    })).filter((group) => group.items.length > 0);
  }, [visibleResults]);

  function navigateTo(href: string) {
    setIsOpen(false);
    setRawQuery("");
    setDebouncedQuery("");
    router.push(href);
    onClose?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!hasResults) return;
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % visibleResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!hasResults) return;
      setIsOpen(true);
      setActiveIndex((current) => (current - 1 + visibleResults.length) % visibleResults.length);
    } else if (event.key === "Enter") {
      if (!isOpen) return;
      event.preventDefault();
      const target = activeIndex >= 0 ? visibleResults[activeIndex] : visibleResults[0];
      if (target) navigateTo(target.href);
    } else if (event.key === "Escape") {
      if (!isOpen && !onClose) return;
      event.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
      onClose?.();
    }
  }

  const activeOptionId =
    activeIndex >= 0 && visibleResults[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  const statusMessage = !hasQuery
    ? ""
    : hasResults
      ? `${totalMatches.length} resultado${totalMatches.length === 1 ? "" : "s"} encontrado${totalMatches.length === 1 ? "" : "s"} para "${debouncedQuery.trim()}"`
      : `No encontramos resultados para "${debouncedQuery.trim()}"`;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        role="search"
        aria-label="Buscador global de Del Carpio"
        onSubmit={(event) => {
          event.preventDefault();
          const target = activeIndex >= 0 ? visibleResults[activeIndex] : visibleResults[0];
          if (target) navigateTo(target.href);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Buscar productos, servicios, industrias o marcas
        </label>
        <div className="relative">
          <MagnifyingGlass
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
              isCompact ? "text-white/70" : "text-ink-muted"
            )}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            autoComplete="off"
            value={rawQuery}
            onChange={(event) => setRawQuery(event.target.value)}
            onFocus={() => {
              if (hasQuery) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={isCompact ? "Buscar" : "Busca productos, servicios, industrias o marcas"}
            className={cn(
              "w-full pl-12 pr-11 focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
              isCompact
                ? "h-11 rounded-full border border-white/35 bg-white/10 text-[13px] font-medium text-white placeholder:text-white/55 backdrop-blur-sm focus:border-primary focus:bg-white/15 focus:ring-2 focus:ring-primary/40"
                : "h-14 rounded-[2px] border border-ink-border bg-white text-[15px] text-ink placeholder:text-ink-soft focus:border-primary focus:ring-2 focus:ring-primary/20"
            )}
          />
          {rawQuery.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setRawQuery("");
                setDebouncedQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              aria-label="Borrar búsqueda"
              className={cn(
                "absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                isCompact
                  ? "text-white/60 hover:text-white focus-visible:outline-white"
                  : "text-ink-soft hover:text-ink focus-visible:outline-primary"
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      {isOpen && hasQuery && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Resultados de búsqueda"
          style={{ top: `calc(100% + 8px + ${dropdownOffsetTop}px)` }}
          className={cn(
            "absolute z-30 max-h-[70vh] overflow-y-auto rounded-[4px] border border-ink-border bg-white shadow-card",
            dropdownWidth === "wide"
              ? "right-0 w-[min(400px,90vw)]"
              : "left-0 right-0"
          )}
        >
          {hasResults ? (
            <>
              {groups.map((group) => (
                <div key={group.type}>
                  <div
                    aria-hidden="true"
                    className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {SEARCH_TYPE_LABELS[group.type]}
                  </div>
                  <ul>
                    {group.items.map((item) => {
                      const flatIndex = visibleResults.indexOf(item);
                      const optionId = `${listboxId}-option-${flatIndex}`;
                      const isActive = flatIndex === activeIndex;
                      return (
                        <li key={item.id} role="presentation">
                          <Link
                            id={optionId}
                            role="option"
                            aria-selected={isActive}
                            href={item.href}
                            onMouseEnter={() => setActiveIndex(flatIndex)}
                            onClick={() => {
                              setIsOpen(false);
                              setRawQuery("");
                              setDebouncedQuery("");
                            }}
                            className={cn(
                              "flex min-h-11 items-center gap-3 border-t border-ink-border/60 px-4 py-2.5 first:border-t-0",
                              isActive ? "bg-ink-bg" : "bg-white hover:bg-ink-bg"
                            )}
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt=""
                                width={40}
                                height={40}
                                className="h-10 w-10 shrink-0 rounded-sm border border-ink-border object-cover"
                              />
                            ) : null}
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-ink">
                                {item.title}
                              </span>
                              {item.description ? (
                                <span className="block truncate text-xs text-ink-muted">
                                  {item.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

            </>
          ) : (
            <div className="px-5 py-6 text-center">
              <p className="text-sm text-ink">
                No encontramos resultados para &ldquo;{debouncedQuery.trim()}&rdquo;. Prueba con
                otro término o explora nuestras categorías.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-semibold">
                <Link href="/productos" className="text-primary hover:text-primary-strong">
                  Ver productos
                </Link>
                <Link href="/servicios" className="text-primary hover:text-primary-strong">
                  Ver servicios
                </Link>
                <Link href="/contacto" className="text-primary hover:text-primary-strong">
                  Contactar a un especialista
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
