import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { SolutionReveal } from "./solution-reveal";

type SolutionImmersiveHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  media: {
    src: string;
    alt: string;
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
  eyebrow,
  title,
  description,
  media,
  primaryCta,
  secondaryCta,
  align = "left",
}: SolutionImmersiveHeroProps) {
  const isLeft = align === "left";

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[#101820] md:min-h-[clamp(580px,52vw,720px)] flex items-center">
      {/* Contenido: en móvil texto primero, en desktop sobre la imagen alineado a la izquierda */}
      <div
        className={`relative z-10 w-full px-6 py-10 sm:px-8 sm:py-12 md:absolute md:inset-0 md:flex md:items-center md:px-0 md:py-0 ${
          isLeft ? "md:justify-start" : "md:justify-end"
        }`}
      >
        <div className="max-w-[440px] sm:max-w-[480px] md:max-w-[510px] lg:max-w-[540px] md:pl-[clamp(2.5rem,7vw,6.5rem)] md:pr-6 md:py-10">
          <SolutionReveal>
            <p
              className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]"
            >
              {eyebrow}
            </p>
            <span className="mt-4 block h-px w-8 bg-[#D6532B]" aria-hidden />
            <h1 className="mt-6 text-[clamp(2.4rem,4.5vw,4.2rem)] font-extrabold leading-[1.03] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
              {title}
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-white/90 sm:text-base sm:leading-7 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap bg-[#D6532B] px-6 text-[13px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b8431e] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369]"
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
      <div className="relative h-[240px] w-full sm:h-[280px] md:absolute md:inset-0 md:h-full">
        <SolutionReveal className="absolute inset-0">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </SolutionReveal>
        {/* Overlay localizado para el lado correspondiente */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background: isLeft
              ? `linear-gradient(to right, rgba(16,24,32,0.92) 0%, rgba(16,24,32,0.82) 36%, rgba(16,24,32,0.50) 55%, rgba(16,24,32,0.15) 72%, transparent 100%)`
              : `linear-gradient(to left, rgba(16,24,32,0.92) 0%, rgba(16,24,32,0.82) 36%, rgba(16,24,32,0.50) 55%, rgba(16,24,32,0.15) 72%, transparent 100%)`,
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
