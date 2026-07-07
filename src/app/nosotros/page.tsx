import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Laptop, ChartLineUp, ChartBar, Briefcase, Target } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { ContactForm } from "@/components/sections/contact-form";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Del Carpio Análisis y Asesorías",
  description: "Conoce Del Carpio. Especialistas en instrumentación analítica de alta precisión, HPLC, GC y soporte técnico a lo largo de todo Chile.",
  alternates: {
    canonical: "/nosotros",
  },
};

export default function NosotrosPage() {
  const partners = [
    { src: "/marcas/thermo-fisher-scientific.png", alt: "Thermo Fisher Scientific" },
    { src: "/marcas/distek.png", alt: "Distek" },
    { src: "/marcas/restek.png", alt: "Restek" },
    { src: "/marcas/milestone.png", alt: "Milestone" },
    { src: "/marcas/suez.png", alt: "Suez" },
  ];

  return (
    <div className="min-h-dvh bg-white text-[#101820]">
      <Navigation />

      <main id="main-content">
        {/* 1. Hero Section (Segoe UI / Montserrat styling) */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-32 pb-20 lg:pt-44 lg:pb-32 text-center border-b border-[#D4DFDC]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/fotos/hero-laboratorio.jpg"
              alt="Laboratorio analítico Del Carpio"
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4A5560]/95 to-[#4A5560]/80" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
            <Reveal>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] uppercase font-display leading-[1.1]">
                Líderes en Instrumentación Analítica y Asesoría Técnica
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-[15px] md:text-[17px] text-white/80 leading-relaxed font-medium font-sans">
                Brindamos soluciones integrales de calibración, mantención preventiva y desarrollo de métodos cromatográficos en todo Chile.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="w-full sm:w-auto bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02]">
                  <a href="#about">
                    Sobre Nosotros
                  </a>
                </Button>
                <Button asChild variant="secondary" className="w-full sm:w-auto border border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02]">
                  <Link href="/contacto">
                    Contáctanos
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. About Section (#F5F5F5 / Accent) */}
        <section id="about" className="bg-[#F5F5F5] py-16 lg:py-24 border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl uppercase font-display">
                  Sobre Nosotros
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <div className="space-y-6 text-[15px] leading-relaxed text-[#4A5560] font-sans">
                  <p>
                    Del Carpio Análisis y Asesorías Ltda. es una organización chilena fundada con el firme propósito de proveer soluciones analíticas de alta precisión para laboratorios de control de calidad e investigación en todo el país.
                  </p>
                  <p>
                    Nos especializamos en el ciclo de vida completo de cromatógrafos líquidos (HPLC, UPLC), cromatógrafos de gases (GC) y sistemas automatizados de análisis elemental. Nuestro foco está en garantizar la trazabilidad analítica y asegurar el cumplimiento de auditorías y acreditaciones bajo estrictas normativas nacionales.
                  </p>
                  <div className="pt-4">
                    <Button asChild className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] shadow-md transition-transform hover:scale-[1.02]">
                      <a href="#why">
                        Conocer Más
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="bg-white border border-[#D4DFDC] rounded-[4px] p-6 sm:p-8 shadow-sm">
                  <h4 className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#D6532B] mb-6">
                    Aseguramiento de Conformidad Técnica
                  </h4>
                  <ul className="space-y-4 text-[13px] font-semibold text-[#4A5560] font-sans">
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Cumple tu laboratorio con la norma NCh-ISO 17025?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Necesitas validación y calificación IQ/OQ/PQ formal?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Buscas optimizar el tiempo de corrida cromatográfica?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Tu equipamiento requiere mantención preventiva periódica?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Requieres repuestos y consumibles analíticos originales?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D6532B] font-bold mt-0.5">•</span>
                      <span>¿Buscas soporte técnico rápido y cobertura en terreno nacional?</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. Why Section (White background) */}
        <section id="why" className="bg-white py-16 lg:py-24 border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl uppercase font-display">
                  ¿Por qué Del Carpio?
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="flex flex-col items-center text-center p-6 bg-[#F5F5F5] border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#D6532B] text-white p-4 rounded-full mb-6">
                    <Handshake size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Compromiso y Confianza
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Establecemos alianzas de largo plazo, acompañándote en cada auditoría y proceso de acreditación analítica de tu laboratorio.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex flex-col items-center text-center p-6 bg-[#F5F5F5] border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#D6532B] text-white p-4 rounded-full mb-6">
                    <Laptop size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Tecnología Avanzada
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Acceso a instrumentación cromatográfica de última generación y software de control de datos robusto certificado.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-col items-center text-center p-6 bg-[#F5F5F5] border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#D6532B] text-white p-4 rounded-full mb-6">
                    <ChartLineUp size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Resultados Garantizados
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Aseguramos la máxima repetibilidad, precisión de calibración y porcentaje de recuperación en tus determinaciones experimentales.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Services Section (#F5F5F5) */}
        <section id="services" className="bg-[#F5F5F5] py-16 lg:py-24 border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl uppercase font-display">
                  Nuestros Servicios
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.05}>
                <div className="flex flex-col items-center text-center p-6 bg-white border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#4A5560] text-white p-4 rounded-full mb-6">
                    <ChartBar size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Calificación y Validación
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Protocolos oficiales de calificación IQ/OQ/PQ para auditar laboratorios bajo estándares reglamentarios farmacéuticos o alimentarios.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex flex-col items-center text-center p-6 bg-white border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#4A5560] text-white p-4 rounded-full mb-6">
                    <Briefcase size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Soporte Técnico
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Contratos de mantención preventiva y soporte correctivo ágil de la mano de ingenieros de servicio certificados.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-col items-center text-center p-6 bg-white border border-[#D4DFDC] rounded-[4px] shadow-sm">
                  <div className="bg-[#4A5560] text-white p-4 rounded-full mb-6">
                    <Target size={28} weight="bold" />
                  </div>
                  <h3 className="text-[16px] font-extrabold uppercase tracking-wider text-[#101820] mb-3">
                    Desarrollo de Métodos
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4A5560]">
                    Puesta en marcha, transferencia de métodos y desarrollo de análisis químicos a medida en cromatografía líquida y de gases.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. Partners Section (White background) */}
        <section id="partners" className="bg-white py-16 lg:py-24 border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl uppercase font-display">
                  Nuestras Representaciones
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                {partners.map((partner) => (
                  <div key={partner.alt} className="relative w-full h-12 max-w-[160px] filter grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      fill
                      className="object-contain"
                      sizes="160px"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. Callback Section (#F5F5F5) */}
        <section id="callback" className="bg-[#F5F5F5] py-16 lg:py-24">
          <div className="mx-auto max-w-[640px] px-6">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl uppercase font-display">
                  Solicita una Asesoría
                </h2>
                <p className="mt-3 text-[14px] text-[#4A5560] leading-relaxed font-sans">
                  Déjanos tus datos y un especialista técnico de Del Carpio se contactará contigo a la brevedad para resolver tus dudas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-white border border-[#D4DFDC] p-6 sm:p-10 rounded-[4px] shadow-sm">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper Button implementation to match styling requirements
function Button({
  className,
  asChild,
  variant = "primary",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary";
}) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-[2px] transition-all font-sans font-bold",
        variant === "primary"
          ? "bg-[#D6532B] hover:bg-[#b8431e] text-white border-none"
          : "border border-[#D4DFDC] bg-white text-[#4A5560] hover:bg-[#F5F5F5]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
