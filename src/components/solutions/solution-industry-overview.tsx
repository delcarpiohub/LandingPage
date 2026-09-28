import type { SolutionContent } from "@/content/solution-content";
import type { Product } from "@/lib/mock-products";
import { SolutionEquipmentExplorer } from "./solution-equipment-explorer";

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
  ).map(([category, products]) => ({
    category,
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      href: `/productos/${product.slug ?? product.id}`,
    })),
  }));

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
            <SolutionEquipmentExplorer groups={equipmentGroups} />
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
