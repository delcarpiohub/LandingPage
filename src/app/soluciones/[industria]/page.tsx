import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionEditorialPage } from "@/components/solutions/solution-editorial-page";
import { coreServices, industries } from "@/content/site";
import { solutionPages } from "@/content/solution-pages";
import { mockProducts } from "@/lib/mock-products";

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
  const config = solutionPages[industry.slug];
  if (!config) notFound();

  const relevantProducts = mockProducts
    .filter(
      (product) =>
        industry.productCategories.includes(product.category) ||
        product.filters?.some((filter) => industry.productCategories.includes(filter)),
    )
    .slice(0, 8);

  const relevantServices = config.serviceIds.flatMap((serviceId) => {
    const service = coreServices.find((item) => item.id === serviceId);
    return service ? [service] : [];
  });

  return (
    <SolutionEditorialPage
      industry={industry}
      config={config}
      products={relevantProducts}
      services={relevantServices}
    />
  );
}
