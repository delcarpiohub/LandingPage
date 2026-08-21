"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CONSENT_KEY = "delcarpio_cookie_consent";
const CONSENT_DATE_KEY = "delcarpio_cookie_consent_date";

type ConsentChoice = "accepted" | "rejected";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  // Mantiene el widget de WhatsApp (fixed, esquina inferior derecha) sobre
  // la barra en vez de tapado por ella: la altura real de la barra (varía
  // por breakpoint y largo de línea) se publica como variable CSS en :root
  // para que whatsapp-widget.tsx la sume a su propio `bottom`.
  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.setProperty("--cookie-bar-offset", "0px");
      return;
    }

    const el = barRef.current;
    if (!el) return;

    const sync = () =>
      root.style.setProperty("--cookie-bar-offset", `${el.offsetHeight}px`);

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(
    () => () => {
      document.documentElement.style.setProperty("--cookie-bar-offset", "0px");
    },
    [],
  );

  function handleChoice(choice: ConsentChoice) {
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());

    // TODO: cuando se agregue Google Analytics u otro script de tracking,
    // cargarlo condicionalmente aquí solo si choice === "accepted"
    // (o leyendo CONSENT_KEY === "accepted" desde donde se inicialice el script).

    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={barRef}
          role="region"
          aria-label="Aviso de cookies"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--nav-bg)] pb-[env(safe-area-inset-bottom)] shadow-[0_-16px_40px_rgba(20,26,31,0.28)]"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-7">
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-white/85 md:text-base">
              Usamos cookies esenciales para el funcionamiento del sitio y, con tu
              autorización, para medir su uso.{" "}
              <Link
                href="/contacto/politica-cookies"
                className="font-semibold text-white underline underline-offset-2 hover:text-[var(--primary)]"
              >
                Ver política de cookies
              </Link>
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:gap-3">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="min-h-12 rounded-[var(--radius-card)] border border-white/30 bg-transparent px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/5"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="min-h-12 rounded-[var(--radius-card)] bg-[var(--primary)] px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-strong)]"
              >
                Aceptar cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
