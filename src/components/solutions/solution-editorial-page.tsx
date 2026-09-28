import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { solutionContent } from "@/content/solution-content";
import type { SolutionPageConfig } from "@/content/solution-pages";
import type { Product } from "@/lib/mock-products";

import { SolutionImmersiveHero } from "./solution-immersive-hero";
import { SolutionIndustryOverview } from "./solution-industry-overview";
import { SolutionReveal } from "./solution-reveal";

const nextSteps = [
  {
    title: "Cotizar un equipo",
    description: "Ya sabe qué instrumento necesita y quiere una cotización técnica.",
    href: "/contacto/cotizar",
  },
  {
    title: "Proyecto de laboratorio completo",
    description: "Necesita diseñar, implementar o ampliar un laboratorio de principio a fin.",
    href: "/contacto/proyectos",
  },
  {
    title: "Diagnóstico técnico",
    description: "Quiere evaluar su parque de instrumentos o un método existente.",
    href: "/contacto/diagnostico",
  },
];

type Industry = {
  slug: string;
  name: string;
  detail: string;
  productCategories: readonly string[];
};

type SolutionEditorialPageProps = {
  industry: Industry;
  config: SolutionPageConfig;
  compatibleEquipment: Product[];
};

function HeroMedia({
  config,
  industry,
}: Pick<SolutionEditorialPageProps, "config" | "industry">) {
  if (config.media) {
    return (
      <div className="relative min-h-[15rem] overflow-hidden bg-[#4A5560] sm:min-h-[20rem] xl:min-h-[34rem]">
        <Image
          src={config.media.src}
          alt={config.media.alt}
          fill
          priority
          sizes="(max-width: 1279px) 100vw, 58vw"
          className="object-contain object-center xl:object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[19rem] flex-col justify-end bg-[var(--panel)] p-6 sm:min-h-[24rem] sm:p-10 xl:min-h-[34rem] xl:p-14">
      <div className="max-w-sm border-t border-[var(--border-strong)] pt-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
          Áreas técnicas
        </p>
        <h2 className="mt-3 font-display text-3xl text-[var(--foreground)]">
          {industry.name}
        </h2>
        <ul className="mt-7 space-y-3 border-t border-[var(--border)] pt-5 text-sm leading-6 text-[var(--muted)]">
          {industry.productCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SolutionEditorialPage({
  industry,
  config,
  compatibleEquipment,
}: SolutionEditorialPageProps) {
  const primaryCategory = industry.productCategories[0];
  const isDarkHero = config.heroTone === "dark";
  const content = solutionContent[industry.slug];

  return (
    <div className="min-h-dvh bg-[#F4F4F4]/70 text-[var(--foreground)]">
      <Navigation />
      <main id="main-content">
        <div className="border-b border-[var(--border)] bg-white/70">
          <div className="mx-auto max-w-[1320px] px-5 py-4 sm:px-8 lg:px-12">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                <li>
                  <Link
                    href="/soluciones"
                    className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-200 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                  >
                    <ArrowLeft size={13} />
                    Soluciones
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="min-w-0 break-words text-[var(--foreground)]">
                  {industry.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {config.heroVariant === "immersive" && config.media ? (
          <SolutionImmersiveHero
            title={industry.name}
            description={industry.detail}
            media={config.media}
            align={config.heroContentAlign}
            primaryCta={{ label: "Solicitar evaluación técnica", href: "/contacto/ventas" }}
            secondaryCta={
              primaryCategory
                ? {
                    label: "Ver catálogo completo",
                    href: `/productos?filtro=${encodeURIComponent(primaryCategory)}`,
                  }
                : undefined
            }
          />
        ) : (
          <section
            className={`border-b border-[var(--border)] ${
              isDarkHero ? "bg-[#4A5560] text-white" : "bg-white"
            }`}
          >
            <div className="mx-auto grid max-w-[1440px] xl:grid-cols-12">
              <div className="flex items-center px-5 py-16 sm:px-8 sm:py-20 xl:col-span-5 xl:px-12 xl:py-24">
                <SolutionReveal>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                    Solución por industria
                  </p>
                  <span
                    className="mt-5 block h-px w-8 bg-[var(--primary)]"
                    aria-hidden
                  />
                  <h1
                    className={`mt-8 max-w-xl font-display text-[clamp(2.6rem,5.3vw,5rem)] leading-[0.98] ${
                      isDarkHero ? "text-white" : "text-[var(--foreground)]"
                    }`}
                  >
                    {industry.name}
                  </h1>
                  <p
                    className={`mt-7 max-w-xl text-base leading-7 sm:text-lg sm:leading-8 ${
                      isDarkHero ? "text-white/80" : "text-[var(--muted)]"
                    }`}
                  >
                    {industry.detail}
                  </p>
                  <Link
                    href="/contacto/ventas"
                    className="mt-9 inline-flex min-h-11 items-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A5560]"
                  >
                    Solicitar evaluación técnica
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </SolutionReveal>
              </div>
              <SolutionReveal className="xl:col-span-7" delay={0.05}>
                <HeroMedia config={config} industry={industry} />
              </SolutionReveal>
            </div>
          </section>
        )}

        {content && (
          <SolutionIndustryOverview
            industryName={industry.name}
            content={content}
            equipment={compatibleEquipment}
          />
        )}

        {/* "¿Qué necesita hoy?" — fusiona el router de siguiente paso con la
            banda de cierre */}
        <section className="relative overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:py-28">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/soluciones/cta-soluciones-bg.jpg"
              alt="Fondo de consulta técnica"
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/94 via-[#101820]/88 to-[#101820]/80" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <SolutionReveal>
              <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.03] text-white sm:text-4xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                ¿Qué necesita hoy?
              </h2>
            </SolutionReveal>
            <ol className="mt-10 border-t border-white/20">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="border-b border-white/20">
                  <SolutionReveal delay={index * 0.03}>
                    <Link
                      href={step.href}
                      className="group block py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6532B] focus-visible:ring-inset"
                    >
                      <span className="block font-display text-xl sm:text-2xl font-bold text-white transition-colors duration-200 group-hover:text-[#D6532B] [text-shadow:_0_2px_6px_rgba(0,0,0,0.7)]">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block max-w-2xl text-sm sm:text-[15px] leading-relaxed text-white/85 [text-shadow:_0_1px_4px_rgba(0,0,0,0.6)]">
                        {step.description}
                      </span>
                    </Link>
                  </SolutionReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
