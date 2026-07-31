"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const projects = [
  {
    category: "Mobiliario técnico",
    title: "Laboratorio de Salud Pública Ambiental y Laboral",
    meta: "Provisión e instalación de mobiliario técnico para la SEREMI de Salud, Región de Tarapacá.",
    image: "/proyectos/gallery-seremi.jpg",
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
      className="bg-[#F8FAFC] border-b border-black/5 py-16 md:py-24 relative overflow-hidden font-sans"
    >
      <div className="mx-auto max-w-[1240px] px-5 text-center">
        
        {/* Header content */}
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] font-black leading-tight tracking-tight text-[#101820]">
              Proyectos que convierten criterio técnico en resultados
            </h2>
          </Reveal>
          
          <Reveal delay={0.06}>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#707E83] max-w-3xl mx-auto font-sans">
              Cada implementación refleja una forma de trabajar: entender el proceso, seleccionar la solución adecuada y acompañar su operación con soporte especializado.
            </p>
          </Reveal>
        </div>

        {/* 3-Card Grid matching Screenshot 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1240px] mx-auto">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <article className="flex flex-col h-full bg-white rounded-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden group text-left">
                {/* Card Image Wrapper */}
                <div className="relative w-full h-[210px] sm:h-[230px] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 text-left bg-white">
                  <h3 className="font-display font-bold text-lg sm:text-[20px] text-[#101820] leading-snug mb-3 group-hover:text-[#D6532B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#707E83] leading-relaxed mt-auto">
                    {project.meta}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
