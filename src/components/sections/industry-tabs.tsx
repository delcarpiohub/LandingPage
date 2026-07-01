"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

// decisión final aprobada, ver docs/fase2-v2-revision-color.md
const sectors = [
  {
    name: "Alimentos",
    color: "#FBE369",
    subtitle: "Análisis de matrices alimentarias",
    desc: "Pesticidas, metales pesados, microbiología y matrices alimentarias complejas bajo normativas nacionales e internacionales.",
    photo: "/fotos/hero-laboratorio.jpg",
  },
  {
    name: "Minería",
    color: "#D5542B",
    subtitle: "ICP-OES, ICP-MS, AA elemental",
    desc: "Caracterización elemental de minerales, concentrados y efluentes de procesos mineros con ICP-OES, ICP-MS y AA.",
    photo: "/fotos/instalacion-campana.jpg",
  },
  {
    name: "Farmacéutica",
    color: "#888888",
    subtitle: "HPLC y validación ICH Q2",
    desc: "Validación de métodos analíticos según ICH Q2/Q3, transferencia y trazabilidad regulatoria para industria farmacéutica.",
    photo: "/fotos/instalacion-hplc-equipo.jpg",
  },
  {
    name: "Aguas",
    color: "#53843A",
    subtitle: "NCh 409 y normativa sanitaria",
    desc: "Análisis fisicoquímico y microbiológico bajo NCh 409 y normativa sanitaria chilena para agua potable e industrial.",
    photo: "/fotos/instalacion-hplc-operador.jpg",
  },
  {
    name: "Ambiental",
    color: "#53843A",
    subtitle: "Monitoreo SEIA e ISO",
    desc: "Monitoreo de emisiones, caracterización de suelos y aguas residuales bajo normativa SEIA y estándares ISO 17025.",
    photo: "/fotos/hero-laboratorio.jpg",
  },
  {
    name: "Academia / I+D",
    color: "#888888",
    subtitle: "Soporte para investigación",
    desc: "Soporte técnico especializado para proyectos de investigación, calibración de equipos y desarrollo de métodos analíticos.",
    photo: "/fotos/instalacion-hplc-equipo.jpg",
  },
];

export function IndustryTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSector = sectors[activeIndex] || sectors[0];

  return (
    <section id="industrias" className="bg-white py-[60px] md:py-[80px]">
      <div className="mx-auto max-w-site px-5">
        
        {/* Encabezado de Sección */}
        <div className="mb-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#101820]/60">
            Sectores de Aplicación
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight text-[#101820] md:text-3xl">
            Soluciones por Industria
          </h2>
        </div>

        {/* Contenedor Principal (400px en escritorio, auto en móvil) */}
        <div className="border border-[#101820]/10 rounded-[2px] overflow-hidden flex flex-col md:grid md:grid-cols-[40%_60%] md:h-[400px] bg-white shadow-[0_8px_30px_rgba(16,24,32,0.04)]">
          
          {/* PREVIEW MÓVIL (Solo visible en pantallas pequeñas, arriba) */}
          <div className="relative h-[250px] w-full md:hidden bg-[#101820] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 size-full"
              >
                <Image
                  src={activeSector.photo}
                  alt={activeSector.name}
                  fill
                  priority
                  className="object-cover opacity-60"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[#101820]/55" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white select-none">
                  <span 
                    className="text-[9px] font-mono font-bold tracking-widest uppercase mb-1 block"
                    style={{ color: activeSector.color }}
                  >
                    {"// "}
                    {activeSector.name}
                  </span>
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
                    {activeSector.name}
                  </h3>
                  <p className="mt-2 font-sans text-[11px] leading-5 text-white/86 line-clamp-2">
                    {activeSector.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* LISTA DE SECTORES (40% en escritorio, scroll horizontal en móvil) */}
          <div className="flex flex-row overflow-x-auto divide-x divide-[#101820]/10 md:divide-x-0 md:flex-col md:overflow-y-auto md:h-full bg-white md:border-r border-[#101820]/10 scrollbar-none">
            {sectors.map((sector, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={sector.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 md:flex-shrink md:flex-1 flex flex-col justify-center px-5 py-4 md:px-6 md:py-3 text-left transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5542B] border-b last:border-b-0 border-[#101820]/10 ${
                    isActive 
                      ? "bg-[#101820] text-white" 
                      : "bg-white hover:bg-stone-50 text-[#101820]"
                  }`}
                >
                  <div className="flex items-center">
                    {/* Punto de color */}
                    <span 
                      className="w-2.5 h-2.5 rounded-full mr-2.5 shrink-0 block" 
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="font-display font-extrabold text-[10px] md:text-[11px] tracking-wider uppercase whitespace-nowrap">
                      {sector.name}
                    </span>
                  </div>
                  <span className={`font-sans text-[9px] md:text-[10px] mt-0.5 whitespace-nowrap md:whitespace-normal md:line-clamp-1 pl-5 ${
                    isActive ? "text-white/70" : "text-[#101820]/60"
                  }`}>
                    {sector.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* PREVIEW ESCRITORIO (Solo visible en pantallas medianas/grandes, 60%) */}
          <div className="relative h-full w-full hidden md:block bg-[#101820] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 size-full"
              >
                <Image
                  src={activeSector.photo}
                  alt={activeSector.name}
                  fill
                  priority
                  className="object-cover opacity-60"
                  sizes="60vw"
                />
                {/* Capa de overlay al 55% */}
                <div className="absolute inset-0 bg-[#101820]/55" />
                
                {/* Contenido sobre el overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white select-none">
                  <span 
                    className="text-[10px] font-mono font-bold tracking-widest uppercase mb-2 block"
                    style={{ color: activeSector.color }}
                  >
                    {"// "}
                    {activeSector.name}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-[#F5F5F5]">
                    {activeSector.name}
                  </h3>
                  <p className="mt-3 font-sans text-xs md:text-sm leading-6 text-white/86 max-w-xl line-clamp-2">
                    {activeSector.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
