const TOP_PATH =
  "M 150 0 L 150 80 Q 150 100 170 100 L 300 100 M 180 0 L 180 60 Q 180 80 200 80 L 300 80 M 300 160 L 220 160 Q 200 160 200 180 L 200 300";

const BOTTOM_PATH =
  "M 300 180 L 200 180 Q 180 180 180 200 L 180 300 M 300 240 L 240 240 Q 220 240 220 260 L 220 300";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const SIZE_CLASSES = {
  sm: "w-[180px] md:w-[260px] h-[180px] md:h-[260px]",
  md: "w-[240px] md:w-[360px] h-[240px] md:h-[360px]",
} as const;

/**
 * Accesorio de diseño discreto para bordes de sección — línea técnica
 * tipo "cañería" en las esquinas, casi invisible (5-8% opacidad).
 * Usar con moderación: no todas las secciones lo necesitan.
 */
export function PipeCornerAccent({
  corner,
  tone = "light",
  size = "md",
  className = "",
}: {
  corner: Corner;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  const isTop = corner.startsWith("top");
  const isLeft = corner.endsWith("left");

  const positionClasses = `${isTop ? "top-0" : "bottom-0"} ${isLeft ? "left-0" : "right-0"}`;
  const colorClass = tone === "dark" ? "text-white/8" : "text-black/5";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute z-0 ${positionClasses} ${SIZE_CLASSES[size]} ${colorClass} ${isLeft ? "-scale-x-100" : ""} ${className}`}
      fill="none"
      viewBox="0 0 300 300"
    >
      <path
        d={isTop ? TOP_PATH : BOTTOM_PATH}
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
