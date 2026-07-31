"use client";

import { CaretDown, ArrowRight, List, X, LinkedinLogo, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { company } from "@/content/site";

type GoogleTranslateElementOptions = {
  pageLanguage: string;
  includedLanguages: string;
  layout: string;
  autoDisplay: boolean;
};

type GoogleTranslateElementConstructor = {
  new (options: GoogleTranslateElementOptions, elementId: string): unknown;
  InlineLayout: {
    SIMPLE: string;
  };
};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: GoogleTranslateElementConstructor;
      };
    };
  }
}

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
      type: "link",
      label: "Productos",
      href: "/productos",
    },
    {
      type: "link",
      label: "Servicios",
      href: "/servicios",
    },
    {
      type: "link",
      label: "Proyectos",
      href: "/proyectos",
    },
    {
      type: "link",
      label: "Nosotros",
      href: "/nosotros",
    },
    {
      type: "link",
      label: "Contacto",
      href: "/contacto",
    },
  ],
  en: [
    {
      type: "link",
      label: "Products",
      href: "/productos",
    },
    {
      type: "link",
      label: "Services",
      href: "/servicios",
    },
    {
      type: "link",
      label: "Projects",
      href: "/proyectos",
    },
    {
      type: "link",
      label: "About Us",
      href: "/nosotros",
    },
    {
      type: "link",
      label: "Contact",
      href: "/contacto",
    },
  ],
  pt: [
    {
      type: "link",
      label: "Produtos",
      href: "/productos",
    },
    {
      type: "link",
      label: "Serviços",
      href: "/servicios",
    },
    {
      type: "link",
      label: "Projetos",
      href: "/proyectos",
    },
    {
      type: "link",
      label: "Sobre nós",
      href: "/nosotros",
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
    // Read Google Translate cookie to set initial language state
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };
    
    const googtrans = getCookie("googtrans");
    let initialLang: "es" | "en" | "pt" = "es";

    if (googtrans) {
      if (googtrans.endsWith("/en")) initialLang = "en";
      else if (googtrans.endsWith("/pt")) initialLang = "pt";
    } else {
      const savedLang = localStorage.getItem("site-language");
      if (savedLang === "es" || savedLang === "en" || savedLang === "pt") {
        initialLang = savedLang;
      }
    }

    window.requestAnimationFrame(() => setLang(initialLang));
  }, []);

  const handleLangChange = (newLang: "es" | "en" | "pt") => {
    setLang(newLang);
    localStorage.setItem("site-language", newLang);
    
    // Set Google Translate cookie
    const cookieValue = `googtrans=/es/${newLang}`;
    // Google Translate only exposes cookie-based language persistence.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${cookieValue}; path=/;`;
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${cookieValue}; path=/; domain=${window.location.hostname}`;
    if (window.location.hostname !== "localhost") {
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `${cookieValue}; path=/; domain=.${window.location.hostname}`;
    }
    
    window.dispatchEvent(new Event("languagechange"));
    
    // Reload page to let Google Translate run
    window.location.reload();
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamically load Google Translate script client-side
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
      addScript.setAttribute("id", "google-translate-script");
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate.TranslateElement;

      if (!TranslateElement) {
        return;
      }

      new TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "es,en,pt",
          layout: TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  const currentMenuItems = menuItemsTranslated[lang];

  return (
    <>
      {/* Google Translate Hidden Styles to prevent showing the standard toolbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        iframe.skiptranslate,
        .skiptranslate iframe,
        #goog-gt-tt,
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-gadget-icon,
        .goog-te-gadget-simple {
          display: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}} />

      {/* Google Translate Target Container */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Accesibilidad: Saltar al contenido */}
      <a
        href="#main-content"
        className="pointer-events-none fixed left-5 top-5 z-[1000] -translate-y-24 rounded-[2px] border border-white/10 bg-[#101820] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#F5F5F5] opacity-0 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#D6532B] motion-reduce:transition-none"
      >
        {skipText[lang]}
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[999] transition-all duration-300 ease-out border-b border-white/8 backdrop-blur-[18px] text-[#F5F5F5] flex flex-col justify-start",
          isHome
            ? (isScrolled ? "h-[72px] bg-[#101820]/92 lg:h-[70px]" : "h-[72px] bg-[#101820]/76 lg:h-[132px] lg:bg-[#101820]/18")
            : (isScrolled ? "h-[72px] bg-[#101820]/96 lg:h-[70px]" : "h-[72px] bg-[#101820] lg:h-[132px]")
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
            "mx-auto flex w-full items-center justify-between px-5 sm:px-6 lg:px-10 max-w-[1440px] transition-all duration-300 ease-out shrink-0",
            isScrolled ? "h-[72px] lg:h-[70px]" : "h-[72px] lg:h-[88px]"
          )}
        >
          {/* Logo (Left side) - 18% space container approx */}
          <div className="flex w-auto justify-start lg:w-[18%]">
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
                className="h-8 w-auto object-contain sm:h-9 lg:h-11"
                sizes="180px"
              />
            </Link>
          </div>

          {/* Links (Center) - 54% space container approx */}
          <div className="hidden lg:flex items-center justify-center gap-[42px] w-[54%]">
            {currentMenuItems.map((item, i) => {
              if (item.type === "dropdown") {
                return (
                  <div key={i} className="group relative py-4">
                    <Link
                      href="/servicios"
                      className="group flex items-center gap-[8px] text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D6532B] transition-colors duration-[220ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B] cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <CaretDown
                        size={14}
                        className="text-slate-400 transition-transform duration-[220ms] group-hover:rotate-180 group-hover:text-[#D6532B]"
                      />
                    </Link>
                    {/* Dropdown Menu Overlay */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#101820]/95 backdrop-blur-[18px] border border-white/8 rounded-sm p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-[220ms] ease-out shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3">
                      {item.subItems.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          className="text-xs font-semibold text-slate-300 hover:text-[#D6532B] transition-colors duration-[220ms]"
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
                    className="group relative text-[15px] font-medium tracking-[-0.01em] text-[#F5F5F5] hover:text-[#D6532B] transition-colors duration-[220ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                  >
                    <span className="relative py-0.5">
                      {item.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[1px] bg-[#D6532B] transform origin-left transition-transform duration-[220ms] ease-out",
                          isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </span>
                  </Link>
                );
              }
            })}
          </div>

          {/* CTA: Tour Virtual & Arrow Button (Right side) - 28% space container approx */}
          <div className="hidden lg:flex items-center justify-end gap-5 w-[28%] shrink-0">
            <div className="flex items-center gap-[6px]">
              <Link
                href="/contacto/tour-laboratorio"
                className="group flex items-center justify-center whitespace-nowrap px-[24px] h-11 bg-[#F5F5F5] hover:bg-[#D6532B] text-[#101820] hover:text-white font-bold text-[15px] tracking-[-0.01em] rounded-full transition-all duration-[220ms] ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
              >
                {ctaText[lang]}
              </Link>
              <Link
                href="/contacto/tour-laboratorio"
                className="group flex items-center justify-center size-11 bg-[#F5F5F5] hover:bg-[#D6532B] text-[#101820] hover:text-white rounded-full transition-all duration-[220ms] ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                aria-label={ctaAria[lang]}
              >
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[220ms] group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Separator line between CTA and Social Icons */}
            <div className="h-5 w-[1px] bg-[#F5F5F5]/15" />

            {/* Social Media Links */}
            <div className="flex items-center gap-3.5">
              <a
                href="https://www.linkedin.com/company/del-carpio/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group text-[#F5F5F5]/70 hover:text-[#D6532B] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                <LinkedinLogo
                  size={20}
                  className="transition-all duration-200 group-hover:scale-[1.08] group-hover:rotate-2"
                />
              </a>
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group text-[#F5F5F5]/70 hover:text-[#D6532B] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                <WhatsappLogo
                  size={20}
                  className="transition-all duration-200 group-hover:scale-[1.08] group-hover:rotate-2"
                />
              </a>
              <a
                href={`mailto:${company.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Correo"
                className="group text-[#F5F5F5]/70 hover:text-[#D6532B] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                <EnvelopeSimple
                  size={20}
                  className="transition-all duration-200 group-hover:scale-[1.08] group-hover:rotate-2"
                />
              </a>
            </div>
          </div>

          {/* Hamburger Menu (Mobile/Tablet only) */}
          <button
            type="button"
            className="inline-grid size-10 place-items-center rounded-[2px] border border-white/12 text-white hover:border-[#D6532B] hover:text-[#D6532B] lg:hidden transition-colors duration-[220ms]"
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
            isScrolled ? "h-0 opacity-0" : "h-[44px] opacity-100"
          )}
        >
          <div className="mx-auto flex h-full items-center justify-between px-10 max-w-[1440px] text-[12px] font-semibold tracking-[0.03em] font-sans">
            {/* Industries list */}
            <div className="flex items-center gap-8">
              {industryLinks[lang].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-[#D6532B] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative group/lang py-3">
              <button className="flex items-center gap-1.5 hover:text-[#D6532B] transition-colors duration-200 focus:outline-none cursor-pointer">
                <span>{langLabels[lang]}</span>
                <CaretDown
                  size={12}
                  className="transition-transform duration-200 group-hover/lang:rotate-180 text-[#101820]/60 group-hover/lang:text-[#D6532B]"
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
                      lang === l ? "text-[#D6532B] font-bold" : "text-slate-300"
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
                          ? "bg-[#D6532B] text-white border-[#D6532B]"
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
                  className="flex-grow text-center rounded-[2px] bg-[#F5F5F5] hover:bg-[#D6532B] text-[#101820] hover:text-white py-3 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {ctaText[lang]}
                </Link>
                <Link
                  href="/contacto/tour-laboratorio"
                  className="flex items-center justify-center shrink-0 size-11 bg-[#F5F5F5] hover:bg-[#D6532B] text-[#101820] hover:text-white rounded-[2px] transition-all duration-200"
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
        <div className="h-[72px] w-full shrink-0 bg-transparent pointer-events-none lg:h-[132px]" />
      )}
    </>
  );
}
