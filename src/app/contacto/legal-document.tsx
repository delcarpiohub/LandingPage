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

type Block =
  | { kind: "heading"; text: string }
  | { kind: "dateline"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "table"; header: string[]; rows: string[][] };

// Sintaxis de tabla dentro del `content` plano: líneas consecutivas que
// empiezan con "|", separadas por "|" (primera fila = encabezado). No
// afecta a los documentos legales existentes porque ninguno usa "|".
function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      const [header, ...rows] = tableLines.map(parseTableRow);
      blocks.push({ kind: "table", header, rows });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      blocks.push({ kind: "heading", text: line.replace(/^\d+\.\s*/, "") });
      i += 1;
      continue;
    }

    if (/^Última actualización:/i.test(line)) {
      blocks.push({ kind: "dateline", text: line });
      i += 1;
      continue;
    }

    blocks.push({ kind: "paragraph", text: line });
    i += 1;
  }

  return blocks;
}

export function LegalDocument({ content }: LegalDocumentProps) {
  const lines = content
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const [title, ...bodyLines] = lines;
  const blocks = parseBlocks(bodyLines);

  return (
    <div className="min-h-dvh bg-[#f5f5f5]/85 text-[#4A5560]">
      <Navigation />

      <main id="main-content" className="px-5 py-12 sm:px-8 md:py-16">
        <article className="mx-auto max-w-[940px] py-8 md:py-10">
          <div className="border-l-2 border-[var(--primary)] pl-4 md:pl-6">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560] md:text-6xl">
              {title}
            </h1>
          </div>

          <div className="mt-10 grid gap-6 md:mt-12">
            {blocks.map((block, index) => {
              if (block.kind === "heading") {
                return (
                  <h2
                    key={index}
                    className="border-t border-[#4A5560]/12 pt-8 font-display text-xl font-extrabold leading-tight text-[#4A5560] md:text-2xl"
                  >
                    {renderInlineText(block.text)}
                  </h2>
                );
              }

              if (block.kind === "dateline") {
                return (
                  <p
                    key={index}
                    className="font-mono text-xs uppercase tracking-[0.08em] text-[#4A5560]/55"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.kind === "table") {
                return (
                  <div key={index} className="overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                      <thead>
                        <tr>
                          {block.header.map((cell, cellIndex) => (
                            <th
                              key={cellIndex}
                              scope="col"
                              className="border-b-2 border-[#4A5560]/25 py-3 pr-6 font-display font-bold text-[#4A5560]"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border-b border-[#4A5560]/12 py-3 pr-6 align-top text-[#4A5560]/78"
                              >
                                {renderInlineText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className="max-w-[74ch] text-[15px] leading-8 text-[#4A5560]/78 md:text-base"
                >
                  {renderInlineText(block.text)}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
