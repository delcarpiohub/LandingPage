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

function MarqueeRow({
  children,
  direction = "left",
  speed = 34,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="group flex overflow-hidden py-2 [--gap:1.25rem] [gap:var(--gap)]">
      {[0, 1].map((copy) => (
        <div
          aria-hidden="true"
          className={cn(
            "flex min-w-full shrink-0 justify-around [gap:var(--gap)] will-change-transform group-hover:[animation-play-state:paused]",
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          )}
          key={copy}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

function TestimonialMarqueeCard({ testimonial }: { testimonial: Testimonial }) {
  const { author, text } = testimonial;

  return (
    <figure className="flex h-full w-[320px] shrink-0 flex-col justify-between gap-4 border border-ink-border bg-white p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 sm:w-[340px]">
      <p className="line-clamp-4 text-sm leading-relaxed text-ink">&quot;{text}&quot;</p>

      <figcaption className="flex items-center gap-3 border-t border-ink-border pt-4">
        <Avatar className="size-9 ring-1 ring-ink-border">
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

export function TestimonialMarquee({
  testimonials,
  speed = 34,
}: {
  testimonials: Testimonial[];
  speed?: number;
}) {
  const half = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, half);
  const rowTwo = testimonials.slice(half);

  return (
    <div className="relative flex flex-col overflow-hidden">
      <MarqueeRow direction="left" speed={speed}>
        {rowOne.map((testimonial) => (
          <TestimonialMarqueeCard key={testimonial.author.name} testimonial={testimonial} />
        ))}
      </MarqueeRow>
      <MarqueeRow direction="right" speed={speed * 1.15}>
        {rowTwo.map((testimonial) => (
          <TestimonialMarqueeCard key={testimonial.author.name} testimonial={testimonial} />
        ))}
      </MarqueeRow>

      {/* Lista accesible para lectores de pantalla, sin duplicados del marquee */}
      <ul className="sr-only">
        {testimonials.map((testimonial) => (
          <li key={testimonial.author.name}>
            {testimonial.text} — {testimonial.author.name}, {testimonial.author.role},{" "}
            {testimonial.author.sector}
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[var(--background)] sm:block md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[var(--background)] sm:block md:w-40" />
    </div>
  );
}
