"use client";

import { ArrowsLeftRight, Check } from "@phosphor-icons/react";
import { type ComparisonSelection, useProductComparison } from "@/components/products/product-comparison-provider";

export function ProductComparisonToggle({
  product,
  variant = "card",
}: {
  product: ComparisonSelection;
  variant?: "card" | "detail";
}) {
  const { isSelected, toggle } = useProductComparison();
  const selected = isSelected(product.id);
  const pendingNote = !product.isComparable;

  return (
    <div className={variant === "detail" ? "mt-3" : "absolute right-3 top-3 z-10"}>
      <button
        type="button"
        aria-pressed={selected}
        aria-label={selected ? `Quitar ${product.name} de la comparación` : `Comparar ${product.name}`}
        title={pendingNote ? "Especificaciones completas próximamente" : "Agregar a comparación"}
        onClick={() => toggle(product)}
        className={`inline-flex min-h-10 items-center justify-center gap-2 border px-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] ${selected ? "border-[#D6532B] bg-[#D6532B] text-white" : "border-[#D4DFDC] bg-white text-[#4A5560] hover:border-[#D6532B] hover:text-[#D6532B]"}`}
      >
        {selected ? <Check size={15} weight="bold" /> : <ArrowsLeftRight size={15} weight="bold" />}
        {selected ? "Seleccionado" : "Comparar"}
      </button>
      {variant === "detail" && pendingNote ? (
        <p className="mt-2 text-xs text-[#707E83]">Especificaciones completas próximamente.</p>
      ) : null}
    </div>
  );
}