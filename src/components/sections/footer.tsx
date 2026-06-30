import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { company } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--science-cyan)] text-white">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-[70px] md:grid-cols-3">
        <div className="grid grid-cols-[56px_1fr] gap-5">
          <MapPin size={48} weight="fill" className="text-white" />
          <div>
            <h2 className="text-xs font-bold leading-6">
              Del Carpio © {year}
            </h2>
            <p className="mt-4 text-xs leading-[22px] text-white/82">
              {company.location}
              <br />
              Instrumentación analítica para laboratorios industriales en Chile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[56px_1fr] gap-5">
          <Phone size={46} weight="fill" className="text-white" />
          <div>
            <h2 className="text-xs font-bold leading-6">Llámanos o coordina una visita:</h2>
            <p className="mt-4 text-xs leading-[22px] text-white/82">
              Teléfono: {company.phone}
              <br />
              Atención técnica en terreno.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[64px_1fr] gap-5">
          <EnvelopeSimple size={56} weight="fill" className="text-white" />
          <div>
            <h2 className="text-xs font-bold leading-6">Envíanos un mensaje:</h2>
            <a
              href={`mailto:${company.email}`}
              className="mt-4 block text-xs leading-[22px] text-white/90 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
