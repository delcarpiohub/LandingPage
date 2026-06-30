import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section id="contacto" className="border-t border-[var(--border)] bg-white px-5 py-20">
      <div className="mx-auto grid max-w-site gap-8 border border-[#101820]/10 bg-[#f7f7f5] p-6 shadow-[0_18px_50px_rgba(16,24,32,0.06)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
        <div className="grid size-16 place-items-center bg-[#101820] text-[var(--primary)]">
          <EnvelopeSimple size={31} weight="light" />
        </div>

        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
            Contacto
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-[#101820] md:text-3xl">
            Elige el canal correcto para tu consulta.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#101820]/68">
            Ventas, soporte tecnico, visitas de laboratorio o solicitudes
            administrativas. Un punto de entrada claro reduce tiempos de
            respuesta.
          </p>
        </div>

        <Link
          href="/contacto"
          className="inline-flex h-12 items-center justify-center gap-2 bg-[var(--primary)] px-7 text-sm font-bold text-white transition hover:bg-[var(--primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          Ir a contacto
          <ArrowRight size={17} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
