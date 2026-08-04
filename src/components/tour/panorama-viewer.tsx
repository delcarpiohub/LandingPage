"use client";

import {
  ArrowsOut,
  ArrowRight,
  CaretLeft,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Signpost,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { RectilinearView, Scene, Viewer } from "marzipano";
import { tourScenes } from "@/content/tour-scenes";
import type { TourSceneId } from "@/content/tour-scenes";

const TOUR_FOV = (100 * Math.PI) / 180;
const MIN_TOUR_FOV = (55 * Math.PI) / 180;
const MAX_TOUR_FOV = (120 * Math.PI) / 180;
const HOTSPOT_PITCH = (-12 * Math.PI) / 180;

type ViewerScene = {
  scene: Scene;
  view: RectilinearView;
};

type PanoramaViewerProps = {
  requestedSceneId?: TourSceneId;
  onSceneChange?: (sceneId: TourSceneId) => void;
};

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function preloadScene(imageSource: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = imageSource;
  });
}

export function PanoramaViewer({
  requestedSceneId,
  onSceneChange,
}: PanoramaViewerProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const scenesRef = useRef<ViewerScene[]>([]);
  const changeSceneRef = useRef<(index: number) => void>(() => undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);

  const activeScene = tourScenes[activeIndex];
  const previousIndex = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex = activeIndex < tourScenes.length - 1 ? activeIndex + 1 : null;
  const requestedIndex = requestedSceneId
    ? tourScenes.findIndex((scene) => scene.id === requestedSceneId)
    : -1;

  const goToScene = useCallback(
    (index: number) => {
      if (index === activeIndex || index < 0 || index >= tourScenes.length) return;

      const target = scenesRef.current[index];
      if (!target) return;

      setShowInstruction(true);
      setActiveIndex(index);
      onSceneChange?.(tourScenes[index].id);
      target.scene.switchTo({ transitionDuration: reduceMotion ? 0 : 500 });
    },
    [activeIndex, onSceneChange, reduceMotion]
  );

  changeSceneRef.current = goToScene;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let marzipanoViewer: Viewer | null = null;

    async function initializeViewer() {
      try {
        const { default: Marzipano } = await import("marzipano");
        if (isDisposed || !containerRef.current) return;

        const viewer = new Marzipano.Viewer(containerRef.current, {
          controls: { mouseViewMode: "drag" },
        });
        marzipanoViewer = viewer;

        const scenes = tourScenes.map((sceneDefinition, index) => {
          const source = Marzipano.ImageUrlSource.fromString(sceneDefinition.imageSource);
          const geometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);
          const view = new Marzipano.RectilinearView(
            {
              yaw: degreesToRadians(sceneDefinition.yaw),
              pitch: degreesToRadians(sceneDefinition.pitch),
              fov: TOUR_FOV,
            },
            Marzipano.RectilinearView.limit.traditional(8192, MAX_TOUR_FOV, MIN_TOUR_FOV)
          );
          const scene = viewer.createScene({ source, geometry, view });

          const addHotspot = (targetIndex: number, yaw: number, direction: "next" | "previous") => {
            const hotspot = document.createElement("button");
            hotspot.type = "button";
            hotspot.className = `tour-marzipano-hotspot tour-marzipano-hotspot-${direction}`;
            hotspot.textContent = direction === "next" ? "+" : "-";
            hotspot.setAttribute(
              "aria-label",
              direction === "next" ? "Avanzar en el recorrido" : "Volver al punto anterior"
            );
            hotspot.addEventListener("click", () => changeSceneRef.current(targetIndex));

            scene.hotspotContainer().createHotspot(hotspot, {
              yaw: degreesToRadians(yaw),
              pitch: HOTSPOT_PITCH,
            });
          };

          if (sceneDefinition.nextYaw !== null && index < tourScenes.length - 1) {
            addHotspot(index + 1, sceneDefinition.nextYaw, "next");
          }

          if (sceneDefinition.previousYaw !== null && index > 0) {
            addHotspot(index - 1, sceneDefinition.previousYaw, "previous");
          }

          return { scene, view };
        });

        if (isDisposed) return;

        viewerRef.current = marzipanoViewer;
        scenesRef.current = scenes;
        await preloadScene(tourScenes[0].imageSource);

        if (isDisposed) return;

        scenes[0].scene.switchTo({ transitionDuration: 0 });
        setIsViewerLoaded(true);
      } catch {
        if (!isDisposed) setHasLoadError(true);
      }
    }

    initializeViewer();

    return () => {
      isDisposed = true;
      scenesRef.current = [];
      // viewerRef.current y marzipanoViewer terminan apuntando a la misma
      // instancia una vez que el visor se inicializa (línea 145) — destruirla
      // dos veces hace que Marzipano intente limpiar de nuevo su estado
      // interno ya nulo y lance "Cannot read properties of undefined".
      const activeViewer = viewerRef.current ?? marzipanoViewer;
      viewerRef.current = null;
      marzipanoViewer = null;
      activeViewer?.destroy();
    };
  }, []);

  useEffect(() => {
    if (isViewerLoaded && requestedIndex >= 0 && requestedIndex !== activeIndex) {
      goToScene(requestedIndex);
    }
  }, [activeIndex, goToScene, isViewerLoaded, requestedIndex]);

  useEffect(() => {
    if (!isViewerLoaded) return;

    const timer = window.setTimeout(() => setShowInstruction(false), 4200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isViewerLoaded]);

  const adjustZoom = (delta: number) => {
    const activeViewerScene = scenesRef.current[activeIndex];
    if (!activeViewerScene) return;

    const nextFov = Math.min(
      MAX_TOUR_FOV,
      Math.max(MIN_TOUR_FOV, activeViewerScene.view.fov() + delta)
    );
    activeViewerScene.view.setFov(nextFov);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await containerRef.current.requestFullscreen();
  };

  return (
    <section id="recorrido-360" aria-labelledby="tour-360-title" className="scroll-mt-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#1A1A1A] shadow-2xl">
          <div
            className="relative aspect-[4/5] min-h-[340px] md:aspect-[16/9] md:min-h-[560px]"
            onPointerDown={() => setShowInstruction(false)}
          >
            <div
              ref={containerRef}
              aria-label="Visor panorámico de las instalaciones de Del Carpio"
              className="absolute inset-0"
            />

            {!isViewerLoaded && !hasLoadError && (
              <div className="absolute inset-0 z-30 flex min-h-[300px] flex-col items-center justify-center bg-[#1A1A1A] md:min-h-[500px]">
                <div className="mb-3 size-8 animate-spin rounded-full border-2 border-white/30 border-t-[#D6532B]" />
                <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/80">
                  Cargando recorrido 360°
                </p>
              </div>
            )}

            {hasLoadError && (
              <div className="absolute inset-0 z-30 flex min-h-[300px] items-center justify-center bg-[#1A1A1A] px-6 text-center md:min-h-[500px]">
                <p className="max-w-sm text-sm leading-6 text-white/90">
                  No fue posible cargar el recorrido en este momento.
                </p>
              </div>
            )}

            {isViewerLoaded && showInstruction && (
              <div className="pointer-events-none absolute bottom-24 left-5 z-20 md:bottom-28">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#1A1A1A]/85 px-3.5 py-2 text-white backdrop-blur-md">
                  <Signpost size={15} className="animate-pulse text-[#D6532B]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em]">Arrastre para explorar</span>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#1A1A1A]/90 p-4 backdrop-blur-md md:p-5">
              <nav aria-label="Controles de recorrido" className="flex items-center justify-between gap-3">
                <SceneStepButton
                  label="Punto anterior"
                  disabled={previousIndex === null}
                  onClick={() => previousIndex !== null && goToScene(previousIndex)}
                >
                  <CaretLeft size={17} weight="bold" />
                  <span className="hidden sm:inline">Anterior</span>
                </SceneStepButton>
                <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/80 font-display">
                  {activeScene.label} · {activeScene.title}
                </p>
                <SceneStepButton
                  label="Avanzar al siguiente punto"
                  disabled={nextIndex === null}
                  onClick={() => nextIndex !== null && goToScene(nextIndex)}
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ArrowRight size={17} weight="bold" />
                </SceneStepButton>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tour-marzipano-hotspot {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border: 1px solid #d6532b;
          border-radius: 999px;
          background: #f5f5f5;
          color: #4a5560;
          cursor: pointer;
          font-family: var(--font-montserrat), Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          transition: transform 180ms ease-out, background-color 180ms ease-out, color 180ms ease-out;
        }

        .tour-marzipano-hotspot:hover {
          background: #d6532b;
          color: #f5f5f5;
          transform: scale(1.06);
        }

        .tour-marzipano-hotspot:focus-visible {
          outline: 2px solid #fbe369;
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .tour-marzipano-hotspot {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function ViewerControl({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center border border-white/30 bg-[#4A5560]/90 text-white transition-colors hover:border-[#FBE369] hover:text-[#FBE369] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
    >
      {children}
    </button>
  );
}

function SceneStepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-2 border border-white/30 px-3 text-xs font-bold text-white transition-colors hover:border-[#FBE369] hover:text-[#FBE369] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369] disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}
