"use client";

import {
  ArrowsOut,
  ArrowRight,
  CaretLeft,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Signpost,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { RectilinearView, Scene, Viewer } from "marzipano";

const TOUR_FOV = (100 * Math.PI) / 180;
const MIN_TOUR_FOV = (55 * Math.PI) / 180;
const MAX_TOUR_FOV = (120 * Math.PI) / 180;
const HOTSPOT_PITCH = (-12 * Math.PI) / 180;

const tourScenes = [
  {
    id: "escena-00",
    label: "Escena 01",
    title: "Entrada del Laboratorio",
    description: "Acceso principal y punto de partida del recorrido virtual.",
    imageSource: "/tour/recorrido/escena-00.jpg",
    yaw: 0,
    pitch: 0,
    nextYaw: 38,
    previousYaw: null,
  },
  {
    id: "escena-01",
    label: "Escena 02",
    title: "Zona de Análisis",
    description: "Área de trabajo analítico y circulación interior del laboratorio.",
    imageSource: "/tour/recorrido/escena-01.jpg",
    yaw: 0,
    pitch: 0,
    nextYaw: 38,
    previousYaw: -150,
  },
  {
    id: "escena-02",
    label: "Escena 03",
    title: "Mesón Central",
    description: "Mesón de trabajo central con equipos e instrumentación en operación.",
    imageSource: "/tour/recorrido/escena-02.jpg",
    yaw: 0,
    pitch: 0,
    nextYaw: 35,
    previousYaw: -140,
  },
  {
    id: "escena-03",
    label: "Escena 04",
    title: "Área ICP-OES / ICP-MS",
    description: "Estación de instrumentación para análisis por ICP-OES e ICP-MS.",
    imageSource: "/tour/recorrido/escena-03.jpg",
    yaw: 0,
    pitch: 0,
    nextYaw: null,
    previousYaw: -130,
  },
] as const;

type TourSceneIndex = (typeof tourScenes)[number];

type ViewerScene = {
  scene: Scene;
  view: RectilinearView;
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

export function PanoramaViewer() {
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

  const goToScene = useCallback(
    (index: number) => {
      if (index === activeIndex || index < 0 || index >= tourScenes.length) return;

      const target = scenesRef.current[index];
      if (!target) return;

      setShowInstruction(true);
      setActiveIndex(index);
      target.scene.switchTo({ transitionDuration: reduceMotion ? 0 : 650 });
    },
    [activeIndex, reduceMotion]
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

          const addHotspot = (
            targetIndex: number,
            yaw: number,
            direction: "next" | "previous"
          ) => {
            const hotspot = document.createElement("button");
            hotspot.type = "button";
            hotspot.className = `tour-marzipano-hotspot tour-marzipano-hotspot-${direction}`;
            hotspot.textContent = direction === "next" ? "→" : "←";
            hotspot.setAttribute(
              "aria-label",
              direction === "next" ? "Avanzar en el recorrido" : "Volver a la escena anterior"
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
      viewerRef.current?.destroy();
      viewerRef.current = null;
      marzipanoViewer?.destroy();
    };
  }, []);

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

  const handleUserInteraction = () => {
    if (showInstruction) setShowInstruction(false);
  };

  return (
    <section
      aria-labelledby="tour-360-title"
      className="mt-10 bg-[#4A5560] px-4 py-10 text-white md:mt-12 md:px-6 md:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D6532B] md:text-xs">
            Tour virtual Del Carpio
          </p>
          <h2
            id="tour-360-title"
            className="mt-5 font-display text-[32px] font-bold leading-[1.05] text-[#F5F5F5] md:text-[40px] lg:text-[48px]"
          >
            Laboratorio de Análisis
          </h2>
        </header>

        <div className="relative mt-10 overflow-hidden rounded-[18px] border border-white/10 bg-[#4A5560]">
          <div
            className="relative aspect-[4/5] min-h-[300px] md:aspect-video md:min-h-[500px]"
            onPointerDown={handleUserInteraction}
          >
            <div
              ref={containerRef}
              aria-label="Visor panorámico del laboratorio de Del Carpio"
              className="absolute inset-0"
            />

            {!isViewerLoaded && !hasLoadError && (
              <div className="absolute inset-0 z-30 flex min-h-[300px] flex-col items-center justify-center bg-[#4A5560] transition-opacity duration-300 md:min-h-[500px]">
                <div className="mb-3 size-8 animate-spin rounded-full border-2 border-[#D6532B]/20 border-t-[#D6532B]" />
                <p className="font-sans text-[11px] uppercase tracking-wider text-white/50">
                  Cargando recorrido...
                </p>
              </div>
            )}

            {hasLoadError && (
              <div className="absolute inset-0 z-30 flex min-h-[300px] items-center justify-center bg-[#4A5560] px-6 text-center md:min-h-[500px]">
                <p className="max-w-sm text-sm leading-6 text-white/80">
                  No fue posible cargar el recorrido en este momento.
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_36%,rgba(74,85,96,0.34)_100%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="pointer-events-none absolute left-4 top-4 z-20 max-w-[min(320px,calc(100%-152px))] rounded-2xl border border-white/10 bg-[#4A5560]/72 px-4 py-3 text-white backdrop-blur-md md:left-5 md:top-5"
              >
                <p className="font-mono text-xs font-bold text-[#D6532B]">
                  ESCENA {activeIndex + 1} / {tourScenes.length} - {activeScene.title}
                </p>
                <p className="mt-1 hidden text-xs leading-5 text-white/80 md:block">
                  {activeScene.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-4 top-4 z-20 flex gap-2 md:right-5 md:top-5">
              <ViewerControl label="Alejar vista" onClick={() => adjustZoom(0.12)}>
                <MagnifyingGlassMinus size={17} weight="bold" />
              </ViewerControl>
              <ViewerControl label="Acercar vista" onClick={() => adjustZoom(-0.12)}>
                <MagnifyingGlassPlus size={17} weight="bold" />
              </ViewerControl>
              <ViewerControl label="Ver en pantalla completa" onClick={toggleFullscreen}>
                <ArrowsOut size={17} weight="bold" />
              </ViewerControl>
              <Link
                href="/contacto"
                aria-label="Cerrar tour virtual"
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-[#4A5560]/68 text-white/80 backdrop-blur transition hover:border-white/28 hover:bg-[#D6532B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
              >
                <X size={17} weight="bold" />
              </Link>
            </div>

            {isViewerLoaded && showInstruction && (
              <div className="pointer-events-none absolute bottom-24 left-4 z-20 animate-fade-in md:bottom-28 md:left-5">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#4A5560]/75 px-3.5 py-1.5 text-white/90 backdrop-blur-md">
                  <Signpost size={14} className="animate-pulse text-[#D6532B]" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">
                    Arrastra para explorar
                  </span>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,rgba(74,85,96,0)_0%,rgba(74,85,96,0.72)_46%,rgba(74,85,96,0.94)_100%)] p-3 pt-16 md:p-5 md:pt-20">
              <nav
                aria-label="Puntos del recorrido virtual"
                className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
              >
                <ol className="flex gap-2 overflow-x-auto pb-1">
                  {tourScenes.map((scene, index) => (
                    <li
                      key={scene.id}
                      aria-current={index === activeIndex ? "step" : undefined}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${
                        index === activeIndex
                          ? "border-[#D6532B] bg-[#D6532B] text-white"
                          : "border-white/12 bg-[#4A5560]/72 text-white/80"
                      }`}
                    >
                      <Signpost size={16} weight="bold" />
                      {scene.label}
                    </li>
                  ))}
                </ol>

                <div className="flex items-center gap-2">
                  <SceneStepButton
                    label="Escena anterior"
                    disabled={previousIndex === null}
                    onClick={() => previousIndex !== null && goToScene(previousIndex)}
                  >
                    <CaretLeft size={16} weight="bold" />
                  </SceneStepButton>
                  <SceneStepButton
                    label="Avanzar en el recorrido"
                    disabled={nextIndex === null}
                    onClick={() => nextIndex !== null && goToScene(nextIndex)}
                  >
                    <span>Avanzar</span>
                    <ArrowRight size={15} weight="bold" />
                  </SceneStepButton>
                </div>
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
          border: 1px solid rgba(214, 83, 43, 0.7);
          border-radius: 999px;
          background: rgba(245, 245, 245, 0.96);
          color: #4A5560;
          cursor: pointer;
          font-family: var(--font-montserrat), Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          transition:
            transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
            background-color 180ms ease-out,
            color 180ms ease-out;
        }

        .tour-marzipano-hotspot:hover {
          background: #D6532B;
          color: #F5F5F5;
          transform: scale(1.06);
        }

        .tour-marzipano-hotspot:focus-visible {
          outline: 2px solid #FBE369;
          outline-offset: 4px;
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
      className="grid size-10 place-items-center rounded-full border border-white/12 bg-[#4A5560]/68 text-white/80 backdrop-blur transition hover:border-white/28 hover:bg-[#D6532B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
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
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-[#4A5560]/72 px-4 text-xs font-bold text-white/80 backdrop-blur transition hover:border-white/28 hover:bg-[#D6532B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/12 disabled:hover:bg-[#4A5560]/72"
    >
      {children}
    </button>
  );
}
