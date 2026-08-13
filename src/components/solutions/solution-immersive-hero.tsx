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
  align = "right",
}: SolutionImmersiveHeroProps) {
  const isLeft = align === "left";

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[#4A5560] md:min-h-[clamp(620px,58vw,760px)]">
      {/* Contenido: primero en el DOM (orden real en móvil = texto, luego imagen).
          En desktop se reposiciona con position:absolute sin depender del orden. */}
      <div
        className={`relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:absolute md:inset-0 md:flex md:items-end md:px-0 md:py-0 ${
          isLeft ? "md:justify-start" : "md:justify-end"
        }`}
      >
        <div className="max-w-[440px] sm:max-w-[480px] md:max-w-[520px] md:p-[clamp(2rem,7vw,7rem)]">
          <SolutionReveal>
            {/* text-shadow discreto: refuerzo real de legibilidad sobre la
                foto (no decorativo), además del overlay de fondo — el
                naranja de marca tiene contraste limitado incluso sobre
                navy sólido, así que se refuerza sin cambiar el color. */}
            <p
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)] [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] md:[text-shadow:0_1px_4px_rgba(0,0,0,0.65)]"
            >
              {eyebrow}
            </p>
            <span className="mt-5 block h-px w-8 bg-[var(--primary)]" aria-hidden />
            <h1 className="mt-8 max-w-full text-[clamp(2.2rem,4.6vw,5rem)] leading-[1.02] text-white md:[text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
              {title}
            </h1>
            <p className="mt-7 max-w-[52ch] text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:[text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
              {description}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A5560]"
              >
                {primaryCta.label}
                <ArrowRight size={16} weight="bold" />
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border border-white/35 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A5560]"
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

      {/* Imagen panorámica: banda compacta en móvil, sección completa en desktop */}
      <div className="relative h-[230px] w-full sm:h-[270px] md:absolute md:inset-0 md:h-full">
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
        {/* Overlay localizado: solo se aplica en desktop, donde el texto se
            superpone a la foto. En móvil el texto vive en el panel sólido
            de arriba, no sobre la imagen, así que no hace falta oscurecer.
            Gradiente horizontal (no diagonal) para que la oscuridad sea
            pareja en toda la columna de texto, de arriba a abajo — con un
            gradiente diagonal el eyebrow (arriba del bloque) quedaba sobre
            una zona demasiado clara y no pasaba contraste AA. */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background: `linear-gradient(to ${isLeft ? "left" : "right"}, transparent 0%, transparent 42%, rgba(74,85,96,0.55) 60%, rgba(74,85,96,0.7) 78%, rgba(74,85,96,0.7) 100%)`,
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
