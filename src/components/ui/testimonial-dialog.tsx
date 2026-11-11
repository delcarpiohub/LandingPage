"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import type { MutableRefObject } from "react";
import type { Testimonial } from "@/lib/testimonials";

type TestimonialDialogProps = {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
};

export function TestimonialDialog({
  testimonial,
  open,
  onOpenChange,
  returnFocusRef,
}: TestimonialDialogProps) {
  if (!testimonial?.fullText) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[990] bg-[#101820]/65" />
        <Dialog.Content
          aria-modal="true"
          className="fixed inset-4 z-[1000] mx-auto flex max-h-[calc(100dvh-2rem)] w-auto max-w-[680px] flex-col overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-[0_20px_54px_rgba(16,24,32,0.28)] focus:outline-none sm:inset-y-10 sm:max-h-[calc(100dvh-5rem)]"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocusRef.current?.focus();
          }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-7 sm:py-5">
            <Dialog.Title className="font-display text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl">
              Testimonio completo
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar testimonio"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] px-4 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <X aria-hidden="true" size={16} weight="bold" />
                Cerrar
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 32 24"
              className="mb-5 h-7 w-9 text-[var(--primary)]"
              fill="currentColor"
            >
              <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
            </svg>

            <blockquote className="space-y-5">
              {testimonial.fullText.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-[var(--foreground)] sm:text-base">
                  {paragraph}
                </p>
              ))}
            </blockquote>

            <footer className="mt-8 border-t border-[var(--border)] pt-4">
              <p className="font-display text-base font-bold leading-tight text-[var(--foreground)]">
                {testimonial.name}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                {testimonial.role}
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--muted)]">
                {testimonial.organization}
              </p>
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
