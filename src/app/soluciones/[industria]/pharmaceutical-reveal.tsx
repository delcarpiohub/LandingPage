"use client";

import type { ReactNode } from "react";

import styles from "./pharmaceutical-reveal.module.css";
type PharmaceuticalRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PharmaceuticalReveal({
  children,
  className,
  delay = 0,
}: PharmaceuticalRevealProps) {
  const classes = [styles.reveal, className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={{ animationDelay: `${delay * 1000}ms` }}>
      {children}
    </div>
  );
}
