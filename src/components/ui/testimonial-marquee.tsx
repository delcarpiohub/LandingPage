"use client";

import { useCallback, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TestimonialDialog } from "@/components/ui/testimonial-dialog";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function TestimonialMarqueeCard({
  testimonial,
  onOpen,
  isDecorative = false,
}: {
  testimonial: Testimonial;
  onOpen?: (testimonial: Testimonial, trigger: HTMLElement) => void;
  isDecorative?: boolean;
}) {
  const { quote, fullText, name, initials, role, organization } = testimonial;
  const isInteractive = Boolean(onOpen && !isDecorative);

  const openTestimonial = (trigger: HTMLElement) => {
    if (isInteractive) onOpen?.(testimonial, trigger);
  };

  return (
    <figure
      aria-hidden={isDecorative || undefined}
      aria-haspopup={isInteractive ? "dialog" : undefined}
      aria-label={isInteractive ? `Leer testimonio completo de ${name}` : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={cn(
        "flex w-[320px] shrink-0 flex-col justify-between gap-4 border border-ink-border bg-white p-6 shadow-[var(--shadow-card)] sm:w-[340px]",
        isInteractive &&
          "cursor-pointer transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]",
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
      <p className="text-sm leading-relaxed text-ink">&quot;{quote}&quot;</p>

      <figcaption className="border-t border-ink-border pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0 ring-1 ring-ink-border">
            <AvatarFallback className="bg-ink-dark font-display text-xs font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <cite className="font-display text-sm font-bold not-italic leading-none text-ink">
              {name}
            </cite>
            <p className="mt-1 text-xs font-semibold text-ink-soft">
              {role}, <span className="text-ink">{organization}</span>
            </p>
          </div>
        </div>
        {isInteractive && (
          <span className="mt-4 inline-flex text-xs font-bold text-[var(--primary)] underline underline-offset-4">
            {fullText ? "Leer testimonio completo" : "Ver testimonio"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 34,
  onOpen,
  isModalOpen,
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
  onOpen: (testimonial: Testimonial, trigger: HTMLElement) => void;
  isModalOpen: boolean;
}) {
  return (
    <div className="group flex overflow-hidden py-2 [--gap:1.25rem] [gap:var(--gap)]">
      {[0, 1].map((copy) => (
        <div
          aria-hidden={copy === 1 || undefined}
          className={cn(
            "flex min-w-full shrink-0 justify-around [gap:var(--gap)] will-change-transform group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          )}
          key={copy}
          style={{
            "--duration": `${speed}s`,
            ...(isModalOpen ? { animationPlayState: "paused" } : {}),
          } as React.CSSProperties}
        >
          {testimonials.map((testimonial) => (
            <TestimonialMarqueeCard
              key={`${copy}-${testimonial.id}`}
              testimonial={testimonial}
              onOpen={copy === 0 ? onOpen : undefined}
              isDecorative={copy === 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function TestimonialMarquee({
  testimonials,
  speed = 34,
}: {
  testimonials: Testimonial[];
  speed?: number;
}) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const half = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, half);
  const rowTwo = testimonials.slice(half);

  const openTestimonial = useCallback((testimonial: Testimonial, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelectedTestimonial(testimonial);
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden">
      <MarqueeRow
        testimonials={rowOne}
        direction="left"
        speed={speed}
        onOpen={openTestimonial}
        isModalOpen={isDialogOpen}
      />
      <MarqueeRow
        testimonials={rowTwo}
        direction="right"
        speed={speed * 1.15}
        onOpen={openTestimonial}
        isModalOpen={isDialogOpen}
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[var(--background)] sm:block md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[var(--background)] sm:block md:w-40" />

      <TestimonialDialog
        testimonial={selectedTestimonial}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        returnFocusRef={triggerRef}
      />
    </div>
  );
}
