import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  onOpen?: (testimonial: Testimonial, trigger: HTMLElement) => void;
  isDecorative?: boolean;
}

export function TestimonialCard({
  testimonial,
  className,
  onOpen,
  isDecorative = false,
}: TestimonialCardProps) {
  const { quote, name, role, organization } = testimonial;
  const isInteractive = Boolean(onOpen && !isDecorative);

  const openTestimonial = (trigger: HTMLElement) => {
    if (isInteractive) onOpen?.(testimonial, trigger);
  };

  return (
    <article
      aria-hidden={isDecorative || undefined}
      aria-haspopup={isInteractive ? "dialog" : undefined}
      aria-label={isInteractive ? `Leer testimonio completo de ${name}` : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={cn(
        "flex w-[300px] shrink-0 flex-col gap-4 rounded-[4px] border border-[var(--border)] bg-white p-6 text-left shadow-[var(--shadow-card)] sm:w-[320px]",
        isInteractive &&
          "cursor-pointer transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]",
        className,
      )}
      onClick={isInteractive ? (event) => openTestimonial(event.currentTarget) : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openTestimonial(event.currentTarget);
              }
            }
          : undefined
      }
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 24"
        className="h-6 w-8 text-[var(--primary)]"
        fill="currentColor"
      >
        <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
      </svg>

      <p className="text-sm leading-relaxed text-[var(--foreground)]">{quote}</p>

      <div className="mt-auto border-t border-[var(--border)] pt-3">
        <p className="font-display text-sm font-bold leading-tight text-[var(--foreground)]">
          {name}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-[var(--foreground)]">
          {role}
        </p>
        <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{organization}</p>
      </div>
    </article>
  );
}
