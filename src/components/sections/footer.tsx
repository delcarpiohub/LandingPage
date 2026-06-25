import { company } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-[var(--foreground)]">{company.name}</p>
        <p>{company.location} | {company.email} | {company.phone}</p>
      </div>
    </footer>
  );
}
