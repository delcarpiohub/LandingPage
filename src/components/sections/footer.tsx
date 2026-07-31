"use client";

import {
  EnvelopeSimple,
  LinkedinLogo,
  MapPin,
  WhatsappLogo,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/site";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-slate-300 pt-28 pb-20"
      style={{ background: "radial-gradient(ellipse at top, #1c2a38 0%, #101820 100%)" }}
    >
      {/* Texture Layer (Subtle 1.5% Noise Overlay) */}
      <svg
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <PipeCornerAccent corner="top-right" tone="dark" size="md" />
      <PipeCornerAccent corner="bottom-left" tone="dark" size="md" />

      {/* NIVEL 2: FOOTER EDITORIAL */}
      <div className="mx-auto max-w-site px-5 pb-20 grid gap-16 lg:grid-cols-12 lg:gap-x-16">
        {/* Columna Izquierda (Logo & Propósito) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Link
            href="/"
            className="inline-block transition-opacity duration-200 hover:opacity-90 max-w-[200px]"
            aria-label="Inicio"
          >
            <Image
              src="/brand/del-carpio-white.png"
              alt="Del Carpio"
              width={1299}
              height={354}
              className="h-11 w-auto object-contain"
              sizes="200px"
              priority
            />
          </Link>
          <p className="text-sm leading-7 text-slate-400 font-sans max-w-sm">
            Más de 30 años entregando soluciones en instrumentación analítica,
            equipamiento científico y soporte especializado para laboratorios e industria.
          </p>
        </div>

        {/* Columna Central (Contacto Principal) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D6532B]">
            Contacto
          </span>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-400 font-sans">
            <p className="font-semibold text-white">{company.location}</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${company.phone}`}
                className="hover:text-white transition-colors duration-180"
              >
                Teléfono: {company.phone}
              </a>
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                className="hover:text-white transition-colors duration-180"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {company.whatsapp}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="hover:text-white transition-colors duration-180"
              >
                Correo: {company.email}
              </a>
            </div>
            <div>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 h-9 bg-slate-800/80 hover:bg-[#D6532B] text-white text-xs font-bold uppercase rounded-[2px] border border-slate-700/50 hover:border-transparent transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                <MapPin size={14} />
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Columna Derecha (Enlaces Rápidos & Legal) */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D6532B]">
              Enlaces
            </span>
            <nav
              aria-label="Enlaces del pie de página"
              className="flex flex-col gap-3 text-sm"
            >
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/#nosotros">Nosotros</FooterLink>
              <FooterLink href="/servicios">Productos</FooterLink>
              <FooterLink href="/servicios">Servicios</FooterLink>
              <FooterLink href="/#marcas">Marcas</FooterLink>
              <FooterLink href="/contacto/tour-laboratorio">Recursos</FooterLink>
              <FooterLink href="/contacto">Contacto</FooterLink>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Legal
            </span>
            <nav
              aria-label="Enlaces legales"
              className="flex flex-col gap-2.5 text-xs text-slate-400"
            >
              <FooterLink href="/contacto/terminos-y-condiciones">
                Términos y condiciones
              </FooterLink>
              <FooterLink href="/contacto/politica-privacidad">
                Política de privacidad
              </FooterLink>
              <FooterLink href="/contacto/politica-cookies">
                Política de cookies
              </FooterLink>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Redes
            </span>
            <div className="flex gap-4">
              <SocialLink
                href="https://www.linkedin.com/company/del-carpio/posts/?feedView=all"
                aria="LinkedIn"
                icon={LinkedinLogo}
              />
              <SocialLink
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                aria="WhatsApp"
                icon={WhatsappLogo}
              />
              <SocialLink
                href={`mailto:${company.email}`}
                aria="Correo"
                icon={EnvelopeSimple}
              />
            </div>
          </div>
        </div>
      </div>

      {/* NIVEL 4: ENGINEERING SIGNATURE */}
      <div className="border-t border-white/8 pt-8">
        <div className="mx-auto max-w-site px-5">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-xs font-sans text-slate-400 leading-normal">
            <span>
            </span>
            <span>Del Carpio · Instrumentación Analítica · Chile · {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 text-slate-400 hover:text-[#D6532B] transition-colors duration-200 transform hover:translate-x-0.5 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
    >
      <span className="relative py-0.5">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D6532B] transform scale-x-0 origin-left transition-transform duration-250 ease-out group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

function SocialLink({
  href,
  aria,
  icon: Icon,
}: {
  href: string;
  aria: string;
  icon: PhosphorIcon;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="group text-slate-400 hover:text-[#D6532B] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
    >
      <Icon
        size={22}
        className="transition-all duration-200 group-hover:scale-[1.08] group-hover:rotate-2"
      />
    </a>
  );
}
