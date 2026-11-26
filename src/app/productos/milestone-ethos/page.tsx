import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ETHOS_COMPATIBILITY_NOTE,
  ETHOS_FAMILY_PATH,
  ethosAccessories,
  ethosCommonAccessory,
  ethosComparisonRows,
  ethosLeanRotors,
  ethosLeanWorkflows,
  ethosModels,
  ethosRotors,
} from "@/content/milestone-ethos";

import { RestekProductPageShell } from "../restek/restek-product-page-shell";

const title = "Milestone ETHOS: LEAN, EASY y UP | Del Carpio";
const description =
  "Compare los sistemas de digestión por microondas Milestone ETHOS LEAN, EASY y UP: terminal, funciones, rotores y accesorios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: ETHOS_FAMILY_PATH },
  openGraph: {
    title,
    description,
    url: ETHOS_FAMILY_PATH,
    images: [ethosModels[2].image],
  },
};

const quoteHref = `/contacto/cotizar?${new URLSearchParams({
  producto: "Milestone ETHOS",
  accion: "asesoria",
  from: ETHOS_FAMILY_PATH,
}).toString()}`;

const sectionTitle =
  "font-display text-2xl font-bold tracking-tight text-[#4A5560] md:text-3xl";
const groupTitle =
  "font-display text-sm font-bold uppercase tracking-[0.14em] text-[#4A5560]";
const itemTitle = "font-display text-base font-bold text-[#4A5560]";
const itemText = "mt-1 text-sm leading-6 text-[#4A5560]";

export default function Page() {
  return (
    <RestekProductPageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <header>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#4A5560]">
              <li>
                <Link
                  href="/productos"
                  className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[#D6532B]"
                >
                  <ArrowLeft size={15} weight="bold" aria-hidden />
                  Productos
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">Milestone ETHOS</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#4A5560] md:text-6xl">
            Milestone ETHOS
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4A5560]">
            Digestión por microondas en recipiente cerrado en tres modelos:
            LEAN, compacto, y las configuraciones EASY y UP de ETHOS.
          </p>
        </header>

        <section aria-labelledby="ethos-comparativa" className="mt-12">
          <h2 id="ethos-comparativa" className="sr-only">
            Comparativa de modelos
          </h2>
          <ul className="grid grid-cols-3 items-end border-b-2 border-[#4A5560] lg:grid-cols-[28%_repeat(3,minmax(0,1fr))]">
            <li aria-hidden className="hidden lg:block" />
            {ethosModels.map((model) => (
              <li key={model.slug}>
                <Link
                  href={`/productos/${model.slug}`}
                  className="group block px-1 pb-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                >
                  <span className="relative block h-28 sm:h-48 lg:h-56">
                    <Image
                      src={model.image}
                      alt={`Sistema de digestión por microondas Milestone ${model.name}`}
                      fill
                      sizes="(min-width: 1024px) 270px, 33vw"
                      className="object-contain object-bottom"
                    />
                  </span>
                  <span className="mt-3 flex min-h-11 items-center justify-center font-display text-sm font-bold text-[#4A5560] underline decoration-[#D6532B] decoration-2 underline-offset-4 group-hover:text-[#D6532B] sm:text-lg">
                    {model.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <table className="dc-responsive-table mt-6 w-full table-fixed border-collapse text-left text-sm text-[#4A5560] lg:mt-0">
            <caption className="sr-only">
              Comparativa de Milestone ETHOS LEAN, EASY y UP
            </caption>
            {/* Desde lg las fotos de arriba hacen de encabezado visual: los
                anchos van en colgroup para alinear columnas con ellas. */}
            <colgroup>
              <col className="w-[28%]" />
              {ethosModels.map((model) => (
                <col key={model.slug} className="w-[24%]" />
              ))}
            </colgroup>
            <thead className="lg:sr-only">
              <tr>
                <th scope="col">Característica</th>
                {ethosModels.map((model) => (
                  <th key={model.slug} scope="col">
                    {model.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ethosComparisonRows.map((row) => (
                // Bajo lg cada fila mantiene las tres columnas, alineadas con
                // las fotos, en vez de apilar un valor por línea.
                <tr
                  key={row.label}
                  className="max-lg:!grid max-lg:grid-cols-3 max-lg:gap-x-2 lg:border-b lg:border-[var(--border)]"
                >
                  <th scope="row" className="py-4 pr-4 font-bold max-lg:col-span-3">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={ethosModels[index].slug}
                      data-label={ethosModels[index].name}
                      className="px-2 py-4 text-center max-lg:!border-t-0 max-lg:!text-center max-lg:!text-[13px]"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="ethos-rotores" className="mt-16">
          <h2 id="ethos-rotores" className={sectionTitle}>
            Rotores de digestión
          </h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-3 lg:gap-0">
            <div className="lg:pr-8">
              <h3 className={`${groupTitle} border-t-2 border-[#4A5560] pt-3`}>
                ETHOS LEAN
              </h3>
              <ul className="mt-2 divide-y divide-[var(--border)]">
                {ethosLeanRotors.map((rotor) => (
                  <li key={rotor.name} className="py-4">
                    <h4 className={itemTitle}>{rotor.name}</h4>
                    <p className={itemText}>{rotor.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 lg:border-l lg:border-[var(--border)] lg:pl-8">
              <h3 className={`${groupTitle} border-t-2 border-[#D6532B] pt-3`}>
                ETHOS EASY y ETHOS UP
              </h3>
              <ul className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-6">
                {ethosRotors.map((rotor) => (
                  <li key={rotor.name}>
                    {rotor.image ? (
                      <span className="relative mb-4 block h-44">
                        <Image
                          src={rotor.image}
                          alt={rotor.name}
                          fill
                          sizes="(min-width: 640px) 220px, 90vw"
                          className="object-contain"
                        />
                      </span>
                    ) : null}
                    <h4 className={itemTitle}>{rotor.name}</h4>
                    <p className={itemText}>{rotor.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="ethos-accesorios" className="mt-16">
          <h2 id="ethos-accesorios" className={sectionTitle}>
            Accesorios
          </h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-3 lg:gap-0">
            <div className="lg:pr-8">
              <h3 className={`${groupTitle} border-t-2 border-[#4A5560] pt-3`}>
                Común a los tres modelos
              </h3>
              <h4 className={`${itemTitle} mt-4`}>{ethosCommonAccessory.name}</h4>
              <p className={itemText}>{ethosCommonAccessory.description}</p>
              <h3 className={`${groupTitle} mt-8 border-t border-[var(--border)] pt-3`}>
                Además, en ETHOS LEAN
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4A5560]">
                {ethosLeanWorkflows.map((workflow) => (
                  <li key={workflow}>{workflow}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 lg:border-l lg:border-[var(--border)] lg:pl-8">
              <h3 className={`${groupTitle} border-t-2 border-[#D6532B] pt-3`}>
                ETHOS EASY y ETHOS UP
              </h3>
              <ul className="mt-2 divide-y divide-[var(--border)]">
                {ethosAccessories.map((accessory) => (
                  <li key={accessory.name} className="flex items-center gap-4 py-3">
                    {accessory.image ? (
                      <span className="relative block h-20 w-20 shrink-0">
                        <Image
                          src={accessory.image}
                          alt={accessory.name}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </span>
                    ) : null}
                    <div className="min-w-0">
                      <h4 className={itemTitle}>{accessory.name}</h4>
                      <p className={itemText}>{accessory.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-16 flex flex-col items-start gap-5 border-t-2 border-[#4A5560] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-base leading-7 text-[#4A5560]">
            {ETHOS_COMPATIBILITY_NOTE}
          </p>
          <Button asChild className="shrink-0">
            <Link href={quoteHref}>Cotizar o pedir asesoría</Link>
          </Button>
        </div>
      </div>
    </RestekProductPageShell>
  );
}
