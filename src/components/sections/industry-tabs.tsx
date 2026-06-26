import { industries } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const sectorTags: Record<string, string> = {
  Alimentos:       "HPLC-MS/MS · GC-MS",
  Mineria:         "IC · ICP-OES",
  Farmaceutica:    "HPLC · UV-DAD",
  Aguas:           "IC · GC-MS",
  Ambiental:       "GC-MS · HAPs",
  "Academia / I+D": "Multimétodo",
};

const sectorSummaries: Record<string, string> = {
  Alimentos: "Residuos de pesticidas, aditivos y trazabilidad sanitaria.",
  Mineria: "Proceso, efluentes y reactivos críticos.",
  Farmaceutica: "Activos, impurezas y estudios de estabilidad.",
  Aguas: "Matrices acuosas y cumplimiento normativo.",
  Ambiental: "COVs, HAPs, suelos y monitoreo continuo.",
  "Academia / I+D": "Transferencia metodológica para investigación.",
};

function normalizeName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function IndustryTabs() {
  return (
    <section id="industrias" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
              Seis contextos. Una sola exigencia: método defendible.
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--border)]">
          {industries.map((industry, index) => {
            const key = normalizeName(industry.name);
            const tag = sectorTags[key];
            return (
              <Reveal key={industry.name} delay={index * 0.05}>
                <article className="group grid grid-cols-[2.5rem_1fr] gap-x-6 border-b border-[var(--border)] py-7 transition-colors duration-200 hover:bg-[var(--surface-muted)] md:grid-cols-[2.5rem_0.26fr_0.6fr_0.22fr] md:items-start md:gap-x-8 md:py-8">
                  <span className="pt-0.5 font-mono text-xs text-[var(--muted)]">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {industry.name}
                  </h3>

                  <p className="col-span-2 col-start-2 mt-2 text-sm leading-7 text-[var(--muted)] md:col-span-1 md:col-start-auto md:mt-0">
                    {sectorSummaries[key] ?? industry.detail}
                  </p>

                  <div className="hidden md:flex md:justify-end md:pt-0.5">
                    {tag && (
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--accent)]">
                        {tag}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
