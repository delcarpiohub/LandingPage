import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Del Carpio",
  description: "Términos y condiciones de uso de la plataforma digital de Del Carpio.",
};

export default function TerminosPage() {
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
              Términos y condiciones de uso
            </h1>
            <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
          </header>

          <div className="space-y-6 text-sm leading-7 text-slate-600 font-sans">
            <p>
              Bienvenido al sitio web de Del Carpio Análisis y Asesorías. Al acceder y utilizar nuestra plataforma, usted acepta estar sujeto a los presentes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le solicitamos que no utilice nuestros servicios digitales.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              1. Uso de la Información
            </h2>
            <p>
              El contenido de este sitio es de carácter puramente informativo. Del Carpio se reserva el derecho de modificar, actualizar o retirar cualquier información técnica, descripción de equipos o servicios sin previo aviso. Es responsabilidad del usuario verificar la vigencia de los datos presentados antes de concretar una adquisición comercial.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              2. Propiedad Intelectual
            </h2>
            <p>
              Todos los textos, logotipos, imágenes, marcas representadas, renders y desarrollos interactivos presentes en esta plataforma son propiedad exclusiva de Del Carpio o de sus respectivos licenciantes, y están protegidos por las leyes de propiedad intelectual vigentes. Queda prohibida su reproducción o distribución sin autorización expresa.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              3. Limitación de Responsabilidad
            </h2>
            <p>
              Del Carpio no se responsabiliza por daños o perjuicios derivados del uso directo o indirecto del sitio web, incluyendo interrupciones de servicio, errores informáticos o desactualizaciones de contenido. Toda asesoría definitiva sobre equipamiento analítico e instalaciones debe ser validada directamente con nuestro equipo de ingenieros y especialistas.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
