"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  type = "precision",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "precision" | "standard";
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className || ""}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Precision measurement indicator line */}
      {type === "precision" && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-[#D5542B]/30 origin-left z-20 pointer-events-none"
        />
      )}
      {children}
    </motion.div>
  );
}
