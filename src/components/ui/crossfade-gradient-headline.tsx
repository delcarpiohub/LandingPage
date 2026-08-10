"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CrossfadeWord {
  text: string;
  from: string;
  to: string;
}

interface CrossfadeGradientHeadlineProps {
  words: [CrossfadeWord, CrossfadeWord, CrossfadeWord];
  className?: string;
}

const BACKGROUND_ANIMATION = [
  "before:animate-gradient-background-1",
  "before:animate-gradient-background-2",
  "before:animate-gradient-background-3",
] as const;

const FOREGROUND_ANIMATION = [
  "animate-gradient-foreground-1",
  "animate-gradient-foreground-2",
  "animate-gradient-foreground-3",
] as const;

// Crossfade decorativo: cada palabra alterna entre su gradiente de marca y un
// texto plano (before::) para que el layout nunca salte, solo cambia el color.
export function CrossfadeGradientHeadline({ words, className }: CrossfadeGradientHeadlineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full border border-[var(--border)] p-8 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]",
        className,
      )}
    >
      <Plus className="absolute -left-4 -top-4 h-8 w-8 text-[var(--primary)]" />
      <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-[var(--primary)]" />
      <Plus className="absolute -right-4 -top-4 h-8 w-8 text-[var(--primary)]" />
      <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-[var(--primary)]" />

      <p className="flex select-none flex-col items-center px-3 py-2 text-center text-4xl font-extrabold uppercase leading-none sm:text-6xl lg:flex-row lg:gap-3 lg:text-7xl">
        {words.map((word, i) => (
          <span
            key={word.text}
            data-content={word.text}
            className={cn(
              "relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:text-[var(--foreground)] before:content-[attr(data-content)]",
              BACKGROUND_ANIMATION[i],
            )}
          >
            <span
              className={cn("relative bg-clip-text px-2 text-transparent sm:px-5", FOREGROUND_ANIMATION[i])}
              style={{ backgroundImage: `linear-gradient(to right, ${word.from}, ${word.to})` }}
            >
              {word.text}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
