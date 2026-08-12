"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type SolutionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SolutionReveal({
  children,
  className,
  delay = 0,
}: SolutionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.24, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
