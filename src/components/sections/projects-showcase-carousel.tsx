"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";

const projects = [
  {
    category: "Instalación",
    title: "Implementación de sistema HPLC para laboratorio industrial",
    meta: "Selección técnica, instalación y puesta en marcha de equipamiento analítico de alta precisión.",
    image: "/fotos/instalacion-hplc-operador.jpg",
  },
  {
    category: "Validación",
    title: "Validación de método para control de calidad",
    meta: "Acompañamiento técnico experto para asegurar trazabilidad, repetibilidad y evidencia documental.",
    image: "/fotos/laboratorio-metodologia-mg-0795.jpg",
  },
  {
    category: "Servicio técnico",
    title: "Mantenimiento preventivo de instrumentación crítica",
    meta: "Soporte especializado presencial para continuidad operacional en laboratorios de alta demanda.",
    image: "/fotos/MG_1527.jpg",
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
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#D5542B] uppercase block mb-4">
              
            </span>
          </Reveal>
          
          <Reveal delay={0.06}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-[#101820]">
              Proyectos Realizados
            </h2>
          </Reveal>
          
          <Reveal delay={0.12}>
            <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[#4A5560] max-w-[720px] mx-auto">
              Cada implementación refleja una forma de trabajar: entender el proceso, seleccionar la solución adecuada y acompañar su operación con soporte especializado.
            </p>
          </Reveal>
        </div>

        {/* Centered Grid with 3 Cards */}
        <div className="mx-auto grid max-w-[1020px] gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center relative z-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full min-h-[350px] bg-white border border-black/10 rounded-[6px] shadow-[0_8px_24px_rgba(16,24,32,0.06)] overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(16,24,32,0.12)] hover:border-[#D5542B]/45"
            >
              {/* Card Image Wrapper */}
              <div className="relative w-full h-[165px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 pt-6 pb-8 flex flex-col flex-grow justify-start">
                <h3 className="font-display text-[17px] md:text-[18px] font-extrabold leading-snug text-[#101820] mb-3 group-hover:text-[#D5542B] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#4A5560] font-sans">
                  {project.meta}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
