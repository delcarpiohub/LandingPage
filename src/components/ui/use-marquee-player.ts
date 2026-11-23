"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type PointerEvent,
  type RefObject,
} from "react";

// Reproductor del carrusel de testimonios. La pista repite el contenido
// `copies` veces; el reproductor se ubica siempre en la copia central y avanza
// de a una tarjeta con una transición CSS de TRANSITION_MS. Cada tarjeta
// permanece en pantalla el tiempo que toma leerla (ver `getDwellMs`).
//
// Pausa por: cursor encima, foco de TECLADO, toque en móvil, pestaña oculta,
// sección fuera de pantalla, diálogo abierto y un paso manual con las flechas
// (MANUAL_HOLD_MS). Un clic o toque nunca deja el carrusel pausado por foco:
// el foco solo pausa si la última interacción fue de teclado. Al reanudar se
// continúa con el tiempo que faltaba, no se reinicia. Con
// `prefers-reduced-motion` no hay autoplay ni transiciones: solo las flechas
// anterior/siguiente, que mueven la pista sin animar.

// --- Tiempos de lectura (ajustar aquí) -------------------------------------
/** Velocidad de lectura con la que se estima cuánto leer un testimonio. */
const WORDS_PER_MINUTE = 220;
/** Tiempo mínimo en pantalla por testimonio (antes 8 s). */
const MIN_DWELL_MS = 10_000;
/** Tiempo máximo en pantalla por testimonio (antes 20 s). */
const MAX_DWELL_MS = 24_000;

// --- Pausas y transición ---------------------------------------------------
const TRANSITION_MS = 600;
const TRANSITION_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Espera para reanudar tras quitar el cursor o salir del foco de teclado. */
const RESUME_DELAY_MS = 1500;
/** Espera para reanudar tras soltar un toque en móvil. */
const TOUCH_RESUME_DELAY_MS = 4000;
/** Pausa tras pulsar una flecha anterior/siguiente. */
const MANUAL_HOLD_MS = 15_000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CAN_HOVER_QUERY = "(hover: hover)";

type PauseReason = "hover" | "focus" | "touch" | "hidden" | "offscreen" | "dialog" | "manual";

/** Tiempo en pantalla: según el largo del texto, entre MIN_DWELL_MS y MAX_DWELL_MS. */
export function getDwellMs(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const readingMs = (words / WORDS_PER_MINUTE) * 60_000;
  return Math.round(Math.min(MAX_DWELL_MS, Math.max(MIN_DWELL_MS, readingMs)));
}

/**
 * Espacio a la izquierda de la primera tarjeta: libera el degradado lateral
 * (visible desde 640 px). En móvil es 0 para que no asome un borde de la
 * tarjeta anterior (el hueco entre tarjetas es de 20 px).
 */
function getLeadingInset() {
  if (window.innerWidth >= 768) return 168;
  if (window.innerWidth >= 640) return 104;
  return 0;
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

interface UseMarqueePlayerOptions {
  trackRef: RefObject<HTMLElement | null>;
  viewportRef: RefObject<HTMLElement | null>;
  regionRef: RefObject<HTMLElement | null>;
  /** Cantidad de copias idénticas del contenido dentro de la pista. */
  copies: number;
  /** Tiempo en pantalla de cada testimonio (una entrada por tarjeta de una copia). */
  dwellsMs: readonly number[];
  /** Pausa externa (diálogo de texto completo abierto). */
  isPaused: boolean;
}

export function useMarqueePlayer({
  trackRef,
  viewportRef,
  regionRef,
  copies,
  dwellsMs,
  isPaused,
}: UseMarqueePlayerOptions) {
  const perCopy = dwellsMs.length;
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  const [manualIndex, setManualIndex] = useState<number | null>(null);

  const indexRef = useRef(perCopy); // arranca en la copia central
  const reasonsRef = useRef<Set<PauseReason>>(new Set(["offscreen"]));
  const reducedRef = useRef(prefersReducedMotion);
  const dwellTimerRef = useRef<number | undefined>(undefined);
  const settleTimerRef = useRef<number | undefined>(undefined);
  const releaseTimersRef = useRef(new Map<PauseReason, number>());
  const lastInputRef = useRef<"keyboard" | "pointer">("pointer");
  const startedAtRef = useRef(0);
  const remainingRef = useRef<number | undefined>(undefined);
  const advanceRef = useRef<() => void>(() => undefined);

  /** Ubica la pista sobre la tarjeta `index`, con o sin transición. */
  const apply = useCallback(
    (index: number, animate: boolean) => {
      const track = trackRef.current;
      const card = track?.children[index] as HTMLElement | undefined;
      const first = track?.firstElementChild as HTMLElement | null | undefined;
      if (!track || !card || !first) return;

      const shouldAnimate = animate && !reducedRef.current;
      track.style.transition = shouldAnimate
        ? `transform ${TRANSITION_MS}ms ${TRANSITION_EASING}`
        : "none";
      track.style.transform = `translate3d(${getLeadingInset() - (card.offsetLeft - first.offsetLeft)}px, 0, 0)`;
      // Confirma el estilo sin transición antes de la siguiente animación.
      if (!shouldAnimate) void track.offsetWidth;
    },
    [trackRef],
  );

  /** Vuelve a la copia central sin que se note (las copias son idénticas). */
  const settle = useCallback(() => {
    const index = indexRef.current;
    let normalized = index;
    if (index >= perCopy * 2) normalized = index - perCopy;
    else if (index < perCopy) normalized = index + perCopy;
    if (normalized === index) return;
    indexRef.current = normalized;
    apply(normalized, false);
  }, [apply, perCopy]);

  const moveTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= perCopy * copies) return;
      window.clearTimeout(settleTimerRef.current);
      indexRef.current = index;
      remainingRef.current = undefined;
      apply(index, true);
      settleTimerRef.current = window.setTimeout(settle, TRANSITION_MS + 60);
    },
    [apply, copies, perCopy, settle],
  );

  const stopDwellTimer = useCallback(() => {
    if (dwellTimerRef.current === undefined) return;
    window.clearTimeout(dwellTimerRef.current);
    dwellTimerRef.current = undefined;
    const elapsed = performance.now() - startedAtRef.current;
    const total = remainingRef.current ?? dwellsMs[indexRef.current % perCopy];
    remainingRef.current = Math.max(0, total - elapsed);
  }, [dwellsMs, perCopy]);

  /** Programa o detiene el avance automático según los motivos de pausa. */
  const evaluate = useCallback(() => {
    const blocked = reducedRef.current || reasonsRef.current.size > 0;
    if (blocked) {
      stopDwellTimer();
      return;
    }
    if (dwellTimerRef.current !== undefined) return;

    const wait = remainingRef.current ?? dwellsMs[indexRef.current % perCopy];
    startedAtRef.current = performance.now();
    dwellTimerRef.current = window.setTimeout(() => {
      dwellTimerRef.current = undefined;
      remainingRef.current = undefined;
      advanceRef.current();
    }, wait);
  }, [dwellsMs, perCopy, stopDwellTimer]);

  useEffect(() => {
    advanceRef.current = () => {
      moveTo(indexRef.current + 1);
      evaluate();
    };
  }, [moveTo, evaluate]);

  const addReason = useCallback(
    (reason: PauseReason) => {
      // Un motivo que vuelve a activarse cancela su liberación pendiente.
      window.clearTimeout(releaseTimersRef.current.get(reason));
      releaseTimersRef.current.delete(reason);
      reasonsRef.current.add(reason);
      evaluate();
    },
    [evaluate],
  );

  /** Libera un motivo de pausa, de inmediato o tras `delayMs`. */
  const releaseReason = useCallback(
    (reason: PauseReason, delayMs = 0) => {
      window.clearTimeout(releaseTimersRef.current.get(reason));
      releaseTimersRef.current.delete(reason);
      if (!reasonsRef.current.has(reason)) return;
      if (delayMs <= 0) {
        reasonsRef.current.delete(reason);
        evaluate();
        return;
      }
      releaseTimersRef.current.set(
        reason,
        window.setTimeout(() => {
          releaseTimersRef.current.delete(reason);
          reasonsRef.current.delete(reason);
          evaluate();
        }, delayMs),
      );
    },
    [evaluate],
  );

  // Posición inicial y reajuste al cambiar el tamaño (sin animar).
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    apply(indexRef.current, false);
    const resizeObserver = new ResizeObserver(() => apply(indexRef.current, false));
    resizeObserver.observe(viewport);

    // El foco sobre una tarjeta recortada hace que el navegador desplace el
    // contenedor `overflow-hidden`; la posición la controla solo la pista.
    const resetScroll = () => {
      viewport.scrollLeft = 0;
    };
    viewport.addEventListener("scroll", resetScroll);

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", resetScroll);
    };
  }, [viewportRef, apply]);

  // Limpieza de temporizadores.
  useEffect(() => {
    const releaseTimers = releaseTimersRef.current;
    return () => {
      window.clearTimeout(dwellTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
      releaseTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  // Última interacción: el foco solo pausa si vino del teclado. El puntero
  // se registra en captura, antes de que el clic mueva el foco.
  useEffect(() => {
    const onKeyDown = () => {
      lastInputRef.current = "keyboard";
    };
    const onPointerDown = () => {
      lastInputRef.current = "pointer";
    };
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  // Preferencia de movimiento reducido: sin autoplay ni transiciones.
  useEffect(() => {
    reducedRef.current = prefersReducedMotion;
    evaluate();
  }, [prefersReducedMotion, evaluate]);

  // Pestaña oculta y sección fuera de pantalla.
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const onVisibilityChange = () => {
      if (document.hidden) addReason("hidden");
      else releaseReason("hidden");
    };
    if (document.hidden) reasonsRef.current.add("hidden");
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) releaseReason("offscreen");
      else addReason("offscreen");
    });
    observer.observe(region);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, [regionRef, addReason, releaseReason]);

  // Diálogo de texto completo abierto.
  useEffect(() => {
    if (isPaused) addReason("dialog");
    else releaseReason("dialog");
  }, [isPaused, addReason, releaseReason]);

  /** Avanza o retrocede un testimonio y detiene el autoplay MANUAL_HOLD_MS. */
  const step = useCallback(
    (direction: 1 | -1) => {
      stopDwellTimer();
      moveTo(indexRef.current + direction);
      setManualIndex(indexRef.current % perCopy);
      // Un paso manual reinicia el tiempo en pantalla del nuevo testimonio.
      remainingRef.current = undefined;
      addReason("manual");
      releaseReason("manual", MANUAL_HOLD_MS);
    },
    [stopDwellTimer, moveTo, perCopy, addReason, releaseReason],
  );

  // Foco de teclado en una tarjeta fuera de vista: la trae a pantalla.
  const revealFocusedCard = useCallback(
    (target: HTMLElement) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const card = target.closest<HTMLElement>("article");
      if (!track || !viewport || !card) return;

      const index = Array.prototype.indexOf.call(track.children, card);
      if (index < 0) return;

      // El navegador ya desplazó el contenedor para mostrar la tarjeta enfocada;
      // se deshace antes de medir, porque la posición la manda solo la pista.
      viewport.scrollLeft = 0;
      const viewportRect = viewport.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const margin = getLeadingInset();
      const isVisible =
        cardRect.left >= viewportRect.left + margin - 1 &&
        cardRect.right <= viewportRect.right - (window.innerWidth >= 640 ? margin : 0);
      if (!isVisible) moveTo(index);
    },
    [trackRef, viewportRef, moveTo],
  );

  const isInsideRegion = (node: EventTarget | null) =>
    node instanceof Node && Boolean(regionRef.current?.contains(node));

  // Hover y toque aplican solo a la pista: los botones quedan fuera, así
  // "Reproducir" con el mouse encima no se contradice con la pausa por hover.
  const viewportHandlers = {
    onPointerEnter: (event: PointerEvent) => {
      // En pantallas táctiles el navegador puede emitir un "mouse" tras el
      // toque; sin hover real nadie lo liberaría y el carrusel quedaría pausado.
      if (event.pointerType === "touch" || !window.matchMedia(CAN_HOVER_QUERY).matches) return;
      addReason("hover");
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== "touch") releaseReason("hover", RESUME_DELAY_MS);
    },
    onPointerDown: (event: PointerEvent) => {
      if (event.pointerType === "touch") addReason("touch");
    },
    onPointerUp: (event: PointerEvent) => {
      if (event.pointerType === "touch") releaseReason("touch", TOUCH_RESUME_DELAY_MS);
    },
    onPointerCancel: (event: PointerEvent) => {
      if (event.pointerType === "touch") releaseReason("touch", TOUCH_RESUME_DELAY_MS);
    },
  };

  // El foco de teclado se vigila en toda la región (pista y botones).
  const regionHandlers = {
    // Un clic o toque dentro de la región pasa a modo puntero: cualquier pausa
    // por foco de teclado anterior se libera, aunque el foco siga en un botón.
    onPointerDownCapture: () => releaseReason("focus", RESUME_DELAY_MS),
    onFocusCapture: (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      // Solo foco de teclado: un clic con mouse o un toque en un botón no debe
      // dejar el carrusel pausado, aunque el navegador mantenga el foco ahí.
      if (lastInputRef.current === "keyboard" && target.matches(":focus-visible")) {
        addReason("focus");
        revealFocusedCard(target);
      }
    },
    onBlurCapture: (event: FocusEvent) => {
      if (!isInsideRegion(event.relatedTarget)) releaseReason("focus", RESUME_DELAY_MS);
    },
  };

  return {
    /** Testimonio (0-based) al que llegó el último paso manual; null si no hubo. */
    manualIndex,
    step,
    viewportHandlers,
    regionHandlers,
  };
}
