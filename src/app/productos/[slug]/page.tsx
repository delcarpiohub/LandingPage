import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import {
  ProductDetailSidebar,
  ProductQuickRail,
} from "@/components/products/product-detail-sidebar";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import { productosData } from "@/content/productos";
import {
  getProductBySlug,
  mockProducts,
  productFilters,
} from "@/lib/mock-products";

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

  if (slug === "hanon-k1160") {
    return {
      title: "Hanon K1160 — Analizador Kjeldahl automático | Del Carpio",
      description: "Nitrógeno y proteína sin intervención manual: destila, titula, calcula e imprime. Recuperación ≥99.5% y RSD ≤0.5%. Compatible con autosampler de 24 posiciones.",
      alternates: {
        canonical: `/productos/${product.slug ?? product.id}`,
      },
    };
  }

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
  const highlights = detail?.highlights ?? product.features;
  const summaryItems = (detail?.advantages ?? product.features).slice(0, 4);
  const recommendedProducts = mockProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />
      <ProductQuickRail />

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

        <section className="mx-auto grid max-w-wide gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-16">
          <Reveal>
            <div className="relative overflow-hidden border border-[#D4DFDC] bg-white">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#D6532B]" />
              <div className="relative mx-auto aspect-square max-w-[540px]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 540px"
                  className="object-contain p-10 md:p-14"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex min-h-full flex-col justify-center">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#D6532B]">
                {detail?.brand ?? product.category} · {detail?.model ?? product.id}
              </p>

              <h1 className="mt-5 max-w-[720px] text-[2.35rem] font-extrabold leading-[0.98] tracking-tight text-[#101820] sm:text-5xl lg:text-[64px]">
                {detail?.fullTitle ?? product.name}
              </h1>

              <p className="mt-6 max-w-[600px] text-base leading-8 text-[#4A5560] md:text-lg">
                {product.description}
              </p>

              {product.slug === "hanon-k1160" ? (
                <div className="mt-8 border-l-[6px] border-[#D6532B] bg-white p-6 rounded-[4px] border border-[#D4DFDC]">
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {productosData[0].metricas.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="font-display text-2xl md:text-[34px] font-extrabold text-[#101820] leading-none">
                          {metric.valor}
                        </span>
                        <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#4A5560]/70">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid gap-px overflow-hidden border border-[#D4DFDC] bg-[#D4DFDC] sm:grid-cols-3">
                  {highlights.map((highlight) => (
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
              )}
            </div>
          </Reveal>
        </section>

        <div className="mx-auto grid max-w-wide gap-8 px-4 pb-14 sm:px-6 md:pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 lg:px-10">
          <div className="min-w-0">
            <Reveal>
              <ProductDetailTabs slug={product.slug ?? product.id} summaryItems={summaryItems} />
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ProductDetailSidebar
              categories={productFilters}
              recommendedProducts={recommendedProducts}
            />
          </Reveal>
        </div>

        {/* Banda CTA Final #4A5560 */}
        <section className="bg-[#4A5560] py-12 text-[#F5F5F5] border-t border-[#D4DFDC]">
          <div className="mx-auto max-w-wide px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] mb-2">
                Contacto Técnico
              </p>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-3xl leading-tight">
                ¿Listo para evaluar el {product.name === "Analizador Kjeldahl automático K1160" ? "K1160" : product.name} en tu laboratorio?
              </h3>
              <p className="mt-2 text-[14px] text-[#F5F5F5]/70 leading-relaxed">
                Nuestro equipo técnico te asesorará en la configuración de la metodología, calificación (IQ/OQ/PQ) y cotización a medida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-[2px] py-4 px-6 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center">
                <Link href={`/contacto/ventas?producto=${product.slug ?? product.id}`}>
                  Cotizar este equipo
                </Link>
              </Button>
              <a
                href={
                  product.slug === "hanon-k1160"
                    ? "https://wa.me/56225819500?text=Hola,%20quiero%20cotizar%20el%20analizador%20Kjeldahl%20Hanon%20K1160"
                    : `https://wa.me/56225819500?text=Hola,%20quiero%20cotizar%20${product.name}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[#D4DFDC]/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] transition-colors rounded-[2px] py-3.5 px-6 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center"
              >
                WhatsApp
              </a>
              <a
                href="tel:+56225819500"
                className="inline-flex items-center justify-center border border-[#D4DFDC]/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] transition-colors rounded-[2px] py-3.5 px-6 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center"
              >
                Llamar
              </a>
            </div>
          </div>
        </section>

        {/* JSON-LD Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "brand": {
                "@type": "Brand",
                "name": detail?.brand ?? "Hanon"
              },
              "image": [
                `https://www.delcarpio.cl${product.imageUrl}`
              ],
              "description": product.description,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "CLP",
                "seller": {
                  "@type": "Organization",
                  "name": "Del Carpio"
                },
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
