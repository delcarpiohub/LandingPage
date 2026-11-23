"use client";

import { useCallback, useRef, useState } from "react";
import { MarqueeControls } from "@/components/ui/marquee-controls";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { TestimonialDialog } from "@/components/ui/testimonial-dialog";
import { getDwellMs, useMarqueePlayer } from "@/components/ui/use-marquee-player";
import { testimonials, type Testimonial } from "@/lib/testimonials";

// La pista repite los testimonios para que el bucle no tenga huecos; el
// reproductor se mantiene en la copia central, que es la interactiva.
const MARQUEE_COPIES = 3;
const INTERACTIVE_COPY = 1;
const dwellsMs = testimonials.map((testimonial) => getDwellMs(testimonial.quote));

export function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { manualIndex, step, viewportHandlers, regionHandlers } = useMarqueePlayer({
    trackRef,
    viewportRef,
    regionRef,
    copies: MARQUEE_COPIES,
    dwellsMs,
    isPaused: isDialogOpen,
  });

  const openTestimonial = useCallback((testimonial: Testimonial, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelectedTestimonial(testimonial);
    setIsDialogOpen(true);
  }, []);

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-title"
      className="relative w-full overflow-hidden bg-[var(--background)] py-14 md:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-wide flex-col items-center gap-8 px-6 text-center sm:gap-14">
        <div className="flex max-w-[640px] flex-col items-center gap-3 sm:gap-4">
          <h2
            id="testimonials-title"
            className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            La confianza de quienes nos conocen
          </h2>
          <p className="text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
            Equipos de laboratorio en minería, alimentos, farmacéutica, ambiental y
            academia que trabajan día a día con instrumentación y soporte Del Carpio.
          </p>
        </div>

        <div
          ref={regionRef}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Testimonios de clientes"
          className="flex w-full flex-col items-center gap-6"
          {...regionHandlers}
        >
          <div
            className="relative flex w-full flex-col items-center overflow-hidden"
            {...viewportHandlers}
          >
            <div
              ref={viewportRef}
              className="flex w-full overflow-hidden py-2 [--gap:1.25rem] [gap:var(--gap)]"
            >
              <div
                ref={trackRef}
                className="flex shrink-0 flex-row will-change-transform [gap:var(--gap)]"
              >
                {[...Array(MARQUEE_COPIES)].map((_, setIndex) =>
                  testimonials.map((testimonial) => (
                    <TestimonialCard
                      key={`${setIndex}-${testimonial.id}`}
                      testimonial={testimonial}
                      onOpen={
                        setIndex === INTERACTIVE_COPY && testimonial.fullText
                          ? openTestimonial
                          : undefined
                      }
                      isDecorative={setIndex !== INTERACTIVE_COPY}
                    />
                  )),
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[var(--background)] sm:block md:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[var(--background)] sm:block md:w-40" />
          </div>

          <p aria-live="polite" className="sr-only">
            {manualIndex !== null && `Testimonio ${manualIndex + 1} de ${testimonials.length}`}
          </p>

          <MarqueeControls onStep={step} />
        </div>
      </div>

      <TestimonialDialog
        testimonial={selectedTestimonial}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        returnFocusRef={triggerRef}
      />
    </section>
  );
}
