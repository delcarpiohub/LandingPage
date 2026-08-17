import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .replace(/\./g, "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function PlusMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 text-ink-border",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 32 24"
      {...props}
    >
      <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
    </svg>
  );
}

export function TestimonialGridCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & { testimonial: Testimonial }) {
  const { author, text } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col justify-between gap-6 border border-ink-border bg-white px-7 pb-6 pt-8 shadow-[var(--shadow-card)] sm:px-8",
        className,
      )}
      {...props}
    >
      <PlusMark />

      <blockquote className="flex gap-4">
        <QuoteMark aria-hidden="true" className="h-6 w-8 shrink-0 text-primary" />
        <p className="flex-1 text-sm leading-relaxed text-ink">{text}</p>
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-ink-border pt-5">
        <Avatar className="size-10 ring-2 ring-ink-border ring-offset-2 ring-offset-white transition-colors group-hover:ring-primary/40">
          <AvatarFallback className="bg-ink-dark font-display text-xs font-bold text-white">
            {getInitials(author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-display text-sm font-bold not-italic leading-none text-ink">
            {author.name}
          </cite>
          <p className="mt-1 text-xs font-semibold text-ink-soft">
            {author.role}, <span className="text-ink">{author.sector}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
