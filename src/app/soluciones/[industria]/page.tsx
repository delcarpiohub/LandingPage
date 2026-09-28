import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionEditorialPage } from "@/components/solutions/solution-editorial-page";
import { industries } from "@/content/site";
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

  const compatibleEquipment = (config.compatibleEquipmentSlugs ?? []).flatMap(
    (slug) => {
      const product = mockProducts.find((item) => (item.slug ?? item.id) === slug);
      return product ? [product] : [];
    },
  );

  return (
    <SolutionEditorialPage
      industry={industry}
      config={config}
      compatibleEquipment={compatibleEquipment}
    />
  );
}
