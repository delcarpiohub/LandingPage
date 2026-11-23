import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeControlsProps {
  isPlaying: boolean;
  /** Sin movimiento reducido: solo existen anterior/siguiente. */
  canAutoplay: boolean;
  onTogglePlay: () => void;
  onStep: (direction: 1 | -1) => void;
  className?: string;
}

const buttonClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-ink-border bg-white px-3 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";

export function MarqueeControls({
  isPlaying,
  canAutoplay,
  onTogglePlay,
  onStep,
  className,
}: MarqueeControlsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <button
        type="button"
        className={buttonClass}
        aria-label="Testimonio anterior"
        onClick={() => onStep(-1)}
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>

      {canAutoplay && (
        <button
          type="button"
          className={buttonClass}
          aria-label={
            isPlaying
              ? "Pausar el carrusel de testimonios"
              : "Reproducir el carrusel de testimonios"
          }
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="size-4" />
          ) : (
            <Play aria-hidden="true" className="size-4" />
          )}
          <span aria-hidden="true">{isPlaying ? "Pausar" : "Reproducir"}</span>
        </button>
      )}

      <button
        type="button"
        className={buttonClass}
        aria-label="Testimonio siguiente"
        onClick={() => onStep(1)}
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
