"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Capacidades", href: "/#capacidades" },
  { label: "Sectores", href: "/#industrias" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-5 top-5 z-50 -translate-y-24 rounded-[2px] border border-[var(--border)] bg-white px-4 py-2 text-sm font-bold text-[var(--foreground)] opacity-0 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)] motion-reduce:transition-none"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 bg-[var(--science-cyan)] text-white">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-[58px] max-w-site items-center justify-between px-5"
        >
          <Link href="/" className="flex items-center gap-2" aria-label="Inicio">
            <span className="grid size-9 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-[var(--science-cyan)]">
              DC
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl font-extrabold tracking-[-0.04em]">
                Del Carpio
              </span>
              <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-white/75">
                análisis y asesorías
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-[2px] px-2 py-2 font-display text-[10px] font-bold uppercase tracking-[0.05em] text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    isActive ? "bg-[var(--accent)]" : "hover:bg-white/14",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-grid size-10 place-items-center rounded-[2px] border border-white/35 text-white lg:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </nav>

        {isOpen && (
          <div className="border-t border-white/20 bg-[var(--science-cyan-dark)] px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-site gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[2px] px-3 py-3 font-display text-xs font-bold uppercase tracking-[0.06em] text-white hover:bg-white/12"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                className="mt-2 block rounded-[2px] bg-[var(--accent)] px-4 py-3 text-center font-display text-xs font-bold uppercase tracking-[0.06em] text-white"
                onClick={() => setIsOpen(false)}
              >
                  {company.primaryCta}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
