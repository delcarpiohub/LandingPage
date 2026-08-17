import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { solutionContent } from "@/content/solution-content";
import type { CoreService } from "@/content/site";
import type { SolutionPageConfig } from "@/content/solution-pages";
import type { Product } from "@/lib/mock-products";

import { SolutionApplicationCases } from "./solution-application-cases";
import { SolutionChromatogram } from "./solution-chromatogram";
import { SolutionCompatibleEquipment } from "./solution-compatible-equipment";
import { SolutionDifferentiators } from "./solution-differentiators";
import { SolutionFaq } from "./solution-faq";
import { SolutionImmersiveHero } from "./solution-immersive-hero";
import { SolutionMethods } from "./solution-methods";
import { SolutionReveal } from "./solution-reveal";
import { SolutionTestimonial } from "./solution-testimonial";

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
  products: Product[];
  services: CoreService[];
  // Resuelto desde config.compatibleEquipmentSlugs — ver solution-pages.ts.
  compatibleEquipment: Product[];
};

function productHref(product: Product) {
  return `/productos/${product.slug ?? product.id}`;
}

// Contenido de la sección "Contexto Industrial" (eyebrow + titular + foto de
// respaldo), uno por industria — mismo mapeo de fotos reales que ya usan
// `soluciones/page.tsx` e `industry-tabs.tsx` (público en public/fotos/industrias/).
// Titulares derivados 1:1 de `industry.detail` en site.ts, sin frases de
// marketing nuevas (ver DESIGN.md, Don't).
const industryContext: Record<
  string,
  { eyebrow: string; headline: string; photo: string }
> = {
  alimentos: {
    eyebrow: "Control de Calidad e Inocuidad",
    headline:
      "Tecnología analítica de alta precisión para el control y la inocuidad alimentaria.",
    photo: "/fotos/industrias/alimentos-analisis-flujo-laminar.jpg",
  },
  mineria: {
    eyebrow: "Control de Proceso y Reactivos",
    headline:
      "Tecnología analítica de alta precisión para el control de cianuro, metales y efluentes de proceso minero.",
    photo: "/fotos/industrias/mineria.jpg",
  },
  farmaceutica: {
    eyebrow: "Validación y Registro Sanitario",
    headline:
      "Tecnología analítica de alta precisión para la validación de métodos y el registro sanitario farmacéutico.",
    photo: "/fotos/industrias/farmaceutica.jpg",
  },
  aguas: {
    eyebrow: "Cumplimiento Normativo de Aguas",
    headline:
      "Tecnología analítica de alta precisión para el cumplimiento de NCh 409 y el control de calidad del agua.",
    photo: "/fotos/laboratorio-frascos-procesos.jpg",
  },
  ambiental: {
    eyebrow: "Monitoreo y Línea de Base Ambiental",
    headline:
      "Tecnología analítica de alta precisión para el monitoreo ambiental y la caracterización de suelos y emisiones.",
    photo: "/fotos/industrias/ambiente.jpg",
  },
  "academia-id": {
    eyebrow: "Desarrollo y Transferencia de Métodos",
    headline:
      "Tecnología analítica de alta precisión para el desarrollo de métodos y la investigación académica.",
    photo: "/fotos/industrias/academia-id.jpg",
  },
};

// Acento decorativo por industria — nunca color de acción (eso sigue siendo
// terracota en toda la página, sin excepción). Solo 3 industrias tienen un
// color de sector real y documentado en tailwind.config (alimentos=amarillo,
// aguas/ambiental=verde); mineria/farmaceutica/academia-id usan `secondary`
// (gris neutro ya existente en el sistema) en vez de inventar un color
// nuevo — decisión confirmada con el cliente (2026-08-17, ver DESIGN.md
// Sección 9). Se usa solo como marca puntual (punto, filete corto) con un
// borde oscuro propio, nunca como color de texto corrido, para no romper
// contraste con el amarillo.
const industryAccent: Record<string, string> = {
  alimentos: "#FBE369",
  aguas: "#53843A",
  ambiental: "#53843A",
  mineria: "#707E83",
  farmaceutica: "#707E83",
  "academia-id": "#707E83",
};

function selectDistinctProducts(products: Product[]) {
  const imageUrls = new Set<string>();

  return products.filter((product) => {
    if (imageUrls.has(product.imageUrl)) return false;
    imageUrls.add(product.imageUrl);
    return true;
  });
}

function HeroMedia({
  config,
  industry,
}: Pick<SolutionEditorialPageProps, "config" | "industry">) {
  if (config.media) {
    return (
      <div className="relative min-h-[19rem] overflow-hidden sm:min-h-[24rem] xl:min-h-[34rem]">
        <Image
          src={config.media.src}
          alt={config.media.alt}
          fill
          priority
          sizes="(max-width: 1279px) 100vw, 58vw"
          className="object-cover object-center"
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
        <h2 className="mt-3 text-3xl text-[var(--foreground)]">
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
  products,
  services,
  compatibleEquipment,
}: SolutionEditorialPageProps) {
  const curatedProducts = selectDistinctProducts(products).slice(0, 4);
  const [featuredProduct, ...secondaryProducts] = curatedProducts;
  const primaryCategory = industry.productCategories[0];
  const isDarkHero = config.heroTone === "dark";
  const context = industryContext[industry.slug] ?? industryContext.alimentos;
  const content = solutionContent[industry.slug];
  const accent = industryAccent[industry.slug] ?? industryAccent.mineria;
  // Número de picos de la traza de cromatograma = derivado del número real
  // de equipos compatibles auditados para esta industria (no aleatorio
  // decorativo) — ver SolutionChromatogram.
  const chromatogramPeaks = Math.min(
    10,
    Math.max(4, Math.round(compatibleEquipment.length / 1.5)),
  );

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
            eyebrow="Solución por industria"
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
                    className={`mt-8 max-w-xl text-[clamp(2.6rem,5.3vw,5rem)] leading-[0.98] ${
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

        {config.showDifferentiators && <SolutionDifferentiators />}

        {content && (
          <section className="border-b border-[var(--border)] bg-white">
            <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Perfil analítico — {industry.name}
                </p>
                <div className="h-14 flex-1 sm:h-16">
                  <SolutionChromatogram
                    accentColor={accent}
                    peakCount={chromatogramPeaks}
                    seed={industry.slug}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sección de Contexto Industrial & Propuesta de Valor — Diseño publicitario y fotos ampliadas */}
        <section className="border-b border-[var(--border)] bg-[var(--secondary)]/5 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            {/* Header superior: Subtítulo terracota + Titular directo y publicitario */}
            <SolutionReveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6532B] sm:text-sm">
                {context.eyebrow}
              </p>
              <h2 className="mt-3.5 font-display text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] font-black leading-[1.04] tracking-tight text-[#101820] max-w-5xl">
                {context.headline}
              </h2>
            </SolutionReveal>

            {/* Grid inferior: Columna izquierda con párrafos descriptivos limpios + Columna derecha con fotos grandes y continuas */}
            <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Columna Izquierda (Narrativa técnica y propuesta de valor directa) */}
              <SolutionReveal className="lg:col-span-5" delay={0.03}>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#4A5560]">
                  {industry.detail}
                </p>
                <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#4A5560]">
                  Acompañamos cada etapa de su operación: desde la preparación automatizada de muestras y digestión por microondas hasta la cuantificación cromatográfica avanzada y servicios de mantención preventiva con repuestos originales.
                </p>
              </SolutionReveal>

              {/* Columna Derecha (Composición de Fotografías Ampliadas con Continuidad Panorámica) */}
              <SolutionReveal className="lg:col-span-7 flex items-start gap-4 sm:gap-6 justify-center lg:justify-end" delay={0.06}>
                {/* Panel 1 (Principal Ampliado — Esquinas Cuadradas) */}
                <div className="relative w-[240px] sm:w-[300px] md:w-[350px] lg:w-[380px] h-[380px] sm:h-[460px] md:h-[510px] lg:h-[540px] rounded-none overflow-hidden shadow-xl border border-[var(--border)] shrink-0 bg-[#101820]">
                  <div className="absolute top-0 left-0 h-full w-[440px] sm:w-[550px] md:w-[640px] lg:w-[690px]">
                    <Image
                      src={context.photo}
                      alt={`Laboratorio de análisis instrumental aplicado a ${industry.name.toLowerCase()}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover object-left"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Panel 2 (Secundario Ampliado con continuidad de la misma imagen — Esquinas Cuadradas) */}
                <div className="relative w-[170px] sm:w-[220px] md:w-[260px] lg:w-[280px] h-[330px] sm:h-[400px] md:h-[450px] lg:h-[480px] rounded-none overflow-hidden shadow-lg border border-[var(--border)] shrink-0 mt-8 sm:mt-12 opacity-95 bg-[#101820]">
                  <div className="absolute top-[-32px] sm:top-[-48px] left-[-256px] sm:left-[-324px] md:left-[-374px] lg:left-[-404px] h-[380px] sm:h-[460px] md:h-[510px] lg:h-[540px] w-[440px] sm:w-[550px] md:w-[640px] lg:w-[690px]">
                    <Image
                      src={context.photo}
                      alt="Especialista técnico en laboratorio de análisis instrumental"
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover object-left"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </SolutionReveal>
            </div>
          </div>
        </section>

        {content && (
          <section className="border-b border-[var(--border)] bg-[var(--nav-bg)]">
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
              <SolutionReveal>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <h2 className="max-w-2xl text-3xl leading-[1.03] text-white sm:text-4xl">
                    Qué medimos y bajo qué norma.
                  </h2>
                  <div aria-hidden="true" className="flex shrink-0 items-center gap-2.5">
                    <span
                      className="size-3 rotate-45 ring-1 ring-white/50"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      {industry.name}
                    </span>
                  </div>
                </div>
              </SolutionReveal>

              <SolutionMethods rows={content.methods} />
            </div>
          </section>
        )}

        {content && (
          <section className="border-b border-[var(--border)] bg-white">
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
              <SolutionReveal>
                <h2 className="max-w-2xl text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl">
                  Aplicaciones típicas.
                </h2>
              </SolutionReveal>
              <SolutionApplicationCases cases={content.applicationCases} />
            </div>
          </section>
        )}

        {services.length > 0 && (
          <section className="border-b border-[var(--border)] bg-[var(--secondary)]/5">
            <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-28">
              <SolutionReveal className="lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  Servicios aplicables
                </p>
                <h2 className="mt-5 max-w-sm text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl">
                  Capacidades confirmadas para esta industria.
                </h2>
              </SolutionReveal>
              <ol className="border-t border-[var(--border)] lg:col-span-8">
                {services.map((service, index) => (
                  <li key={service.id} className="border-b border-[var(--border)]">
                    <SolutionReveal delay={index * 0.03}>
                      <Link
                        href={`/contacto/${service.id}`}
                        className="group grid min-h-24 gap-4 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset"
                      >
                        <span className="text-xs font-semibold tracking-[0.12em] text-[var(--primary)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block text-xl font-semibold text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                            {service.title}
                          </span>
                          <span className="mt-1 block max-w-2xl text-sm leading-6 text-[var(--muted)]">
                            {service.description}
                          </span>
                        </span>
                        <ArrowRight
                          size={17}
                          weight="bold"
                          className="text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </SolutionReveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="border-b border-[var(--border)] bg-white/70">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
            <SolutionReveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                    Equipamiento y consumibles
                  </p>
                  <h2 className="mt-5 max-w-2xl text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl">
                    Selección para {industry.name.toLowerCase()}.
                  </h2>
                </div>
                {primaryCategory && (
                  <Link
                    href={`/productos?filtro=${encodeURIComponent(primaryCategory)}`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                  >
                    Ver catálogo completo
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                )}
              </div>
            </SolutionReveal>

            {compatibleEquipment.length > 0 ? (
              <>
                {content && (
                  <SolutionReveal className="mt-6" delay={0.03}>
                    <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
                      {content.selectionGuideIntro}
                    </p>
                  </SolutionReveal>
                )}
                <SolutionCompatibleEquipment
                  industryName={industry.name}
                  products={compatibleEquipment}
                />
              </>
            ) : featuredProduct ? (
              <div className="mt-10 grid gap-x-10 gap-y-8 border-y border-[var(--border)] py-8 lg:grid-cols-12 lg:py-10">
                <SolutionReveal className="lg:col-span-7">
                  <Link
                    href={productHref(featuredProduct)}
                    className="group grid gap-6 sm:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1.1fr)] sm:items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                  >
                    <div className="relative min-h-64 overflow-hidden bg-[var(--panel)] sm:min-h-80">
                      <Image
                        src={featuredProduct.imageUrl}
                        alt={featuredProduct.name}
                        fill
                        sizes="(max-width: 1023px) 100vw, 48vw"
                        className="object-contain p-7 transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="py-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                        {featuredProduct.category}
                      </p>
                      <h3 className="mt-3 text-2xl leading-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                        {featuredProduct.name}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
                        {featuredProduct.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                        Ver producto
                        <ArrowRight size={15} weight="bold" />
                      </span>
                    </div>
                  </Link>
                </SolutionReveal>
                <div className="border-t border-[var(--border)] lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8">
                  {secondaryProducts.map((product, index) => (
                    <SolutionReveal key={product.id} delay={index * 0.04}>
                      <Link
                        href={productHref(product)}
                        className="group grid min-h-28 grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--border)] py-5 first:pt-0 last:border-b-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset"
                      >
                        <div className="relative h-20 w-20 bg-[var(--panel)]">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-contain p-2"
                          />
                        </div>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                            {product.category}
                          </span>
                          <span className="mt-1 block text-base font-semibold leading-5 text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                            {product.name}
                          </span>
                        </span>
                        <ArrowRight
                          size={15}
                          weight="bold"
                          className="text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </SolutionReveal>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-8 max-w-xl text-sm leading-6 text-[var(--muted)]">
                Consulte al equipo técnico por el equipamiento aplicable a esta industria.
              </p>
            )}
          </div>
        </section>

        <SolutionTestimonial industrySlug={industry.slug} />

        {content && (
          <section className="border-b border-[var(--border)] bg-white/70">
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
              <SolutionReveal>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                  Preguntas frecuentes
                </p>
                <h2 className="mt-5 max-w-2xl text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl">
                  Antes de escribirnos.
                </h2>
              </SolutionReveal>
              <SolutionFaq items={content.faqs} />
            </div>
          </section>
        )}

        <section className="border-b border-[var(--border)] bg-[var(--secondary)]/5">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
            <SolutionReveal>
              <h2 className="max-w-2xl text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl">
                ¿Qué necesita hoy?
              </h2>
            </SolutionReveal>
            <ol className="mt-10 border-t border-[var(--border)]">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="border-b border-[var(--border)]">
                  <SolutionReveal delay={index * 0.03}>
                    <Link
                      href={step.href}
                      className="group grid min-h-24 gap-4 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset"
                    >
                      <span className="text-xs font-semibold tracking-[0.12em] text-[var(--primary)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-xl font-semibold text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                          {step.title}
                        </span>
                        <span className="mt-1 block max-w-2xl text-sm leading-6 text-[var(--muted)]">
                          {step.description}
                        </span>
                      </span>
                      <ArrowRight
                        size={17}
                        weight="bold"
                        className="text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </SolutionReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Banda CTA Final #4A5560 */}
        <section className="relative overflow-hidden bg-[#4A5560] py-16 text-[#F5F5F5] border-t border-[var(--border)]">
          {/* Background Image with soft filter overlay */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/soluciones/cta-soluciones-bg.jpg"
              alt="Fondo de consulta técnica"
              fill
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A5560]/80 via-[#4A5560]/70 to-[#4A5560]/60" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] mb-2">
                Consulta Técnica
              </p>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-3xl leading-tight">
                Cuéntenos qué necesita analizar.
              </h3>
              <p className="mt-2 text-[14px] text-[#F5F5F5]/70 leading-relaxed">
                Incluya la matriz, el método o el equipo que requiere evaluar para orientar la conversación técnica.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/contacto/ventas"
                className="bg-[#D6532B] hover:bg-[#B54725] text-white border-none rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center shadow-md transition-all duration-200"
              >
                Solicitar evaluación técnica
              </Link>
              {primaryCategory && (
                <Link
                  href={`/productos?filtro=${encodeURIComponent(primaryCategory)}`}
                  className="border border-white/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] hover:text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center transition-all duration-200"
                >
                  Ver catálogo
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
