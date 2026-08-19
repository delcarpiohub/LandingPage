"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "delcarpio_cookie_consent";
const CONSENT_DATE_KEY = "delcarpio_cookie_consent_date";

type ConsentChoice = "accepted" | "rejected";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

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
          role="region"
          aria-label="Aviso de cookies"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] overflow-hidden rounded-[var(--radius-card)] bg-[var(--panel)] shadow-[0_12px_32px_rgba(20,26,31,0.22),0_2px_8px_rgba(20,26,31,0.12)] md:inset-x-auto md:bottom-6 md:left-6 md:w-[400px]"
        >
          <div className="h-[3px] bg-[var(--primary)]" />
          <div className="px-5 pb-4 pt-3 md:px-6 md:pb-5 md:pt-4">
            <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.09em] text-[var(--primary)]">
              Privacidad y cookies
            </p>
            <p className="text-[13px] leading-relaxed text-[var(--foreground)]">
              Usamos cookies esenciales para el funcionamiento del sitio. Puedes aceptar o rechazar el
              uso de cookies no esenciales.{" "}
              <Link
                href="/contacto/politica-cookies"
                className="font-semibold text-[var(--nav-bg)] underline underline-offset-2 hover:text-[var(--primary)]"
              >
                Ver política de cookies
              </Link>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:flex md:flex-col">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="min-h-11 rounded-[2px] border border-[var(--border)] bg-transparent px-3 py-2 text-[12px] font-semibold text-[var(--nav-bg)] transition-colors duration-200 hover:border-[var(--nav-bg)]"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="min-h-11 rounded-[2px] bg-[var(--primary)] px-3 py-2 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-strong)]"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
