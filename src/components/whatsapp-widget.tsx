"use client";

import {
  CurrencyCircleDollar,
  Wrench,
  ChatCircleDots,
  CaretRight,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { company } from "@/content/site";

const WHATSAPP_NUMBER = company.whatsapp.replace(/[^0-9]/g, "");

type WhatsappOption = {
  label: string;
  icon: typeof CurrencyCircleDollar;
  message: string;
};

const OPTIONS: WhatsappOption[] = [
  {
    label: "Cotizar un equipo",
    icon: CurrencyCircleDollar,
    message: "Hola, quiero cotizar un equipo.",
  },
  {
    label: "Soporte técnico",
    icon: Wrench,
    message: "Hola, necesito soporte técnico.",
  },
  {
    label: "Otra consulta",
    icon: ChatCircleDots,
    message: "Hola, tengo una consulta.",
  },
];

export function WhatsappWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function buildWhatsappUrl(message: string) {
    const fullMessage = `${message} Vengo desde: ${window.location.href}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  }

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Escríbenos por WhatsApp"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-[68px] right-0 w-80 max-w-[calc(100vw-24px)] overflow-hidden rounded-[var(--radius-card)] bg-[var(--panel)] shadow-[0_16px_40px_rgba(20,26,31,0.24),0_4px_12px_rgba(20,26,31,0.12)]"
          >
            <div className="flex items-center gap-3 bg-[var(--nav-bg)] px-4 py-3.5">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-extrabold text-white">
                  DC
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px -right-px h-[11px] w-[11px] rounded-full border-2 border-[var(--nav-bg)] bg-[#25D366]"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-px">
                <span className="text-sm font-semibold text-white">Equipo Del Carpio</span>
                <span className="text-[11px] text-white/70">Normalmente responde en minutos</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="ml-auto flex h-[22px] w-[22px] shrink-0 items-center justify-center self-start text-white/80 transition-colors hover:text-white"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="flex flex-col">
              {OPTIONS.map((option, index) => (
                <a
                  key={option.label}
                  href={buildWhatsappUrl(option.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-[13.5px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[#F7F8F8] ${
                    index < OPTIONS.length - 1 ? "border-b border-[#E5E8E9]" : ""
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#25D366]/12 text-[#1EBE5A]">
                    <option.icon size={16} weight="bold" />
                  </span>
                  <span className="flex-1">{option.label}</span>
                  <CaretRight size={14} className="shrink-0 text-[#B7BEC2]" />
                </a>
              ))}
            </div>

            <div className="border-t border-[#E5E8E9] bg-[#FAFBFB] px-4 py-2.5 text-center text-[11px] text-[var(--muted)]">
              Horario de atención: Lun-Vie 9:00-18:00
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Escríbenos por WhatsApp"
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_rgba(37,211,102,0.4),0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
      >
        <WhatsappLogo size={28} weight="fill" />
      </button>
    </div>
  );
}
