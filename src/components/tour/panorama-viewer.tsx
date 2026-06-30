"use client";

import ReactPannellum from "react-pannellum";

type PanoramaViewerProps = {
  imageSource: string;
};

export function PanoramaViewer({ imageSource }: PanoramaViewerProps) {
  return (
    <section
      aria-label="Visor interactivo 360 grados del laboratorio"
      className="mt-8 overflow-hidden border border-[#101820]/10 bg-[#101820] shadow-[0_18px_50px_rgba(16,24,32,0.08)]"
    >
      <div className="relative min-h-[300px] md:min-h-[500px]">
        <ReactPannellum
          id="tour-laboratorio-seccion1"
          sceneId="laboratorio-analisis-360"
          imageSource={imageSource}
          config={{
            autoLoad: true,
            autoRotate: 0.3,
            hPer: 0.3,
            showControls: true,
            showFullscreenCtrl: true,
            showZoomCtrl: true,
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

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-[linear-gradient(180deg,rgba(16,24,32,0.88)_0%,rgba(16,24,32,0.48)_58%,rgba(16,24,32,0)_100%)] p-5 md:p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#D5542B]">
            Visor 360
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            Laboratorio de An&aacute;lisis
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold leading-6 text-white/86 md:text-lg">
            AA {"\u00b7"} ICP-OES {"\u00b7"} ICP-MS
          </p>
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
          background-color: #101820;
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 30px rgba(16, 24, 32, 0.18);
        }

        #tour-laboratorio-seccion1 .pnlm-control:hover {
          background-color: #d5542b;
        }

        #tour-laboratorio-seccion1 .pnlm-load-box,
        #tour-laboratorio-seccion1 .pnlm-load-button,
        #tour-laboratorio-seccion1 .pnlm-about-msg,
        #tour-laboratorio-seccion1 .pnlm-panorama-info {
          background-color: rgba(16, 24, 32, 0.88);
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
