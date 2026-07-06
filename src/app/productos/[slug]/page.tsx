import { ArrowLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
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
            </div>
          </Reveal>
        </section>

        <div className="mx-auto grid max-w-wide gap-8 px-4 pb-14 sm:px-6 md:pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 lg:px-10">
          <div className="min-w-0">
            <Reveal>
              <ProductDetailTabs detail={detail} summaryItems={summaryItems} />
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ProductDetailSidebar
              categories={productFilters}
              recommendedProducts={recommendedProducts}
            />
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
