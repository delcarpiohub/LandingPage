"use client";

import { ArrowsLeftRight, Check } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { mockProducts } from "@/lib/mock-products";
import { getComparisonTiers, hasDivergentComparisonTiers } from "@/lib/product-comparison";
import { type ComparisonSelection, useProductComparison } from "@/components/products/product-comparison-provider";

export function ProductComparisonToggle({ product, variant = "card" }: { product: ComparisonSelection; variant?: "card" | "detail" }) {
  const { addTier, isSelected, toggle } = useProductComparison();
  const [isTierPickerOpen, setIsTierPickerOpen] = useState(false);
  const sourceProduct = useMemo(() => mockProducts.find((item) => item.id === product.id), [product.id]);
  const tiers = sourceProduct ? getComparisonTiers(sourceProduct) : [];
  const requiresTierSelection = sourceProduct ? hasDivergentComparisonTiers(sourceProduct) : false;
  const selected = !requiresTierSelection && isSelected(product.id);
  const pendingNote = !product.isComparable;

  const chooseTier = (tierId: string) => {
    const tier = tiers.find((item) => item.id === tierId);
    if (!tier) return;
    addTier(product, tier);
    setIsTierPickerOpen(false);
  };

  return (
    <div className={`relative ${variant === "detail" ? "mt-3" : "absolute right-3 top-3 z-10"}`}>
      <button
        type="button"
        aria-pressed={selected}
        aria-expanded={requiresTierSelection ? isTierPickerOpen : undefined}
        aria-label={requiresTierSelection ? `Elegir tier para comparar ${product.name}` : selected ? `Quitar ${product.name} de la comparación` : `Comparar ${product.name}`}
        title={pendingNote ? "Especificaciones completas próximamente" : requiresTierSelection ? "Elegir tier para comparar" : "Agregar a comparación"}
        onClick={() => requiresTierSelection ? setIsTierPickerOpen((open) => !open) : toggle(product)}
        className={`inline-flex min-h-10 items-center justify-center gap-2 border px-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] ${selected ? "border-[#D6532B] bg-[#D6532B] text-white" : "border-[#D4DFDC] bg-white text-[#4A5560] hover:border-[#D6532B] hover:text-[#D6532B]"}`}
      >
        {selected ? <Check size={15} weight="bold" /> : <ArrowsLeftRight size={15} weight="bold" />}
        {selected ? "Seleccionado" : requiresTierSelection ? "Elegir tier" : "Comparar"}
      </button>

      {requiresTierSelection && isTierPickerOpen ? (
        <label className="absolute right-0 top-full z-30 mt-2 block w-60 border border-[#D4DFDC] bg-white p-3 text-xs font-semibold text-[#4A5560]">
          Tier para comparar
          <select
            aria-label={`Tier de ${product.name}`}
            defaultValue=""
            onChange={(event) => chooseTier(event.target.value)}
            className="mt-2 block min-h-10 w-full border border-[#D4DFDC] bg-[#F8FAFC] px-3 text-sm font-medium text-[#101820] focus:border-[#D6532B] focus:outline-none"
          >
            <option value="" disabled>Seleccionar tier</option>
            {tiers.map((tier) => {
              const alreadySelected = isSelected(product.id, tier.id);
              return <option key={tier.id} value={tier.id} disabled={alreadySelected}>{tier.label}{alreadySelected ? " · agregado" : ""}</option>;
            })}
          </select>
        </label>
      ) : null}

      {variant === "detail" && pendingNote ? <p className="mt-2 text-xs text-[#707E83]">Especificaciones completas próximamente.</p> : null}
    </div>
  );
}
