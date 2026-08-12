import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import type { Product } from "@/lib/mock-products";

import { PharmaceuticalReveal } from "./pharmaceutical-reveal";

type PharmaceuticalIndustry = {
  name: string;
  detail: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
};

type PharmaceuticalSolutionPageProps = {
  industry: PharmaceuticalIndustry;
  products: Product[];
  services: Service[];
  imageSrc: string;
};

function productHref(product: Product) {
  return `/productos/${product.slug ?? product.id}`;
}

export function PharmaceuticalSolutionPage({
  industry,
  products,
  services,
  imageSrc,
}: PharmaceuticalSolutionPageProps) {
  const [applicationSummary, ...applicationContext] = industry.detail.split(". ");
  const contextualDetail = applicationContext.join(". ");
  const featuredProduct = products[0];
  const secondaryProducts = products.slice(1);

  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <Navigation />
      <main id="main-content">
        <div className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                <li>
                  <Link
                    href="/soluciones"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                  >
                    <ArrowLeft size={12} />
                    Soluciones
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="min-w-0 break-words text-[var(--foreground)]">{industry.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
              <PharmaceuticalReveal>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                  Soluciones por industria
                </p>
                <span className="mt-5 block h-px w-8 bg-[var(--primary)]" aria-hidden />
                <h1 className="mt-8 text-4xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                  {industry.name}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                  {applicationSummary}.
                </p>
                <Link
                  href="/contacto/ventas"
                  className="mt-9 inline-flex w-fit items-center gap-2 bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                >
                  Solicitar evaluación técnica
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </PharmaceuticalReveal>
            </div>
            <PharmaceuticalReveal className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-full">
              <Image
                src={imageSrc}
                alt="Laboratorio de análisis aplicado a procesos farmacéuticos"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </PharmaceuticalReveal>
          </div>
        </section>

        <section className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-20 lg:px-12">
            <PharmaceuticalReveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Aplicaciones farmacéuticas
              </p>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                Registro sanitario y estudios de estabilidad.
              </h2>
            </PharmaceuticalReveal>
            <PharmaceuticalReveal delay={0.05}>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                {contextualDetail || industry.detail}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--foreground)]">
                <span>Área farmacéutica</span>
                <span>Cromatografía</span>
                <span>Espectrometría de masa</span>
              </div>
            </PharmaceuticalReveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-12 lg:py-24">
            <PharmaceuticalReveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Servicios técnicos
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                Soporte técnico para su operación farmacéutica.
              </h2>
            </PharmaceuticalReveal>
            <ol className="border-t border-[var(--border)]">
              {services.map((service, index) => (
                <li key={service.id} className="border-b border-[var(--border)]">
                  <PharmaceuticalReveal delay={index * 0.03}>
                    <Link
                      href={`/contacto/${service.id}`}
                      className="group grid gap-4 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset"
                    >
                      <span className="font-mono text-xs tracking-[0.14em] text-[var(--primary)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
                          {service.title}
                        </span>
                        <span className="mt-2 block max-w-2xl text-sm leading-6 text-[var(--muted)]">
                          {service.description}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                        Conocer servicio
                        <ArrowRight size={14} weight="bold" />
                      </span>
                    </Link>
                  </PharmaceuticalReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <PharmaceuticalReveal>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                    Instrumentación aplicable
                  </p>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                    Equipos y consumibles para farmacéutica.
                  </h2>
                </div>
                <Link
                  href={`/productos?filtro=${encodeURIComponent("Área farmacéutica")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
                >
                  Ver catálogo completo
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </PharmaceuticalReveal>

            {featuredProduct ? (
              <div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
                <PharmaceuticalReveal className="bg-white md:col-span-2 lg:row-span-2">
                  <Link
                    href={productHref(featuredProduct)}
                    className="group grid h-full min-h-[30rem] grid-rows-[minmax(0,1fr)_auto] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset sm:p-8"
                  >
                    <div className="relative min-h-64">
                      <Image
                        src={featuredProduct.imageUrl}
                        alt={featuredProduct.name}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="border-t border-[var(--border)] pt-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-[var(--muted)]">
                        {featuredProduct.category}
                      </p>
                      <h3 className="mt-2 max-w-md text-2xl font-semibold leading-tight transition-colors group-hover:text-[var(--primary)]">
                        {featuredProduct.name}
                      </h3>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                        Ver producto
                        <ArrowRight size={15} weight="bold" />
                      </span>
                    </div>
                  </Link>
                </PharmaceuticalReveal>
                {secondaryProducts.map((product, index) => (
                  <PharmaceuticalReveal key={product.id} className="bg-white" delay={index * 0.03}>
                    <Link
                      href={productHref(product)}
                      className="group flex h-full min-h-[17rem] flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-inset"
                    >
                      <div className="relative min-h-36 flex-1">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="border-t border-[var(--border)] pt-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-base font-semibold leading-tight transition-colors group-hover:text-[var(--primary)]">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </PharmaceuticalReveal>
                ))}
              </div>
            ) : (
              <p className="mt-10 text-sm leading-6 text-[var(--muted)]">
                Estamos actualizando la selección disponible para esta categoría.
              </p>
            )}
          </div>
        </section>

        <section className="bg-[#4A5560] text-white">
          <PharmaceuticalReveal className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:px-12 lg:py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FBE369]">Contacto técnico</p>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                Cuéntenos qué requiere analizar.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
                Cuéntenos su desafío analítico y definimos el equipo, el método y el soporte adecuado para su sector.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contacto/ventas"
                className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A5560]"
              >
                Solicitar evaluación técnica
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href={`/productos?filtro=${encodeURIComponent("Área farmacéutica")}`}
                className="inline-flex items-center justify-center border border-white/60 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A5560]"
              >
                Ver catálogo farmacéutico
              </Link>
            </div>
          </PharmaceuticalReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
