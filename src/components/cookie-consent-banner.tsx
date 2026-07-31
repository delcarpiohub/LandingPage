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
      setVisible(true);
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
          className="fixed inset-x-0 bottom-0 z-50 bg-[var(--nav-bg)] px-6 py-4 text-white shadow-[0_-2px_14px_rgba(0,0,0,0.18)] md:px-8"
        >
          <div className="mx-auto flex max-w-wide flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <p className="flex-1 text-[13px] leading-relaxed">
              Usamos cookies esenciales para el funcionamiento del sitio. Puedes aceptar o rechazar el
              uso de cookies no esenciales.{" "}
              <Link
                href="/contacto/politica-cookies"
                className="underline underline-offset-2 hover:text-white/85"
              >
                Ver política de cookies
              </Link>
            </p>
            <div className="flex shrink-0 gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="flex-1 rounded-[2px] border border-white/65 bg-transparent px-4 py-2 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-white/10 md:flex-none"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="flex-1 rounded-[2px] bg-[var(--primary)] px-4 py-2 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-strong)] md:flex-none"
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
