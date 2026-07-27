"use client";

import Image from "next/image";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="bg-white w-full py-6 md:py-8 px-4 relative overflow-hidden flex items-center justify-center">
      <div
        className="w-full max-w-[1296px] mx-auto bg-[#36404A] p-6 md:px-10 md:py-7 rounded-[8px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-white/10 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        {/* Left Column: Text and CTA Button */}
        <div className="w-full md:w-3/5 text-center md:text-left flex flex-col items-center md:items-start justify-center relative z-10">
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white/95 leading-snug tracking-tight max-w-[580px]">
            Póngase en contacto con nosotros si tiene preguntas, o necesita ayuda.
          </h2>
          
          <div className="mt-4">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer border border-white/80 bg-transparent hover:bg-white hover:text-[#36404A] text-white font-display text-xs font-bold tracking-wider uppercase py-2.5 px-6 rounded-[4px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contacte con nosotros
            </Link>
          </div>
        </div>

        {/* Right Column: Image Ayuda 1 */}
        <div className="w-full md:w-2/5 flex items-center justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] aspect-[16/9] select-none">
            <Image 
              src="/contacto-ayuda-1.png" 
              alt="Ayuda y soporte Del Carpio" 
              fill
              sizes="(max-width: 768px) 80vw, 280px"
              className="object-contain object-center drop-shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
