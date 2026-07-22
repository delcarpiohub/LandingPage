"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";

export function ContactCTA() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="bg-white w-full py-16 px-5 relative overflow-hidden flex items-center justify-center">
      
      {/* 50%/50% split card with Del Carpio's Ink (#4A5560) background and interactive spotlight */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-[1296px] mx-auto bg-[#4A5560] p-6 md:p-12 lg:p-[80px] rounded-[4px] flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden min-h-[430px]"
        style={{
          boxShadow: isHovered ? "0 12px 40px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        {/* Innovative interactive terracota spotlight overlay */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(213, 84, 43, 0.12) 0%, transparent 70%)",
              left: `${coords.x - 250}px`,
              top: `${coords.y - 250}px`,
              zIndex: 0,
            }}
          />
        )}

        {/* Subtle technical corner lines */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20 border-t border-r border-white z-10" />
        
        {/* Left Column (50% width on desktop, text and button) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start justify-center relative z-10">
          <h2 
            className="font-display text-[26px] md:text-[32px] font-bold text-white leading-[1.18] max-w-[650px] tracking-tight"
          >
            Póngase en contacto con nosotros si tiene preguntas, o necesita ayuda.
          </h2>
          
          <div className="mt-[28px]">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/contacto"
                className="inline-flex cursor-pointer border border-white bg-transparent hover:bg-white hover:text-[#4A5560] text-white font-display text-sm font-bold tracking-wider uppercase py-4 px-[42px] rounded-[2px] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                CONTACTE CON NOSOTROS
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column (50% width on desktop, Image Ayuda 1) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative z-10">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] aspect-[4/3] select-none">
            <Image 
              src="/contacto-ayuda-1.png" 
              alt="Ayuda y soporte Del Carpio" 
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-contain object-center drop-shadow-2xl"
              priority
            />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
