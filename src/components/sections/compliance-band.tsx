"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, ChartLineUp, FileText, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
import { company } from "@/content/site";

const items = [
  {
    icon: ShieldCheck,
    title: "Instalación e Integración Operativa",
    text: "Ejecutamos el montaje físico y la puesta en marcha de sus nuevos equipos, verificando los parámetros críticos para asegurar un inicio de operación óptimo",
  },
  {
    icon: ChartLineUp,
    title: "Capacitación Técnica de Usuarios",
    text: "Instruimos en sitio a los operadores y al personal técnico a cargo del sistema, cubriendo desde los fundamentos de uso diario hasta los protocolos de seguridad indispensables.",
  },
  {
    icon: FileText,
    title: "Diagnóstico y Mantención Preventiva",
    text: "Evaluamos la integridad de los componentes mediante diagnósticos especializados y rutinas de mantención planificadas para prevenir desviaciones analíticas y fallas críticas.",
  },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            HERO BANNER - ESTRUCTURA IDÉNTICA AL DESIGN JSON
            - Fondo: #D6532B (Terracota Del Carpio) con patrón de líneas técnicas
            - Izquierda (50%): Imagen del especialista en terreno con su equipo
            - Derecha (50%): Título, Lista exacta de servicios, ActionRow (Teléfono + "O" + Botón)
           ========================================================================= */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#D6532B] text-white shadow-[0_20px_50px_rgba(214,83,43,0.25)]">
          
          {/* Faint pipe outlines / technical grid background overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-15 select-none z-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]">
            <svg
              className="absolute inset-0 w-full h-full text-white/20"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
            >
              <path
                d="M-100 100 L300 -300 M200 600 L800 0 M500 800 L1200 100"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle cx="20%" cy="80%" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="85%" cy="15%" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Main Grid Layout (50% Image Left / 50% Content Right on Desktop) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-[540px]">
            
            {/* 1. LEFT ELEMENT: Image (Worker holding technical instrument) */}
            <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full min-h-[440px] flex items-end justify-center overflow-hidden lg:rounded-l-[24px]">
              <Image
                src="/fotos/especialista-soporte-terreno.jpg"
                alt="Especialista técnico Del Carpio realizando soporte e inspección en terreno"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Soft overlay gradient to blend image into terracotta banner */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D6532B] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#D6532B]/40 pointer-events-none" />
            </div>

            {/* 2. RIGHT ELEMENT: Container with Padding 40px and Gap 24px */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 gap-6 w-full text-left">
              <Reveal>
                {/* Heading (Level 1 / Title) */}
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.12] tracking-tight text-white uppercase drop-shadow-sm">
                  Soporte Técnico y<br />
                  Validación de Procesos
                </h2>
              </Reveal>

              {/* Paragraph / Services Items List (Sin cambiar ninguna palabra) */}
              <div className="flex flex-col gap-5 my-1">
                {items.map((item, index) => {
                  const IconComp = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.06}>
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm mt-0.5">
                          <IconComp size={18} weight="bold" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-extrabold text-white leading-snug">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-white/90 font-medium">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* ActionRow (flex-row, items-center, gap-20px, marginTop-16px) */}
              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-white/20">
                  {/* ContactLink with phone-outline */}
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-black text-white hover:text-white/90 transition-colors"
                  >
                    <Phone size={24} weight="bold" className="shrink-0" />
                    <span>{company.phone}</span>
                  </a>

                  {/* TextSeparator "O" */}
                  <span className="text-sm font-bold text-white/80 uppercase tracking-widest px-1">
                    O
                  </span>

                  {/* Button "Cotizar Servicio" (Get a quote style) */}
                  <Link
                    href={`/contacto/proyectos?from=${encodeURIComponent("/#capacidades")}`}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-white text-[#D6532B] hover:bg-white/95 px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Cotizar Servicio</span>
                    <ArrowRight size={15} weight="bold" />
                  </Link>
                </div>
              </Reveal>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
