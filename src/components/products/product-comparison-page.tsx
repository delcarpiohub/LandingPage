"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react";
import { Fragment, useMemo, useState } from "react";
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
    <main id="main-content" className="bg-[#F8FAFC] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A5560] hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
        >
          <ArrowLeft size={16} weight="bold" />
          Volver al catálogo
        </Link>

        <div className="mt-8 border-b border-[#D4DFDC] pb-5 sm:flex sm:items-end sm:justify-between">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#101820] sm:text-4xl">Comparación técnica</h1>
          {selections.length ? (
            <button type="button" onClick={clear} className="mt-4 text-sm font-semibold text-[#4A5560] underline underline-offset-4 hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] sm:mt-0">Limpiar selección</button>
          ) : null}
        </div>

        {!canCompare ? (
          <section className="mt-8 border-l-2 border-[#D6532B] bg-white px-6 py-7 sm:px-8">
            <h2 className="font-display text-xl font-bold text-[#101820]">Faltan equipos por comparar</h2>
            <p className="mt-2 text-sm text-[#4A5560]">Selecciona dos o más productos desde el catálogo.</p>
            <Link href="/productos" className="mt-5 inline-flex min-h-11 items-center bg-[#D6532B] px-5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]">Ir al catálogo</Link>
          </section>
        ) : (
          <>
            <div className="mt-7 flex flex-col gap-4 border-b border-[#D4DFDC] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4A5560]">{selectedProducts.length} equipos · {rows.length} especificaciones</p>
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-[#D4DFDC] bg-white px-3 py-2 text-xs font-bold text-[#4A5560] hover:border-[#D6532B] hover:text-[#D6532B]">
                <input type="checkbox" checked={highlightDifferences} onChange={(event) => setHighlightDifferences(event.target.checked)} className="size-4 accent-[#D6532B]" />
                Resaltar diferencias
              </label>
            </div>

            {rows.length ? (
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-[960px] w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="align-stretch">
                      {selectedProducts.map(({ product }) => (
                        <th key={product.id} scope="col" className="min-w-64 p-0 align-top font-bold text-[#101820]">
                          <div className="relative h-36">
                            <Image src={product.imageUrl} alt="" fill sizes="(min-width: 1024px) 21vw, 60vw" className="object-contain px-6 py-4" />
                          </div>
                          <div className="px-5 py-4">
                            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#D6532B]">{product.category}</p>
                            <p className="mt-1.5 max-w-56 text-sm leading-snug text-[#101820]">{product.detail?.model ?? product.name}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{groups.map(([group, groupRows]) => <GroupRows key={group} group={group} rows={groupRows} products={selectedProducts} highlightDifferences={highlightDifferences} />)}</tbody>
                </table>
              </div>
            ) : <section className="mt-5 border-l-2 border-[#D6532B] bg-white px-6 py-7 text-sm text-[#4A5560]">Las fichas seleccionadas aún no tienen especificaciones estructuradas para comparar.</section>}
          </>
        )}
      </div>
    </main>
  );
}

function GroupRows({ group, rows, products, highlightDifferences }: { group: string; rows: { label: string; values: Map<string, string> }[]; products: { product: (typeof mockProducts)[number] }[]; highlightDifferences: boolean }) {
  return <>
    <tr>
      <th colSpan={products.length} scope="colgroup" className="border-t-8 border-[#F8FAFC] bg-[#EAF0EE] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#36454F]">{group}</th>
    </tr>
    {rows.map((row) => {
      const values = products.map(({ product }) => row.values.get(product.id) ?? "—");
      const differs = new Set(values.filter((value) => value !== "—").map(normalizeComparableValue)).size > 1;

      return (
        <Fragment key={`${group}-${row.label}`}>
          <tr>
            <th colSpan={products.length} scope="row" className="bg-[#F3F6F5] px-5 py-2.5 text-[0.75rem] font-bold text-[#101820]">{row.label}</th>
          </tr>
          <tr className="group/row">
            {values.map((value, index) => {
              const isUnavailable = value === "—";
              const isHighlighted = highlightDifferences && differs && !isUnavailable;

              return <td key={`${row.label}-${products[index].product.id}`} className={`px-5 py-2.5 text-[0.8125rem] leading-relaxed ${isUnavailable ? "text-center text-[#99A5AA]" : "text-[#4A5560]"} ${isHighlighted ? "bg-[#FBE369]/10" : ""}`}>{value}</td>;
            })}
          </tr>
        </Fragment>
      );
    })}
  </>;
}
