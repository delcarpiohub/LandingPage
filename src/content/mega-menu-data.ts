import { industries } from "@/content/site";
import { compatibleEquipmentByIndustry } from "@/content/solution-pages";
import { mockProducts, productFilters, type Product } from "@/lib/mock-products";

export type MegaMenuProduct = {
  id: string;
  name: string;
  href: string;
};

export type MegaMenuBrand = {
  name: string;
  products: MegaMenuProduct[];
};

export type MegaMenuCategory = {
  name: string;
  count: number;
  brands: MegaMenuBrand[];
};

export type MegaMenuScope = {
  id: string;
  label: string;
  href: string;
  count: number;
  categories: MegaMenuCategory[];
};

function makeScope(id: string, label: string, href: string, products: Product[]): MegaMenuScope {
  const categories = productFilters.flatMap((category) => {
    const categoryProducts = products.filter((product) => product.category === category);
    if (categoryProducts.length === 0) return [];

    const brands = Array.from(new Set(categoryProducts.map((product) => {
      const brand = product.detail?.brand;
      if (!brand) throw new Error(`Producto sin marca en el mega-menú: ${product.id}`);
      return brand;
    })));

    return [{
      name: category,
      count: categoryProducts.length,
      brands: brands.map((name) => ({
        name,
        products: categoryProducts
          .filter((product) => product.detail?.brand === name)
          .map((product) => ({
            id: product.id,
            name: product.name,
            href: `/productos/${product.slug ?? product.id}`,
          })),
      })),
    }];
  });

  return { id, label, href, count: products.length, categories };
}

// Solo se proyectan los campos que necesita la navegación. La ficha completa
// permanece en el servidor y nunca entra al bundle de Navigation (cliente).
export const megaMenuScopes: MegaMenuScope[] = [
  ...industries.map((industry) => {
    const compatibleSlugs = new Set(compatibleEquipmentByIndustry[industry.slug] ?? []);
    const products = mockProducts.filter((product) => compatibleSlugs.has(product.slug ?? product.id));

    return makeScope(
      industry.slug,
      industry.name,
      `/productos?filtro=${encodeURIComponent(industry.catalogCategory)}`,
      products,
    );
  }),
];
