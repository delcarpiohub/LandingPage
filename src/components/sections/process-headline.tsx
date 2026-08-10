import {
  CrossfadeGradientHeadline,
  type CrossfadeWord,
} from "@/components/ui/crossfade-gradient-headline";

const words: [CrossfadeWord, CrossfadeWord, CrossfadeWord] = [
  { text: "Analizar.", from: "#D6532B", to: "#707E83" },
  { text: "Validar.", from: "#53843A", to: "#D6532B" },
  { text: "Certificar.", from: "#4A5560", to: "#53843A" },
];

export function ProcessHeadline() {
  return (
    <section
      id="proceso"
      aria-labelledby="process-headline-title"
      className="relative w-full overflow-hidden bg-white px-6 py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-wide flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Nuestro proceso
        </p>

        <h2 id="process-headline-title" className="sr-only">
          Analizar, validar y certificar en cada proyecto
        </h2>

        <CrossfadeGradientHeadline words={words} className="max-w-[900px]" />

        <p className="max-w-[560px] text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
          Así acompañamos cada proyecto de instrumentación: desde el primer análisis en
          terreno hasta la validación y certificación de resultados.
        </p>
      </div>
    </section>
  );
}
