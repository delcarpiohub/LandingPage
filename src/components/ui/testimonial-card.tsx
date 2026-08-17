import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  role: string;
  sector: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  className?: string;
}

export function TestimonialCard({ author, text, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex w-[300px] shrink-0 flex-col gap-4 rounded-[4px] border border-[var(--border)] bg-white p-6 text-left shadow-[var(--shadow-card)] sm:w-[320px]",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 24"
        className="h-6 w-8 text-[var(--primary)]"
        fill="currentColor"
      >
        <path d="M4 24V15.2C4 9.6 7.47 4.93 13.6 0l3.47 3.87C12.53 6.93 10.13 9.87 9.6 13.33h6.13V24H4Zm16 0V15.2c0-5.6 3.47-10.27 9.6-15.2L33.07 3.87c-4.54 3.06-6.94 6-7.47 9.46h6.13V24H20Z" />
      </svg>

      <p className="text-sm leading-relaxed text-[var(--foreground)]">{text}</p>

      <div className="mt-auto border-t border-[var(--border)] pt-3">
        <p className="font-display text-sm font-extrabold uppercase leading-none tracking-tight text-[var(--foreground)]">
          {author.role}
        </p>
        <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{author.sector}</p>
      </div>
    </article>
  );
}
