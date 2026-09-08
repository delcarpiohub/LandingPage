"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { mockProducts } from "@/lib/mock-products";
import { getComparableSpecifications, normalizeComparableValue, type ComparableSpec } from "@/lib/product-comparison";
import { useProductComparison } from "@/components/products/product-comparison-provider";

export function ProductComparisonPage() {
  const { selections, clear } = useProductComparison();
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedProducts = useMemo(
    () =>
      selections.flatMap((selection) => {
        const product = mockProducts.find((item) => item.id === selection.id);
        return product ? [{ selection, product, specs: getComparableSpecifications(product) }] : [];
      }),
    [selections],
  );

  const rows = useMemo(() => {
    const byKey = new Map<string, { label: string; group: string; values: Map<string, string> }>();
    selectedProducts.forEach(({ product, specs }) => {
      specs.forEach((spec: ComparableSpec) => {
        const row = byKey.get(spec.key) ?? {
          label: spec.label,
          group: spec.group,
          values: new Map<string, string>(),
        };
        row.values.set(product.id, spec.value);
        byKey.set(spec.key, row);
      });
    });
    return Array.from(byKey.values());
  }, [selectedProducts]);

  const groups = useMemo(() => {
    const byGroup = new Map<string, typeof rows>();
    rows.forEach((row) => byGroup.set(row.group, [...(byGroup.get(row.group) ?? []), row]));
    return Array.from(byGroup.entries());
  }, [rows]);

  const canCompare = selectedProducts.length >= 2;

  return (
    <main id="main-content" className="bg-[#F8FAFC] pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A5560] hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
        >
          <ArrowLeft size={16} weight="bold" />
          Volver al catálogo
        </Link>

        <div className="mt-8 border-b border-[#D4DFDC] pb-6 sm:flex sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#101820] sm:text-4xl">Compara especificaciones</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4A5560]">Selecciona entre dos y cuatro equipos. Las filas reúnen las especificaciones disponibles; un guion indica que ese dato no aplica o aún no está documentado para el producto.</p>
          </div>
          {selections.length ? (
            <button type="button" onClick={clear} className="mt-4 text-sm font-semibold text-[#4A5560] underline underline-offset-4 hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] sm:mt-0">Limpiar selección</button>
          ) : null}
        </div>

        {!canCompare ? (
          <section className="mt-8 border border-[#D4DFDC] bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#101820]">Selecciona al menos dos productos</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5560]">Vuelve al catálogo y usa el botón Comparar en las tarjetas o fichas de producto.</p>
            <Link href="/productos" className="mt-6 inline-flex min-h-11 items-center bg-[#D6532B] px-5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]">Explorar productos</Link>
          </section>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-[#101820]">Especificaciones lado a lado</h2>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#4A5560]"><input type="checkbox" checked={highlightDifferences} onChange={(event) => setHighlightDifferences(event.target.checked)} className="size-4 accent-[#D6532B]" />Resaltar diferencias</label>
            </div>

            {rows.length ? <div className="mt-4 overflow-x-auto border border-[#D4DFDC] bg-white"><table className="min-w-[780px] w-full border-collapse text-left text-sm"><thead className="bg-[#F8FAFC]"><tr><th scope="col" className="sticky left-0 z-10 min-w-56 border-b border-r border-[#D4DFDC] bg-[#F8FAFC] p-4 font-bold text-[#101820]">Especificación</th>{selectedProducts.map(({ product }) => <th key={product.id} scope="col" className="min-w-52 border-b border-[#D4DFDC] p-0 align-top font-bold text-[#101820]"><div className="relative h-28 border-b border-[#D4DFDC] bg-white"><Image src={product.imageUrl} alt="" fill sizes="(min-width: 1024px) 22vw, 42vw" className="object-contain p-3" /></div><p className="p-4 text-sm leading-snug">{product.name}</p></th>)}</tr></thead><tbody>{groups.map(([group, groupRows]) => <GroupRows key={group} group={group} rows={groupRows} products={selectedProducts} highlightDifferences={highlightDifferences} />)}</tbody></table></div> : <section className="mt-4 border border-[#D4DFDC] bg-white p-6 text-sm text-[#4A5560]">Las fichas seleccionadas aún no tienen especificaciones estructuradas para comparar. Elige productos disponibles o revisa sus fichas individuales.</section>}
          </>
        )}
      </div>
    </main>
  );
}

function GroupRows({ group, rows, products, highlightDifferences }: { group: string; rows: { label: string; values: Map<string, string> }[]; products: { product: (typeof mockProducts)[number] }[]; highlightDifferences: boolean }) {
  return <>{<tr><th colSpan={products.length + 1} scope="colgroup" className="border-t-[10px] border-[#F8FAFC] border-b border-[#D4DFDC] bg-[#F8FAFC] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#4A5560]">{group}</th></tr>}{rows.map((row) => { const values = products.map(({ product }) => row.values.get(product.id) ?? "—"); const differs = new Set(values.filter((value) => value !== "—").map(normalizeComparableValue)).size > 1; return <tr key={`${group}-${row.label}`}><th scope="row" className="sticky left-0 z-10 border-b border-r border-[#D4DFDC] bg-white px-5 py-4 font-semibold text-[#101820]">{row.label}</th>{values.map((value, index) => <td key={`${row.label}-${products[index].product.id}`} className={`border-b border-[#D4DFDC] px-5 py-4 leading-relaxed text-[#4A5560] ${highlightDifferences && differs && value !== "—" ? "bg-[#FBE369]/10" : ""}`}>{value}</td>)}</tr>; })}</>;
}
