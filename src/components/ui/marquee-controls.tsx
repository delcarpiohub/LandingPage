import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeControlsProps {
  onStep: (direction: 1 | -1) => void;
  className?: string;
}

const buttonClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center border border-ink-border bg-white px-3 text-ink transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";

export function MarqueeControls({ onStep, className }: MarqueeControlsProps) {
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
