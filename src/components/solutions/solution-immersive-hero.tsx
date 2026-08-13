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
}: SolutionImmersiveHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[#4A5560] md:min-h-[clamp(620px,58vw,760px)]">
      {/* Contenido: primero en el DOM (orden real en móvil = texto, luego imagen).
          En desktop se reposiciona con position:absolute sin depender del orden. */}
      <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:absolute md:inset-0 md:flex md:items-end md:justify-end md:px-0 md:py-0">
        <div className="max-w-[440px] sm:max-w-[480px] md:max-w-[520px] md:p-[clamp(2rem,7vw,7rem)]">
          <SolutionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
              {eyebrow}
            </p>
            <span className="mt-5 block h-px w-8 bg-[var(--primary)]" aria-hidden />
            <h1 className="mt-8 max-w-xs text-[clamp(2.6rem,5.3vw,5rem)] leading-[0.98] text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-[52ch] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
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
            de arriba, no sobre la imagen, así que no hace falta oscurecer. */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom right, transparent 22%, rgba(74,85,96,0.32) 52%, rgba(74,85,96,0.68) 100%)",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
