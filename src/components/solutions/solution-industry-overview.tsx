import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import type { SolutionContent } from "@/content/solution-content";
import type { Product } from "@/lib/mock-products";

type SolutionIndustryOverviewProps = {
  industryName: string;
  content: SolutionContent;
  equipment: Product[];
};

export function SolutionIndustryOverview({
  industryName,
  content,
  equipment,
}: SolutionIndustryOverviewProps) {
  const equipmentGroups = Object.entries(
    equipment.reduce<Record<string, Product[]>>((groups, product) => {
      (groups[product.category] ??= []).push(product);
      return groups;
    }, {}),
  );

  return (
    <section className="border-b border-[var(--border)] bg-[#F4F4F4]/70">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:gap-14">
          <div>
            <h2 className="max-w-sm font-display text-3xl leading-[1.06] text-[var(--foreground)] sm:text-4xl">
              Qué resolvemos en {industryName.toLowerCase()}.
            </h2>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {content.methods.map((method, index) => (
              <li key={method.technique}>
                <article
                  className={`flex h-full min-h-52 flex-col rounded-2xl p-6 ${
                    index === 0
                      ? "bg-[#4A5560] text-white"
                      : "border border-[var(--border)] bg-white text-[var(--foreground)]"
                  }`}
                >
                  <h3 className="font-display text-xl leading-tight">
                    {method.summary.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-sm leading-6">
                    {method.summary.description}
                  </p>
                  <p
                    className={`mt-auto border-t pt-4 text-xs font-semibold leading-5 ${
                      index === 0 ? "border-white/30" : "border-[var(--border)]"
                    }`}
                  >
                    {method.technique}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-7 border-y border-[var(--border)] py-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:gap-14">
          <h3 className="font-display text-xl leading-tight text-[var(--foreground)]">
            En la práctica.
          </h3>
          <ul className="grid gap-7 sm:grid-cols-2">
            {content.applicationCases.map((item) => (
              <li key={item.title}>
                <h4 className="font-display text-lg leading-tight text-[var(--foreground)]">
                  {item.title}
                </h4>
                <p className="mt-2 max-w-[43ch] text-sm leading-6 text-[var(--foreground)]">
                  {item.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl leading-tight text-[var(--foreground)] sm:text-3xl">
              Equipos y consumibles para {industryName.toLowerCase()}.
            </h3>
            <p className="text-sm leading-6 text-[var(--foreground)]">
              {equipment.length} {equipment.length === 1 ? "referencia" : "referencias"}
            </p>
          </div>

          {equipment.length > 0 ? (
            <div className="mt-7 border-t border-[var(--border)]">
              {equipmentGroups.map(([category, products]) => (
                <div
                  className="grid gap-3 border-b border-[var(--border)] py-5 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8"
                  key={category}
                >
                  <h4 className="pt-2 font-display text-base leading-tight text-[var(--foreground)]">
                    {category}
                  </h4>
                  <ul className="grid sm:grid-cols-2 sm:gap-x-6 xl:grid-cols-3">
                    {products.map((product) => (
                      <li key={product.id} className="border-b border-[var(--border)] last:border-b-0">
                        <Link
                          href={`/productos/${product.slug ?? product.id}`}
                          className="group flex min-h-24 items-center gap-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset"
                        >
                          <span className="relative h-16 w-16 shrink-0 bg-white">
                            <Image
                              src={product.imageUrl}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-contain p-1.5"
                            />
                          </span>
                          <span className="min-w-0 flex-1 font-display text-sm font-bold leading-5 text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                            {product.name}
                          </span>
                          <ArrowUpRight
                            size={16}
                            weight="bold"
                            aria-hidden="true"
                            className="shrink-0 text-[var(--primary)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm leading-6 text-[var(--foreground)]">
              Consulte al equipo técnico por el equipamiento aplicable a esta industria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
