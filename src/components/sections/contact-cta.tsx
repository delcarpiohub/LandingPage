"use client";

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

  // SVG Motion variants
  const svgCircleVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 25, ease: "linear" as const, repeat: Infinity } }
  };

  const pullerVariants = {
    initial: { y: 0 },
    hover: { y: [0, -2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const } }
  };

  const climberVariants = {
    initial: { y: 0, x: 0 },
    hover: { y: [0, -3, 0], x: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.2 } }
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

        {/* Right Column (50% width on desktop, SVG Illustration) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
          <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] select-none">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 260 260" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Technical grid decoration in background */}
              <line x1="10" y1="130" x2="250" y2="130" stroke="#FFFFFF" strokeDasharray="3 3" className="opacity-10" />
              <line x1="130" y1="10" x2="130" y2="250" stroke="#FFFFFF" strokeDasharray="3 3" className="opacity-10" />
              
              {/* Rotating outer ring */}
              <motion.circle 
                variants={svgCircleVariants}
                cx="130" 
                cy="130" 
                r="110" 
                stroke="#FFFFFF" 
                strokeDasharray="4 6" 
                className="opacity-20 origin-center"
              />

              {/* Step / White Block */}
              {/* Top Face */}
              <path d="M 125 170 L 180 150 L 235 170 L 180 190 Z" fill="#FFFFFF" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              {/* Front Left Face */}
              <path d="M 125 170 L 180 190 L 180 245 L 125 225 Z" fill="#E5E7EB" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              {/* Front Right Face */}
              <path d="M 180 190 L 235 170 L 235 225 L 180 245 Z" fill="#D1D5DB" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              
              {/* Person 1 (on top of block, pulling) - Terracota */}
              <motion.g variants={pullerVariants} className="origin-center">
                {/* Body / Arm */}
                <path d="M 195 155 L 180 140 L 155 150" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 175 142 L 148 153" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {/* Head */}
                <circle cx="180" cy="128" r="7" fill="#D48A5C" />
              </motion.g>

              {/* Person 2 (on the ground, climbing) - Science Cyan */}
              <motion.g variants={climberVariants} className="origin-center">
                {/* Torso / Leg */}
                <path d="M 75 235 L 90 205 L 110 190" stroke="#53843A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {/* Head */}
                <circle cx="90" cy="177" r="7" fill="#D48A5C" />
                {/* Reaching arm */}
                <path d="M 95 193 L 145 152" stroke="#53843A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
              
              {/* Connection point dot indicator */}
              <circle cx="147" cy="151" r="3" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
