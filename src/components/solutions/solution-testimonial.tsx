import { testimonials } from "@/content/testimonials";

import { SolutionReveal } from "./solution-reveal";

// Cita a página completa (no marquee, no card) — tercer tratamiento visual
// distinto de testimonios en el sitio: marquee de una fila en home, marquee
// de dos filas en /nosotros, cita editorial aquí. Filtra por
// `industrySlugs`; si la industria no tiene testimonio propio, la sección
// no se renderiza (mejor un hueco honesto que forzar una cita que no aplica).
export function SolutionTestimonial({ industrySlug }: { industrySlug: string }) {
  const matches = testimonials.filter((testimonial) =>
    testimonial.industrySlugs.includes(industrySlug),
  );

  if (matches.length === 0) return null;

  return (
    <section className="border-b border-[var(--border)] bg-[var(--panel)]">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div
          className={
            matches.length > 1
              ? "grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14"
              : "mx-auto max-w-2xl"
          }
        >
          {matches.slice(0, 2).map((testimonial, index) => (
            <SolutionReveal delay={index * 0.05} key={testimonial.author.name}>
              <blockquote>
                <p className="text-xl leading-snug text-[var(--foreground)] sm:text-2xl">
                  “{testimonial.text}”
                </p>
                <footer className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                  {testimonial.author.name} — {testimonial.author.role},{" "}
                  {testimonial.author.sector}
                </footer>
              </blockquote>
            </SolutionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
