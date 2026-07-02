import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | Del Carpio",
  description: "Política de privacidad and protección de datos personales de Del Carpio.",
};

export default function PrivacidadPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-slate-800">
      <Navigation />

      <main id="main-content" className="flex-grow px-6 py-16 md:py-24">
        <article className="mx-auto max-w-[720px] space-y-8">
          <header className="space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D5542B]">
              Legal
            </span>
            <h1 className="font-display text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
              Política de privacidad
            </h1>
            <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
          </header>

          <div className="space-y-6 text-sm leading-7 text-slate-600 font-sans">
            <p>
              En Del Carpio Análisis y Asesorías nos tomamos muy en serio la seguridad y confidencialidad de sus datos personales. Esta política de privacidad describe cómo recopilamos, utilizamos y resguardamos la información que usted nos proporciona a través de nuestros formularios y canales de contacto.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              1. Recopilación de Datos
            </h2>
            <p>
              Recopilamos información de identificación personal únicamente cuando es ingresada voluntariamente por usted en nuestros formularios de contacto, solicitudes de cotización o agendas de visitas. Estos datos incluyen su nombre, empresa, correo electrónico, número de teléfono y especificaciones del sector o proyecto.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              2. Finalidad del Tratamiento
            </h2>
            <p>
              La información recopilada se utiliza exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Elaborar y remitir cotizaciones formales de equipamiento.</li>
              <li>Prestar soporte técnico o atender requerimientos analíticos solicitados.</li>
              <li>Coordinar visitas y de demostración de laboratorio (tours virtuales o presenciales).</li>
              <li>Mantener una comunicación comercial directa e individualizada.</li>
            </ul>
            <p>
              Del Carpio no vende, arrienda ni cede su base de datos a terceros bajo ninguna circunstancia.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              3. Seguridad de los Datos
            </h2>
            <p>
              Implementamos medidas de seguridad de nivel técnico y administrativo para proteger sus datos personales contra accesos no autorizados, pérdidas, alteraciones o divulgaciones indebidas.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
