"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeDialog = useCallback(() => setSelectedIndex(null), []);
  const showNext = useCallback(() => {
    setSelectedIndex((index) => (index === null ? 0 : (index + 1) % projects.length));
  }, [projects.length]);
  const showPrevious = useCallback(() => {
    setSelectedIndex((index) => (index === null ? 0 : (index - 1 + projects.length) % projects.length));
  }, [projects.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDialog, selectedIndex, showNext, showPrevious]);

  if (projects.length === 0) return null;

  const selectedProject = selectedIndex === null ? null : projects[selectedIndex];

  return (
    <section id="evidencia-ejecucion" className="w-full">
      <div
        className="flex h-[300px] gap-px overflow-x-auto sm:h-[420px] sm:overflow-hidden lg:h-[520px] xl:h-[580px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const flexGrow = hoveredIndex === null ? 1 : isHovered ? 3 : 0.55;

          return (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onMouseEnter={() => setHoveredIndex(index)}
              animate={reduceMotion ? { flexGrow: 1 } : { flexGrow }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              aria-label={`Ampliar caso: ${project.title}`}
              className="relative min-w-[78%] shrink-0 basis-0 overflow-hidden text-left sm:min-w-0 sm:shrink sm:flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#FBE369]"
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 26vw"
                className="object-cover"
              />
              <motion.span
                aria-hidden="true"
                animate={{ opacity: isHovered ? 0.12 : 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black"
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada: ${selectedProject.title}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5 sm:p-10"
            onClick={closeDialog}
          >
            <div className="relative flex h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Cerrar vista ampliada"
                className="absolute right-0 top-0 z-10 flex size-10 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
              >
                <X size={20} weight="bold" aria-hidden="true" />
              </button>

              <div className="relative min-h-0 flex-1 py-14 sm:py-16">
                <Image
                  key={selectedProject.id}
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-white/20 pt-4">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Ver caso anterior"
                  className="flex size-10 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                >
                  <ArrowLeft size={18} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Ver caso siguiente"
                  className="flex size-10 items-center justify-center rounded-full bg-white text-[#4A5560] transition-colors hover:bg-[#FBE369] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                >
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
