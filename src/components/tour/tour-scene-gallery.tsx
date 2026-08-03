"use client";

import Image from "next/image";
import { tourScenes } from "@/content/tour-scenes";
import type { TourSceneId } from "@/content/tour-scenes";

type TourSceneGalleryProps = {
  activeSceneId: TourSceneId;
  onSceneSelect: (sceneId: TourSceneId) => void;
};

export function TourSceneGallery({ activeSceneId, onSceneSelect }: TourSceneGalleryProps) {
  return (
    <section id="areas-del-recorrido" aria-labelledby="areas-del-recorrido-title" className="bg-[#F5F5F5]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
            Areas del recorrido
          </p>
          <h2 id="areas-del-recorrido-title" className="mt-3 font-display text-3xl font-extrabold leading-tight text-[#4A5560] md:text-4xl">
            Un laboratorio se entiende mejor en contexto.
          </h2>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden bg-[#707E83]/35 md:grid-cols-2 lg:grid-cols-3">
          {tourScenes.map((scene, index) => {
            const isActive = scene.id === activeSceneId;

            return (
              <button
                key={scene.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSceneSelect(scene.id)}
                className={`group relative min-h-64 overflow-hidden bg-[#4A5560] text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FBE369] md:min-h-72 ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Image
                  src={scene.imageSource}
                  alt={`Vista panoramica: ${scene.title}`}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#4A5560]/55 transition-colors duration-200 group-hover:bg-[#4A5560]/35 motion-reduce:transition-none" />
                <div className="absolute inset-x-0 bottom-0 border-t border-white/25 bg-[#4A5560]/90 px-4 py-3 text-white md:px-5 md:py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FBE369]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 text-sm font-extrabold">{scene.title}</p>
                    </div>
                    <span className={`size-2 rounded-full ${isActive ? "bg-[#D6532B]" : "bg-white/65"}`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
