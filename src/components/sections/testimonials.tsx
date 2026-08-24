import { TestimonialCard } from "@/components/ui/testimonial-card";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
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

        <div className="group relative flex w-full flex-col items-center overflow-hidden">
          <div className="flex w-full overflow-hidden py-2 [--duration:42s] [--gap:1.25rem] [gap:var(--gap)]">
            <div
              aria-hidden="true"
              className="flex shrink-0 animate-marquee flex-row [gap:var(--gap)] group-hover:[animation-play-state:paused]"
            >
              {[...Array(3)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
                )),
              )}
            </div>
          </div>

          {/* Lista accesible para lectores de pantalla, sin duplicados del marquee */}
          <ul className="sr-only">
            {testimonials.map((testimonial) => (
              <li key={testimonial.author.role + testimonial.author.sector}>
                {testimonial.text} — {testimonial.author.role}, {testimonial.author.sector}
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[var(--background)] sm:block md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[var(--background)] sm:block md:w-40" />
        </div>
      </div>
    </section>
  );
}
