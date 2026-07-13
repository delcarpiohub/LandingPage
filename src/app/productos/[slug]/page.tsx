import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
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
import { ProductGallery } from "@/components/products/product-gallery";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  if (slug.startsWith("hanon-")) {
    const model = product.detail?.model ?? product.name;
    return {
      title: `Hanon ${model} — ${product.name} | Del Carpio`,
      description: product.description,
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
  const summaryItems = (detail?.advantages ?? product.features).slice(0, 4);
  
  const relatedIds = product.relatedProducts ?? [];
  const recommendedProducts = mockProducts
    .filter((item) => (product.slug ?? product.id) !== (item.slug ?? item.id))
    .sort((a, b) => {
      const aRelated = relatedIds.includes(a.id) ? 1 : 0;
      const bRelated = relatedIds.includes(b.id) ? 1 : 0;
      return bRelated - aRelated;
    })
    .slice(0, 3);

  const isK1160 = product.slug === "hanon-k1160";
  const isK9860 = product.slug === "hanon-k9860";
  const isHanonPage = product.slug?.startsWith("hanon-") ?? false;
  const heroBg = isHanonPage ? "bg-[#D6532B]" : "bg-[#4A5560]";

  const hasBrochure = product.slug && ["hanon-k9860", "hanon-k9840", "hanon-sox606", "hanon-sh220f", "hanon-sh420f", "hanon-k1100f", "hanon-sh520", "hanon-s402"].includes(product.slug);

  const galleryImages = isK1160
    ? [
        { src: "/productos/hanon-k1160/sistema.png", alt: "Detalle del sistema de titulación y condensación del analizador" },
        { src: "/productos/hanon-k1160/autosampler.webp", alt: "Autosampler K1124 de 24 posiciones para el analizador Kjeldahl" },
        { src: "/productos/hanon-k1160/frontal.png", alt: "Vista frontal del analizador Kjeldahl automático Hanon K1160" }
      ]
    : isK9860
    ? [
        { src: "/productos/hanon-k9860/frontal-v3.png", alt: "Vista frontal del analizador Kjeldahl automático Hanon K9860" },
        { src: "/productos/hanon-k9860/imagen-2.webp", alt: "Detalle del sistema de destilación del analizador Kjeldahl K9860" },
        { src: "/productos/hanon-k9860/imagen-3.webp", alt: "Detalle del sistema de titulación y dosificación del analizador Kjeldahl K9860" }
      ]
    : product.slug === "hanon-k9840"
    ? [
        { src: "/productos/hanon-k9840/frontal.png", alt: "Vista frontal del analizador Kjeldahl automático Hanon K9840" },
        { src: "/productos/hanon-k9840/imagen-2.png", alt: "Detalle del funcionamiento del analizador Kjeldahl K9840" },
        { src: "/productos/hanon-k9840/imagen-3.webp", alt: "Detalle de los tanques y dosificación del analizador Kjeldahl K9840" }
      ]
    : product.slug === "hanon-sox606"
    ? [
        { src: "/productos/hanon-sox606/imagen-7.png", alt: "Vista frontal del extractor automático Soxhlet Hanon SOX606" },
        { src: "/productos/hanon-sox606/imagen-8.png", alt: "Detalle del panel táctil y rack de extracción del extractor SOX606" },
        { src: "/productos/hanon-sox606/imagen-3.webp", alt: "Detalle del sistema de destilación y condensación de solventes del SOX606" }
      ]
    : product.slug === "hanon-sh220f"
      ? [
        { src: "/productos/hanon-sh220f/imagen-1.png", alt: "Vista frontal principal del digestor Kjeldahl Hanon SH220F" },
        { src: "/productos/hanon-sh220f/imagen-2.png", alt: "Vista angulada del digestor Kjeldahl Hanon SH220F con panel de control lateral" },
        { src: "/productos/hanon-sh220f/imagen-3.png", alt: "Vista frontal del digestor SH220F with rack de tubos de digestión instalado" },
        { src: "/productos/hanon-sh220f/imagen-4.webp", alt: "Detalle lateral posterior del digestor SH220F con conexión de cableado y ventilación" }
        ]
    : product.slug === "hanon-sh420f"
      ? [
        { src: "/productos/hanon-sh420f/imagen-1.png", alt: "Vista frontal principal del digestor Kjeldahl Hanon SH420F con campana recolectora" },
        { src: "/productos/hanon-sh420f/imagen-3.webp", alt: "Detalle del sistema de campana recolectora de gases WD03 en el digestor SH420F" },
        { src: "/productos/hanon-sh420f/imagen-4.webp", alt: "Detalle del bloque de grafito y panel de control táctil LCD del digestor SH420F" }
        ]
    : product.slug === "hanon-k1100f"
      ? [
        { src: "/productos/hanon-k1100f/imagen-1.png", alt: "Vista frontal principal del analizador Kjeldahl automático Hanon K1100F" },
        { src: "/productos/hanon-k1100f/imagen-2.webp", alt: "Detalle de las válvulas de paso y dosificación de reactivos del K1100F" },
        { src: "/productos/hanon-k1100f/imagen-3.webp", alt: "Detalle del cabezal de destilación y sistema de condensación del K1100F" }
        ]
    : product.slug === "hanon-sh520"
      ? [
        { src: "/productos/hanon-sh520/imagen-1.png", alt: "Vista frontal principal del digestor automático Kjeldahl Hanon SH520/SH508" },
        { src: "/productos/hanon-sh420f/imagen-3.webp", alt: "Detalle del sistema de campana recolectora de gases WD03 compatible con digestores SH" },
        { src: "/productos/hanon-sh420f/imagen-4.webp", alt: "Detalle del bloque de calentamiento de aluminio de orificios profundos" }
        ]
    : product.slug === "hanon-s402"
      ? [
        { src: "/productos/hanon-s402/imagen-1.png", alt: "Vista frontal principal del sistema de agotamiento de gases Hanon S402" },
        { src: "/productos/hanon-s402/imagen-2.png", alt: "Detalle de los tanques de condensación y filtración del S402" },
        { src: "/productos/hanon-s402/imagen-3.png", alt: "Detalle del sistema de control y medidores de presión del S402" }
        ]
      : [];

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />
      <ProductQuickRail />

      <main id="main-content">
        {/* Dark Category Banner - Larger Size */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 text-center border-b border-[#D4DFDC]">
          <svg
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <filter id="noiseFilterProductos">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterProductos)" />
          </svg>
          
          {!isHanonPage && (
            <div className="relative z-10 mx-auto mt-8 max-w-[1600px] px-4 sm:mt-10 sm:px-6 lg:mt-12 lg:px-10">
              <nav aria-label="Breadcrumb">
                <ol className="inline-flex min-w-0 flex-wrap items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                  <li>
                    <Link href="/productos" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                      <ArrowLeft size={15} weight="bold" />
                      Productos
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="min-w-0 break-words text-white">
                    {detail?.model ?? product.name}
                  </li>
                </ol>
              </nav>
            </div>
          )}

          <div className="relative z-10 mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-10">
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-[#F5F5F5] sm:text-5xl lg:text-[64px]">
              Instrumentación Analítica de Precisión
            </h1>
          </div>
        </section>

        {/* Hero Section styled like Biologica / Sneaker Flare - Compact Size */}
        {isHanonPage ? (
          <section className="relative overflow-hidden bg-[#F5F5F7] py-16 lg:py-24 border-b border-[#D4DFDC]">
            {/* 3D Watermark Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <h2 className="text-[15vw] font-black tracking-[-0.05em] text-[#101820]/6 lowercase font-sans leading-none select-none">
                HANON
              </h2>
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                
                {/* Left Column: Sneaker Flare text styling (compact, minimal, clean) */}
                <div className="flex flex-col justify-center text-[#101820] max-w-xl relative z-10 lg:pl-16">
                  <Reveal>
                    <nav aria-label="Breadcrumb" className="mb-6 -translate-y-2">
                      <ol className="inline-flex min-w-0 flex-wrap items-center gap-2 px-0 py-0 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#4A5560]">
                        <li>
                          <Link href="/productos" className="inline-flex items-center gap-2 transition-colors hover:text-[#101820]">
                            <ArrowLeft size={15} weight="bold" />
                            Productos
                          </Link>
                        </li>
                        <li aria-hidden>/</li>
                        <li className="min-w-0 break-words text-[#101820]">
                          {detail?.model ?? product.name}
                        </li>
                      </ol>
                    </nav>
                    <p className="mb-3 text-[18px] font-black uppercase tracking-[0.24em] text-[#D6532B] sm:text-[22px]">
                      {detail?.model ?? product.name}
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-[#101820] sm:text-5xl lg:text-[54px] leading-[1.05] uppercase">
                      {product.slug === "hanon-sox606" ? "Extractor" : product.slug === "hanon-sh220f" ? "Digestor" : "Analizador"}
                      <span className="block text-[#D6532B]">{product.slug === "hanon-sh220f" ? "De Bloque" : "Automático"}</span>
                    </h1>
                    <p className="mt-6 text-[14px] leading-relaxed text-[#4A5560]/95 max-w-md">
                      {product.description}
                    </p>
                    <div className="mt-8">
                      <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-10 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02]">
                        <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}`} target="_blank" rel="noopener noreferrer">
                          Cotizar y Asesorar
                        </Link>
                      </Button>
                    </div>
                  </Reveal>
                </div>

                {/* Right Column: Dynamic floating, tilted equipment gallery */}
                <div className="relative w-full flex justify-center lg:justify-start min-h-[380px] lg:min-h-[460px] z-10">
                  <Reveal delay={0.08} className="w-full flex justify-center lg:justify-start">
                    <div className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[500px] flex items-center justify-center">
                      {/* Static container */}
                      <div className="relative w-full">
                        <ProductGallery
                          images={galleryImages}
                          fallbackImage={product.imageUrl}
                          productName={product.name}
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>

              </div>
            </div>
          </section>
        ) : null}



        {!isHanonPage && (
          <section className={cn("relative overflow-hidden pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-12 text-white", heroBg)}>
            {/* Background Subtle Texture */}
            <svg
              className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <filter id="noiseFilterHero">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilterHero)" />
            </svg>

            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                {/* Left Column */}
                <Reveal>
                  <div className="flex flex-col justify-center">
                    <p className="text-[12px] font-mono font-bold uppercase tracking-[0.22em] text-white/80 mb-2">
                      {detail?.brand ?? product.category} · {detail?.model ?? product.id}
                    </p>
                    <h1 className="max-w-[720px] text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[34px]">
                      {detail?.fullTitle ?? product.name}
                    </h1>
                    <p className="mt-4 max-w-[600px] text-[14px] leading-relaxed text-white/85">
                      {product.description}
                    </p>
                    
                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <Button asChild className="bg-white hover:bg-white/90 text-[#101820] border-none rounded-full py-5 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center shadow-md">
                        <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}`} target="_blank" rel="noopener noreferrer">
                          Cotiza y Asesora
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>

                {/* Right Column: Interactive Product Gallery */}
                <Reveal delay={0.08}>
                  <div className="w-full flex justify-center lg:justify-start">
                    <div className="max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] w-full">
                      <ProductGallery
                        images={galleryImages}
                        fallbackImage={product.imageUrl}
                        productName={product.name}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-14 sm:px-6 md:pb-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-12 lg:px-10">
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



        {/* Ficha Técnica / Brochure Download Section (Only for products that have it) */}
        {hasBrochure && (
          <section className="bg-white border-t border-[#D4DFDC] py-14 md:py-20">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <Reveal>
                <div className="bg-white border-y border-r border-l-4 border-[#D4DFDC] border-l-[#D6532B] rounded-r-[4px] p-6 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-sm">
                  <div className="flex flex-col justify-start">
                    <h3 className="text-lg font-bold text-[#101820] tracking-tight">
                      Ficha Técnica Oficial - Hanon {product.detail?.model ?? ""}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#4A5560]/90 leading-relaxed max-w-2xl">
                      Descargue el brochure oficial del equipo Hanon {product.detail?.model ?? ""} con especificaciones completas de instalación, requerimientos de laboratorio y accesorios.
                    </p>
                  </div>
                  <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02] shrink-0 w-full md:w-auto text-center justify-center">
                    <a
                      href={`/productos/${product.slug ?? ""}/brochure-${(product.slug ?? "").replace("hanon-", "")}.pdf`}
                      download={`Ficha_Tecnica_Hanon_${product.detail?.model ?? ""}.pdf`}
                    >
                      Descargar PDF
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Banda CTA Final #4A5560 */}
        <section className="relative overflow-hidden bg-[#4A5560] py-16 text-[#F5F5F5] border-t border-[#D4DFDC]">
          {/* Background Image with soft filter overlay */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/productos/854856ec43t5.jpg"
              alt="Fondo de contacto técnico"
              fill
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A5560]/80 via-[#4A5560]/70 to-[#4A5560]/60" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] mb-2">
                Contacto Técnico
              </p>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-3xl leading-tight">
                ¿Listo para evaluar el {detail?.model ?? product.name} en tu laboratorio?
              </h3>
              <p className="mt-2 text-[14px] text-[#F5F5F5]/70 leading-relaxed">
                Nuestro equipo técnico te asesorará en la configuración de la metodología, calificación (IQ/OQ/PQ) y cotización a medida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center shadow-md">
                <Link href={`/contacto/ventas?producto=${product.slug ?? product.id}`}>
                  Cotizar
                </Link>
              </Button>
              <Button asChild variant="secondary" className="border border-white/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] hover:text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center">
                <Link href={`/contacto/proyectos?producto=${product.slug ?? product.id}`}>
                  Asesoría
                </Link>
              </Button>
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
