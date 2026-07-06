import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { productosData } from "@/content/productos";

const baseUrl = "https://www.delcarpio.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/productos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contacto`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contacto/ventas`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/contacto/proyectos`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/contacto/otras-consultas`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/contacto/tour-laboratorio`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = productosData.map((product) => ({
    url: `${baseUrl}/productos/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes];
}
