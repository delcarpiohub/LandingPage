"use client";

import { CaretDown, ArrowRight, List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  href: string;
};

type MenuItem =
  | { type: "dropdown"; label: string; subItems: SubItem[] }
  | { type: "link"; label: string; href: string };

const langLabels: Record<"es" | "en" | "pt", string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

const skipText = {
  es: "Saltar al contenido",
  en: "Skip to content",
  pt: "Pular para o conteúdo",
};

const ctaText = {
  es: "Tour virtual del laboratorio",
  en: "Virtual lab tour",
  pt: "Tour virtual do laboratório",
};

const ctaAria = {
  es: "Ir al Tour Virtual",
  en: "Go to Virtual Tour",
  pt: "Ir para o Tour Virtual",
};

const menuItemsTranslated: Record<"es" | "en" | "pt", MenuItem[]> = {
  es: [
    {
      type: "dropdown",
      label: "Soluciones",
      subItems: [
        { label: "Implementación HPLC", href: "/servicios/implementacion-hplc" },
        { label: "Métodos analíticos por GC", href: "/servicios/metodos-gc" },
        { label: "Validación y trazabilidad", href: "/servicios/validacion-trazabilidad" },
      ],
    },
    {
      type: "dropdown",
      label: "Productos",
      subItems: [
        { label: "Cromatografía Líquida (HPLC)", href: "/servicios/implementacion-hplc" },
        { label: "Cromatografía de Gases (GC)", href: "/servicios/metodos-gc" },
        { label: "Equipamiento y Calibración", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "dropdown",
      label: "Servicios",
      subItems: [
        { label: "Calibración e IQ/OQ/PQ", href: "/servicios/mantencion-soporte" },
        { label: "Mantención y Soporte Técnico", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "link",
      label: "Proyectos",
      href: "/contacto/proyectos",
    },
    {
      type: "link",
      label: "Contacto",
      href: "/contacto",
    },
  ],
  en: [
    {
      type: "dropdown",
      label: "Solutions",
      subItems: [
        { label: "HPLC Implementation", href: "/servicios/implementacion-hplc" },
        { label: "GC Analytical Methods", href: "/servicios/metodos-gc" },
        { label: "Validation & Traceability", href: "/servicios/validacion-trazabilidad" },
      ],
    },
    {
      type: "dropdown",
      label: "Products",
      subItems: [
        { label: "Liquid Chromatography (HPLC)", href: "/servicios/implementacion-hplc" },
        { label: "Gas Chromatography (GC)", href: "/servicios/metodos-gc" },
        { label: "Equipment & Calibration", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "dropdown",
      label: "Services",
      subItems: [
        { label: "Calibration & IQ/OQ/PQ", href: "/servicios/mantencion-soporte" },
        { label: "Maintenance & Tech Support", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "link",
      label: "Projects",
      href: "/contacto/proyectos",
    },
    {
      type: "link",
      label: "Contact",
      href: "/contacto",
    },
  ],
  pt: [
    {
      type: "dropdown",
      label: "Soluções",
      subItems: [
        { label: "Implementação HPLC", href: "/servicios/implementacion-hplc" },
        { label: "Métodos analíticos por GC", href: "/servicios/metodos-gc" },
        { label: "Validação e Rastreabilidade", href: "/servicios/validacion-trazabilidad" },
      ],
    },
    {
      type: "dropdown",
      label: "Produtos",
      subItems: [
        { label: "Cromatografia Líquida (HPLC)", href: "/servicios/implementacion-hplc" },
        { label: "Cromatografia de Gás (GC)", href: "/servicios/metodos-gc" },
        { label: "Equipamento e Calibração", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "dropdown",
      label: "Serviços",
      subItems: [
        { label: "Calibração e IQ/OQ/PQ", href: "/servicios/mantencion-soporte" },
        { label: "Manutenção e Suporte Técnico", href: "/servicios/mantencion-soporte" },
      ],
    },
    {
      type: "link",
      label: "Projetos",
      href: "/contacto/proyectos",
    },
    {
      type: "link",
      label: "Contato",
      href: "/contacto",
    },
  ],
};

const industryLinks: Record<"es" | "en" | "pt", { href: string; label: string }[]> = {
  es: [
    { href: "/servicios/implementacion-hplc", label: "ALIMENTOS" },
    { href: "/servicios", label: "MINERÍA" },
    { href: "/servicios/validacion-trazabilidad", label: "FARMACÉUTICA" },
    { href: "/servicios", label: "MEDIO AMBIENTE" },
    { href: "/servicios", label: "ACADEMIA / I+D" },
    { href: "/servicios/metodos-gc", label: "LABORATORIOS" },
  ],
  en: [
    { href: "/servicios/implementacion-hplc", label: "FOOD" },
    { href: "/servicios", label: "MINING" },
    { href: "/servicios/validacion-trazabilidad", label: "PHARMACEUTICAL" },
    { href: "/servicios", label: "ENVIRONMENT" },
    { href: "/servicios", label: "ACADEMIA / R&D" },
    { href: "/servicios/metodos-gc", label: "LABORATORIES" },
  ],
  pt: [
    { href: "/servicios/implementacion-hplc", label: "ALIMENTOS" },
    { href: "/servicios", label: "MINERAÇÃO" },
    { href: "/servicios/validacion-trazabilidad", label: "FARMACÊUTICA" },
    { href: "/servicios", label: "MEIO AMBIENTE" },
    { href: "/servicios", label: "ACADEMIA / I+D" },
    { href: "/servicios/metodos-gc", label: "LABORATÓRIOS" },
  ],
};

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<"es" | "en" | "pt">("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("site-language");
    if (savedLang === "es" || savedLang === "en" || savedLang === "pt") {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (newLang: "es" | "en" | "pt") => {
    setLang(newLang);
    localStorage.setItem("site-language", newLang);
    window.dispatchEvent(new Event("languagechange"));
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentMenuItems = menuItemsTranslated[lang];

  return (
    <>
      {/* Accesibilidad: Saltar al contenido */}
      <a
        href="#main-content"
        className="pointer-events-none fixed left-5 top-5 z-[1000] -translate-y-24 rounded-[2px] border border-white/10 bg-[#101820] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#F5F5F5] opacity-0 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#D5542B] motion-reduce:transition-none"
      >
        {skipText[lang]}
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[999] transition-all duration-300 ease-out border-b border-white/8 backdrop-blur-[18px] text-[#F5F5F5] flex flex-col justify-start",
          isHome
            ? (isScrolled ? "h-[70px] bg-[#101820]/92" : "h-[126px] bg-[#101820]/18")
            : (isScrolled ? "h-[70px] bg-[#101820]/96" : "h-[126px] bg-[#101820]")
        )}
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

        {/* CONTAINER GRID (MAIN MENU ROW) */}
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-between px-10 max-w-[1440px] transition-all duration-300 ease-out shrink-0",
            isScrolled ? "h-[70px]" : "h-[88px]"
          )}
        >
          {/* Logo (Left side) - 22% space container approx */}
          <div className="w-[22%] flex justify-start">
            <Link
              href="/"
              className={cn(
                "inline-block transition-all duration-300 ease-out hover:opacity-90 origin-left",
                isScrolled ? "scale-90" : "scale-100"
              )}
              aria-label="Inicio"
            >
              <Image
                src="/brand/del-carpio-white.png"
                alt="Del Carpio"
                width={1299}
                height={354}
                priority
                className="h-11 w-auto object-contain"
                sizes="180px"
              />
            </Link>
          </div>

          {/* Links (Center) - 56% space container approx */}
          <div className="hidden lg:flex items-center justify-center gap-[42px] w-[56%]">
            {currentMenuItems.map((item, i) => {
              if (item.type === "dropdown") {
                return (
                  <div key={i} className="group relative py-4">
                    <button className="group flex items-center gap-[8px] text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D5542B] transition-colors duration-[220ms] ease-out focus:outline-none cursor-pointer">
                      <span>{item.label}</span>
                      <CaretDown
                        size={14}
                        className="text-slate-400 transition-transform duration-[220ms] group-hover:rotate-180 group-hover:text-[#D5542B]"
                      />
                    </button>
                    {/* Dropdown Menu Overlay */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#101820]/95 backdrop-blur-[18px] border border-white/8 rounded-sm p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-[220ms] ease-out shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3">
                      {item.subItems.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          className="text-xs font-semibold text-slate-300 hover:text-[#D5542B] transition-colors duration-[220ms]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              } else {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="group relative text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D5542B] transition-colors duration-[220ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D5542B]"
                  >
                    <span className="relative py-0.5">
                      {item.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[1px] bg-[#D5542B] transform origin-left transition-transform duration-[220ms] ease-out",
                          isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </span>
                  </Link>
                );
              }
            })}
          </div>

          {/* CTA: Tour Virtual & Arrow Button (Right side) - 22% space container approx */}
          <div className="hidden lg:flex items-center justify-end gap-[6px] w-[22%]">
            <Link
              href="/contacto/tour-laboratorio"
              className="group flex items-center justify-center px-[22px] h-11 bg-[#F5F5F5] hover:bg-[#D5542B] text-[#101820] hover:text-white font-medium text-[15px] tracking-[-0.01em] rounded-full transition-all duration-[220ms] ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D5542B]"
            >
              {ctaText[lang]}
            </Link>
            <Link
              href="/contacto/tour-laboratorio"
              className="group flex items-center justify-center size-11 bg-[#F5F5F5] hover:bg-[#D5542B] text-[#101820] hover:text-white rounded-full transition-all duration-[220ms] ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D5542B]"
              aria-label={ctaAria[lang]}
            >
              <ArrowRight
                size={18}
                className="transition-transform duration-[220ms] group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Hamburger Menu (Mobile/Tablet only) */}
          <button
            type="button"
            className="inline-grid size-10 place-items-center rounded-[2px] border border-white/12 text-white hover:border-[#D5542B] hover:text-[#D5542B] lg:hidden transition-colors duration-[220ms]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {/* SOLUTIONS BY INDUSTRY & LANGUAGE SUB-BAR (BELOW MAIN MENU ROW) */}
        <div
          className={cn(
            "w-full bg-[#EBEBEB] text-[#101820] border-t border-black/5 transition-all duration-300 ease-out overflow-hidden hidden lg:block shrink-0",
            isScrolled ? "h-0 opacity-0" : "h-[38px] opacity-100"
          )}
        >
          <div className="mx-auto flex h-full items-center justify-between px-10 max-w-[1440px] text-[10px] font-bold tracking-wider font-sans">
            {/* Industries list */}
            <div className="flex items-center gap-6">
              {industryLinks[lang].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-[#D5542B] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative group/lang py-2">
              <button className="flex items-center gap-1.5 hover:text-[#D5542B] transition-colors duration-200 focus:outline-none cursor-pointer">
                <span>{langLabels[lang]}</span>
                <CaretDown
                  size={10}
                  className="transition-transform duration-200 group-hover/lang:rotate-180 text-[#101820]/60 group-hover/lang:text-[#D5542B]"
                />
              </button>
              {/* Dropdown Options */}
              <div className="absolute right-0 top-full mt-0.5 w-28 bg-[#101820] text-[#F5F5F5] rounded-sm p-1.5 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-[220ms] ease-out shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-1 border border-white/8">
                {(["es", "en", "pt"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={cn(
                      "text-left text-[11px] px-2 py-1.5 rounded-sm hover:bg-white/10 transition-colors duration-200 w-full font-sans font-medium cursor-pointer",
                      lang === l ? "text-[#D5542B] font-bold" : "text-slate-300"
                    )}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu / Drawer */}
        {isOpen && (
          <div className="border-t border-white/8 bg-[#101820]/98 px-5 py-6 backdrop-blur-[18px] lg:hidden max-h-[85vh] overflow-y-auto transition-all duration-300">
            <div className="mx-auto grid gap-4">
              {currentMenuItems.map((item, i) => {
                if (item.type === "dropdown") {
                  return (
                    <div key={i} className="flex flex-col gap-2 py-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3">
                        {item.label}
                      </span>
                      <div className="flex flex-col gap-1 pl-3">
                        {item.subItems.map((sub, j) => (
                          <Link
                            key={j}
                            href={sub.href}
                            className="rounded-[2px] px-3 py-2 font-display text-[12px] font-bold uppercase tracking-wider text-slate-300 hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="rounded-[2px] px-3 py-3 font-display text-[12px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}

              {/* Mobile Solutions by Industry Section */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3">
                  {lang === "es"
                    ? "Soluciones por Industria"
                    : lang === "en"
                    ? "Solutions by Industry"
                    : "Soluções por Indústria"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-3">
                  {industryLinks[lang].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="py-1.5 font-sans text-xs text-slate-400 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Language Selector Section */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3">
                  {lang === "es" ? "Idioma" : lang === "en" ? "Language" : "Idioma"}
                </span>
                <div className="flex gap-2 pl-3">
                  {(["es", "en", "pt"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        handleLangChange(l);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-sm text-xs border border-white/10 transition-all font-sans font-semibold cursor-pointer",
                        lang === l
                          ? "bg-[#D5542B] text-white border-[#D5542B]"
                          : "text-slate-300 hover:bg-white/5"
                      )}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-[6px] border-t border-white/10 pt-4">
                <Link
                  href="/contacto/tour-laboratorio"
                  className="flex-grow text-center rounded-[2px] bg-[#F5F5F5] hover:bg-[#D5542B] text-[#101820] hover:text-white py-3 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {ctaText[lang]}
                </Link>
                <Link
                  href="/contacto/tour-laboratorio"
                  className="flex items-center justify-center shrink-0 size-11 bg-[#F5F5F5] hover:bg-[#D5542B] text-[#101820] hover:text-white rounded-[2px] transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label={ctaAria[lang]}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      {!isHome && (
        <div className="w-full h-[126px] shrink-0 pointer-events-none bg-transparent" />
      )}
    </>
  );
}
