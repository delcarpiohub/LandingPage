"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const anchorLinks = ["Capacidades", "Industrias", "Contacto"];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";
  const showDarkNav = isHome && !isScrolled;
  const isServicios = pathname.startsWith("/servicios");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 80);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-5 top-5 z-50 -translate-y-24 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] opacity-0 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)] motion-reduce:transition-none"
      >
        Saltar al contenido
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-[280ms] ease-[var(--ease-out)] motion-reduce:transition-none",
          showDarkNav
            ? "border-white/10 bg-[var(--foreground)]"
            : "border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl",
        )}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5"
        >
          <Link href="/" className="flex items-center gap-3" aria-label="Inicio">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full font-mono text-sm font-semibold transition-colors duration-[280ms] ease-[var(--ease-out)] motion-reduce:transition-none",
                showDarkNav
                  ? "bg-white text-[var(--foreground)]"
                  : "bg-[var(--foreground)] text-white",
              )}
            >
              {company.shortName}
            </span>
            <span
              className={cn(
                "hidden text-sm font-semibold tracking-wide transition-colors duration-[280ms] ease-[var(--ease-out)] motion-reduce:transition-none sm:block",
                showDarkNav ? "text-white/80" : "text-[var(--foreground)]",
              )}
            >
              {company.name}
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/servicios"
              aria-current={isServicios ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                showDarkNav
                  ? "text-white/55 hover:text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
                isServicios && (showDarkNav ? "text-white" : "text-[var(--foreground)]"),
              )}
            >
              Servicios
            </Link>
            {anchorLinks.map((link) => (
              <Link
                key={link}
                href={`/#${link.toLowerCase()}`}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  showDarkNav
                    ? "text-white/55 hover:text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                {link}
              </Link>
            ))}
          </div>

          <Button
            asChild
            variant={showDarkNav ? "ghost-white" : "primary"}
            className="hidden sm:inline-flex"
          >
            <Link href="/#contacto">
              {company.primaryCta}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </Button>
        </nav>
      </header>
    </>
  );
}
