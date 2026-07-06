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

  const isK1160 = product.slug === "hanon-k1160";
  const heroBg = isK1160 ? "bg-[#D6532B]" : "bg-[#4A5560]";

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
    : [];

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />
      <ProductQuickRail />

      <main id="main-content">
        {/* Dark Category Banner */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12 text-center border-b border-[#D4DFDC]">
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
          
          <div className="relative z-10 mx-auto max-w-wide px-4 sm:px-6 lg:px-10 mb-4 flex justify-start">
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

          <div className="relative z-10 mx-auto max-w-wide px-4 text-center sm:px-6 lg:px-10">
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl">
              Instrumentación Analítica de Precisión
            </h1>
          </div>
        </section>

        {/* Hero Section styled like Biologica */}
        <section className={cn("relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 text-white", heroBg)}>
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

          <div className="mx-auto max-w-wide px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              {/* Left Column */}
              <Reveal>
                <div className="flex flex-col">
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.22em] text-white/80 mb-4">
                    {detail?.brand ?? product.category} · {detail?.model ?? product.id}
                  </p>
                  <h1 className="max-w-[720px] text-[2.5rem] font-extrabold leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-[64px]">
                    {isK1160
                      ? "EL ESTÁNDAR DE MÁXIMA PRECISIÓN EN ANÁLISIS KJELDAHL"
                      : (detail?.fullTitle ?? product.name)}
                  </h1>
                  <p className="mt-6 max-w-[600px] text-[15px] leading-8 text-white/85">
                    {product.description}
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Button asChild className="bg-white hover:bg-white/90 text-[#101820] border-none rounded-full py-6 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center shadow-md">
                      <Link href={`/contacto/ventas?producto=${product.slug ?? product.id}`}>
                        Cotiza y Asesora
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Interactive Product Gallery */}
              <Reveal delay={0.08}>
                <div className="w-full flex justify-center lg:justify-end">
                  <ProductGallery
                    images={galleryImages}
                    fallbackImage={product.imageUrl}
                    productName={product.name}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Features Ticker Bar below the hero */}
        <section className="bg-[#111111] py-4 text-white overflow-hidden select-none border-y border-white/5">
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%_-_128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
              {tickerItems.map((item, idx) => (
                <li key={`${item}-${idx}`} className="flex items-center gap-3 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6532B]" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] whitespace-nowrap text-white/95">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {/* Duplicate for infinite loop */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
              {tickerItems.map((item, idx) => (
                <li key={`${item}-dup-${idx}`} className="flex items-center gap-3 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6532B]" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] whitespace-nowrap text-white/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto grid max-w-wide gap-8 px-4 py-14 sm:px-6 md:pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 lg:px-10">
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
