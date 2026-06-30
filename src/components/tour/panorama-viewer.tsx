"use client";

import { ArrowRight, CaretLeft, Signpost, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import ReactPannellum, {
  addScene,
  getCurrentScene,
  loadScene,
} from "react-pannellum";

const tourScenes = [
  {
    id: "laboratorio-escena-01",
    label: "Punto 01",
    title: "Entrada al laboratorio",
    description: "Vista inicial del recorrido 360 con acceso al area analitica.",
    imageSource: "/tour/recorrido/escena-01.jpg",
    yaw: 0,
    pitch: 0,
    nextYaw: 34,
    previousYaw: null,
  },
  {
    id: "laboratorio-escena-02",
    label: "Punto 02",
    title: "Zona central de analisis",
    description: "Mesones, equipos y circulacion interior del laboratorio.",
    imageSource: "/tour/recorrido/escena-02.jpg",
    yaw: -12,
    pitch: 0,
    nextYaw: 22,
    previousYaw: -148,
  },
  {
    id: "laboratorio-escena-03",
    label: "Punto 03",
    title: "Area de instrumentacion",
    description: "Vista de equipos y estaciones de trabajo desde el interior.",
    imageSource: "/tour/recorrido/escena-03.jpg",
    yaw: 4,
    pitch: 0,
    nextYaw: null,
    previousYaw: -118,
  },
];

const commonPanoramaConfig = {
  autoLoad: true,
  autoRotate: false,
  showControls: true,
  showFullscreenCtrl: true,
  showZoomCtrl: true,
  keyboardZoom: true,
  draggable: true,
  mouseZoom: true,
  compass: false,
  type: "equirectangular",
  hfov: 100,
  minHfov: 55,
  maxHfov: 120,
  backgroundColor: [0.063, 0.094, 0.125],
};

function buildSceneConfig(index: number, reduceMotion: boolean) {
  const scene = tourScenes[index];
  const hotSpots = [];

  if (scene.nextYaw !== null && index < tourScenes.length - 1) {
    const target = tourScenes[index + 1];
    hotSpots.push({
      id: `${scene.id}-next`,
      pitch: -10,
      yaw: scene.nextYaw,
      type: "scene",
      text: `Avanzar a ${target.label}`,
      sceneId: target.id,
      targetPitch: target.pitch,
      targetYaw: target.yaw,
      targetHfov: 96,
      cssClass: "tour-scene-hotspot tour-scene-hotspot-next",
    });
  }

  if (scene.previousYaw !== null && index > 0) {
    const target = tourScenes[index - 1];
    hotSpots.push({
      id: `${scene.id}-previous`,
      pitch: -10,
      yaw: scene.previousYaw,
      type: "scene",
      text: `Volver a ${target.label}`,
      sceneId: target.id,
      targetPitch: target.pitch,
      targetYaw: target.yaw,
      targetHfov: 96,
      cssClass: "tour-scene-hotspot tour-scene-hotspot-previous",
    });
  }

  return {
    ...commonPanoramaConfig,
    imageSource: scene.imageSource,
    pitch: scene.pitch,
    yaw: scene.yaw,
    sceneFadeDuration: reduceMotion ? 0 : 700,
    hotSpots,
  };
}

export function PanoramaViewer() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);

  const activeScene = tourScenes[activeIndex];
  const previousIndex = activeIndex > 0 ? activeIndex - 1 : null;
  const nextIndex = activeIndex < tourScenes.length - 1 ? activeIndex + 1 : null;

  const goToScene = useCallback((index: number) => {
    if (index === activeIndex || index < 0 || index >= tourScenes.length) return;
    setShowInstruction(true);
    setActiveIndex(index);
    loadScene(tourScenes[index].id, tourScenes[index].pitch, tourScenes[index].yaw, 96);
  }, [activeIndex]);

  useEffect(() => {
    const checkInterval = window.setInterval(() => {
      const loadBox = document.querySelector("#tour-laboratorio-seccion1 .pnlm-load-box");
      if (!loadBox) return;

      const isHidden = (loadBox as HTMLElement).style.display === "none";
      if (isHidden) {
        setIsViewerLoaded(true);
        window.clearInterval(checkInterval);
      }
    }, 180);

    const fallbackTimer = window.setTimeout(() => {
      setIsViewerLoaded(true);
      window.clearInterval(checkInterval);
    }, 2600);

    return () => {
      window.clearInterval(checkInterval);
      window.clearTimeout(fallbackTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    let attempts = 0;
    const sceneSetup = window.setInterval(() => {
      attempts += 1;
      if (!getCurrentScene() && attempts < 80) return;

      tourScenes.slice(1).forEach((scene, sceneIndex) => {
        addScene(scene.id, buildSceneConfig(sceneIndex + 1, Boolean(reduceMotion)));
      });
      window.clearInterval(sceneSetup);
    }, 150);

    return () => window.clearInterval(sceneSetup);
  }, [reduceMotion]);

  useEffect(() => {
    if (!isViewerLoaded) return;

    const timer = window.setTimeout(() => {
      setShowInstruction(false);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isViewerLoaded]);

  useEffect(() => {
    const sceneSync = window.setInterval(() => {
      const currentSceneId = getCurrentScene();
      const currentIndex = tourScenes.findIndex((scene) => scene.id === currentSceneId);
      if (currentIndex >= 0 && currentIndex !== activeIndex) {
        setActiveIndex(currentIndex);
        setShowInstruction(true);
      }
    }, 180);

    return () => window.clearInterval(sceneSync);
  }, [activeIndex]);

  const config = useMemo(
    () => buildSceneConfig(0, Boolean(reduceMotion)),
    [reduceMotion]
  );

  const handleUserInteraction = () => {
    if (showInstruction) setShowInstruction(false);
  };

  return (
    <section
      aria-labelledby="tour-360-title"
      className="mt-10 bg-[#101820] px-4 py-10 text-white md:mt-12 md:px-6 md:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D5542B] md:text-xs">
            Tour virtual Del Carpio
          </p>
          <h2
            id="tour-360-title"
            className="mt-5 font-display text-[32px] font-bold leading-[1.05] text-[#F5F5F5] md:text-[40px] lg:text-[48px]"
          >
            Laboratorio de An&aacute;lisis
          </h2>
        </header>

        <div className="relative mt-10 overflow-hidden rounded-[18px] border border-white/10 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div
            className="relative aspect-[4/5] min-h-[300px] md:aspect-video md:min-h-[500px]"
            onMouseMove={handleUserInteraction}
            onTouchStart={handleUserInteraction}
          >
            {!isViewerLoaded && (
              <div className="absolute inset-0 z-30 flex min-h-[300px] flex-col items-center justify-center bg-[#101820] transition-opacity duration-300 md:min-h-[500px]">
                <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#D5542B]/20 border-t-[#D5542B]" />
                <p className="font-sans text-[11px] uppercase tracking-wider text-white/50">
                  Cargando escena {String(activeIndex + 1).padStart(2, "0")}...
                </p>
              </div>
            )}

            <ReactPannellum
              id="tour-laboratorio-seccion1"
              sceneId={tourScenes[0].id}
              imageSource={tourScenes[0].imageSource}
              config={config}
              style={{
                width: "100%",
                minHeight: "inherit",
                height: "100%",
                background: "#101820",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_36%,rgba(16,24,32,0.34)_100%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="absolute left-4 top-4 z-20 max-w-[min(320px,calc(100%-96px))] rounded-2xl border border-white/10 bg-[#101820]/72 px-4 py-3 text-white shadow-[0_16px_38px_rgba(0,0,0,0.2)] backdrop-blur-md md:left-5 md:top-5"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#D5542B]">
                  {activeScene.label} / {String(tourScenes.length).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-5 text-white md:text-lg">
                  {activeScene.title}
                </h3>
                <p className="mt-1 hidden text-xs leading-5 text-white/68 md:block">
                  {activeScene.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-4 top-4 z-20 flex gap-2 md:right-5 md:top-5">
              <Link
                href="/contacto"
                aria-label="Cerrar tour virtual"
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-[#101820]/68 text-white/82 backdrop-blur transition hover:scale-[1.04] hover:border-white/28 hover:bg-[#D5542B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
              >
                <X size={17} weight="bold" />
              </Link>
            </div>

            {isViewerLoaded && showInstruction && (
              <div className="pointer-events-none absolute bottom-24 left-4 z-20 animate-fade-in md:bottom-28 md:left-5">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101820]/75 px-3.5 py-1.5 text-white/90 backdrop-blur-md">
                  <Signpost size={14} className="animate-pulse text-[#D5542B]" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">
                    Arrastra para explorar
                  </span>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,rgba(16,24,32,0)_0%,rgba(16,24,32,0.72)_46%,rgba(16,24,32,0.94)_100%)] p-3 pt-16 md:p-5 md:pt-20">
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
                          ? "border-[#D5542B] bg-[#D5542B] text-white"
                          : "border-white/12 bg-[#101820]/72 text-white/58"
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
        #tour-laboratorio-seccion1 .pnlm-container {
          min-height: 300px;
          background: #101820;
          font-family: var(--font-open-sans), Arial, sans-serif;
        }

        @media (min-width: 768px) {
          #tour-laboratorio-seccion1 .pnlm-container {
            min-height: 500px;
          }
        }

        #tour-laboratorio-seccion1 .pnlm-controls {
          background-color: rgba(16, 24, 32, 0.82);
          border-color: rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(16, 24, 32, 0.18);
        }

        #tour-laboratorio-seccion1 .pnlm-control:hover {
          background-color: #d5542b;
        }

        #tour-laboratorio-seccion1 .pnlm-controls-container {
          left: 14px;
          top: 14px;
        }

        #tour-laboratorio-seccion1 .pnlm-load-box,
        #tour-laboratorio-seccion1 .pnlm-load-button,
        #tour-laboratorio-seccion1 .pnlm-about-msg,
        #tour-laboratorio-seccion1 .pnlm-panorama-info {
          background-color: rgba(16, 24, 32, 0.9);
          color: #ffffff;
        }

        #tour-laboratorio-seccion1 .pnlm-lbar {
          border-color: rgba(255, 255, 255, 0.6);
        }

        #tour-laboratorio-seccion1 .pnlm-lbar-fill,
        #tour-laboratorio-seccion1 .pnlm-loading {
          background: #d5542b;
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot {
          position: relative;
          width: 52px;
          height: 52px;
          border: 1px solid rgba(213, 84, 43, 0.7);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
          cursor: pointer;
          transition:
            transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 180ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot::before,
        #tour-laboratorio-seccion1 .tour-scene-hotspot::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          background: #101820;
          transform: translate(-50%, -50%);
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot::before {
          width: 18px;
          height: 2px;
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot::after {
          width: 2px;
          height: 18px;
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot:hover {
          transform: scale(1.06);
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.32);
        }

        #tour-laboratorio-seccion1 .tour-scene-hotspot .pnlm-tooltip span {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(16, 24, 32, 0.92);
          color: #ffffff;
          font-family: var(--font-open-sans), Arial, sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          white-space: nowrap;
        }
      `}</style>
    </section>
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
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-[#101820]/72 px-4 text-xs font-bold text-white/86 backdrop-blur transition hover:border-white/28 hover:bg-[#D5542B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/12 disabled:hover:bg-[#101820]/72"
    >
      {children}
    </button>
  );
}
