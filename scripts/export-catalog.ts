// Exporta el catálogo actual (src/lib/mock-products.ts) a
// data/import/catalogo-actual.csv para usarlo como base de comparación en
// diff-catalog.ts. Solo lectura sobre el código fuente; solo escribe el CSV.
//
// Uso: node scripts/export-catalog.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mockProducts, type Product } from "../src/lib/mock-products.ts";
import { toCsv } from "./lib/csv.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../data/import/catalogo-actual.csv");

function tipoFicha(product: Product): "A" | "B" {
  return product.detail?.comparisonTiers && product.detail.comparisonTiers.length > 0
    ? "B"
    : "A";
}

function completitud(product: Product): string {
  const missing: string[] = [];
  const detail = product.detail;
  if (!detail?.brand) missing.push("marca");
  if (!product.category) missing.push("categoria");
  if (!product.name) missing.push("nombre");
  if (!detail?.model) missing.push("modelo");
  if (!product.description) missing.push("resumen");
  const hasSpecs =
    (detail?.comparisonSpecs?.length ?? 0) > 0 ||
    (detail?.comparisonTiers?.length ?? 0) > 0 ||
    (detail?.technicalParameters?.length ?? 0) > 0;
  const isRestek = (detail?.brand ?? "").trim().toLowerCase() === "restek";
  if (!hasSpecs && !isRestek) missing.push("specs");
  if (!product.imageUrl) missing.push("imagen");
  return missing.length === 0 ? "completo" : `faltan: ${missing.join(", ")}`;
}

const rows = mockProducts.map((product) => ({
  slug: product.slug ?? product.id,
  marca: product.detail?.brand ?? "",
  categoria: product.category ?? "",
  nombre: product.name ?? "",
  modelo: product.detail?.model ?? "",
  tipo_ficha: tipoFicha(product),
  // No existe un campo "familia" en el modelo de datos actual (confirmado
  // por auditoría): se deja vacío a propósito en vez de inventar un valor.
  familia: "",
  aliases: (product.aliases ?? []).join(";"),
  completitud: completitud(product),
  status: product.status ?? "publicado",
}));

const columns = [
  "slug",
  "marca",
  "categoria",
  "nombre",
  "modelo",
  "tipo_ficha",
  "familia",
  "aliases",
  "completitud",
  "status",
];

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, toCsv(columns, rows), "utf-8");

const incompletos = rows.filter((r) => r.completitud !== "completo").length;
console.log(`Exportados ${rows.length} productos -> ${OUT_PATH}`);
console.log(`  completos: ${rows.length - incompletos}, con campos faltantes: ${incompletos}`);
console.log(
  `  tipo A: ${rows.filter((r) => r.tipo_ficha === "A").length}, tipo B: ${rows.filter((r) => r.tipo_ficha === "B").length}`,
);
console.log(
  `  Nota: la columna "familia" queda vacía — no existe ese campo en Product/ProductDetail hoy.`,
);
