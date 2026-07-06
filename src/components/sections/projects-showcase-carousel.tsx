"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
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
  {
    category: "Proyecto industrial",
    title: "Solución analítica para procesos productivos",
    meta: "Evaluación de matriz, condiciones de operación y requerimientos normativos.",
    image: "/fotos/instalacion-campana.jpg",
  },
  {
    category: "Laboratorio",
    title: "Equipamiento para nueva área de análisis",
    meta: "Diseño integral de solución, configuración e instalación para operación analítica eficiente.",
    image: "/fotos/laboratorio-frascos-procesos.jpg",
  },
  {
    category: "Capacitación",
    title: "Entrenamiento técnico para operación de equipos",
    meta: "Capacitación aplicada y presencial para usuarios, operadores y responsables de laboratorio.",
    image: "/fotos/hero-laboratorio.jpg",
  },
];

export function ProjectsShowcaseCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      handleScroll();
      el.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollStep = clientWidth < 640 ? 300 : 640;
      const targetScroll = direction === "left" ? scrollLeft - scrollStep : scrollLeft + scrollStep;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="proyectos" 
      className="bg-white border-b border-black/5 py-14 md:py-24 lg:py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-site px-5">
        
        {/* Header content */}
        <div className="mx-auto max-w-[780px] text-center mb-10 md:mb-14">
          <Reveal>
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#D5542B] uppercase block mb-4">
              
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

          {/* Controls positioned under description */}
          <Reveal delay={0.18} className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-black/15 bg-white text-[#101820] flex items-center justify-center transition-all duration-300 enabled:hover:bg-[#D5542B] enabled:hover:text-white enabled:hover:border-[#D5542B] disabled:opacity-[0.35] cursor-pointer"
              aria-label="Proyecto anterior"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-black/15 bg-white text-[#101820] flex items-center justify-center transition-all duration-300 enabled:hover:bg-[#D5542B] enabled:hover:text-white enabled:hover:border-[#D5542B] disabled:opacity-[0.35] cursor-pointer"
              aria-label="Siguiente proyecto"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </Reveal>
        </div>

      </div>

      {/* Horizontal Carousel Area */}
      <div className="relative w-full z-10">
        <div 
          ref={carouselRef}
          className="w-full overflow-x-auto flex gap-5 snap-x snap-mandatory scrollbar-none px-6 md:px-[calc((100vw-1180px)/2)] lg:px-[calc((100vw-1180px)/2)] pb-4 py-2"
          style={{ 
            scrollPaddingLeft: "max(24px, calc((100vw - 1180px) / 2))",
            scrollPaddingRight: "max(24px, calc((100vw - 1180px) / 2))",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="snap-start shrink-0 w-[82vw] sm:w-[280px] md:w-[300px] min-h-[390px] bg-white border border-black/10 rounded-[6px] shadow-[0_8px_24px_rgba(16,24,32,0.06)] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_48px_rgba(16,24,32,0.12)] hover:border-[#D5542B]/45"
            >
              {/* Card Image Wrapper */}
              <div className="relative w-full h-[165px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 80vw, 300px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
                />
              </div>

              {/* Card Content */}
              <div className="flex-grow p-6 pt-6 pb-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-[#D5542B] uppercase block mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-display text-[18px] md:text-[20px] font-extrabold leading-snug text-[#101820] mb-3 group-hover:text-[#D5542B] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560] font-sans">
                    {project.meta}
                  </p>
                </div>

                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101820] group-hover:text-[#D5542B] transition-colors mt-6 pt-2"
                >
                  Ver proyecto
                  <ArrowUpRight size={14} weight="bold" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
