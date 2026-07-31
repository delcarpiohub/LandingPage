"use client";

import { PaperPlaneTilt, WhatsappLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { company } from "@/content/site";

const WHATSAPP_NUMBER = company.whatsapp.replace(/[^0-9]/g, "");
const BOT_TYPING_DELAY_MS = 700;

type AreaOption = { label: string; value: string };

// Mismos valores que TIPOS_CONSULTA en src/lib/contact-schema.ts, para mantener
// una sola taxonomía de motivo de contacto en todo el sitio.
const AREA_OPTIONS: AreaOption[] = [
  { label: "Cotizar un equipo", value: "cotizacion-equipo" },
  { label: "Proyecto de laboratorio", value: "proyecto-laboratorio" },
  { label: "Soporte técnico", value: "soporte-tecnico" },
  { label: "Otra consulta", value: "otro" },
];

type ChatMessage =
  | { id: number; sender: "bot" | "user"; kind: "text"; text: string }
  | { id: number; sender: "bot"; kind: "options" }
  | { id: number; sender: "bot"; kind: "whatsapp-cta"; url: string };

type Step = "name" | "empresa" | "area" | "completed";

type NewChatMessage = ChatMessage extends infer T
  ? T extends ChatMessage
    ? Omit<T, "id">
    : never
  : never;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function WhatsappWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [inputValue, setInputValue] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasStartedRef = useRef(false);
  const idRef = useRef(0);
  const userDataRef = useRef({ name: "", empresa: "", area: "" });
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

  useEffect(() => {
    if (open && !hasStartedRef.current) {
      hasStartedRef.current = true;
      void startFlow();
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open && (step === "name" || step === "empresa")) {
      inputRef.current?.focus();
    }
  }, [open, step]);

  function pushMessage(message: NewChatMessage) {
    idRef.current += 1;
    setMessages((prev) => [...prev, { ...message, id: idRef.current } as ChatMessage]);
  }

  async function typeAndSend(text: string) {
    setTyping(true);
    await delay(BOT_TYPING_DELAY_MS);
    setTyping(false);
    pushMessage({ sender: "bot", kind: "text", text });
  }

  async function startFlow() {
    await typeAndSend("Hola, gracias por escribirnos.");
    await typeAndSend("Antes de derivarte con el área correcta, necesitamos algunos datos rápidos.");
    await typeAndSend("¿Cuál es tu nombre?");
  }

  function buildWhatsappUrl() {
    const { name, empresa, area } = userDataRef.current;
    const message = `Hola, mi nombre es ${name}, trabajo en ${empresa} y me gustaría contactar con el área de ${area}. Vengo desde: ${window.location.href}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  async function handleAfterName(name: string) {
    setStep("empresa");
    await typeAndSend(`Gracias, ${name}.`);
    await typeAndSend("¿En qué empresa trabajas?");
  }

  async function handleAfterEmpresa() {
    setStep("area");
    await typeAndSend("Perfecto, ya casi terminamos.");
    await typeAndSend("¿Con qué área te gustaría contactarte?");
    pushMessage({ sender: "bot", kind: "options" });
  }

  async function selectArea(option: AreaOption) {
    if (step !== "area") return;
    userDataRef.current.area = option.label;
    pushMessage({ sender: "user", kind: "text", text: option.label });
    setStep("completed");
    await typeAndSend(`Te contactamos con el área de ${option.label}.`);
    await typeAndSend("Para continuar, abre WhatsApp con el siguiente botón.");
    pushMessage({ sender: "bot", kind: "whatsapp-cta", url: buildWhatsappUrl() });
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;

    pushMessage({ sender: "user", kind: "text", text });
    setInputValue("");

    if (step === "name") {
      userDataRef.current.name = text;
      void handleAfterName(text);
    } else if (step === "empresa") {
      userDataRef.current.empresa = text;
      void handleAfterEmpresa();
    }
  }

  const showInput = step === "name" || step === "empresa";

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
            className="absolute bottom-[68px] right-0 flex h-[540px] max-h-[calc(100vh-120px)] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--panel)] shadow-[0_16px_40px_rgba(20,26,31,0.24),0_4px_12px_rgba(20,26,31,0.12)]"
          >
            <div className="relative shrink-0">
              <div className="relative h-14 bg-[#53843A]">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 flex h-[22px] w-[22px] items-center justify-center text-white/80 transition-colors hover:text-white"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
              <div className="absolute left-1/2 top-14 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-[var(--primary)]">
                    <Image
                      src="/brand/whatsapp-avatar.png"
                      alt="Equipo Del Carpio"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#25D366]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-0.5 border-b border-[var(--border)] bg-white px-4 pb-3 pt-8">
              <span className="text-sm font-semibold text-[var(--foreground)]">Equipo Del Carpio</span>
              <span className="text-[11px] text-[var(--muted)]">Normalmente responde en minutos</span>
            </div>

            <div
              ref={bodyRef}
              aria-live="polite"
              className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4"
              style={{
                backgroundColor: "var(--background)",
                backgroundImage:
                  "linear-gradient(to right, rgba(74,85,96,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,85,96,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {messages.map((message) => {
                if (message.kind === "text") {
                  return (
                    <div
                      key={message.id}
                      className={
                        message.sender === "bot"
                          ? "max-w-[80%] self-start rounded-[16px] rounded-bl-[4px] border border-[var(--border)] bg-white px-4 py-2.5 text-[13.5px] leading-relaxed text-[var(--foreground)]"
                          : "max-w-[80%] self-end rounded-[16px] rounded-br-[4px] bg-[var(--nav-bg)] px-4 py-2.5 text-[13.5px] leading-relaxed text-white"
                      }
                    >
                      {message.text}
                    </div>
                  );
                }

                if (message.kind === "options") {
                  return (
                    <div key={message.id} className="flex flex-col gap-2">
                      {AREA_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          disabled={step !== "area"}
                          onClick={() => selectArea(option)}
                          className="rounded-[var(--radius-control)] border border-[var(--border)] bg-white px-3.5 py-2.5 text-left text-[13.5px] font-semibold text-[var(--foreground)] transition-colors disabled:cursor-default disabled:opacity-50 enabled:hover:border-[var(--primary)] enabled:hover:text-[var(--primary)]"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  );
                }

                return (
                  <a
                    key={message.id}
                    href={message.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 self-start rounded-[var(--radius-control)] bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-colors hover:bg-[#20BD5A]"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    Abrir WhatsApp
                  </a>
                );
              })}

              {typing && (
                <div className="flex w-fit items-center gap-1 self-start rounded-[16px] rounded-bl-[4px] border border-[var(--border)] bg-white px-4 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--muted-soft)] [animation:dc-typing-bounce_1.4s_ease-in-out_infinite]"
                      style={{ animationDelay: `${-0.32 + dot * 0.16}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {showInput && (
              <div className="flex gap-2 border-t border-[var(--border)] bg-white px-3.5 py-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSend();
                  }}
                  placeholder={step === "name" ? "Escribe tu nombre..." : "Nombre de tu empresa..."}
                  autoComplete="off"
                  className="field h-10 flex-1 rounded-[var(--radius-card)] text-[13.5px]"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  aria-label="Enviar"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition-colors hover:bg-[var(--primary-strong)] disabled:cursor-not-allowed disabled:bg-[var(--border)]"
                >
                  <PaperPlaneTilt size={16} weight="fill" />
                </button>
              </div>
            )}
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
        {open ? <X size={26} weight="bold" /> : <WhatsappLogo size={28} weight="fill" />}
      </button>
    </div>
  );
}
