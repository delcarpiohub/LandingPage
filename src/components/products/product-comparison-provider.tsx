"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { MAX_COMPARISON_PRODUCTS } from "@/lib/product-comparison";

const STORAGE_KEY = "del-carpio-product-comparison";

export type ComparisonSelection = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  isComparable: boolean;
};

type ComparisonContextValue = {
  selections: ComparisonSelection[];
  isSelected: (id: string) => boolean;
  toggle: (product: ComparisonSelection) => void;
  remove: (id: string) => void;
  clear: () => void;
  feedback: string;
};

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export function useProductComparison() {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error("useProductComparison debe usarse dentro de ComparisonProvider");
  return context;
}

export function ProductComparisonProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<ComparisonSelection[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ComparisonSelection[];
        if (Array.isArray(parsed)) setSelections(parsed.slice(0, MAX_COMPARISON_PRODUCTS));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  }, [isHydrated, selections]);

  const remove = useCallback((id: string) => {
    setSelections((current) => current.filter((product) => product.id !== id));
  }, []);

  const clear = useCallback(() => setSelections([]), []);

  const toggle = useCallback((product: ComparisonSelection) => {
    setSelections((current) => {
      if (current.some((item) => item.id === product.id)) {
        setFeedback(`${product.name} se quitó de la comparación.`);
        return current.filter((item) => item.id !== product.id);
      }
      if (current.length >= MAX_COMPARISON_PRODUCTS) {
        setFeedback(`Puedes comparar hasta ${MAX_COMPARISON_PRODUCTS} productos a la vez.`);
        return current;
      }
      setFeedback(`${product.name} se agregó a la comparación.`);
      return [...current, product];
    });
  }, []);

  const value = useMemo(
    () => ({
      selections,
      isSelected: (id: string) => selections.some((product) => product.id === id),
      toggle,
      remove,
      clear,
      feedback,
    }),
    [clear, feedback, remove, selections, toggle],
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
      <p aria-live="polite" className="sr-only">
        {feedback}
      </p>
      <ComparisonBar />
    </ComparisonContext.Provider>
  );
}

function ComparisonBar() {
  const pathname = usePathname();
  const { selections, remove, clear } = useProductComparison();
  const canCompare = selections.length >= 2;
  const selectionGrid = selections.length === 2 ? "lg:grid-cols-2" : selections.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  if (!selections.length || pathname !== "/productos") return null;

  return (
    <aside
      aria-label="Productos seleccionados para comparar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D4DFDC] bg-white"
    >
      <div className="mx-auto flex max-w-[92rem] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <p className="shrink-0 text-sm font-bold text-[#101820]">
            Comparar ({selections.length}/{MAX_COMPARISON_PRODUCTS})
          </p>
          <div className={`grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2 ${selectionGrid}`}>
            {selections.map((product) => (
              <div
                key={product.id}
                className="flex min-w-0 items-center gap-2 border border-[#D4DFDC] bg-[#F8FAFC] py-1 pl-1 pr-1 text-xs text-[#4A5560]"
              >
                <div className="relative h-12 w-24 shrink-0 bg-white sm:h-14 sm:w-28">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 112px, 96px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate">{product.name}</span>
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  aria-label={`Quitar ${product.name} de la comparación`}
                  className="grid size-7 place-items-center text-[#4A5560] hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                >
                  <X size={15} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-xs font-semibold text-[#4A5560] underline underline-offset-4 hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
          >
            Limpiar
          </button>
          <Link
            href="/productos/comparar"
            aria-disabled={!canCompare}
            tabIndex={canCompare ? undefined : -1}
            className={`inline-flex min-h-11 items-center justify-center px-5 text-xs font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] ${canCompare ? "bg-[#D6532B] text-white hover:bg-[#B8431E]" : "cursor-not-allowed bg-[#D4DFDC] text-[#707E83]"}`}
            onClick={(event) => {
              if (!canCompare) event.preventDefault();
            }}
          >
            Ver comparación
          </Link>
        </div>
      </div>
    </aside>
  );
}
