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
// Pausa por: cursor encima, foco de teclado visible, toque en móvil, pestaña
// oculta, sección fuera de pantalla, diálogo abierto y un paso manual con las
// flechas (MANUAL_HOLD_MS). Al reanudar se continúa con el tiempo que faltaba,
// no se reinicia. Con `prefers-reduced-motion` no hay autoplay ni
// transiciones: solo las flechas anterior/siguiente, que mueven la pista sin
// animar.

const WORDS_PER_MINUTE = 220;
const MIN_DWELL_MS = 8000;
const MAX_DWELL_MS = 20000;
const TRANSITION_MS = 600;
const TRANSITION_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const TOUCH_RESUME_DELAY_MS = 4000;
const MANUAL_HOLD_MS = 15000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CAN_HOVER_QUERY = "(hover: hover)";

type PauseReason = "hover" | "focus" | "touch" | "hidden" | "offscreen" | "dialog" | "manual";

/** Tiempo en pantalla: ~220 palabras por minuto, entre 8 y 20 segundos. */
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
  const touchTimerRef = useRef<number | undefined>(undefined);
  const manualTimerRef = useRef<number | undefined>(undefined);
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
      reasonsRef.current.add(reason);
      evaluate();
    },
    [evaluate],
  );

  const releaseReason = useCallback(
    (reason: PauseReason) => {
      if (!reasonsRef.current.delete(reason)) return;
      evaluate();
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
  useEffect(
    () => () => {
      window.clearTimeout(dwellTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
      window.clearTimeout(touchTimerRef.current);
      window.clearTimeout(manualTimerRef.current);
    },
    [],
  );

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
      window.clearTimeout(manualTimerRef.current);
      reasonsRef.current.add("manual");
      manualTimerRef.current = window.setTimeout(() => releaseReason("manual"), MANUAL_HOLD_MS);
      evaluate();
    },
    [stopDwellTimer, moveTo, evaluate, perCopy, releaseReason],
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
      if (event.pointerType !== "touch") releaseReason("hover");
    },
    onPointerDown: (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      window.clearTimeout(touchTimerRef.current);
      addReason("touch");
    },
    onPointerUp: (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      window.clearTimeout(touchTimerRef.current);
      touchTimerRef.current = window.setTimeout(
        () => releaseReason("touch"),
        TOUCH_RESUME_DELAY_MS,
      );
    },
    onPointerCancel: (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      window.clearTimeout(touchTimerRef.current);
      touchTimerRef.current = window.setTimeout(
        () => releaseReason("touch"),
        TOUCH_RESUME_DELAY_MS,
      );
    },
  };

  // El foco de teclado se vigila en toda la región (pista y botones).
  const regionHandlers = {
    onFocusCapture: (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      // Solo foco de teclado: el clic con mouse en un botón no debe congelar el carrusel.
      if (target.matches(":focus-visible")) {
        addReason("focus");
        revealFocusedCard(target);
      }
    },
    onBlurCapture: (event: FocusEvent) => {
      if (!isInsideRegion(event.relatedTarget)) releaseReason("focus");
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
