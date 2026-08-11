import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BackToCatalogLink } from "@/components/products/back-to-catalog-link";
import { Reveal } from "@/components/motion/reveal";
import {
  ProductDetailSidebar,
  ProductQuickRail,
} from "@/components/products/product-detail-sidebar";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import { ProductGallery } from "@/components/products/product-gallery";
import { CompatibleAnalyzersSection } from "@/components/products/compatible-analyzers-section";
import { RelatedProductsCarousel } from "@/components/products/related-products-carousel";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getProductBySlug,
  getRelatedProducts,
  mockProducts,
  productFilters,
} from "@/lib/mock-products";

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug ?? product.id,
  }));
}

// El banner reutiliza la ilustración de /productos con el mismo hueco central
// que antes ocupaba la palabra "PRODUCTOS"; el título de cada producto varía
// mucho en largo (39 a 77 caracteres en fullTitle), así que el tamaño de
// fuente se ajusta por umbrales para que siempre calce sin desbordar ese
// espacio ni encimarse con las ilustraciones de equipos a los costados.
function getBannerHeadlineSizeClass(text: string): string {
  const length = text.length;
  if (length <= 45) return "text-[2.25rem] sm:text-4xl lg:text-[52px]";
  if (length <= 62) return "text-3xl sm:text-4xl lg:text-[42px]";
  return "text-2xl sm:text-3xl lg:text-[34px]";
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

  const relatedProducts = getRelatedProducts(product);
  const isTraceElemental = detail?.brand === "Trace Elemental";
  const compatibleAnalyzers = mockProducts.filter(
    (item) =>
      item.detail?.brand === "Trace Elemental" &&
      (product.slug ?? product.id) !== (item.slug ?? item.id)
  );
  const isK1160 = product.slug === "hanon-k1160";
  const isK9860 = product.slug === "hanon-k9860";
  const isHanonPage = product.slug?.startsWith("hanon-") ?? false;
  const isMilestonePage = product.slug?.startsWith("milestone-") ?? false;
  const isInfitekPage = product.slug?.startsWith("infitek-") ?? false;
  const isTeInstrumentsPage = product.slug?.startsWith("te-instruments-") ?? false;
  const isDecentPage = product.slug?.startsWith("decent-") ?? false;
  const useHanonLayout = isHanonPage || isInfitekPage || isTeInstrumentsPage || isDecentPage;
  const heroBg = useHanonLayout ? "bg-[#D6532B]" : "bg-[#4A5560]";
  const bannerHeadline = detail?.fullTitle ?? product.name;

  const hasBrochure = product.slug && ["hanon-k9860", "hanon-k9840", "hanon-sox606", "hanon-sh220f", "hanon-sh420f", "hanon-k1100f", "hanon-sh520", "hanon-s402", "hanon-sox406", "hanon-f800", "hanon-d50-d200", "hanon-e500", "milestone-ethos-up", "infitek-cod-analyzer", "infitek-bep-m300f", "infitek-mca-series", "infitek-ph-b100bd", "infitek-usc-m-series", "infitek-don-h-series", "infitek-lyo60b-series", "infitek-fmh-series", "infitek-fmh-pa-series", "infitek-wb-series", "infitek-pr5-series", "infitek-titr-50vc", "decent-cargador-electrico-crisoles", "decent-cargador-manual-crisoles", "decent-copelas-magnesio", "decent-dosificador-automatico-litargirio", "decent-hornos-cupelacion", "decent-hornos-fusion-ensayo-fuego", "decent-mezclador-crisoles", "decent-molino-pulverizador-dp1000", "decent-drsd05", "decent-drsd40", "decent-rodillo-botella", "decent-dsw350", "decent-mezclador-tipo-v", "decent-trituradora-doble-rodillo", "decent-agitador-tamiz-estandar", "decent-hornos-secado"].includes(product.slug);
  const usesSpanishTechnicalSheet = product.slug
    ? ["infitek-wb-series", "infitek-pr5-series", "infitek-titr-50vc", "decent-cargador-electrico-crisoles", "decent-cargador-manual-crisoles", "decent-copelas-magnesio", "decent-dosificador-automatico-litargirio", "decent-hornos-cupelacion", "decent-hornos-fusion-ensayo-fuego", "decent-mezclador-crisoles", "decent-molino-pulverizador-dp1000"].includes(product.slug)
    : false;

  let brochureHref = "";
  if (isMilestonePage) {
    brochureHref = `/productos/${product.slug ?? ""}/brochure-ethos-up.pdf`;
  } else if (isInfitekPage) {
    if (usesSpanishTechnicalSheet) {
      brochureHref = `/productos/infitek/${(product.slug ?? "").replace("infitek-", "")}/ficha-tecnica-es.pdf`;
    } else if (product.slug === "infitek-cod-analyzer" || product.slug === "infitek-bep-m300f") {
      brochureHref = `/productos/infitek/brochure-${(product.slug ?? "").replace("infitek-", "")}.pdf`;
    } else {
      brochureHref = `/productos/infitek/${(product.slug ?? "").replace("infitek-", "")}/brochure.pdf`;
    }
  } else if (isHanonPage) {
    brochureHref = `/productos/${product.slug ?? ""}/brochure-${(product.slug ?? "").replace("hanon-", "")}.pdf`;
  } else if (isDecentPage) {
    brochureHref = product.slug === "decent-hornos-secado"
      ? "/productos/decent/hornos-secado/ficha-hornos-industriales-1350-2500.jpg"
      : `/productos/decent/${(product.slug ?? "").replace("decent-", "")}/Ficha Tecnica.jpg`;
  }

  const technicalSheetLinks = product.slug === "decent-hornos-secado"
    ? [
        { label: "Hornos industriales de 1.350 y 2.500 L", href: "/productos/decent/hornos-secado/ficha-hornos-industriales-1350-2500.jpg", download: "Ficha_Hornos_DDO_1350_2500.jpg" },
        { label: "Hornos industriales de 5.000 y 10.000 L", href: "/productos/decent/hornos-secado/ficha-hornos-industriales-5000-10000.jpg", download: "Ficha_Hornos_DDO_5000_10000.jpg" },
        { label: "Grandes hornos eléctricos DDO4 a DDO8", href: "/productos/decent/hornos-secado/ficha-hornos-electricos-grandes.jpg", download: "Ficha_Hornos_DDO4_DDO8.jpg" },
        { label: "Hornos eléctricos de convección forzada DDOG", href: "/productos/decent/hornos-secado/ficha-hornos-conveccion-forzada.jpg", download: "Ficha_Hornos_DDOG.jpg" },
        { label: "Hornos eléctricos de temperatura constante DDOH y DDOHL", href: "/productos/decent/hornos-secado/ficha-hornos-conveccion-natural.jpg", download: "Ficha_Hornos_DDOH_DDOHL.jpg" },
        { label: "Hornos horizontales DDO101 y DDO202", href: "/productos/decent/hornos-secado/ficha-hornos-horizontales.jpg", download: "Ficha_Hornos_DDO101_DDO202.jpg" },
      ]
    : [];

  const brochureDownloadName = isDecentPage
    ? `Ficha_Tecnica_${product.detail?.brand ?? "Decent"}_${product.detail?.model ?? product.id}.jpg`
    : `Ficha_Tecnica_${product.detail?.brand ?? "Del_Carpio"}_${product.detail?.model ?? product.id}.pdf`;
  const brochureButtonLabel = isDecentPage ? "Descargar ficha" : "Descargar PDF";

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
    : product.slug === "hanon-sox406"
      ? [
        { src: "/productos/hanon-sox406/frontal.png", alt: "Fotografía frontal del analizador semi automático de grasa Soxhlet Hanon SOX406" },
        { src: "/productos/hanon-sox406/imagen-alternative.png", alt: "Vista frontal del analizador semi automático SOX406 con fondo sólido" },
        { src: "/productos/hanon-sox406/imagen-detail.png", alt: "Detalle del sistema de cojinetes lineales y copas de extracción del SOX406" }
        ]
    : product.slug === "hanon-f800"
      ? [
        { src: "/productos/hanon-f800/frontal.png", alt: "Fotografía frontal del analizador automático de fibra Hanon F800" },
        { src: "/productos/hanon-f800/imagen-detail.png", alt: "Detalle del rack porta crisoles del analizador de fibra F800" },
        { src: "/productos/hanon-f800/consumible-2.webp", alt: "Detalle del extractor en frío periférico F800-B" }
        ]
    : product.slug === "hanon-d50-d200"
      ? [
        { src: "/productos/hanon-d50-d200/frontal.png", alt: "Fotografía frontal del analizador Dumas Hanon D50-D200" },
        { src: "/productos/hanon-d50-d200/imagen-detail.png", alt: "Detalle del sistema de muestreo automático" },
        { src: "/productos/hanon-d50-d200/consumible.png", alt: "Detalle de los consumibles del equipo Dumas" }
        ]
    : product.slug === "hanon-e500"
      ? [
        { src: "/productos/hanon-e500/imagen-1.png", alt: "Vista frontal del analizador Dumas Hanon E500" },
        { src: "/productos/hanon-e500/imagen-2.png", alt: "Muestreador automático del analizador Dumas E500" },
        { src: "/productos/hanon-e500/imagen-3.png", alt: "Sistema de tubos del analizador Dumas E500" }
        ]
    : product.slug === "milestone-ethos-up"
      ? [
        { src: "/productos/milestone-ethos-up/imagen-1.jpg", alt: "Vista frontal del equipo de digestión por microondas Milestone ETHOS UP" },
        { src: "/productos/milestone-ethos-up/imagen-2.png", alt: "Pantalla de interfaz y cavidad del equipo ETHOS UP" },
        { src: "/productos/milestone-ethos-up/rotor-sk-15.jpg", alt: "Rotor SK-15 de alta presión para ETHOS UP" },
        { src: "/productos/milestone-ethos-up/rotor-maxi-44.jpg", alt: "Rotor MAXI-44 de alto rendimiento para ETHOS UP" }
        ]
    : product.slug === "infitek-cod-analyzer"
      ? [
        { src: "/productos/infitek/cod-analyzer/imagen-1.png", alt: "Vista frontal Analizador de DQO COD-Analyzer" }
        ]
    : product.slug === "infitek-bep-m300f"
      ? [
        { src: "/productos/infitek/bep-m300f/imagen-1.png", alt: "Analizador Multiparamétrico BEP-M300F" }
        ]
    : product.slug === "infitek-mca-series"
      ? [
        { src: "/productos/infitek/mca-series/imagen-1.png", alt: "Vista frontal Analizador de Humedad Serie MCA" },
        { src: "/productos/infitek/mca-series/imagen-2.png", alt: "Detalle del Analizador de Humedad Serie MCA" }
        ]
    : product.slug === "infitek-ph-b100bd"
      ? [
        { src: "/productos/infitek/ph-b100bd/imagen-1.png", alt: "Vista principal Medidor de pH PH-B100BD" },
        { src: "/productos/infitek/ph-b100bd/imagen-2.png", alt: "Detalle del Medidor de pH PH-B100BD y electrodo" }
        ]
    : product.slug === "infitek-usc-m-series"
      ? [
        { src: "/productos/infitek/usc-m-series/imagen-1.png", alt: "Vista principal Limpiador Ultrasónico Serie USC-M" },
        { src: "/productos/infitek/usc-m-series/imagen-2.png", alt: "Detalle del Limpiador Ultrasónico Serie USC-M" }
        ]
    : product.slug === "infitek-don-h-series"
      ? [
        { src: "/productos/infitek/don-h-series/imagen-1.png", alt: "Vista principal Horno de Secado DON-H" }
        ]
    : product.slug === "infitek-lyo60b-series"
      ? [
        { src: "/productos/infitek/lyo60b-series/imagen-1.png", alt: "Liofilizador LYO60B Vista 1" },
        { src: "/productos/infitek/lyo60b-series/imagen-2.png", alt: "Liofilizador LYO60B Vista 2" },
        { src: "/productos/infitek/lyo60b-series/imagen-3.png", alt: "Liofilizador LYO60B Vista 3" },
        { src: "/productos/infitek/lyo60b-series/imagen-4.png", alt: "Liofilizador LYO60B Vista 4" }
        ]
    : product.slug === "infitek-fmh-series"
      ? [
        { src: "/productos/infitek/fmh-series/imagen-1.png", alt: "Campana Extractora FMH Vista 1" },
        { src: "/productos/infitek/fmh-series/imagen-2.png", alt: "Campana Extractora FMH Vista 2" },
        { src: "/productos/infitek/fmh-series/imagen-3.png", alt: "Campana Extractora FMH Vista 3" },
        { src: "/productos/infitek/fmh-series/imagen-4.png", alt: "Campana Extractora FMH Vista 4" }
        ]
    : product.slug === "infitek-fmh-pa-series"
      ? [
        { src: "/productos/infitek/fmh-pa-series/imagen-1.png", alt: "Campana Extractora PP FMH-PA Vista 1" }
        ]
    : product.slug === "infitek-wb-series"
      ? [
        { src: "/productos/infitek/wb-series/imagen-1.png", alt: "Baño de agua de acero inoxidable Infitek WB-1R2H-7" }
        ]
    : product.slug === "infitek-pr5-series"
      ? [
        { src: "/productos/infitek/pr5-series/imagen-1.png", alt: "Refrigerador de farmacia de tres puertas Infitek PR5-1500" }
        ]
    : product.slug === "infitek-titr-50vc"
      ? [
        { src: "/productos/infitek/titr-50vc/imagen-1.png", alt: "Titulador Karl Fischer volumétrico y coulométrico Infitek TITR-50VC" }
        ]
    : product.slug === "te-instruments-xplorer-aox-tox"
      ? [
        { src: "/productos/te-instruments/xplorer-aox-tox/imagen-1.png", alt: "Vista principal del analizador de halógenos orgánicos totales XplorerPlus AOX/TOX" },
        { src: "/productos/te-instruments/xplorer-aox-tox/imagen-2.png", alt: "Detalle del módulo de combustión y titulación microcoulombimétrica XplorerPlus" },
        { src: "/productos/te-instruments/xplorer-aox-tox/imagen-3.png", alt: "Vista alternativa del sistema analítico TE Instruments XplorerPlus AOX/TOX" }
        ]
    : product.slug === "te-instruments-xplorer-tn"
      ? [
        { src: "/productos/te-instruments/xplorer-tn/imagen-1.png", alt: "Analizador de Nitrógeno Total, Azufre y Cloro XplorerPlus TN" },
        { src: "/productos/te-instruments/xplorer-tn/imagen-2.png", alt: "Detalle del sistema analítico y módulos de combustión XplorerPlus TN" },
        { src: "/productos/te-instruments/xplorer-tn/imagen-3.png", alt: "Vista de componentes internos y tubo de combustión XproPlus" },
        { src: "/productos/te-instruments/xplorer-tn/imagen-4.png", alt: "Módulos de introducción y barca con sistema Boat CoolingPlus" },
        { src: "/productos/te-instruments/xplorer-tn/imagen-5.png", alt: "Vista posterior y conexiones de gases del analizador XplorerPlus TN" }
        ]
    : product.slug === "te-instruments-vectra"
      ? [
        { src: "/productos/te-instruments/vectra/imagen-1.png", alt: "Autosampler y Muestreador Automático de Líquidos VECTRA" },
        { src: "/productos/te-instruments/vectra/imagen-2.png", alt: "Vista del brazo robótico XYZ con rotación angular y cámara HD" },
        { src: "/productos/te-instruments/vectra/imagen-3.png", alt: "Detalle de bandejas acondicionadas y posiciones de viales VECTRA" },
        { src: "/productos/te-instruments/vectra/imagen-4.png", alt: "Estaciones de estacionamiento e intercambio automático de jeringas" },
        { src: "/productos/te-instruments/vectra/imagen-5.png", alt: "Integración de VECTRA sobre analizador elemental Xplorer Series" }
        ]
    : product.slug === "te-instruments-newton"
      ? [
        { src: "/productos/te-instruments/newton/imagen-1.png", alt: "Autosampler y Muestreador Automático de Sólidos NEWTON" },
        { src: "/productos/te-instruments/newton/imagen-2.png", alt: "Vista del carrusel apilable y tapa de preservación NEWTON" },
        { src: "/productos/te-instruments/newton/imagen-3.png", alt: "Detalle del mecanismo de introducción por barca de cuarzo y copas" },
        { src: "/productos/te-instruments/newton/imagen-4.png", alt: "Integración de NEWTON sobre horno de combustión XPLORER" }
        ]
    : product.slug === "decent-cargador-electrico-crisoles"
      ? [
        { src: "/productos/decent/cargador-electrico-crisoles/Imagen Portada.webp", alt: "Fotografía principal del cargador eléctrico de crisoles Decent DEPL25/DEPL50" },
        { src: "/productos/decent/cargador-electrico-crisoles/Imagen 2.webp", alt: "Detalle de horquilla y chasis del cargador eléctrico DEPL" },
        { src: "/productos/decent/cargador-electrico-crisoles/Imagen para la descripcion.webp", alt: "Panel de control y cargador integrado con batería sin mantenimiento" }
        ]
    : product.slug === "decent-cargador-manual-crisoles"
      ? [
        { src: "/productos/decent/cargador-manual-crisoles/Imagen Portada.webp", alt: "Fotografía principal del cargador manual de crisoles Decent DMPL25/DMPL50" },
        { src: "/productos/decent/cargador-manual-crisoles/Imagen 2.webp", alt: "Detalle de estructura y sistema de elevación manual DMPL" }
        ]
    : product.slug === "decent-copelas-magnesio"
      ? [
        { src: "/productos/decent/copelas-magnesio/Imagen Portada.webp", alt: "Copelas de Magnesia y Bloques de Lingotes Decent para Ensayo por Fuego" },
        { src: "/productos/decent/copelas-magnesio/Imagen 2.webp", alt: "Detalle de dimensiones y modelos de copelas de magnesia Decent" },
        { src: "/productos/decent/copelas-magnesio/Imagen 3.jpg", alt: "Lote de copelas de óxido de magnesio para ensayo de metales preciosos" }
        ]
    : product.slug === "decent-dosificador-automatico-litargirio"
      ? [
        { src: "/productos/decent/dosificador-automatico-litargirio/Imagen Portada.webp", alt: "Dosificador Automático de Litargirio Decent DAFS84" },
        { src: "/productos/decent/dosificador-automatico-litargirio/Imagen 2.png", alt: "Vista lateral del dosificador automático de flux DAFS84" },
        { src: "/productos/decent/dosificador-automatico-litargirio/Imagen 3.png", alt: "Detalle de los cabezales de dispensado para 84 crisoles" },
        { src: "/productos/decent/dosificador-automatico-litargirio/Imagen 4.png", alt: "Cámara cerrada anti-polvo del dosificador Decent DAFS84" }
        ]
    : product.slug === "decent-hornos-cupelacion"
      ? [
        { src: "/productos/decent/hornos-cupelacion/Imagen Portada.webp", alt: "Horno de Cupelación para Ensayo por Fuego Decent DE50CF / DE100CF" },
        { src: "/productos/decent/hornos-cupelacion/Imagen 2.webp", alt: "Detalle de la cámara de mufla y puerta neumática del horno de cupelación" },
        { src: "/productos/decent/hornos-cupelacion/Imagen 3.webp", alt: "Vista lateral del sistema neumático y cuadro de potencia del horno Decent" },
        { src: "/productos/decent/hornos-cupelacion/Imagen 4.webp", alt: "Interior de la mufla refractaria con elementos calefactores de carburo de silicio" }
        ]
    : product.slug === "decent-horno-copelacion-alta-temperatura"
      ? [
        { src: "/productos/decent/horno-copelacion-alta-temperatura/Imagen Portada.png", alt: "Horno de Copelación de Alta Temperatura 1500°C Decent DE-100CF-1500" },
        { src: "/productos/decent/horno-copelacion-alta-temperatura/Imagen 2.png", alt: "Consola de control independiente y pantalla táctil del horno de alta temperatura" },
        { src: "/productos/decent/horno-copelacion-alta-temperatura/Imagen 3.png", alt: "Vista de la cámara de mufla a 1500°C con elementos de silicio-molibdeno" },
        { src: "/productos/decent/horno-copelacion-alta-temperatura/Imagen 4.png", alt: "Detalle de la puerta neumática y ventana de observación ignífuga" }
        ]
    : product.slug === "decent-hornos-fusion-ensayo-fuego"
      ? [
        { src: "/productos/decent/hornos-fusion-ensayo-fuego/Imagen Portada.png", alt: "Horno de Fusión para Ensayo de Fuego Decent DE20FF / DE25FF" },
        { src: "/productos/decent/hornos-fusion-ensayo-fuego/Imagen 2.png", alt: "Vista de la cámara de mufla y elementos de carburo de silicio del horno de fusión" },
        { src: "/productos/decent/hornos-fusion-ensayo-fuego/Imagen 3.png", alt: "Detalle del sistema neumático de puerta y chasis en acero galvanizado" }
        ]
    : product.slug === "decent-mezclador-crisoles"
      ? [
        { src: "/productos/decent/mezclador-crisoles/Imagen Portada.webp", alt: "Mezclador de Crisoles y Flux Decent DPT25 / DPT50 / DPT84" },
        { src: "/productos/decent/mezclador-crisoles/Imagen 2.webp", alt: "Vista interior del bastidor rotativo para crisoles con compuerta neumática" },
        { src: "/productos/decent/mezclador-crisoles/Imagen 3.webp", alt: "Detalle del motorreductor y sistema de rotación bidireccional del mezclador de flux" }
        ]
    : product.slug === "decent-molino-pulverizador-dp1000"
      ? [
        { src: "/productos/decent/molino-pulverizador-dp1000/Imagen Portada.png", alt: "Molino Pulverizador de Laboratorio Decent DP1000" },
        { src: "/productos/decent/molino-pulverizador-dp1000/Imagen 2.png", alt: "Vista frontal cerrada del molino pulverizador de laboratorio DP1000" },
        { src: "/productos/decent/molino-pulverizador-dp1000/Imagen 3.jpg", alt: "Detalle del sistema de fijación y movimiento del molino pulverizador DP1000" },
        { src: "/productos/decent/molino-pulverizador-dp1000/Imagen 4.png", alt: "Vista del molino DP1000 con paneles de control y parada de emergencia" }
        ]
    : product.slug === "decent-drsd05"
      ? [
        { src: "/productos/decent/drsd05/Imagen Portada.png", alt: "Vista principal del divisor de muestras giratorio de sobremesa Decent DRSD05" },
        { src: "/productos/decent/drsd05/Imagen 2.png", alt: "Vista complementaria del divisor de muestras giratorio Decent DRSD05" },
        { src: "/productos/decent/drsd05/Imagen 3.png", alt: "Detalle complementario del divisor de muestras giratorio Decent DRSD05" }
        ]
    : product.slug === "decent-drsd40"
      ? [
        { src: "/productos/decent/drsd40/Imagen Portada.png", alt: "Vista principal del divisor rotativo de muestras Decent DRSD40" },
        { src: "/productos/decent/drsd40/Imagen 2.png", alt: "Vista complementaria del divisor rotativo de muestras Decent DRSD40" }
        ]
    : product.slug === "decent-trituradora-martillo"
      ? [
        { src: "/productos/decent/trituradora-martillo/Imagen Portada.png", alt: "Vista principal de la trituradora de martillo de laboratorio Decent" },
        { src: "/productos/decent/trituradora-martillo/Imagen 2.png", alt: "Vista complementaria de la trituradora de martillo de laboratorio Decent" },
        { src: "/productos/decent/trituradora-martillo/Imagen 3.png", alt: "Detalle complementario de la trituradora de martillo de laboratorio Decent" }
        ]
    : product.slug === "decent-rodillo-botella"
      ? [
        { src: "/productos/decent/rodillo-botella/Imagen Portada.png", alt: "Vista principal del rodillo de botella Decent" },
        { src: "/productos/decent/rodillo-botella/Imagen 2.png", alt: "Vista complementaria del rodillo de botella Decent" },
        { src: "/productos/decent/rodillo-botella/Imagen 3.png", alt: "Detalle complementario del rodillo de botella Decent" },
        { src: "/productos/decent/rodillo-botella/Imagen 4.png", alt: "Detalle del sistema de rodillos del rodillo de botella Decent" }
        ]
    : product.slug === "decent-dsw350"
      ? [
        { src: "/productos/decent/dsw350/Imagen Portada.png", alt: "Vista principal de la estación de trabajo autónoma Decent DSW350" },
        { src: "/productos/decent/dsw350/Imagen 2.png", alt: "Vista complementaria de la estación de trabajo autónoma Decent DSW350" },
        { src: "/productos/decent/dsw350/Imagen 3.png", alt: "Detalle complementario de la estación de trabajo autónoma Decent DSW350" }
        ]
    : product.slug === "decent-mezclador-tipo-v"
      ? [
        { src: "/productos/decent/mezclador-tipo-v/Imagen Portada.png", alt: "Vista principal del mezclador tipo V Decent" },
        { src: "/productos/decent/mezclador-tipo-v/Imagen 2.png", alt: "Vista complementaria del mezclador tipo V Decent" },
        { src: "/productos/decent/mezclador-tipo-v/Imagen 3.png", alt: "Detalle complementario del mezclador tipo V Decent" },
        { src: "/productos/decent/mezclador-tipo-v/Imagen 4.jpg", alt: "Detalle adicional del mezclador tipo V Decent" }
        ]
    : product.slug === "decent-trituradora-doble-rodillo"
      ? [
        { src: "/productos/decent/trituradora-doble-rodillo/Imagen Portada.png", alt: "Vista principal de la trituradora de doble rodillo Decent" },
        { src: "/productos/decent/trituradora-doble-rodillo/Imagen 2.png", alt: "Vista complementaria de la trituradora de doble rodillo Decent" }
        ]
    : product.slug === "decent-agitador-tamiz-estandar"
      ? [
        { src: "/productos/decent/agitador-tamiz-estandar/Imagen Portada.png", alt: "Vista principal del agitador de tamiz estándar Decent" },
        { src: "/productos/decent/agitador-tamiz-estandar/Imagen 2.png", alt: "Vista del agitador de tamiz estándar Decent" },
        { src: "/productos/decent/agitador-tamiz-estandar/Imagen 3.png", alt: "Tamices estándar y conjunto de tapa y chasis" }
        ]
      : [];

  const resolvedGalleryImages = product.slug === "decent-hornos-secado"
    ? [
        { src: "/productos/decent/hornos-secado/imagen-portada.png", alt: "Horno de secado Decent de gran capacidad con gabinete de control" },
        { src: "/productos/decent/hornos-secado/imagen-2.png", alt: "Horno industrial de secado Decent con carros para bandejas" },
        { src: "/productos/decent/hornos-secado/imagen-3.png", alt: "Horno de secado Decent de convecciÃ³n forzada" },
        { src: "/productos/decent/hornos-secado/imagen-4.png", alt: "Horno compacto de secado Decent" },
        { src: "/productos/decent/hornos-secado/imagen-horizontal.png", alt: "Horno horizontal de secado Decent" },
      ]
    : galleryImages;

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />
      <ProductQuickRail />

      <main id="main-content">
        {/* Dark Category Banner - Larger Size */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 text-center border-b border-[#D4DFDC]">
          <Image
            src="/productos/hero-productos-dark-clean.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Tinte ink de marca sobre la ilustración para mantener el mismo
              tono #4A5560 usado en el resto del sitio y asegurar contraste AA */}
          <div className="pointer-events-none absolute inset-0 bg-[#4A5560]/50" />
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

          {!useHanonLayout && (
            <div className="relative z-10 mx-auto mt-8 max-w-[1600px] px-4 sm:mt-10 sm:px-6 lg:mt-12 lg:px-10">
              <nav aria-label="Breadcrumb">
                <ol className="inline-flex min-w-0 flex-wrap items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                  <li>
                    <Suspense fallback={<Link href="/productos" className="inline-flex items-center gap-2 transition-colors hover:text-white"><ArrowLeft size={15} weight="bold" />Productos</Link>}>
                      <BackToCatalogLink className="inline-flex items-center gap-2 transition-colors hover:text-white" />
                    </Suspense>
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
            <h1
              className={cn(
                "mx-auto max-w-4xl text-balance font-display font-extrabold leading-[1.1] tracking-tight text-[#F5F5F5]",
                getBannerHeadlineSizeClass(bannerHeadline),
              )}
            >
              {bannerHeadline}
            </h1>
          </div>
        </section>

        {/* Hero Section styled like Biologica / Sneaker Flare - Compact Size */}
        {useHanonLayout ? (
          <section className="relative overflow-hidden bg-[#F5F5F7] py-16 lg:py-24 border-b border-[#D4DFDC]">
            {/* 3D Watermark Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4 text-center">
              <h2 className="text-[12vw] sm:text-[10vw] font-black tracking-[-0.05em] text-[#101820]/6 lowercase font-sans leading-none select-none whitespace-nowrap text-center">
                {product.detail?.brand ?? "decent"}
              </h2>
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                
                {/* Left Column: Sneaker Flare text styling (compact, minimal, clean) */}
                <div className="flex flex-col justify-center text-[#101820] max-w-xl relative z-10 lg:pl-16">
                  <Reveal>
                    <nav aria-label="Breadcrumb" className="mb-6 -translate-y-2">
                      <ol className="inline-flex min-w-0 flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-[#707E83]">
                        <li>
                          <Link href="/" className="hover:text-[#101820] transition-colors">Inicio</Link>
                        </li>
                        <li aria-hidden className="text-[#707E83]/60">/</li>
                        <li>
                          <Link href="/productos" className="hover:text-[#101820] transition-colors">Productos</Link>
                        </li>
                        <li aria-hidden className="text-[#707E83]/60">/</li>
                        <li>
                          <Link href={`/productos?filtro=${encodeURIComponent(product.category)}`} className="hover:text-[#101820] transition-colors">
                            {product.category}
                          </Link>
                        </li>
                        <li aria-hidden className="text-[#707E83]/60">/</li>
                        <li className="font-extrabold text-[#101820] truncate max-w-[200px] sm:max-w-none">
                          {detail?.model ?? product.name}
                        </li>
                      </ol>
                    </nav>
                    <p className="mb-3 text-[18px] font-black uppercase tracking-[0.24em] text-[#D6532B] sm:text-[22px]">
                      {detail?.model ?? product.name}
                    </p>
                    {product.slug === "decent-hornos-secado" ? (
                      <h1 className="text-3xl font-black tracking-tight text-[#101820] sm:text-5xl lg:text-[54px] leading-[1.05] uppercase">
                        Hornos de Secado
                        <span className="block text-[#D6532B]">Familia DDO / DDOG / DDOH(L)</span>
                      </h1>
                    ) : null}
                    <h1 className={cn("text-3xl font-black tracking-tight text-[#101820] sm:text-5xl lg:text-[54px] leading-[1.05] uppercase", product.slug === "decent-hornos-secado" && "hidden")}>
                      {product.slug === "decent-drsd05" ? "Divisor Giratorio" : product.slug === "decent-drsd40" ? "Divisor Rotativo" : product.slug === "decent-trituradora-martillo" ? "Trituradora de Martillo" : product.slug === "decent-trituradora-doble-rodillo" ? "Trituradora de Doble Rodillo" : product.slug === "decent-agitador-tamiz-estandar" ? "Agitador de Tamiz" : product.slug === "decent-rodillo-botella" ? "Rodillo de Botella" : product.slug === "decent-dsw350" ? "Estación de Trabajo" : product.slug === "decent-mezclador-tipo-v" ? "Mezclador" : product.slug === "decent-copelas-magnesio" ? "Copelas de Magnesia" : product.slug === "decent-dosificador-automatico-litargirio" ? "Dosificador Automático" : product.slug === "decent-hornos-cupelacion" ? "Hornos de Cupelación" : product.slug === "decent-horno-copelacion-alta-temperatura" ? "Horno de Copelación" : product.slug === "decent-hornos-fusion-ensayo-fuego" ? "Hornos de Fusión" : product.slug === "decent-mezclador-crisoles" ? "Mezclador de Crisoles" : product.slug === "decent-molino-pulverizador-dp1000" ? "Molino Pulverizador" : product.slug?.startsWith("decent-cargador-electrico") ? "Cargador Eléctrico" : product.slug?.startsWith("decent-cargador-manual") ? "Cargador Manual" : product.slug === "hanon-sox606" ? "Extractor" : product.slug === "hanon-sh220f" ? "Digestor" : product.slug?.startsWith("infitek-lyo") ? "Liofilizador" : product.slug?.startsWith("infitek-fmh") ? "Campana" : product.slug?.startsWith("infitek-wb") ? "Baño" : product.slug?.startsWith("infitek-pr5") ? "Refrigerador" : product.slug?.startsWith("infitek-usc") ? "Limpiador" : product.slug?.startsWith("infitek-don") ? "Horno" : "Analizador"}
                      <span className="block text-[#D6532B]">{product.slug === "decent-drsd05" ? "De Sobremesa DRSD05" : product.slug === "decent-drsd40" ? "De Piso DRSD40" : product.slug === "decent-trituradora-martillo" ? "De Laboratorio" : product.slug === "decent-trituradora-doble-rodillo" ? "De Laboratorio" : product.slug === "decent-agitador-tamiz-estandar" ? "Estándar" : product.slug === "decent-rodillo-botella" ? "De Operación Continua" : product.slug === "decent-dsw350" ? "Autónoma DSW350" : product.slug === "decent-mezclador-tipo-v" ? "Tipo V" : product.slug === "decent-copelas-magnesio" ? "Y Bloques de Lingotes" : product.slug === "decent-dosificador-automatico-litargirio" ? "De Litargirio DAFS84" : product.slug === "decent-hornos-cupelacion" ? "DE50CF / DE100CF" : product.slug === "decent-horno-copelacion-alta-temperatura" ? "Alta Temperatura 1500°C" : product.slug === "decent-hornos-fusion-ensayo-fuego" ? "DE20FF / DE25FF" : product.slug === "decent-mezclador-crisoles" ? "Y Flux DPT Series" : product.slug === "decent-molino-pulverizador-dp1000" ? "De Laboratorio DP1000" : product.slug?.startsWith("decent-") ? "De Crisoles" : product.slug === "hanon-sh220f" ? "De Bloque" : product.slug === "hanon-sox406" ? "Semi Automático" : product.slug === "hanon-f800" ? "De Fibra" : product.slug?.startsWith("infitek-lyo") ? "De Laboratorio" : product.slug?.startsWith("infitek-fmh") ? "Extractora" : product.slug?.startsWith("infitek-wb") ? "María" : product.slug?.startsWith("infitek-pr5") ? "De Farmacia" : product.slug?.startsWith("infitek-usc") ? "Ultrasónico" : product.slug?.startsWith("infitek-don") ? "De Secado" : "Automático"}</span>
                    </h1>
                    <p className="mt-6 text-[14px] leading-relaxed text-[#4A5560]/95 max-w-md">
                      {product.description}
                    </p>
                    <div className="mt-8">
                      <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-10 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02]">
                        <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}&from=${encodeURIComponent(`/productos/${product.slug ?? product.id}`)}`} target="_blank" rel="noopener noreferrer">
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
                          images={resolvedGalleryImages}
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



        {useHanonLayout ? null : (
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
                        <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}&from=${encodeURIComponent(`/productos/${product.slug ?? product.id}`)}`} target="_blank" rel="noopener noreferrer">
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
                        images={resolvedGalleryImages}
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
              <ProductDetailTabs
                slug={product.slug ?? product.id}
                summaryItems={summaryItems}
                productName={product.name}
                technicalParameters={detail?.technicalParameters ?? []}
                specificationNotes={detail?.specificationNotes}
                descriptionImage={detail?.descriptionImage}
              />
              />
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ProductDetailSidebar
              categories={productFilters}
              currentCategory={product.category}
            />
          </Reveal>
        </div>



        {/* Ficha Técnica / Brochure Download Section */}
        {hasBrochure ? (
          <section className="bg-white border-t border-[#D4DFDC] py-14 md:py-20">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <Reveal>
                <div className="bg-white border-y border-r border-l-4 border-[#D4DFDC] border-l-[#D6532B] rounded-r-[4px] p-6 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-sm">
                  <div className="flex flex-col justify-start w-full">
                    <h3 className="text-lg font-bold text-[#101820] tracking-tight">
                      {usesSpanishTechnicalSheet ? "Ficha técnica en español" : "Ficha técnica oficial"} - {product.detail?.brand ?? "Del Carpio"} {product.detail?.model ?? ""}
                    </h3>
                    {technicalSheetLinks.length > 1 ? (
                      <div className="mt-5 grid gap-2 sm:grid-cols-2" aria-label="Fichas técnicas por familia">
                        {technicalSheetLinks.map((sheet) => (
                          <a
                            key={sheet.href}
                            href={sheet.href}
                            download={sheet.download}
                            className="group flex items-center justify-between gap-3 border-b border-[#D4DFDC] py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B]"
                          >
                            <span>{sheet.label}</span>
                            <span aria-hidden="true" className="shrink-0 text-[#D6532B]">↓</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1.5 text-sm text-[#4A5560]/90 leading-relaxed max-w-2xl">
                        {usesSpanishTechnicalSheet
                          ? "Descargue el resumen técnico en español preparado a partir de la documentación del fabricante proporcionada para este modelo."
                          : `Descargue la documentación técnica disponible para ${product.name}.`}
                      </p>
                    )}
                  </div>
                  {technicalSheetLinks.length <= 1 ? (
                    <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-full py-5 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02] shrink-0 w-full md:w-auto text-center justify-center">
                      <a
                        href={brochureHref}
                        download={brochureDownloadName}
                      >
                        {brochureButtonLabel}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </section>
        ) : (
          <section className="bg-white border-t border-[#D4DFDC] py-10 md:py-14">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
              <Reveal>
                <div className="bg-[#F8FAFB] border border-[#D4DFDC] border-l-4 border-l-[#4A5560] rounded-r-[4px] p-6 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-sm">
                  <div className="flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 mb-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#D6532B] animate-pulse" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#707E83]">Ficha Técnica en Preparación</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#101820] tracking-tight">
                      Documentación técnica para {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#4A5560]/90 leading-relaxed max-w-2xl">
                      Estamos trabajando en la digitalización y actualización de la ficha técnica oficial en español para este modelo. Si necesita las especificaciones dimensionales y eléctricas completas de inmediato, contáctenos y nuestro equipo de ingeniería se la enviará a la brevedad.
                    </p>
                  </div>
                  <Button asChild variant="secondary" className="border-[#4A5560]/40 hover:bg-[#4A5560] hover:text-white rounded-full py-5 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shrink-0 w-full md:w-auto text-center justify-center">
                    <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}&accion=ficha&from=${encodeURIComponent(`/productos/${product.slug ?? product.id}`)}`}>
                      Solicitar Ficha
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {isTraceElemental ? (
          <CompatibleAnalyzersSection products={compatibleAnalyzers} />
        ) : (
          <RelatedProductsCarousel products={relatedProducts} />
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
                <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}&accion=cotizar&from=${encodeURIComponent(`/productos/${product.slug ?? product.id}`)}`}>
                  Cotizar
                </Link>
              </Button>
              <Button asChild variant="secondary" className="border border-white/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] hover:text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center">
                <Link href={`/contacto/cotizar?producto=${product.slug ?? product.id}&accion=asesoria&from=${encodeURIComponent(`/productos/${product.slug ?? product.id}`)}`}>
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
