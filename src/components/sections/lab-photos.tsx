"use client";

import { motion } from "motion/react";

const capabilities = [
  "HPLC-DAD",
  "GC-FID",
  "HPLC-MS/MS",
  "CALIFICACIÓN IQ/OQ/PQ",
  "NORMA NCh-ISO 17025",
  "GC-MS",
  "SOPORTE TÉCNICO EN SITIO",
  "ICP-OES",
  "VALIDACIÓN DE MÉTODOS",
];

const duplicatedItems = [...capabilities, ...capabilities, ...capabilities];

export function LabPhotos() {
  return (
    <section className="bg-[#101820] overflow-hidden py-6 border-y border-white/10 select-none">
      <div className="relative flex max-w-full items-center">
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          className="flex whitespace-nowrap gap-16 min-w-full items-center"
        >
          {duplicatedItems.map((capability, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-white/90">
                {capability}
              </span>
              <span className="inline-block size-1.5 rounded-full bg-[var(--primary)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
