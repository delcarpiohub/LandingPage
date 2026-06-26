import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const photos = [
  {
    src: "/fotos/instalacion-hplc-equipo.jpg",
    alt: "Sistema cromatográfico Del Carpio instalado",
    caption: "Sistema cromatográfico instalado",
  },
  {
    src: "/fotos/instalacion-campana.jpg",
    alt: "Campana de extracción para preparación de muestras",
    caption: "Preparación de muestras",
  },
];

export function LabPhotos() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
                La confianza entra por lo que se puede ver.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-[var(--muted)]">
                Espacios y equipos reales de Del Carpio. Sin renders, sin bancos de imágenes.
              </p>
              <div className="mt-10 grid max-w-md grid-cols-2 border-y border-[var(--border)]">
                <div className="border-r border-[var(--border)] py-5 pr-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Evidencia
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--foreground)]">
                    Equipo, espacio y condición real.
                  </p>
                </div>
                <div className="py-5 pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Uso
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--foreground)]">
                    Soporte para decidir, no decoración.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <Reveal>
              <figure className="group overflow-hidden rounded-[1.25rem] bg-[var(--foreground)] text-white">
                <div className="relative min-h-[520px] overflow-hidden">
                  <Image
                    src={photos[0].src}
                    alt={photos[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
                <figcaption className="grid gap-3 border-t border-white/12 px-6 py-5 text-sm text-white/70 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span>{photos[0].caption}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
                    HPLC / trazabilidad
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="group overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-white">
                <div className="relative h-80 overflow-hidden lg:h-[380px]">
                  <Image
                    src={photos[1].src}
                    alt={photos[1].alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                  />
                </div>
                <figcaption className="px-5 py-5">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {photos[1].caption}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    El método se sostiene también en preparación, seguridad y repetibilidad.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
