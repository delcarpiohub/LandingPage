"use client";

import { tourScenes } from "@/content/tour-scenes";
import type { TourSceneId } from "@/content/tour-scenes";

type TourSceneNavigationProps = {
  activeSceneId: TourSceneId;
  onSceneSelect: (sceneId: TourSceneId) => void;
};

export function TourSceneNavigation({
  activeSceneId,
  onSceneSelect,
}: TourSceneNavigationProps) {
  return (
    <nav
      aria-label="Puntos del recorrido virtual"
      className="border-y border-[#707E83]/35 bg-[#F5F5F5]"
    >
      <ol className="mx-auto flex max-w-[1280px] overflow-x-auto px-5 md:px-8">
        {tourScenes.map((scene, index) => {
          const isActive = scene.id === activeSceneId;

          return (
            <li key={scene.id} className="shrink-0">
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => onSceneSelect(scene.id)}
                className={`group relative flex h-16 items-center gap-3 border-r border-[#707E83]/25 px-4 text-left transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B] md:px-5 ${
                  isActive ? "text-[#4A5560]" : "text-[#707E83] hover:text-[#4A5560]"
                }`}
              >
                <span className="font-mono text-[11px] font-extrabold tracking-[0.14em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-28 text-xs font-bold leading-tight md:max-w-36">{scene.title}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 bottom-0 h-0.5 bg-[#D6532B] transition-opacity md:inset-x-5 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
