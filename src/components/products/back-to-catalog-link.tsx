"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * "Volver a Productos" en la ficha de producto. Si se llegó desde el catálogo
 * con un filtro/página/búsqueda activos (propagados vía `?from=`), vuelve a
 * esa misma vista en vez de reiniciar siempre a /productos sin filtros.
 */
export function BackToCatalogLink({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const href = from && from.startsWith("/productos") ? from : "/productos";

  return (
    <Link href={href} className={className}>
      <ArrowLeft size={15} weight="bold" />
      Productos
    </Link>
  );
}
