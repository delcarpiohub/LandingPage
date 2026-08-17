import { ArrowLeft, ArrowRight, Flask } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import type { CoreService } from "@/content/site";
import type { SolutionPageConfig } from "@/content/solution-pages";
import type { Product } from "@/lib/mock-products";

import { SolutionCompatibleEquipment } from "./solution-compatible-equipment";
import { SolutionDifferentiators } from "./solution-differentiators";
import { SolutionImmersiveHero } from "./solution-immersive-hero";
import { SolutionReveal } from "./solution-reveal";

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

        {/* Sección de Contexto Industrial & Propuesta de Valor — Adaptada fielmente a la referencia */}
        <section className="border-b border-[var(--border)] bg-[#F8FAFB] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            {/* Header superior: Subtítulo terracota + Título grande e impactante */}
            <SolutionReveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#D6532B] sm:text-sm">
                Instrumentación y Servicios Especializados para la Industria
              </p>
              <h2 className="mt-4 font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-black leading-[1.08] tracking-tight text-[#101820] max-w-5xl">
                Del Carpio es un proveedor integral de instrumentación analítica, validación de métodos y soporte técnico especializado para la industria {industry.slug === "alimentos" ? "alimentaria" : industry.name.toLowerCase()}.
              </h2>
            </SolutionReveal>

            {/* Grid inferior: Columna izquierda con textos, cita, firma y botón CTA + Columna derecha con composición editorial de fotos */}
            <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Columna Izquierda (Contenido y Narrativa) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-8 items-start">
                {/* Sub-columna 1: Cita / Declaración de compromiso + Firma caligráfica */}
                <SolutionReveal className="sm:col-span-5" delay={0.03}>
                  <p className="text-[15px] sm:text-[16px] font-bold leading-snug text-[#101820]">
                    Para potenciar las capacidades de su laboratorio, establecemos un compromiso técnico riguroso que asegura la calidad y confiabilidad en cada análisis.
                  </p>
                  {/* Firma caligráfica Del Carpio */}
                  <div className="mt-6">
                    <svg
                      className="h-10 w-36 text-[#101820]/75"
                      viewBox="0 0 160 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Firma Dirección Técnica Del Carpio"
                    >
                      <path
                        d="M12 30C26 14 36 10 42 20C46 26 40 36 32 36C26 36 28 24 38 16C48 8 64 12 70 22C74 30 68 34 62 34C56 34 58 22 72 14C86 6 100 16 105 26C110 36 118 34 125 22C132 10 142 16 152 26"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M40 40C68 38 108 39 148 37"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mt-1 block text-[11px] font-mono text-[#4A5560] uppercase tracking-wider">
                      Dirección Técnica
                    </span>
                  </div>
                </SolutionReveal>

                {/* Sub-columna 2: Párrafos de contexto industrial y propuesta de valor + Botón CTA */}
                <SolutionReveal className="sm:col-span-7" delay={0.06}>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#4A5560]">
                    {industry.detail}
                  </p>
                  <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#4A5560]">
                    Acompañamos cada etapa de su operación: desde la preparación automatizada de muestras y digestión por microondas hasta la cuantificación cromatográfica avanzada y servicios de mantención preventiva con repuestos originales.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                      href="/contacto/ventas"
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#101820] px-7 py-3.5 text-[13px] font-bold text-white shadow-md transition-all duration-300 hover:bg-[#D6532B] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6532B]"
                    >
                      <ArrowRight size={15} weight="bold" />
                      <span>Solicitar Asesoría</span>
                    </Link>
                  </div>
                </SolutionReveal>
              </div>

              {/* Columna Derecha (Composición de Fotografías Editoriales) */}
              <SolutionReveal className="lg:col-span-5 flex items-start gap-4 sm:gap-5 justify-center lg:justify-end" delay={0.08}>
                {/* Foto 1 (Principal con tarjeta naranja solapada en esquina inferior) */}
                <div className="relative w-[210px] sm:w-[240px] md:w-[260px] h-[340px] sm:h-[390px] md:h-[420px] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-lg border border-[var(--border)] shrink-0 bg-[#101820]">
                  <Image
                    src={industry.slug === "alimentos" ? "/fotos/industrias/alimentos.jpg" : (config.media?.src || "/fotos/industrias/alimentos.jpg")}
                    alt={`Laboratorio de control y análisis en ${industry.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tarjeta solapada terracota en esquina inferior izquierda */}
                  <div className="absolute bottom-0 left-0 w-[84%] bg-[#D6532B] p-4 sm:p-5 rounded-tr-[20px] text-white z-10 shadow-md">
                    <Flask size={28} weight="duotone" className="text-white" />
                    <p className="mt-2.5 font-display text-[14px] sm:text-[16px] font-bold leading-snug text-white">
                      Inocuidad y Precisión, Respaldando el Futuro
                    </p>
                  </div>
                </div>

                {/* Foto 2 (Secundaria desfasada verticalmente) */}
                <div className="relative w-[150px] sm:w-[180px] md:w-[200px] h-[290px] sm:h-[340px] md:h-[370px] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md border border-[var(--border)] shrink-0 mt-8 sm:mt-10 opacity-95 bg-[#101820]">
                  <Image
                    src="/fotos/instalacion-hplc-operador.jpg"
                    alt={`Especialista técnico en laboratorio de análisis instrumental`}
                    fill
                    sizes="(max-width: 768px) 40vw, 240px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </SolutionReveal>
            </div>
          </div>
        </section>

        {services.length > 0 && (
          <section className="border-b border-[var(--border)] bg-white/70">
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
              <SolutionCompatibleEquipment
                industryName={industry.name}
                products={compatibleEquipment}
              />
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
