import { Reveal } from "@/components/motion/reveal";

const capabilities = ["HPLC", "GC", "ICP-OES", "IQ/OQ/PQ", "ISO 17025", "Soporte"];

export function LabPhotos() {
  return (
    <section className="bg-[var(--science-strip)]">
      <div className="mx-auto grid max-w-site grid-cols-2 items-center gap-8 px-5 py-9 text-center text-white sm:grid-cols-3 lg:grid-cols-6">
        {capabilities.map((capability, index) => (
          <Reveal key={capability} delay={index * 0.035}>
            <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-white/90">
              {capability}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
