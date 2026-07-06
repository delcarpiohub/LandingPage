"use client";

import { motion } from "motion/react";
import { MapPin, Phone, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { company } from "@/content/site";

export function ContactMapBanner() {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.130985223326!2d-70.60334812347715!3d-33.47190397337923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf83f4f46401%3A0xe54e38c92a95c935!2sAv.%20Sucre%202596%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1719777900000!5m2!1ses-419!2scl";

  return (
    <section className="relative w-full bg-[#252525] overflow-hidden flex flex-col md:flex-row h-auto md:h-[280px]">
      
      {/* LEFT PANEL: Contact Card */}
      <div 
        className="relative z-20 w-full md:w-[420px] lg:w-[460px] h-full shrink-0 bg-[rgba(214,83,43,0.95)] text-white p-8 md:py-10 md:px-12 flex flex-col justify-between overflow-hidden"
      >
        {/* City silhouette SVG overlay with multiply blend mode */}
        <div 
          className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-multiply select-none z-0"
        >
          <svg width="100%" height="100%" viewBox="0 0 460 280" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 280V200H20V210H40V190H55V220H75V170H90V205H110V185H125V230H150V160H170V215H190V195H210V220H235V180H250V210H270V175H285V235H310V165H330V220H350V190H370V210H395V170H410V205H430V180H460V280H0Z" fill="white" />
          </svg>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col justify-center h-full gap-6 md:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 md:gap-8">
            
            {/* Address */}
            <div className="flex gap-3">
              <MapPin size={22} className="shrink-0 text-white/90 mt-0.5" />
              <div>
                <span className="block font-mono text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">
                  Dirección
                </span>
                <span className="block text-xs font-semibold leading-relaxed font-sans">
                  {company.street} <br />
                  {company.addressLocality}, {company.addressRegion} <br />
                  Santiago · Chile
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex gap-3">
              <Phone size={22} className="shrink-0 text-white/90 mt-0.5" />
              <div>
                <span className="block font-mono text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">
                  Contacto
                </span>
                <div className="flex flex-col gap-1 text-xs font-semibold font-sans">
                  <a href={`tel:${company.phone}`} className="hover:text-white/80 transition-colors">
                    Tel: {company.phone}
                  </a>
                  <a 
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 hover:text-white/80 transition-colors"
                  >
                    <WhatsappLogo size={14} className="inline" /> WhatsApp: {company.whatsapp}
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Sharp geometric diagonal accents overlapping card */}
        {/* Grey slash */}
        <div 
          className="absolute top-0 bottom-0 right-[0px] w-[20px] bg-[#4A5560] z-10 pointer-events-none hidden md:block"
          style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
        />
        {/* Terracota slash overlaying grey */}
        <div 
          className="absolute top-0 bottom-0 right-[-15px] w-[15px] bg-[rgba(214,83,43,0.95)] z-20 pointer-events-none hidden md:block"
          style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }}
        />
      </div>

      {/* MAP AREA */}
      <div className="relative flex-grow h-[220px] md:h-full z-10">
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ 
            border: 0 
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Del Carpio en Ñuñoa"
          className="w-full h-full"
        />

        {/* Floating Marker (Interactive Google Maps Action Button) */}
        <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30">
          <motion.a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir dirección en Google Maps"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white rounded-full text-[#4A5560] hover:text-[#D6532B] shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-colors duration-200"
          >
            <MapPin size={28} weight="bold" />
          </motion.a>
        </div>
      </div>

    </section>
  );
}
