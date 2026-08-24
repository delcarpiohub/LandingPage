import { Plus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { brands, type Brand } from "@/content/brands";

// Adaptación del patrón "logo cloud" (grilla con bordes + acentos "+" en las
// intersecciones internas) a la paleta de Del Carpio. A diferencia de la
// referencia original (celdas con estilos fijos a mano por logo), acá los
// bordes usan `divide-x/y` (se adaptan solos a 2 o 4 columnas) y los acentos
// "+" se calculan a partir del índice — agregar o quitar una marca en
// src/content/brands.ts no requiere tocar este archivo.
//
// Los "+" solo se calculan para el layout de escritorio (4 columnas) y se
// ocultan en mobile (2 columnas) para evitar una segunda tabla de posiciones
// responsive — decisión deliberada de simplicidad, no una limitación técnica.
const DESKTOP_COLUMNS = 4;

export function MarcasGrid() {
  return (
    <div className="relative grid grid-cols-2 divide-x divide-y divide-[var(--border)] border-x border-[var(--border)] md:grid-cols-4">
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-[var(--border)]" />
      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-[var(--border)]" />

      {brands.map((brand) => (
        <BrandCell key={brand.name} brand={brand} />
      ))}

      {/* Overlay de acentos "+": una grilla idéntica superpuesta, pintada
          después de las celdas para no quedar tapada por la celda vecina
          (todas las celdas son position:relative, así que sin este overlay
          la celda de la fila siguiente pinta encima del ícono). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden grid-cols-4 md:grid"
      >
        {brands.map((_, index) => {
          const col = index % DESKTOP_COLUMNS;
          const hasRightNeighbor =
            col < DESKTOP_COLUMNS - 1 && index + 1 < brands.length;
          const hasBottomNeighbor = index + DESKTOP_COLUMNS < brands.length;
          const showPlus = hasRightNeighbor && hasBottomNeighbor;

          return (
            <div key={index} className="relative">
              {showPlus && (
                <Plus
                  weight="light"
                  className="absolute right-0 bottom-0 size-6 -translate-y-1/2 translate-x-1/2 text-[var(--border-strong)]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrandCell({ brand }: { brand: Brand }) {
  return (
    <div className="flex min-h-[152px] items-center justify-center bg-white px-4 py-8 md:min-h-[184px] md:p-10">
      <Image
        src={brand.logo}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        style={{ transform: `scale(${brand.scale ?? 1})` }}
        className="h-[88px] w-[168px] object-contain md:h-[104px] md:w-[208px]"
        sizes="(min-width: 768px) 208px, 168px"
      />
    </div>
  );
}
