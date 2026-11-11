import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

export function ClientsBanner() {
  return (
    <section aria-labelledby="clients-banner-title" className="relative isolate overflow-hidden bg-ink-dark text-white">
      <Image
        alt="Fachada del edificio de Del Carpio"
        className="-z-20 object-cover object-center"
        fill
        sizes="100vw"
        src="/fotos/edificio-del-carpio.webp"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4A5560]/95 via-[#4A5560]/85 to-[#4A5560]/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#4A5560]/85 to-transparent" />

      <div className="mx-auto max-w-wide px-5 pb-14 pt-20 sm:px-8 md:pb-16 md:pt-24 lg:px-10">
        <Reveal className="max-w-xl">
          <h2
            className="text-balance text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            id="clients-banner-title"
          >
            31 años sirviendo a laboratorios de referencia en Chile.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/82 md:text-base md:leading-8">
            Nuestra presencia a lo largo de Chile asegura tiempos de respuesta, eficiencia y cumplimiento
            normativo en cada proyecto. Servimos con experiencia y especialización en minería, alimentos,
            farmacéutica, aguas, ambiental y academia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
