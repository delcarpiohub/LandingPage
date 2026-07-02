import type { Metadata } from "next";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Política de Cookies | Del Carpio",
  description: "Política de cookies y tecnologías de seguimiento de la plataforma digital de Del Carpio.",
};

export default function CookiesPage() {
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
              Política de cookies
            </h1>
            <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
          </header>

          <div className="space-y-6 text-sm leading-7 text-slate-600 font-sans">
            <p>
              Del Carpio Análisis y Asesorías utiliza cookies en esta plataforma para mejorar el rendimiento de la web, recordar sus preferencias de navegación y optimizar la experiencia técnica general. Al continuar utilizando nuestro sitio, usted acepta el almacenamiento de estas tecnologías en su dispositivo.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              1. ¿Qué es una cookie?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en su navegador o dispositivo móvil al visitarlo. Permite que el sitio recuerde sus acciones, configuraciones y preferencias (como el tipo de consulta seleccionado, inicio de sesión o datos de formularios) durante un período de tiempo, para que no tenga que volver a introducirlos cada vez que regrese o navegue por las páginas.
            </p>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              2. Cookies Utilizadas
            </h2>
            <p>
              Utilizamos los siguientes tipos de cookies en nuestra web:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cookies Necesarias:</strong> Esenciales para el correcto funcionamiento del sitio, como la navegación de páginas y el envío seguro de formularios de contacto.
              </li>
              <li>
                <strong>Cookies de Rendimiento y Analítica:</strong> Nos permiten recopilar datos estadísticos anónimos sobre el tráfico, las visitas a servicios y las secciones de mayor interacción (ej. Google Analytics), ayudándonos a optimizar la velocidad y estabilidad del sitio.
              </li>
            </ul>

            <h2 className="font-display text-lg font-bold text-slate-800 pt-2">
              3. Control de Cookies
            </h2>
            <p>
              Usted tiene el derecho de aceptar, bloquear o eliminar las cookies en cualquier momento a través de la configuración de su navegador web. Tenga en cuenta que si decide desactivar las cookies esenciales, algunos componentes interactivos del sitio (como el tour virtual 360° o los formularios de cotización) podrían experimentar limitaciones operativas.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
