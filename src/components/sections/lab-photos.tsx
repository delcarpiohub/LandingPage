import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const photos = [
  {
    src: "/fotos/instalacion-hplc-equipo.jpg",
    alt: "Sistema cromatografico Del Carpio instalado",
    caption: "Sistema cromatografico instalado",
  },
  {
    src: "/fotos/instalacion-campana.jpg",
    alt: "Campana de extraccion para preparacion de muestras",
    caption: "Preparacion de muestras",
  },
];

export function LabPhotos() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
                La confianza entra por lo que se puede ver.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                Espacios y equipos reales de Del Carpio. Sin renders, sin bancos de imagenes.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal>
              <figure className="group overflow-hidden rounded-[1.25rem] bg-[var(--foreground)] text-white">
                <div className="relative min-h-[420px] overflow-hidden">
                  <Image
                    src={photos[0].src}
                    alt={photos[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 62vw"
                  />
                </div>
                <figcaption className="border-t border-white/12 px-6 py-4 text-sm text-white/70">
                  {photos[0].caption}
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {photos.slice(1).map((photo, index) => (
                <Reveal key={photo.src} delay={(index + 1) * 0.06}>
                  <figure className="group overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-white">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 31vw"
                      />
                    </div>
                    <figcaption className="px-5 py-4 text-sm text-[var(--muted)]">
                      {photo.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
