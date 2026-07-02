import { Navigation } from "@/components/sections/navigation";

type LegalDocumentProps = {
  content: string;
};

const linkPattern = /((?:https?:\/\/|www\.)[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function renderInlineText(text: string) {
  return text.split(linkPattern).map((part, index) => {
    if (!part) return null;

    const isEmail = /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part);
    const isUrl = /^(?:https?:\/\/|www\.)/.test(part);

    if (isEmail || isUrl) {
      const href = isEmail
        ? `mailto:${part}`
        : part.startsWith("http")
          ? part
          : `https://${part}`;

      return (
        <a
          key={`${part}-${index}`}
          href={href}
          target={isUrl ? "_blank" : undefined}
          rel={isUrl ? "noopener noreferrer" : undefined}
          className="font-semibold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function LegalDocument({ content }: LegalDocumentProps) {
  const lines = content
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const [title, ...bodyLines] = lines;

  return (
    <div className="min-h-dvh bg-[#f5f5f5] text-[#4A5560]">
      <Navigation />

      <main id="main-content" className="px-5 py-12 sm:px-8 md:py-16 lg:pl-16 lg:pr-10 xl:pl-20">
        <article className="max-w-[940px] py-8 md:py-10">
          <div className="border-l-2 border-[var(--primary)] pl-4 md:pl-6">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560] md:text-6xl">
              {title}
            </h1>
          </div>

          <div className="mt-10 grid gap-6 md:mt-12">
            {bodyLines.map((line) => {
              const isHeading = /^\d+\.\s/.test(line);
              const lineWithoutNumber = line.replace(/^\d+\.\s*/, "");

              if (isHeading) {
                return (
                  <h2
                    key={line}
                    className="border-t border-[#4A5560]/12 pt-8 font-display text-xl font-extrabold leading-tight text-[#4A5560] md:text-2xl"
                  >
                    {renderInlineText(lineWithoutNumber)}
                  </h2>
                );
              }

              return (
                <p
                  key={line}
                  className="max-w-[74ch] text-[15px] leading-8 text-[#4A5560]/78 md:text-base"
                >
                  {renderInlineText(line)}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
