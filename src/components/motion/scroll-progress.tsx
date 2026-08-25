"use client";

import { motion, useScroll } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-[var(--primary)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
