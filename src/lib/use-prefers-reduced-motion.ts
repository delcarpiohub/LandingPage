"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// Variante hydration-safe de useReducedMotion de framer-motion: aquella lee la
// media query sincrónicamente en el primer render del cliente pero devuelve
// null en SSR, así que cualquier componente que cambie su ESTRUCTURA según el
// valor rompe la hidratación para usuarios con movimiento reducido (React
// #418, reproducido en el home el 2026-08-25). Con useSyncExternalStore el
// primer render del cliente coincide con el SSR (false) y el valor real llega
// en un re-render inmediato tras hidratar. Usar este hook siempre que el
// resultado decida QUÉ se renderiza; para ajustar solo props de animación de
// elementos no presentes en el SSR, useReducedMotion de framer sigue bien.
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
