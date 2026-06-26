import Link from "next/link";
import { company, industries, services } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="grid size-10 place-items-center rounded-full bg-[var(--foreground)] font-mono text-sm font-semibold text-white">
              {company.shortName}
            </div>
            <p className="mt-5 text-sm text-[var(--muted)]">{company.name}</p>
            <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-[var(--foreground)]">
              Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile.
            </p>

            <address className="mt-8 space-y-2 text-sm not-italic text-[var(--muted)]">
              <p>{company.location}</p>
              <a
                href={`mailto:${company.email}`}
                className="block min-h-8 transition-colors duration-200 ease-[var(--ease-out)] hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {company.email}
              </a>
              <p>{company.phone}</p>
            </address>
          </div>

          <div>
            <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Servicios
            </h2>
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="block min-h-8 text-sm text-[var(--muted)] transition-colors duration-200 ease-[var(--ease-out)] hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Sectores
            </h2>
            <ul className="space-y-1">
              {industries.map((industry) => (
                <li key={industry.name}>
                  <Link
                    href="/#industrias"
                    className="block min-h-8 text-sm text-[var(--muted)] transition-colors duration-200 ease-[var(--ease-out)] hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.name}</p>
          <p>{company.location}</p>
        </div>
      </div>
    </footer>
  );
}
