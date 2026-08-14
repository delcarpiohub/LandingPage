import { GlobalSearch } from "@/components/search/global-search";

export function GlobalSearchSection() {
  return (
    <section
      id="buscador"
      aria-labelledby="buscador-titulo"
      className="relative w-full bg-white px-5 py-12 md:py-14"
    >
      <div className="mx-auto max-w-site text-center">
        <h2
          id="buscador-titulo"
          className="font-display text-2xl font-bold tracking-[-0.025em] text-ink-dark sm:text-3xl"
        >
          Encuentra la solución que necesitas
        </h2>
        <div className="mt-6">
          <GlobalSearch />
        </div>
      </div>
    </section>
  );
}
