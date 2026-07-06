import {
  ArrowLeft,
  CheckCircle,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import { getProductBySlug, mockProducts } from "@/lib/mock-products";

const navItems = [
  { label: "Detalle", href: "#detalle" },
  { label: "Parámetros", href: "#parametros" },
  { label: "Descargas", href: "#descargas" },
];

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug ?? product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return {
    title: `${product.name} | Productos Del Carpio`,
    description: product.description,
    alternates: {
      canonical: `/productos/${product.slug ?? product.id}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const detail = product.detail;
  const heroHighlights = detail?.highlights ?? product.features;
  const decisionFeatures = (detail?.advantages ?? product.features).slice(0, 4);
  const benefitBlock = detail?.detailBlocks.find(
    (block) => block.title === "Operación, titulación y control",
  );
  const applicationBlock = detail?.detailBlocks.find(
    (block) => block.title === "Aplicaciones principales",
  );

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />

      <main id="main-content">
        <section className="border-b border-[#D4DFDC] pt-20 md:pt-24 lg:pt-28">
          <div className="mx-auto max-w-wide px-4 py-5 sm:px-6 lg:px-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A5560]/70">
                <li>
                  <Link
                    href="/productos"
                    className="inline-flex items-center gap-2 transition-colors hover:text-[#101820]"
                  >
                    <ArrowLeft size={13} weight="bold" />
                    Productos
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="min-w-0 break-words text-[#D6532B]">
                  {detail?.model ?? product.name}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="mx-auto grid max-w-wide gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-12 lg:px-10 lg:py-16">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative overflow-hidden border border-[#D4DFDC] bg-white">
                <div className="absolute left-0 top-0 h-full w-1 bg-[#D6532B]" />
                <div className="relative mx-auto aspect-square max-w-[560px] p-8 md:p-12">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-contain p-8 md:p-12"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 border border-[#D4DFDC] bg-white">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="border-r border-[#D4DFDC] px-3 py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A5560] transition-colors last:border-r-0 hover:text-[#D6532B]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex min-h-full flex-col justify-center">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#D6532B]">
                {detail?.brand ?? product.category} · {detail?.model ?? product.id}
              </p>

              <h1 className="mt-5 max-w-[760px] text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-[#101820] sm:text-5xl lg:text-[64px]">
                {detail?.fullTitle ?? product.name}
              </h1>

              <p className="mt-6 max-w-[620px] text-base leading-8 text-[#4A5560] md:text-lg">
                {product.description}
              </p>

              <div className="mt-8 grid gap-px overflow-hidden border border-[#D4DFDC] bg-[#D4DFDC] sm:grid-cols-3">
                {heroHighlights.map((highlight) => (
                  <div key={highlight} className="bg-white p-5">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mb-4 text-[#53843A]"
                    />
                    <p className="text-[13px] font-extrabold leading-snug text-[#101820]">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="detalle" className="border-y border-[#D4DFDC] bg-white/70">
          <div className="mx-auto grid max-w-wide gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10">
            <Reveal>
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Detalle del producto
                </p>
                <h2 className="mt-4 max-w-[460px] text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  Lo importante, sin ruido.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-px overflow-hidden border border-[#D4DFDC] bg-[#D4DFDC] md:grid-cols-2">
                {decisionFeatures.map((item) => (
                  <article key={item} className="bg-white p-5 md:p-6">
                    <p className="text-[14px] leading-7 text-[#4A5560]">
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {detail ? (
          <section id="parametros" className="mx-auto max-w-wide px-4 py-12 sm:px-6 md:py-16 lg:px-10">
            <Reveal>
              <div className="mb-8 max-w-2xl">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Parámetros técnicos
                </p>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  Parámetros de decisión
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden border border-[#D4DFDC] bg-white">
                {detail.technicalParameters.map((row) => (
                  <div
                    key={`${row.leftParameter}-${row.rightParameter}`}
                    className="grid border-b border-[#D4DFDC] last:border-b-0 md:grid-cols-2"
                  >
                    <SpecCell label={row.leftParameter} value={row.leftValue} />
                    <SpecCell label={row.rightParameter} value={row.rightValue} />
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        ) : null}

        {detail ? (
          <section className="border-y border-[#D4DFDC] bg-[#101820] text-[#F5F5F5]">
            <div className="mx-auto grid max-w-wide gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:px-10">
              <Reveal>
                <article>
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                    Funciones clave
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                    Control automático del método Kjeldahl.
                  </h2>
                  <ul className="mt-7 space-y-4">
                    {(benefitBlock?.items ?? []).slice(0, 4).map((item) => (
                      <li key={item} className="grid grid-cols-[18px_1fr] gap-4 text-[14px] leading-7 text-[#F5F5F5]/75">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#FBE369]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <article className="border border-white/12 bg-white/5 p-6 md:p-8">
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                    Aplicaciones
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                    Donde aporta valor.
                  </h2>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {(applicationBlock?.items ?? []).slice(0, 6).map((item) => (
                      <span
                        key={item}
                        className="border border-white/12 bg-white/5 px-3 py-2 text-[12px] font-semibold leading-5 text-[#F5F5F5]/80"
                      >
                        {item.split(":")[0]}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section id="descargas" className="mx-auto max-w-wide px-4 py-12 sm:px-6 md:py-16 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border border-[#D4DFDC] bg-white p-6 md:flex-row md:items-center md:p-8">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Descargas
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#101820]">
                  Solicitar ficha técnica completa
                </h2>
                <p className="mt-3 max-w-[560px] text-[14px] leading-7 text-[#4A5560]">
                  Si necesitas validación técnica, parámetros completos o compatibilidad con tu matriz, nuestro equipo revisa el caso antes de recomendar.
                </p>
              </div>

              <Button asChild className="shrink-0">
                <Link href="/contacto/ventas">
                  Solicitar ficha
                  <DownloadSimple size={17} weight="bold" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[0.86fr_1.14fr] border-b border-[#D4DFDC] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="bg-[#F4F4F4] p-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#101820]">
        {label}
      </div>
      <div className="p-4 text-[13px] leading-6 text-[#4A5560]">
        {value}
      </div>
    </div>
  );
}
