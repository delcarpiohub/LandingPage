"use client";

import {
  CompassTool,
  Dna,
  Flask,
  Microscope,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/site";

const icons = [Microscope, Dna, Flask, CompassTool];

export function ServiceMatrix() {
  return (
    <section id="servicios" className="bg-gradient-to-br from-[#4A5560] to-[#1a2535] text-center text-white relative overflow-hidden">
      {/* Subtle technical spotlight */}
      <div className="absolute -right-1/4 -bottom-1/4 size-[500px] rounded-full bg-white/5 blur-[90px] pointer-events-none" />
      
      <div className="mx-auto max-w-[820px] px-5 py-10 md:py-12 relative z-10">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-2xl md:text-[1.85rem] font-extrabold leading-tight text-white">
            Servicios pensados para laboratorios que necesitan resultados defendibles.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[index] ?? Flask;
            return (
              <Reveal key={service.slug} delay={index * 0.06}>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="group block rounded-[4px] px-2 py-2 text-center transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {/* Smaller, more precise circles */}
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:bg-white/15 group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]">
                    <Icon size={30} weight="light" />
                  </span>
                  <h3 className="mx-auto mt-4 max-w-[11rem] font-display text-xs font-extrabold uppercase leading-[1.25] text-white">
                    {service.title}
                  </h3>
                  <p className="mx-auto mt-2 line-clamp-3 max-w-[13rem] text-[11px] leading-[18px] text-white/70">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-block text-xs font-bold text-white group-hover:text-[#D6532B] transition-colors">
                    más
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
