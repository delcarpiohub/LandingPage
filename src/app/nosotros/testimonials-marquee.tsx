import { Reveal } from "@/components/motion/reveal";
import { TestimonialMarquee } from "@/components/ui/testimonial-marquee";
import { testimonials } from "@/content/testimonials";

export function TestimonialsMarquee() {
  return (
    <section aria-labelledby="testimonials-marquee-title" className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary"></p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
            id="testimonials-marquee-title"
          >
            Lo que dicen quienes operan en terreno.
          </h2>
        </Reveal>

        <Reveal className="mt-14" delay={0.08}>
          <TestimonialMarquee testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
