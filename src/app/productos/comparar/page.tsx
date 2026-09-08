import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { ProductComparisonPage } from "@/components/products/product-comparison-page";

export const metadata: Metadata = {
  title: "Comparar productos | Del Carpio",
  description: "Compare especificaciones disponibles de productos Del Carpio lado a lado.",
  robots: { index: false, follow: false },
};

export default function CompareProductsRoute() {
  return (
    <>
      <Navigation />
      <ProductComparisonPage />
      <Footer />
    </>
  );
}