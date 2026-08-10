"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useState } from "react";

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  location: string;
  src: string;
  alt: string;
}

interface CaseStudiesReelProps {
  projects: readonly CaseStudy[];
}

export function CaseStudiesReel({ projects }: CaseStudiesReelProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = useCallback(() => {
    setActiveIndex((index) => (index + 1) % projects.length);
  }, [projects.length]);

  const previousProject = useCallback(() => {
    setActiveIndex((index) => (index - 1 + projects.length) % projects.length);
  }, [projects.length]);

  if (projects.length === 0) return null;

  const currentProject = projects[activeIndex];
  const nextProjectPreview = projects[(activeIndex + 1) % projects.length];

  return (
    <section id="evidencia-ejecucion" className="bg-[#4A5560] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col items-start justify-between gap-5 border-b border-white/15 pb-5 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FBE369]">
              (02) · Casos de éxito ejecutados
            </p>
            <h2 className="mt-2 text-2xl font-extrabold uppercase leading-tight sm:text-3xl lg:text-[34px]">
              Del contrato a una instalación operativa.
            </h2>
          </div>

          <div className="flex w-full flex-nowrap gap-4 overflow-x-auto pb-1 lg:w-auto lg:flex-wrap lg:justify-end lg:overflow-visible" aria-label="Seleccionar caso por sector">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`shrink-0 border-b-2 pb-1 text-left text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369] ${
                    isActive
                      ? "border-[#D6532B] text-white"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  {project.category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 overflow-hidden lg:flex-row lg:gap-6">
          <div className="min-w-0 flex-1">
            <div className="relative h-[220px] overflow-hidden rounded-[10px] bg-[#3D4750] sm:h-[290px] lg:h-[320px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentProject.id}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentProject.src}
                    alt={currentProject.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-snug sm:text-lg">{currentProject.title}</h3>
                <p className="mt-0.5 truncate text-xs font-bold uppercase tracking-[0.1em] text-white/65">
                  {currentProject.location}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={previousProject}
                  aria-label="Ver proyecto anterior"
                  className="flex size-9 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                >
                  <ArrowLeft size={16} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Ver proyecto siguiente"
                  className="flex size-9 items-center justify-center rounded-full bg-white text-[#4A5560] transition-colors hover:bg-[#FBE369] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                >
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={nextProject}
            aria-label={`Ver siguiente caso: ${nextProjectPreview.title}`}
            className="group relative hidden h-[320px] w-[28%] shrink-0 overflow-hidden rounded-[10px] text-left lg:block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
          >
            <Image
              src={nextProjectPreview.src}
              alt={nextProjectPreview.alt}
              fill
              sizes="28vw"
              className="object-cover opacity-55 transition-opacity duration-200 group-hover:opacity-75"
            />
            <span className="absolute inset-0 bg-[#4A5560]/35" aria-hidden="true" />
            <span className="absolute inset-x-3 bottom-3 text-xs font-bold leading-snug text-white">
              {nextProjectPreview.title}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
