import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { SolutionReveal } from "./solution-reveal";

type SolutionImmersiveHeroProps = {
  title: string;
  description: string;
  media: {
    src: string;
    alt: string;
    objectPosition?: string;
    mobileAspectRatio?: number;
  };
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  // "right" (default) o "left" — cuál lado de la foto está más despejado
  // del sujeto principal. Ver caso farmacéutica: la mano con guante ocupa
  // el lado derecho, así que ese hero usa "left".
  align?: "left" | "right";
};

// Hero de excepción: foto panorámica a sección completa con overlay
// localizado, en vez del hero dividido compartido por el resto de las
// industrias. Ver src/content/solution-pages.ts (heroVariant) para el
// interruptor y solution-editorial-page.tsx para dónde se monta.
export function SolutionImmersiveHero({
  title,
  description,
  media,
  primaryCta,
  secondaryCta,
  align = "left",
}: SolutionImmersiveHeroProps) {
  const isLeft = align === "left";

  return (
    <section className="relative flex flex-col overflow-hidden border-b border-[var(--border)] bg-[#4A5560] lg:min-h-[clamp(580px,52vw,720px)] lg:block">
      {/* Contenido: en móvil texto primero, en desktop sobre la imagen alineado a la izquierda */}
      <div
        className={`relative z-10 w-full px-6 py-10 sm:px-8 sm:py-12 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-0 lg:py-0 ${
          isLeft ? "lg:justify-start" : "lg:justify-end"
        }`}
      >
        <div className="max-w-[540px] sm:max-w-[600px] md:max-w-[640px] lg:max-w-[680px] lg:py-10 lg:pl-[clamp(2.5rem,7vw,6.5rem)] lg:pr-8">
          <SolutionReveal>
            <h1 className="text-[clamp(2.4rem,4.5vw,4.2rem)] font-extrabold leading-[1.03] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
              {title}
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-white/90 sm:text-base sm:leading-7 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap bg-[#D6532B] px-6 text-[13px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#B54725] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369]"
              >
                {primaryCta.label}
                <ArrowRight size={16} weight="bold" />
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border border-white/40 bg-black/25 backdrop-blur-sm px-6 text-[13px] font-bold text-white transition-all duration-200 hover:border-white hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369]"
                >
                  {secondaryCta.label}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              )}
            </div>
          </SolutionReveal>
        </div>
      </div>

      {/* Imagen panorámica */}
      <div
        className="relative w-full overflow-hidden lg:absolute lg:inset-0 lg:!aspect-auto"
        style={{ aspectRatio: media.mobileAspectRatio ?? 16 / 9 }}
      >
        <SolutionReveal className="absolute inset-0">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ objectPosition: media.objectPosition }}
          />
        </SolutionReveal>
        {/* Overlay localizado para el lado correspondiente */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background: isLeft
              ? `linear-gradient(to right, rgba(74,85,96,0.94) 0%, rgba(74,85,96,0.85) 42%, rgba(74,85,96,0.55) 62%, rgba(74,85,96,0.15) 80%, transparent 100%)`
              : `linear-gradient(to left, rgba(74,85,96,0.94) 0%, rgba(74,85,96,0.85) 42%, rgba(74,85,96,0.55) 62%, rgba(74,85,96,0.15) 80%, transparent 100%)`,
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
