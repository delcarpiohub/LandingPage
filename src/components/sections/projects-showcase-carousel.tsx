"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";

const projects = [
  {
    category: "Mobiliario técnico",
    title: "Laboratorio de Salud Pública Ambiental y Laboral",
    meta: "Provisión e instalación de mobiliario técnico para la SEREMI de Salud, Región de Tarapacá.",
    image: "/proyectos/feature-5-estaciones-trabajo.jpg",
  },
  {
    category: "Montaje en faena",
    title: "Mobiliario y líneas de gases en faenas CMP",
    meta: "Instalación de mobiliario y líneas de gases con alarma en Planta Magnetita, Cerro Negro Norte y Los Colorados.",
    image: "/proyectos/hero-equipo-tecnico-faena.jpg",
  },
  {
    category: "Extracción y mantención",
    title: "Sistemas de extracción y puertas técnicas",
    meta: "Extracción EAA, puertas y ventanas técnicas, y mantención de líneas de gases en faena El Romeral.",
    image: "/proyectos/about-tecnico-sala-balanzas.jpg",
  },
];

export function ProjectsShowcaseCarousel() {
  return (
    <section 
      id="proyectos" 
      className="bg-white border-b border-black/5 py-14 md:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-site px-5">
        
        {/* Header content */}
        <div className="mx-auto max-w-[780px] text-center mb-12 md:mb-16">
          <Reveal>
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#D6532B] uppercase block mb-4">
              
            </span>
          </Reveal>
          
          <Reveal delay={0.06}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-[#101820]">
              Proyectos que convierten criterio técnico en resultados
            </h2>
          </Reveal>
          
          <Reveal delay={0.12}>
            <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[#4A5560] max-w-[720px] mx-auto">
              Cada implementación refleja una forma de trabajar: entender el proceso, seleccionar la solución adecuada y acompañar su operación con soporte especializado.
            </p>
          </Reveal>
        </div>

        {/* Centered Grid with 3 Cards and Dividers */}
        <div className="mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-0 relative z-10 max-w-wide">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center lg:items-stretch w-full justify-center lg:w-auto">
              {index > 0 && (
                <>
                  {/* Vertical divider for desktop */}
                  <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-black/[0.08] to-transparent mx-8 xl:mx-10 self-stretch" />
                  {/* Horizontal divider for mobile */}
                  <div className="block lg:hidden h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent my-4" />
                </>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="w-full max-w-[380px] min-h-[390px] bg-white border border-black/10 rounded-[6px] shadow-[0_8px_24px_rgba(16,24,32,0.06)] overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(16,24,32,0.12)] hover:border-[#D6532B]/45"
              >
                {/* Card Image Wrapper */}
                <div className="relative w-full h-[190px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>

                {/* Card Content */}
                <div className="p-7 pt-7 pb-9 flex flex-col flex-grow justify-start">
                  <h3 className="font-display text-[18px] md:text-[19px] font-extrabold leading-snug text-[#101820] mb-3 group-hover:text-[#D6532B] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#4A5560] font-sans">
                    {project.meta}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
