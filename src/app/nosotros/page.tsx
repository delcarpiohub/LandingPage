import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lightbulb, Ruler, Headset, Trophy, Gear, Flask } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Del Carpio Análisis y Asesorías",
  description: "Conoce Del Carpio. Especialistas en instrumentación analítica de alta precisión, HPLC, GC y soporte técnico a lo largo de todo Chile.",
  alternates: {
    canonical: "/nosotros",
  },
};

export default function NosotrosPage() {
  const features = [
    {
      icon: Lightbulb,
      title: "Diseño Creativo y a Medida",
      text: "Configuraciones cromatográficas personalizadas según analito y matriz."
    },
    {
      icon: Ruler,
      title: "Fácil Personalización",
      text: "Planes de soporte técnico y mantención preventiva flexibles."
    },
    {
      icon: Headset,
      title: "Soporte Técnico Directo",
      text: "Respuesta ágil presencial en terreno de Arica a Punta Arenas."
    },
    {
      icon: Trophy,
      title: "Garantía de Calidad",
      text: "Uso estricto de consumibles y repuestos originales de fábrica."
    },
    {
      icon: Gear,
      title: "Optimización Analítica",
      text: "Calificaciones IQ/OQ/PQ formales bajo estándares internacionales."
    },
    {
      icon: Flask,
      title: "Desarrollo y Métodos",
      text: "Transferencia de metodologías analíticas y validación experimental."
    }
  ];

  const team = [
    {
      name: "Christofer Villagrán",
      role: "Director General & Especialista HPLC / GC",
      image: "/fotos/equipo-del-carpio.jpg",
      description: "Líder de ingeniería certificado con amplia trayectoria en cromatografía."
    },
    {
      name: "Marian Rivera",
      role: "Co-Fundadora & Coordinación de Operaciones",
      image: "/fotos/laboratorio-frascos-procesos.jpg",
      description: "Responsable de la excelencia operativa y logística técnica en Chile."
    },
    {
      name: "Ingeniería de Soporte",
      role: "Equipo de Soporte & Calificaciones",
      image: "/fotos/instalacion-hplc-operador.jpg",
      description: "Ingenieros de campo dedicados a mantención preventiva e IQ/OQ/PQ."
    }
  ];

  return (
    <div className="min-h-dvh bg-[#F4F4F4] text-[#101820]">
      <Navigation />

      <main id="main-content">
        {/* 1. Hero Banner Section */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 text-center border-b border-[#D4DFDC]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/fotos/hero-laboratorio.jpg"
              alt="Laboratorio analítico Del Carpio"
              fill
              priority
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4A5560]/90 to-[#4A5560]/75" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 mb-6 flex justify-start">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                <li>
                  <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <ArrowLeft size={13} weight="bold" />
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="min-w-0 break-words text-white">Nosotros</li>
              </ol>
            </nav>
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px] px-4 text-center sm:px-6 lg:px-10">
            <span className="text-[12px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] block mb-3">
              Umbra Furniture Layout
            </span>
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-[#F5F5F5] sm:text-5xl lg:text-[64px] uppercase">
              Sobre Nosotros
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-[15px] md:text-[17px] text-white/80 leading-relaxed font-medium">
              Una organización diseñada para laboratorios que buscan comprar menos, pero mejor instrumentación cromatográfica.
            </p>
          </div>
        </section>

        {/* 2. Company Introduction ("WE ARE DEL CARPIO") */}
        <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] mb-2">
                  Nuestra Identidad
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl lg:text-[44px] leading-[1.05] mb-6 uppercase">
                  Somos Del Carpio
                </h2>
                
                <div className="space-y-6 text-[14px] leading-relaxed text-[#4A5560]">
                  <p>
                    Del Carpio Análisis y Asesorías Ltda. es una organización chilena fundada con el firme propósito de proveer soluciones analíticas integrales de precisión para los laboratorios de control de calidad e investigación en todo el país.
                  </p>
                  <p>
                    Nos especializamos en la provisión, implementación y calificación formal de sistemas de cromatografía líquida de alta resolución (HPLC, UPLC), cromatografía de gases (GC) y analizadores químicos elementales automatizados (Kjeldahl, extracción de grasa, fibra).
                  </p>
                </div>

                <blockquote className="mt-8 border-l-4 border-[#D6532B] bg-[#F4F4F4] p-5 rounded-r-[4px]">
                  <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#101820] leading-snug">
                    &ldquo;El compromiso con la exactitud analítica y la continuidad operativa es el motor de nuestro servicio.&rdquo;
                  </p>
                </blockquote>

                <p className="mt-8 text-[14px] leading-relaxed text-[#4A5560]">
                  Garantizamos que la calibración y el soporte en terreno respondan con la máxima trazabilidad técnica, asistiendo a laboratorios farmacéuticos, agroalimentarios y mineros a cumplir con auditorías de la NCh-ISO 17025 y FDA 21 CFR Part 11 sin fricciones.
                </p>

                <div className="mt-10 border-t border-[#D4DFDC] pt-6 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#101820]">
                      Christofer Villagrán
                    </span>
                    <span className="text-[11px] text-[#4A5560]">
                      Director General & Fundador
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/5] w-full max-w-[540px] mx-auto overflow-hidden border border-[#D4DFDC] bg-white rounded-[8px] shadow-sm p-4">
                <div className="relative w-full h-full overflow-hidden rounded-[6px]">
                  <Image
                    src="/fotos/instalacion-campana.jpg"
                    alt="Especialista de soporte técnico Del Carpio instalando cromatógrafo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 540px"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. Value Proposition ("WHY CHOOSE US") */}
        <section className="bg-[#4A5560] py-16 text-[#F5F5F5] border-y border-[#D4DFDC]">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal className="lg:order-2">
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#FBE369] mb-2">
                    Ventajas Clave
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px] leading-[1.05] mb-6 uppercase">
                    ¿Por qué elegirnos?
                  </h2>
                  <p className="text-[14px] leading-relaxed text-white/80 mb-10">
                    Acompañamos el ciclo de vida completo de tu instrumentación científica, asegurando que cada ensayo responda a los requerimientos de conformidad internacional de tu sector industrial.
                  </p>

                  {/* Features Grid */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {features.map((feat) => {
                      const IconComponent = feat.icon;
                      return (
                        <div key={feat.title} className="flex gap-4 items-start">
                          <div className="bg-white/10 p-2.5 rounded-full text-[#FBE369] shrink-0">
                            <IconComponent size={18} weight="bold" />
                          </div>
                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">
                              {feat.title}
                            </h4>
                            <p className="mt-1.5 text-[12px] leading-relaxed text-white/70">
                              {feat.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="lg:order-1">
                <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden border border-white/10 bg-white/5 rounded-[8px] p-4">
                  <div className="relative w-full h-full overflow-hidden rounded-[6px]">
                    <Image
                      src="/fotos/instalacion-hplc-operador.jpg"
                      alt="Equipo de ingeniería revisando planos de integración de laboratorio"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Team Showcase ("MEET OUR TEAM") */}
        <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] inline-block mb-2">
              Capital Humano
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#101820] sm:text-4xl lg:text-[44px] leading-none uppercase">
              Nuestro Equipo
            </h2>
            <p className="mt-3 text-[14px] text-[#4A5560] max-w-xl mx-auto">
              Ingenieros de servicio altamente calificados y certificados para la mantención de sistemas cromatográficos.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08}>
                <div className="group flex flex-col bg-white border border-[#D4DFDC] rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-square w-full bg-[#F4F4F4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#D6532B] block mb-1">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#101820] tracking-tight mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      {member.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
