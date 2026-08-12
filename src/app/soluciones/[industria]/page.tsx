import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { coreServices, industries } from "@/content/site";
import { mockProducts } from "@/lib/mock-products";

// No existe foto/video real para "Aguas" todavía (ver public/fotos/industrias/).
// Se usa una foto de laboratorio real ya existente como respaldo neutro en
// vez de reutilizar la imagen de otra industria.
const industryPhotos: Record<string, string> = {
  alimentos: "/fotos/industrias/alimentos.jpg",
  mineria: "/fotos/industrias/mineria.jpg",
  farmaceutica: "/fotos/industrias/farmaceutica.jpg",
  aguas: "/fotos/laboratorio-frascos-procesos.jpg",
  ambiental: "/fotos/industrias/ambiente.jpg",
  "academia-id": "/fotos/industrias/academia-id.jpg",
};

export function generateStaticParams() {
  return industries.map((industry) => ({ industria: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industria: string }>;
}): Promise<Metadata> {
  const { industria } = await params;
  const industry = industries.find((i) => i.slug === industria);
  if (!industry) return {};
  return {
    title: `Soluciones para ${industry.name} | Del Carpio Análisis y Asesorías`,
    description: industry.detail,
    alternates: {
      canonical: `/soluciones/${industry.slug}`,
    },
  };
}

export default async function SolucionIndustriaPage({
  params,
}: {
  params: Promise<{ industria: string }>;
}) {
  const { industria } = await params;
  const industry = industries.find((i) => i.slug === industria);
  if (!industry) notFound();

  const relevantProducts = mockProducts
    .filter(
      (product) =>
        industry.productCategories.includes(product.category) ||
        product.filters?.some((filter) => industry.productCategories.includes(filter)),
    )
    .slice(0, 9);

  const primaryCategory = industry.productCategories[0];

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <Navigation />
      <main id="main-content">
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                <li>
                  <Link
                    href="/soluciones"
                    className="flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]"
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

        {/* Header */}
        <section className="relative w-full overflow-hidden bg-[#131C24] pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-20">
          <Image
            src={industryPhotos[industry.slug]}
            alt={`Laboratorio aplicado a ${industry.name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-5">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FBE369]">
                Solución por industria
              </p>
              <h1 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[1.05] tracking-normal text-white sm:text-5xl md:text-6xl">
                {industry.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
                {industry.detail}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Servicios */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Servicios técnicos
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                Soporte técnico para su equipo de {industry.name.toLowerCase()}.
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.05}>
                <Link
                  href={`/contacto/${service.id}`}
                  className="group flex h-full flex-col justify-between rounded-[1.25rem] border border-[var(--border)] bg-white p-6 transition-colors hover:border-[var(--primary)]"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {service.description}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Solicitar
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Productos relevantes */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                    Instrumentación aplicable
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                    Equipos y consumibles para {industry.name.toLowerCase()}.
                  </h2>
                </div>
                {primaryCategory && (
                  <Link
                    href={`/productos?filtro=${encodeURIComponent(primaryCategory)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[var(--primary)] hover:text-[var(--primary-strong)]"
                  >
                    Ver catálogo completo
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                )}
              </div>
            </Reveal>

            {relevantProducts.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                {relevantProducts.map((product, index) => (
                  <Reveal key={product.id} delay={index * 0.04}>
                    <Link
                      href={`/productos/${product.slug ?? product.id}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B]"
                    >
                      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-white">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                          {product.category}
                        </span>
                        <h3 className="mt-1 text-[15px] font-bold leading-tight text-[#4A5560] transition-colors group-hover:text-[#D6532B]">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-[var(--muted)]">
                Estamos actualizando el catálogo para este sector. Escríbanos y le
                proponemos el equipo adecuado.
              </p>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-16 text-center md:py-20">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Próximo paso
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
                ¿Qué necesita su laboratorio de {industry.name.toLowerCase()}?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
                Cuéntenos su desafío analítico y definimos el equipo, el método y el
                soporte adecuado para su sector.
              </p>
              <Button asChild className="mt-8">
                <Link href="/contacto/ventas">
                  Solicitar evaluación técnica
                  <ArrowRight size={17} weight="bold" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
