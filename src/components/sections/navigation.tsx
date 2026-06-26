import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { company } from "@/content/site";
import { Button } from "@/components/ui/button";

const anchorLinks = ["Capacidades", "Industrias", "Proceso", "Contacto"];

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Inicio">
          <span className="grid size-10 place-items-center rounded-full bg-[var(--foreground)] font-mono text-sm font-semibold text-white">
            {company.shortName}
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-[var(--foreground)] sm:block">
            {company.name}
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          <Link
            href="/servicios"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Servicios
          </Link>
          {anchorLinks.map((link) => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link}
            </a>
          ))}
        </div>
        <Button asChild className="hidden md:inline-flex">
          <a href="#contacto">
            {company.primaryCta}
            <ArrowRight size={16} weight="bold" />
          </a>
        </Button>
      </nav>
    </header>
  );
}
