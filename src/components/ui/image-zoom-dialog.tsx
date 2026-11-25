"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import type { MutableRefObject } from "react";

type ImageZoomDialogProps = {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
};

/**
 * Diálogo modal con una imagen ampliada. Mismo Radix Dialog, overlay, borde y
 * botón de cerrar que TestimonialDialog. Radix atrapa el foco, cierra con Esc
 * y clic fuera, y devuelve el foco al disparador al cerrar.
 *
 * En <640px la imagen conserva un ancho mínimo (no se reduce) y el contenedor
 * hace scroll horizontal.
 */
export function ImageZoomDialog({
  src,
  alt,
  open,
  onOpenChange,
  returnFocusRef,
}: ImageZoomDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1100] bg-[#101820]/65" />
        <Dialog.Content
          aria-modal="true"
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocusRef.current?.focus();
          }}
          className="fixed left-1/2 top-1/2 z-[1110] flex max-h-[90dvh] w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-[0_20px_54px_rgba(16,24,32,0.28)] focus:outline-none"
        >
          <div className="flex justify-end border-b border-[var(--border)] px-4 py-3">
            <Dialog.Title className="sr-only">{alt}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar diagrama"
                className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <X aria-hidden="true" size={16} weight="bold" />
                Cerrar
              </button>
            </Dialog.Close>
          </div>
          <div className="min-h-0 overflow-auto p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="mx-auto block h-auto w-[900px] max-w-none sm:w-full sm:max-w-full"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
