"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/servicios" },
  { label: "Proyectos", href: "/contacto/proyectos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-5 top-5 z-50 -translate-y-24 rounded-[2px] border border-[var(--border)] bg-white px-4 py-2 text-sm font-bold text-[var(--foreground)] opacity-0 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)] motion-reduce:transition-none"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-white/12 bg-[#101820]/92 text-white shadow-[0_16px_50px_rgba(16,24,32,0.22)] backdrop-blur-md">
        <nav
          aria-label="Navegacion principal"
          className="mx-auto flex h-[70px] max-w-site items-center justify-between px-5"
        >
          {/* Logo (Left side) */}
          <Link href="/" className="flex items-center" aria-label="Inicio">
            <Image
              src="/brand/del-carpio-white.png"
              alt="Del Carpio"
              width={1299}
              height={354}
              priority
              className="h-12 w-auto object-contain md:h-[52px]"
              sizes="(min-width: 768px) 192px, 176px"
            />
          </Link>

          {/* Links (Center) */}
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-[2px] px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.05em] text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    isActive ? "bg-[var(--primary)]" : "hover:bg-white/12",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Tour Virtual Button (Right side, desktop only) */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/contacto/tour-laboratorio"
              className="rounded-[2px] bg-[var(--primary)] hover:bg-[#b54725] px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.05em] text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Tour Virtual
            </Link>
          </div>

          {/* Hamburger Menu (Mobile only) */}
          <button
            type="button"
            className="inline-grid size-10 place-items-center rounded-[2px] border border-white/35 text-white lg:hidden"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="border-t border-white/20 bg-black/85 px-5 py-4 backdrop-blur-lg lg:hidden">
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
                href="/contacto/tour-laboratorio"
                className="mt-2 block rounded-[2px] bg-[var(--primary)] px-4 py-3 text-center font-display text-xs font-bold uppercase tracking-[0.06em] text-white"
                onClick={() => setIsOpen(false)}
              >
                Tour Virtual
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
