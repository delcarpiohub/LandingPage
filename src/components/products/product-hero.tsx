import Image from "next/image";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import {
  type BreadcrumbProps,
  ProductBreadcrumb,
  ProductBreadcrumbFallback,
} from "@/components/products/product-breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Hero de las fichas de producto y de las páginas de familia. */

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

/** Franja oscura con el `h1`. `children` va sobre el título (miga de pan). */
export function ProductHeroBanner({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
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

      {children}

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-10">
        <h1
          className={cn(
            "mx-auto max-w-4xl text-balance font-display font-extrabold leading-[1.1] tracking-tight text-[#F5F5F5]",
            getBannerHeadlineSizeClass(title),
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}

/**
 * Sección clara en dos columnas desde 1024 px: `children` es la columna de
 * texto y `media` la columna derecha completa. `watermark` es el rótulo
 * decorativo de marca detrás del contenido.
 */
export function ProductHero({
  watermark,
  children,
  media,
}: {
  watermark: string;
  children: ReactNode;
  media: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F7] py-16 lg:py-24 border-b border-[#D4DFDC]">
      {/* 3D Watermark Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4 text-center">
        <h2 className="text-[12vw] sm:text-[10vw] font-black tracking-[-0.05em] text-[#101820]/6 lowercase font-sans leading-none select-none whitespace-nowrap text-center">
          {watermark}
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Sneaker Flare text styling (compact, minimal, clean) */}
          <div className="flex flex-col justify-center text-[#101820] max-w-xl relative z-10 lg:pl-16">
            <Reveal>{children}</Reveal>
          </div>

          {media}
        </div>
      </div>
    </section>
  );
}

export function ProductHeroBreadcrumb(props: BreadcrumbProps) {
  return (
    <Suspense fallback={<ProductBreadcrumbFallback {...props} />}>
      <ProductBreadcrumb {...props} />
    </Suspense>
  );
}

export function ProductHeroKicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[18px] font-black uppercase tracking-[0.24em] text-[#D6532B] sm:text-[22px]">
      {children}
    </p>
  );
}

/** Titular en dos tonos: `lead` en tinta y `accent` en terracota. */
export function ProductHeroHeadline({
  lead,
  accent,
  className,
}: {
  lead: ReactNode;
  accent: ReactNode;
  className?: string | false;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-black tracking-tight text-[#101820] sm:text-5xl lg:text-[54px] leading-[1.05] uppercase",
        className,
      )}
    >
      {lead}
      <span className="block text-[#D6532B]">{accent}</span>
    </h2>
  );
}

export function ProductHeroDescription({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 text-[14px] leading-relaxed text-[#4A5560]/95 max-w-md">
      {children}
    </p>
  );
}

/** Forma y tipografía de los botones del hero. */
const PRODUCT_HERO_BUTTON_SHAPE =
  "rounded-full py-5 px-10 text-[12px] font-extrabold uppercase tracking-[0.16em]";

export function ProductHeroPrimaryAction({ href }: { href: string }) {
  return (
    <Button
      asChild
      className={`bg-[#D6532B] hover:bg-[#b8431e] text-white border-none ${PRODUCT_HERO_BUTTON_SHAPE} shadow-md transition-transform hover:scale-[1.02]`}
    >
      <Link href={href}>Cotizar y Asesorar</Link>
    </Button>
  );
}

/** Segundo botón, para un ancla de la misma página. */
export function ProductHeroAnchorAction({
  href,
  children,
}: {
  href: `#${string}`;
  children: ReactNode;
}) {
  return (
    <Button asChild variant="secondary" className={PRODUCT_HERO_BUTTON_SHAPE}>
      <a href={href}>{children}</a>
    </Button>
  );
}
