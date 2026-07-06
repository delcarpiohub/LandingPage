import {
  ArrowLeft,
  ArrowRight,
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
import { getProductBySlug, mockProducts, productFilters } from "@/lib/mock-products";
import { cn } from "@/lib/utils";

const blockToneClasses = {
  yellow: "border-[#FBE369]/50 bg-[#FBE369]/10",
  blue: "border-[#4A5560]/20 bg-[#4A5560]/5",
  red: "border-[#D6532B]/25 bg-[#D6532B]/10",
  green: "border-[#53843A]/30 bg-[#53843A]/10",
};

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
  const relatedProducts = mockProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <Navigation />

      <main id="main-content">
        <section className="border-b border-[#D4DFDC] bg-[#101820] pt-20 text-[#F5F5F5] md:pt-24 lg:pt-32">
          <div className="mx-auto max-w-wide px-4 py-6 sm:px-6 lg:px-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5F5F5]/60">
                <li>
                  <Link
                    href="/productos"
                    className="inline-flex items-center gap-2 transition-colors hover:text-[#F5F5F5]"
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

          <div className="mx-auto grid max-w-wide gap-10 px-4 pb-14 sm:px-6 md:pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-10 lg:pb-24">
            <Reveal>
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#D6532B]">
                  {detail?.brand ?? product.category}
                </p>
                <h1 className="mt-5 max-w-3xl text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-[#F5F5F5] sm:text-5xl lg:text-[64px]">
                  {detail?.fullTitle ?? product.name}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#F5F5F5]/75 md:text-lg">
                  {detail?.subtitle ?? product.description}
                </p>

                {detail ? (
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {detail.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="border border-white/12 bg-white/[0.04] p-4"
                      >
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="mb-3 text-[#53843A]"
                        />
                        <p className="text-[13px] font-bold leading-snug text-[#F5F5F5]">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative">
                <div className="absolute inset-x-8 bottom-0 h-28 rounded-full bg-[#D6532B]/15 blur-3xl" />
                <div className="relative border border-white/10 bg-white p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:p-10">
                  <div className="relative mx-auto aspect-square max-w-[520px]">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-[#D4DFDC] bg-white/70">
          <div className="mx-auto flex max-w-wide gap-3 overflow-x-auto px-4 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#4A5560] sm:px-6 lg:px-10">
            {["Descripción", "Parámetros técnicos", "Especificaciones", "Aplicaciones"].map((tab) => (
              <a
                key={tab}
                href={`#${tab.toLowerCase().replaceAll(" ", "-")}`}
                className="shrink-0 border border-[#D4DFDC] bg-white px-4 py-3 transition-colors hover:border-[#D6532B] hover:text-[#D6532B]"
              >
                {tab}
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-wide gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10 lg:py-20">
          <div className="space-y-12">
            <Reveal>
              <section id="descripción" className="scroll-mt-28">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Descripción
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101820] md:text-4xl">
                  Ventajas clave
                </h2>
                <div className="mt-7 grid gap-3">
                  {(detail?.advantages ?? product.features).map((item) => (
                    <div
                      key={item}
                      className="grid grid-cols-[20px_1fr] gap-4 border border-[#D4DFDC] bg-white/80 p-4 text-[14px] leading-7 text-[#4A5560] md:p-5"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D6532B]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {detail ? (
              <>
                <Reveal>
                  <section id="parámetros-técnicos" className="scroll-mt-28">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                      Parámetros técnicos
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101820] md:text-4xl">
                      Datos de operación
                    </h2>
                    <div className="mt-7 overflow-hidden border border-[#D4DFDC] bg-white">
                      {detail.technicalParameters.map((row) => (
                        <div
                          key={`${row.leftParameter}-${row.rightParameter}`}
                          className="grid border-b border-[#D4DFDC] last:border-b-0 md:grid-cols-2"
                        >
                          <div className="grid grid-cols-[0.9fr_1.1fr] border-b border-[#D4DFDC] md:border-b-0 md:border-r">
                            <div className="bg-[#F4F4F4] p-4 text-[13px] font-bold text-[#101820]">
                              {row.leftParameter}
                            </div>
                            <div className="p-4 text-[13px] leading-6 text-[#4A5560]">
                              {row.leftValue}
                            </div>
                          </div>
                          <div className="grid grid-cols-[0.9fr_1.1fr]">
                            <div className="bg-[#F4F4F4] p-4 text-[13px] font-bold text-[#101820]">
                              {row.rightParameter}
                            </div>
                            <div className="p-4 text-[13px] leading-6 text-[#4A5560]">
                              {row.rightValue}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </Reveal>

                <Reveal>
                  <section id="especificaciones" className="scroll-mt-28">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                      Especificaciones técnicas detalladas
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101820] md:text-4xl">
                      Control, datos y aplicaciones
                    </h2>
                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                      {detail.detailBlocks.map((block) => (
                        <article
                          key={block.title}
                          id={block.title === "Aplicaciones principales" ? "aplicaciones" : undefined}
                          className={cn("border p-5 md:p-6", blockToneClasses[block.tone])}
                        >
                          <h3 className="text-xl font-extrabold leading-tight text-[#101820]">
                            {block.title}
                          </h3>
                          <ul className="mt-5 space-y-3">
                            {block.items.map((item) => (
                              <li
                                key={item}
                                className="grid grid-cols-[16px_1fr] gap-3 text-[13px] leading-6 text-[#4A5560]"
                              >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D6532B]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </section>
                </Reveal>

                <Reveal>
                  <div className="flex flex-col items-start justify-between gap-5 border border-[#D4DFDC] bg-[#101820] p-6 text-[#F5F5F5] md:flex-row md:items-center md:p-8">
                    <div>
                      <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                        Documentación
                      </p>
                      <h2 className="mt-2 text-2xl font-extrabold">
                        Parámetros técnicos completos
                      </h2>
                    </div>
                    <Button asChild>
                      <Link href="/contacto/ventas">
                        Solicitar ficha
                        <DownloadSimple size={17} weight="bold" />
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              </>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#D4DFDC] bg-white/80 p-5">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#101820]">
                Categorías
              </h2>
              <div className="mt-4 divide-y divide-[#D4DFDC]">
                {productFilters.map((filter) => (
                  <Link
                    key={filter}
                    href="/productos"
                    className="flex items-center justify-between py-3 text-[13px] font-semibold text-[#4A5560] transition-colors hover:text-[#D6532B]"
                  >
                    {filter}
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-[#D4DFDC] bg-white/80 p-5">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#101820]">
                Productos relacionados
              </h2>
              <div className="mt-5 space-y-4">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/productos/${related.slug ?? related.id}`}
                    className="grid grid-cols-[72px_1fr] gap-4 border border-transparent p-2 transition-colors hover:border-[#D6532B]/35"
                  >
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={related.imageUrl}
                        alt={related.name}
                        fill
                        sizes="72px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-[13px] font-extrabold leading-snug text-[#101820]">
                        {related.name}
                      </p>
                      <p className="mt-1 text-[12px] text-[#4A5560]/75">
                        {related.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
