import { Reveal } from "@/components/motion/reveal";
import { TestimonialGridCard } from "@/components/ui/testimonial-grid-card";
import { testimonials } from "@/content/testimonials";

export function TestimonialsGrid() {
  return (
    <section aria-labelledby="testimonials-grid-title" className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Testimonios</p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
            id="testimonials-grid-title"
          >
            Lo que dicen quienes operan en terreno.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" delay={0.08}>
          {testimonials.map((testimonial) => (
            <TestimonialGridCard key={testimonial.author.name} testimonial={testimonial} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
