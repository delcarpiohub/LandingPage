"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { industries } from "@/content/site";

const sectorPhotos: Record<string, string> = {
  "Alimentos": "/fotos/hero-laboratorio.jpg",
  "Minería": "/fotos/instalacion-campana.jpg",
  "Farmacéutica": "/fotos/instalacion-hplc-equipo.jpg",
  "Aguas": "/fotos/instalacion-hplc-operador.jpg",
  "Ambiental": "/fotos/hero-laboratorio.jpg",
  "Academia / I+D": "/fotos/instalacion-hplc-equipo.jpg",
};

export function IndustryTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSector = industries[activeIndex] || industries[0];

  return (
    <section id="industrias" className="bg-[var(--background)]">
      <div className="mx-auto grid max-w-site gap-16 px-5 py-[75px] lg:grid-cols-2">
        
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
              Tecnologías y Aplicaciones
            </h2>
            
            <div className="mt-8 grid gap-6 sm:grid-cols-[240px_1fr] sm:items-start">
              <div className="relative h-[160px] overflow-hidden bg-white rounded-[4px] border border-[var(--border)] shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 size-full"
                  >
                    <Image
                      src={sectorPhotos[activeSector.name] || "/fotos/instalacion-hplc-operador.jpg"}
                      alt={`Estación de análisis para ${activeSector.name}`}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--primary)]">
                  Especificación de matriz
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-base font-extrabold leading-[1.35] text-[var(--foreground)] mt-2">
                      Métodos de precisión para {activeSector.name}.
                    </h3>
                    <p className="mt-3 text-xs leading-[22px] text-[var(--muted)]">
                      {activeSector.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-8 text-xs leading-[22px] text-[var(--muted-soft)]">
              Atendemos matrices altamente complejas en el sector productivo e industrial chileno. La conversación técnica siempre comienza por la caracterización de la matriz, ya que sus componentes determinan la selectividad del método analítico.
            </p>
          </div>

          <div>
            <Button asChild className="mt-8 h-10 px-5 text-xs cursor-pointer">
              <a href="#contacto">
                Consultar aplicación de sector
                <ArrowRight size={15} weight="bold" />
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[var(--foreground)]">
            Sectores atendidos
          </h2>
          <div className="relative mt-8 grid gap-4 before:absolute before:left-[19px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-[var(--border-strong)]/30">
            {industries.map((industry, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={industry.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="relative grid grid-cols-[40px_1fr] gap-5 text-left group p-2 rounded-[4px] transition-colors hover:bg-white/40 cursor-pointer focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSectorBg"
                      className="absolute inset-0 bg-white/70 rounded-[4px] border border-[var(--border)] z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className={`relative z-10 grid size-10 place-items-center rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(213,84,43,0.4)]"
                      : "bg-white border border-[var(--border)] text-[var(--muted)] group-hover:border-white group-hover:bg-white/80"
                  }`}>
                    <CheckCircle size={18} weight={isActive ? "bold" : "light"} />
                  </span>

                  <div className="relative z-10 select-none">
                    <h3 className={`font-display text-sm font-extrabold uppercase leading-tight transition-colors ${
                      isActive ? "text-[var(--foreground)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                    }`}>
                      {industry.name}
                    </h3>
                    <p className={`mt-1 line-clamp-1 text-[11px] leading-[18px] transition-colors ${
                      isActive ? "text-[var(--muted)]" : "text-[var(--muted-soft)]"
                    }`}>
                      {industry.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
