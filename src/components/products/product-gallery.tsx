"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

const MODAL_MAX_ZOOM = 5;
const BUTTON_ZOOM_STEP = 0.6;
const WHEEL_ZOOM_STEP = 0.22;
const DOUBLE_TAP_ZOOM = 2.4;
const DOUBLE_TAP_MAX_INTERVAL_MS = 320;
const DOUBLE_TAP_MAX_DISTANCE_PX = 28;

const clampScale = (value: number) => Math.min(Math.max(value, 1), MODAL_MAX_ZOOM);

type Point = { x: number; y: number };

export function ProductGallery({
  images,
  fallbackImage,
  productName,
}: {
  images: GalleryImage[];
  fallbackImage: string;
  productName: string;
}) {
  const allImages = images.length > 0 ? images : [{ src: fallbackImage, alt: productName }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  // El visor se porta a document.body (igual que el drawer movil del header
  // en navigation.tsx): esta galeria vive dentro de un <Reveal> (Framer
  // Motion animando "y"), que deja un transform en el ancestro y, por spec
  // CSS, convierte a ese ancestro en el contenedor de posicionamiento de
  // cualquier descendiente position:fixed — sin el portal, el modal queda
  // atrapado dentro del layout de la pagina en vez de cubrir el viewport
  // completo por encima del header. Se gatilla despues del mount (no en
  // SSR) porque createPortal necesita document.body.
  const [isMounted, setIsMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setIsMounted(true), []);

  const openTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panAreaRef = useRef<HTMLDivElement>(null);
  // Fuente de verdad sincronica del scale actual: los updaters funcionales
  // de setState no sirven aqui porque zoomBy necesita leer "el scale de
  // ahora mismo" ANTES de decidir el target, y un wheel gesture puede
  // disparar varios eventos en el mismo tick, antes de que React re-renderice.
  const zoomScaleRef = useRef(1);
  // Los listeners de wheel/touch se adjuntan nativamente (addEventListener)
  // una sola vez al abrir el modal, no en cada render — por eso no pueden
  // depender del panOffset "cerrado" del render en el que se adjuntaron.
  // Este ref siempre tiene el valor mas reciente, se actualice desde donde
  // se actualice (mouse, wheel o touch).
  const panOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const touchStateRef = useRef<{
    mode: "pan" | "pinch";
    startScale: number;
    startPan: Point;
    startDistance: number;
    pinchCenter: Point;
    startTouch: Point;
  } | null>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);

  const activeImage = allImages[activeIndex] || allImages[0];

  /**
   * Zoom "anclado al cursor/dedo": el punto de la imagen bajo el puntero se
   * mantiene fijo en pantalla al cambiar de escala, en vez de zoomear siempre
   * desde el centro. Usa updaters funcionales (no el estado leído del render)
   * para que rachas rápidas de wheel/pinch no pisen actualizaciones previas.
   */
  const updatePanOffset = useCallback((next: Point) => {
    panOffsetRef.current = next;
    setPanOffset(next);
  }, []);

  const zoomToward = useCallback(
    (targetScale: number, anchor: Point = { x: 0, y: 0 }) => {
      const prevScale = zoomScaleRef.current;
      const nextScale = clampScale(targetScale);
      if (nextScale === prevScale) return;
      zoomScaleRef.current = nextScale;
      setZoomScale(nextScale);
      if (nextScale === 1) {
        updatePanOffset({ x: 0, y: 0 });
        return;
      }
      const prevPan = panOffsetRef.current;
      const targetX = (anchor.x - prevPan.x) / prevScale;
      const targetY = (anchor.y - prevPan.y) / prevScale;
      updatePanOffset({ x: anchor.x - nextScale * targetX, y: anchor.y - nextScale * targetY });
    },
    [updatePanOffset]
  );

  const zoomBy = useCallback(
    (delta: number, anchor: Point = { x: 0, y: 0 }) => {
      zoomToward(zoomScaleRef.current + delta, anchor);
    },
    [zoomToward]
  );

  const resetZoom = useCallback(() => {
    zoomScaleRef.current = 1;
    setZoomScale(1);
    updatePanOffset({ x: 0, y: 0 });
  }, [updatePanOffset]);

  const closeZoomModal = useCallback(() => {
    setIsZoomModalOpen(false);
    resetZoom();
  }, [resetZoom]);

  const getAnchor = (clientX: number, clientY: number, rect: DOMRect): Point => ({
    x: clientX - (rect.left + rect.width / 2),
    y: clientY - (rect.top + rect.height / 2),
  });

  const toggleZoomAt = (clientX: number, clientY: number, rect: DOMRect) => {
    if (zoomScaleRef.current > 1) {
      resetZoom();
    } else {
      zoomToward(DOUBLE_TAP_ZOOM, getAnchor(clientX, clientY, rect));
    }
  };

  // Mouse drag-to-pan (solo activo con zoom aplicado)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale === 1) return;
    updatePanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleZoomAt(e.clientX, e.clientY, rect);
  };

  // Zoom con rueda del mouse, anclado a la posicion del cursor — la
  // interaccion estandar en visores de imagenes modernos (Google Photos,
  // Figma) en vez de solo botones +/-. Se adjunta como listener nativo (ver
  // useEffect mas abajo) en vez de onWheel de React: React trata la rueda
  // como passive por defecto, asi que preventDefault() ahi no hace nada y
  // solo genera un warning en consola.
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const rect = panAreaRef.current!.getBoundingClientRect();
    const direction = e.deltaY > 0 ? -1 : 1;
    zoomBy(direction * WHEEL_ZOOM_STEP, getAnchor(e.clientX, e.clientY, rect));
  };

  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const rect = panAreaRef.current!.getBoundingClientRect();

    if (e.touches.length === 2) {
      touchStateRef.current = {
        mode: "pinch",
        startScale: zoomScaleRef.current,
        startPan: panOffsetRef.current,
        startDistance: getTouchDistance(e.touches),
        pinchCenter: getAnchor(
          (e.touches[0].clientX + e.touches[1].clientX) / 2,
          (e.touches[0].clientY + e.touches[1].clientY) / 2,
          rect
        ),
        startTouch: { x: 0, y: 0 },
      };
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();
      const lastTap = lastTapRef.current;
      const isDoubleTap =
        !!lastTap &&
        now - lastTap.time < DOUBLE_TAP_MAX_INTERVAL_MS &&
        Math.hypot(touch.clientX - lastTap.x, touch.clientY - lastTap.y) < DOUBLE_TAP_MAX_DISTANCE_PX;

      if (isDoubleTap) {
        toggleZoomAt(touch.clientX, touch.clientY, rect);
        lastTapRef.current = null;
        touchStateRef.current = null;
        return;
      }
      lastTapRef.current = { time: now, x: touch.clientX, y: touch.clientY };

      if (zoomScaleRef.current > 1) {
        touchStateRef.current = {
          mode: "pan",
          startScale: zoomScaleRef.current,
          startPan: panOffsetRef.current,
          startDistance: 0,
          pinchCenter: { x: 0, y: 0 },
          startTouch: { x: touch.clientX, y: touch.clientY },
        };
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const state = touchStateRef.current;
    if (!state) return;

    if (state.mode === "pinch" && e.touches.length === 2) {
      e.preventDefault();
      const ratio = getTouchDistance(e.touches) / state.startDistance;
      const nextScale = clampScale(state.startScale * ratio);
      zoomScaleRef.current = nextScale;
      setZoomScale(nextScale);
      if (nextScale === 1) {
        updatePanOffset({ x: 0, y: 0 });
      } else {
        const targetX = (state.pinchCenter.x - state.startPan.x) / state.startScale;
        const targetY = (state.pinchCenter.y - state.startPan.y) / state.startScale;
        updatePanOffset({
          x: state.pinchCenter.x - nextScale * targetX,
          y: state.pinchCenter.y - nextScale * targetY,
        });
      }
      return;
    }

    if (state.mode === "pan" && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      updatePanOffset({
        x: state.startPan.x + (touch.clientX - state.startTouch.x),
        y: state.startPan.y + (touch.clientY - state.startTouch.y),
      });
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.touches.length === 0) touchStateRef.current = null;
  };

  // Listeners nativos con { passive: false } para wheel/touchmove: solo asi
  // preventDefault() realmente evita el scroll/gesto del navegador mientras
  // se hace zoom o pan dentro del visor.
  useEffect(() => {
    if (!isZoomModalOpen) return;
    const el = panAreaRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoomModalOpen]);

  // Escape para cerrar, bloqueo de scroll del fondo, y devolver el foco al
  // boton que abrio el visor — el "punto de retorno" queda garantizado sin
  // depender solo del boton Cerrar.
  useEffect(() => {
    if (!isZoomModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeZoomModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
      openTriggerRef.current?.focus();
    };
  }, [isZoomModalOpen, closeZoomModal]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main image card - Borderless / transparent background */}
      <div className="relative group w-full aspect-square bg-transparent flex items-center justify-center overflow-hidden">
        {/* Click to open Zoom Lightbox */}
        <button
          ref={openTriggerRef}
          type="button"
          onClick={() => setIsZoomModalOpen(true)}
          className="relative w-full h-full cursor-zoom-in overflow-hidden flex items-center justify-center p-2 md:p-3 focus:outline-none"
          aria-label={`Ampliar imagen de ${productName}`}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            className="object-contain p-2 md:p-4 scale-[1.14] origin-center"
            sizes="(max-width: 1024px) 100vw, 450px"
            draggable={false}
          />

          {/* Floating Glassmorphism Badge on hover */}
          <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-[#101820] text-[11px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-sm border border-[#D4DFDC] transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 pointer-events-none">
            <MagnifyingGlassPlus size={16} weight="bold" className="text-[#D6532B]" />
            <span>Ampliar</span>
          </div>
        </button>
      </div>

      {/* Thumbnails list with caret navigation */}
      {allImages.length > 1 && (
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
            className="p-1 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Imagen anterior"
          >
            <CaretLeft size={28} weight="bold" />
          </button>

          <div className="grid grid-cols-3 gap-3 flex-1">
            {allImages.map((image, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative aspect-square bg-white border rounded-[6px] p-2 flex items-center justify-center overflow-hidden transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                    isActive
                      ? "border-white ring-2 ring-white/40"
                      : "border-transparent opacity-75 hover:opacity-100"
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % allImages.length)}
            className="p-1 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Siguiente imagen"
          >
            <CaretRight size={28} weight="bold" />
          </button>
        </div>
      )}

      {/* Zoom / Lightbox Modal Overlay — portado a document.body, ver nota junto a isMounted */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isZoomModalOpen && (
              <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[1200] flex flex-col items-center justify-center bg-black select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualizador de imagen para ${productName}`}
          >
            {/* Controls header — el boton "Cerrar" con texto es el punto de
                retorno explicito: no solo un icono, para que quede claro que
                vuelve a la ficha del producto sin salir del sitio. */}
            <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-4 bg-gradient-to-b from-black/70 to-transparent px-4 py-4 sm:px-6">
              <span className="truncate text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white/75">
                {activeImage.alt}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeZoomModal}
                className="group flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-2 pl-4 pr-3 text-[12px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors duration-200 hover:border-[#D6532B] hover:bg-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                Cerrar
                <X size={15} weight="bold" />
              </button>
            </div>

            {/* Interactive Zoom Image container — wheel para zoom anclado al
                cursor, doble clic/doble tap para alternar zoom, arrastre y
                pinch tactil para paneo. Clic en el area vacia cierra (mismo
                gesto que Escape / el boton Cerrar). */}
            <div
              ref={panAreaRef}
              className={cn(
                "w-full h-full flex items-center justify-center overflow-hidden p-4 touch-none",
                zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              )}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeZoomModal();
              }}
            >
              <div
                className="relative w-full h-full max-w-[92vw] max-h-[88vh] transition-transform duration-150 ease-out flex items-center justify-center"
                style={{
                  transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                }}
                onDoubleClick={handleDoubleClick}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    className="object-contain"
                    sizes="80vw"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Floating zoom toolbar con indicador de porcentaje */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => zoomBy(-BUTTON_ZOOM_STEP)}
                disabled={zoomScale <= 1}
                className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
                title="Disminuir zoom"
                aria-label="Disminuir zoom"
              >
                <MagnifyingGlassMinus size={18} weight="bold" />
              </button>
              <span className="min-w-[3.25rem] text-center text-[12px] font-bold tabular-nums text-white/85">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(BUTTON_ZOOM_STEP)}
                disabled={zoomScale >= MODAL_MAX_ZOOM}
                className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
                title="Aumentar zoom"
                aria-label="Aumentar zoom"
              >
                <MagnifyingGlassPlus size={18} weight="bold" />
              </button>
            </div>

            {/* Help instructions (only visible when zoomed) */}
            {zoomScale > 1 && (
              <div className="absolute bottom-20 bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
                <span className="text-[11px] font-mono font-bold tracking-wider text-white/70">
                  Arrastra la imagen para navegar
                </span>
              </div>
            )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
