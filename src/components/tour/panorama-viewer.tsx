"use client";

import {
  Signpost,
  X,
} from "@phosphor-icons/react";
import ReactPannellum from "react-pannellum";

type PanoramaViewerProps = {
  imageSource: string;
};

const bottomControls = [
  { label: "Recorrido", icon: Signpost, active: true },
];

export function PanoramaViewer({ imageSource }: PanoramaViewerProps) {
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
          <div className="relative aspect-[4/5] min-h-[300px] md:aspect-video md:min-h-[500px]">
            <ReactPannellum
              id="tour-laboratorio-seccion1"
              sceneId="laboratorio-analisis-360"
              imageSource={imageSource}
              config={{
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
                pitch: 0,
                yaw: 0,
                backgroundColor: [0.063, 0.094, 0.125],
              }}
              style={{
                width: "100%",
                minHeight: "inherit",
                height: "100%",
                background: "#101820",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_36%,rgba(16,24,32,0.34)_100%)]" />

            <div className="absolute right-4 top-4 z-20 flex gap-2 md:right-5 md:top-5">
              <ViewerIconButton label="Cerrar vista previa" icon={X} />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,rgba(16,24,32,0)_0%,rgba(16,24,32,0.72)_46%,rgba(16,24,32,0.94)_100%)] p-3 pt-16 md:p-5 md:pt-20">
              <nav
                aria-label="Controles del tour virtual"
                className="flex gap-2 overflow-x-auto pb-1"
              >
                {bottomControls.map((control) => {
                  const Icon = control.icon;

                  return (
                    <button
                      key={control.label}
                      type="button"
                      aria-pressed={control.active ? "true" : "false"}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B] ${
                        control.active
                          ? "border-[#D5542B] bg-[#D5542B] text-white"
                          : "border-white/12 bg-[#101820]/72 text-white/76 hover:border-white/28 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={16} weight="bold" />
                      {control.label}
                    </button>
                  );
                })}
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
      `}</style>
    </section>
  );
}

function ViewerIconButton({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-white/12 bg-[#101820]/68 text-white/82 backdrop-blur transition hover:scale-[1.04] hover:border-white/28 hover:bg-[#D5542B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
    >
      <Icon size={17} weight="bold" />
    </button>
  );
}
