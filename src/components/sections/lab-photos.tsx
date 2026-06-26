import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const photos = [
  {
    src: "/fotos/instalacion-hplc-operador.jpg",
    alt: "Técnica operando estación de análisis HPLC",
    caption: "Estación de análisis HPLC",
  },
  {
    src: "/fotos/instalacion-hplc-equipo.jpg",
    alt: "Sistema cromatográfico de alta resolución instalado",
    caption: "Sistema cromatográfico de alta resolución",
  },
  {
    src: "/fotos/instalacion-campana.jpg",
    alt: "Campana de extracción y preparación de muestras",
    caption: "Campana de extracción y preparación de muestras",
  },
];

export function LabPhotos() {
  return (
    <section className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            Nuestras instalaciones
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.07}>
              <figure className="group overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
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
    </section>
  );
}
