"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type ExplorerProduct = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
};

type EquipmentGroup = {
  category: string;
  products: ExplorerProduct[];
};

export function SolutionEquipmentExplorer({ groups }: { groups: EquipmentGroup[] }) {
  const [selectedCategory, setSelectedCategory] = useState(groups[0]?.category ?? "");
  const [previewId, setPreviewId] = useState(groups[0]?.products[0]?.id ?? "");
  const selectedGroup = groups.find((group) => group.category === selectedCategory) ?? groups[0];
  const previewProduct = selectedGroup?.products.find((product) => product.id === previewId)
    ?? selectedGroup?.products[0];

  if (!selectedGroup || !previewProduct) return null;

  return (
    <div className="mt-7 overflow-hidden border-y border-[var(--border)] bg-white lg:grid lg:grid-cols-[minmax(12rem,0.75fr)_minmax(0,1.45fr)_minmax(14rem,0.9fr)]">
      <nav aria-label="Categorías de equipos" className="border-b border-[var(--border)] lg:border-b-0 lg:border-r">
        <p className="hidden px-6 pb-3 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)] lg:block">
          Categorías
        </p>
        <div className="flex overflow-x-auto lg:block lg:pb-6">
          {groups.map((group) => {
            const isSelected = group.category === selectedGroup.category;

            return (
              <button
                key={group.category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedCategory(group.category);
                  setPreviewId(group.products[0].id);
                }}
                className={`group relative flex min-h-12 shrink-0 items-center gap-3 border-b-2 px-5 py-3 text-left font-display text-sm font-semibold leading-5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)] lg:w-full lg:border-b-0 lg:border-l-2 lg:px-6 ${
                  isSelected
                    ? "border-[var(--primary)] bg-[#F4F4F4]/70 text-[var(--foreground)]"
                    : "border-transparent text-[var(--foreground)] hover:bg-[#F4F4F4]/70 hover:text-[var(--primary)]"
                }`}
              >
                <span className="whitespace-nowrap lg:whitespace-normal">{group.category}</span>
                <span className="ml-auto text-xs font-normal tabular-nums text-[var(--muted)]">
                  {group.products.length}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="min-w-0 lg:border-r lg:border-[var(--border)]">
        <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-6">
          <h4 aria-live="polite" className="font-display text-lg font-semibold leading-tight text-[var(--foreground)]">
            {selectedGroup.category}
          </h4>
          <span className="shrink-0 text-xs tabular-nums text-[var(--muted)]">
            {selectedGroup.products.length} {selectedGroup.products.length === 1 ? "referencia" : "referencias"}
          </span>
        </div>
        <ul className="px-5 sm:px-6 lg:max-h-[31rem] lg:overflow-y-auto">
          {selectedGroup.products.map((product) => (
            <li key={product.id} className="border-b border-[var(--border)] last:border-b-0">
              <Link
                href={product.href}
                onMouseEnter={() => setPreviewId(product.id)}
                onFocus={() => setPreviewId(product.id)}
                className="group flex min-h-16 items-center gap-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]"
              >
                <span className="relative h-12 w-12 shrink-0 bg-[#F4F4F4]/70 lg:hidden">
                  <Image src={product.imageUrl} alt="" fill sizes="48px" className="object-contain p-1" />
                </span>
                <span className="min-w-0 flex-1 font-display text-sm font-medium leading-5 text-[var(--foreground)] transition-colors duration-150 group-hover:text-[var(--primary)]">
                  {product.name}
                </span>
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" className="shrink-0 text-[var(--primary)] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden min-w-0 flex-col bg-[#F4F4F4]/70 lg:flex">
        <div className="relative m-6 mb-0 h-64 bg-white">
          <Image
            key={previewProduct.id}
            src={previewProduct.imageUrl}
            alt={previewProduct.name}
            fill
            sizes="(max-width: 1320px) 25vw, 280px"
            className="object-contain p-5"
          />
        </div>
        <div className="flex flex-1 flex-col justify-end px-6 pb-6 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Vista previa</p>
          <p className="mt-2 font-display text-base font-semibold leading-snug text-[var(--foreground)]">
            {previewProduct.name}
          </p>
          <Link
            href={previewProduct.href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            Ver producto <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
