import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

const missionQuote =
  "Satisfacer las necesidades de nuestros clientes con los equipos de la más alta gama de instrumentación analítica, un servicio técnico y de aplicaciones de excelencia, y un asesoramiento completo desde el diseño del laboratorio hasta su implementación y habilitación.";

export function ClientsBanner() {
  return (
    <section aria-labelledby="clients-banner-title" className="relative isolate overflow-hidden bg-ink-dark text-white">
      <Image
        alt="Equipo técnico de Del Carpio en instalaciones de laboratorio"
        className="-z-20 object-cover object-center"
        fill
        sizes="100vw"
        src="/fotos/MG_1527.jpg"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4A5560]/95 via-[#4A5560]/72 to-[#4A5560]/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#4A5560]/85 to-transparent" />

      <div className="mx-auto max-w-wide px-5 pb-28 pt-20 sm:px-8 md:pb-32 md:pt-24 lg:px-10">
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

      <div className="relative mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <Reveal
          className="-mt-14 max-w-lg bg-primary p-7 shadow-2xl sm:ml-8 sm:p-8 md:-mt-16 lg:ml-16"
          delay={0.1}
        >
          <svg aria-hidden="true" className="h-7 w-9 text-white/70" fill="currentColor" viewBox="0 0 32 24">
            <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
          </svg>
          <p className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg sm:leading-8">
            «{missionQuote}»
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-white/80">Nuestra misión</p>
        </Reveal>
      </div>
    </section>
  );
}
