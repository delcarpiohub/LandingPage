import { ArrowLeft, ArrowRight, CheckCircle, Shield, Sparkle, Target, Trophy } from "@phosphor-icons/react/dist/ssr";
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

  if (slug === "hanon-k1160" || slug === "hanon-k9860") {
    const isK1160 = slug === "hanon-k1160";
    const model = isK1160 ? "K1160" : "K9860";
    const desc = isK1160
      ? "Nitrógeno y proteína sin intervención manual: destila, titula, calcula e imprime. Recuperación ≥99.5% y RSD ≤0.5%. Compatible con autosampler de 24 posiciones."
      : "Determinación automática de nitrógeno y proteína con destilación y titulación integradas en un ciclo continuo. Alta precisión, seguridad operativa y autolimpieza.";
    return {
      title: `Hanon ${model} — Analizador Kjeldahl automático | Del Carpio`,
      description: desc,
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

  const isK1160 = product.slug === "hanon-k1160";
  const isK9860 = product.slug === "hanon-k9860";
  const isHanonPage = isK1160 || isK9860;
  const heroBg = isHanonPage ? "bg-[#D6532B]" : "bg-[#4A5560]";

  const tickerItems = isK1160
    ? [
        "MÁXIMA RECUPERACIÓN ≥99.5%",
        "REPETIBILIDAD RSD ≤0.5%",
        "OPERACIÓN DESATENDIDA",
        "CONFORME FDA 21 CFR",
        "DETERMINACIÓN 3-8 MIN",
        "APOYO TÉCNICO LOCAL",
        "CALIFICACIÓN IQ/OQ/PQ",
      ]
    : isK9860
    ? [
        "MÁXIMA RECUPERACIÓN ≥99.5%",
        "REPETIBILIDAD RSD ≤0.5%",
        "SISTEMA AUTOMÁTICO INTEGRADO",
        "TITULACIÓN DE ALTA PRECISIÓN",
        "DETERMINACIÓN 5-10 MIN",
        "APOYO TÉCNICO LOCAL",
        "CALIFICACIÓN IQ/OQ/PQ",
      ]
    : [
        "TECNOLOGÍA DE PRECISIÓN",
        "CUMPLIMIENTO NORMATIVO",
        "RESPALDO LOCAL EN CHILE",
        "CALIBRACIÓN CERTIFICADA",
        "PRODUCTIVIDAD MEJORADA",
        "SOPORTE IQ/OQ/PQ",
      ];

  const galleryImages = isK1160
    ? [
        { src: "/productos/hanon-k1160/frontal.png", alt: "Vista frontal del analizador Kjeldahl automático Hanon K1160" },
        { src: "/productos/hanon-k1160/autosampler.webp", alt: "Autosampler K1124 de 24 posiciones para el analizador Kjeldahl" },
        { src: "/productos/hanon-k1160/sistema.webp", alt: "Detalle del sistema de titulación y condensación del analizador" }
      ]
    : isK9860
    ? [
        { src: "/productos/hanon-k9860/frontal.png", alt: "Vista frontal del analizador Kjeldahl automático Hanon K9860" },
        { src: "/productos/hanon-k9860/imagen-2.webp", alt: "Detalle del sistema de destilación del analizador Kjeldahl K9860" },
        { src: "/productos/hanon-k9860/imagen-3.webp", alt: "Detalle del sistema de titulación y dosificación del analizador Kjeldahl K9860" }
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
          
          <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 mb-6 flex justify-start">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                <li>
                  <Link href="/productos" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <ArrowLeft size={13} weight="bold" />
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
                    <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#D6532B] mb-2">
                      K1160
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-[#101820] sm:text-5xl lg:text-[54px] leading-[1.05] uppercase">
                      Analizador
                      <span className="block text-[#D6532B]">Automático</span>
                    </h1>
                    <p className="text-[12px] font-extrabold tracking-[0.18em] text-[#4A5560] uppercase mt-2">
                    </p>
                    <p className="mt-6 text-[14px] leading-relaxed text-[#4A5560]/95 max-w-md">
                      Operación desatendida de alta precisión: destila, titula, calcula y limpia en un solo ciclo con autosampler de 24 posiciones.
                    </p>
                    <div className="mt-8">
                      <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-10 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02]">
                        <Link href={`/contacto/ventas?producto=${product.slug ?? product.id}`}>
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
        ) : (
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
                        <Link href={`/contacto/ventas?producto=${product.slug ?? product.id}`}>
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

        {/* Ficha Técnica / Brochure Download Section (Only for products that have it, like K9860) */}
        {product.slug === "hanon-k9860" && (
          <section className="bg-white border-t border-[#D4DFDC] py-14 md:py-20">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <Reveal>
                <div className="bg-[#F4F4F4]/50 border border-[#D4DFDC] rounded-[4px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#D6532B]/10 p-3.5 rounded-[4px] text-[#D6532B] shrink-0">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#101820] tracking-tight">
                        Ficha Técnica Oficial - Kjeldahl K9860
                      </h3>
                      <p className="mt-1 text-sm text-[#4A5560]/90 leading-relaxed max-w-xl">
                        Descargue el brochure oficial del analizador Kjeldahl automático Hanon K9860 con especificaciones completas de instalación, requerimientos de laboratorio y accesorios.
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02] shrink-0 w-full md:w-auto text-center justify-center">
                    <a href="/productos/hanon-k9860/brochure-k9860.pdf" download="Ficha_Tecnica_Kjeldahl_K9860_Hanon.pdf">
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
                ¿Listo para evaluar el {product.name === "Analizador Kjeldahl automático K1160" ? "K1160" : product.name} en tu laboratorio?
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

// Value Props Item helper
function ValuePropItem({
  icon: Icon,
  label,
  description,
}: {
  icon: any;
  label: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-white/10 p-2.5 rounded-full text-white shrink-0">
        <Icon size={18} weight="bold" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
          {label}
        </h4>
        <p className="mt-1 text-[12px] leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
}
