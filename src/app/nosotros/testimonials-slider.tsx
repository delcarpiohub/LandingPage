"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const STOPWORDS = new Set(["de", "del", "la", "los", "las", "y", "e"]);

function getInitials(role: string): string {
  const letters = role
    .split(" ")
    .filter((word) => !STOPWORDS.has(word.toLowerCase()))
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return letters.slice(0, 2) || "DC";
}

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = testimonials[index];

  function go(delta: number) {
    setIndex((current) => (current + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section aria-labelledby="testimonials-slider-title" className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Testimonios</p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
            id="testimonials-slider-title"
          >
            Lo que dicen quienes operan en terreno.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl border border-ink-border bg-white p-8 shadow-[var(--shadow-card)] sm:p-10 md:p-12" delay={0.08}>
          <svg aria-hidden="true" className="h-7 w-9 text-primary" fill="currentColor" viewBox="0 0 32 24">
            <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
          </svg>

          <div className="relative mt-5 min-h-[9rem] sm:min-h-[7rem]">
            {reduceMotion ? (
              <TestimonialQuote author={active.author} text={active.text} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 8 }}
                  key={index}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                >
                  <TestimonialQuote author={active.author} text={active.text} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-ink-border pt-6">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Seleccionar testimonio">
              {testimonials.map((testimonial, i) => (
                <button
                  aria-current={i === index}
                  aria-label={`Ver testimonio: ${testimonial.author.role}, ${testimonial.author.sector}`}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-[11px] font-extrabold uppercase transition-colors",
                    i === index ? "bg-primary text-white" : "bg-ink/6 text-ink-soft hover:bg-ink/12",
                  )}
                  key={testimonial.author.role}
                  onClick={() => setIndex(i)}
                  role="tab"
                  type="button"
                >
                  {getInitials(testimonial.author.role)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Testimonio anterior"
                className="flex size-10 items-center justify-center rounded-full border border-ink-border text-ink transition-colors hover:border-ink"
                onClick={() => go(-1)}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.5} />
              </button>
              <button
                aria-label="Testimonio siguiente"
                className="flex size-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-strong"
                onClick={() => go(1)}
                type="button"
              >
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialQuote({
  text,
  author,
}: {
  text: string;
  author: { role: string; sector: string };
}) {
  return (
    <div>
      <p className="text-lg leading-8 text-ink sm:text-xl sm:leading-9">{text}</p>
      <p className="mt-5 text-sm font-extrabold uppercase tracking-tight text-ink">{author.role}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink-soft">{author.sector}</p>
    </div>
  );
}
