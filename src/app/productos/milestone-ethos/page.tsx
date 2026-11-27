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
  ethosFamily,
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
    images: [ethosFamily.image],
  },
};

const quoteHref = `/contacto/cotizar?${new URLSearchParams({
  producto: "Milestone ETHOS",
  accion: "asesoria",
  from: ETHOS_FAMILY_PATH,
}).toString()}`;

const sectionTitle =
  "font-display text-2xl font-bold tracking-tight text-[#4A5560] md:text-3xl";
// "!": la regla global de h1-h4 (sin capa) pisa el tracking de las utilidades.
const groupTitle =
  "font-display text-sm font-bold uppercase !tracking-[0.14em] text-[#4A5560]";
const itemTitle = "font-display text-base font-bold text-[#4A5560]";
const itemText = "mt-1 text-sm leading-6 text-[#4A5560]";
const accessoryBlock = "py-6 md:grid md:grid-cols-3";
const accessoryContent =
  "mt-4 md:col-span-2 md:mt-0 md:border-l md:border-[var(--border)] md:pl-8";
const headCell =
  "py-3 text-left font-semibold md:bg-[#707E83]/10 md:px-4 md:py-4 md:first:rounded-l-lg md:last:rounded-r-lg";

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
              <li aria-current="page">{ethosFamily.name}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#4A5560] md:text-6xl">
            {ethosFamily.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4A5560]">
            {ethosFamily.lead}
          </p>
        </header>

        <section aria-label="Modelos" className="mt-12">
          <ul className="divide-y divide-[var(--border)] sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ethosModels.map((model) => (
              <li
                key={model.slug}
                className="py-5 first:pt-0 last:pb-0 sm:px-5 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <Link
                  href={`/productos/${model.slug}`}
                  aria-labelledby={`${model.slug}-nombre`}
                  aria-describedby={`${model.slug}-linea`}
                  className="group grid h-full grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] sm:flex sm:flex-col sm:items-stretch sm:text-center"
                >
                  <div className="relative h-28 sm:h-48 lg:h-64">
                    <Image
                      src={model.image}
                      alt={`Sistema de digestión por microondas Milestone ${model.name}`}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 33vw, 112px"
                      className="object-contain object-bottom"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2
                      id={`${model.slug}-nombre`}
                      className="font-display text-xl font-bold text-[#4A5560] underline decoration-[#D6532B] decoration-2 underline-offset-[6px] group-hover:text-[#D6532B] lg:text-2xl"
                    >
                      {model.name}
                    </h2>
                    <p
                      id={`${model.slug}-linea`}
                      className="mt-2 text-sm leading-6 text-[#4A5560] sm:mx-auto sm:max-w-[26ch] lg:text-base lg:leading-7"
                    >
                      {model.summary}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ethos-comparativa" className="mt-16">
          <h2 id="ethos-comparativa" className={sectionTitle}>
            Comparativa técnica
          </h2>
          {/* Bajo md la tabla se apila: la característica ocupa todo el ancho y
              los tres valores quedan bajo los nombres de la cabecera. Al cambiar
              el display hay que declarar los roles de tabla. */}
          <table
            role="table"
            className="mt-6 w-full table-fixed border-collapse text-left text-[13px] text-[#4A5560] max-md:block md:text-sm"
          >
            <caption className="sr-only">
              Comparativa de Milestone ETHOS LEAN, EASY y UP
            </caption>
            <colgroup>
              <col className="w-[28%]" />
              {ethosModels.map((model) => (
                <col key={model.slug} className="w-[24%]" />
              ))}
            </colgroup>
            <thead role="rowgroup" className="max-md:block">
              <tr
                role="row"
                className="max-md:grid max-md:grid-cols-3 max-md:gap-x-2 max-md:rounded-lg max-md:bg-[#707E83]/10 max-md:px-3"
              >
                <th
                  role="columnheader"
                  scope="col"
                  className={`${headCell} max-md:sr-only`}
                >
                  Característica
                </th>
                {ethosModels.map((model) => (
                  <th
                    key={model.slug}
                    role="columnheader"
                    scope="col"
                    className={headCell}
                  >
                    {model.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup" className="max-md:block">
              {ethosComparisonRows.map((row) => (
                <tr
                  key={row.label}
                  role="row"
                  className="border-b border-[var(--border)] max-md:grid max-md:grid-cols-3 max-md:gap-x-2 max-md:px-3 max-md:py-3"
                >
                  <th
                    role="rowheader"
                    scope="row"
                    className="font-semibold max-md:col-span-3 max-md:pb-1 md:px-4 md:py-3"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={ethosModels[index].slug}
                      role="cell"
                      className="align-top md:px-4 md:py-3 md:align-middle"
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
          <div className="mt-6 grid gap-10 md:grid-cols-3 md:gap-0">
            <div className="md:pr-8">
              <h3 className={`${groupTitle} border-b border-[var(--border)] pb-3`}>
                ETHOS LEAN
              </h3>
              <ul>
                {ethosLeanRotors.map((rotor) => (
                  <li key={rotor.name} className="py-4">
                    <h4 className={itemTitle}>{rotor.name}</h4>
                    <p className={itemText}>{rotor.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 md:border-l md:border-[var(--border)] md:pl-8">
              <h3 className={`${groupTitle} border-b border-[var(--border)] pb-3`}>
                ETHOS EASY y ETHOS UP
              </h3>
              <ul>
                {ethosRotors.map((rotor) => (
                  <li
                    key={rotor.name}
                    className="flex items-center gap-4 py-4 sm:gap-6"
                  >
                    {rotor.image ? (
                      <div className="relative aspect-[3/2] w-24 shrink-0 overflow-hidden rounded-lg sm:w-40">
                        <Image
                          src={rotor.image}
                          alt={rotor.name}
                          fill
                          sizes="(min-width: 640px) 160px, 96px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h4 className={itemTitle}>{rotor.name}</h4>
                      <p className={`${itemText} max-w-md`}>
                        {rotor.description}
                      </p>
                    </div>
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
          <div className="mt-6 divide-y divide-[var(--border)] border-t border-[var(--border)]">
            <div className={accessoryBlock}>
              <h3 className={groupTitle}>Común a los tres modelos</h3>
              <div className={accessoryContent}>
                <h4 className={itemTitle}>{ethosCommonAccessory.name}</h4>
                <p className={itemText}>{ethosCommonAccessory.description}</p>
              </div>
            </div>
            <div className={accessoryBlock}>
              <h3 className={groupTitle}>Además, en ETHOS LEAN</h3>
              <ul
                className={`${accessoryContent} space-y-2 text-sm leading-6 text-[#4A5560]`}
              >
                {ethosLeanWorkflows.map((workflow) => (
                  <li key={workflow}>{workflow}</li>
                ))}
              </ul>
            </div>
            <div className={accessoryBlock}>
              <h3 className={groupTitle}>ETHOS EASY y ETHOS UP</h3>
              <ul
                className={`${accessoryContent} grid gap-6 sm:grid-cols-2 sm:gap-x-8`}
              >
                {ethosAccessories.map((accessory) => (
                  <li key={accessory.name} className="flex items-center gap-4">
                    {accessory.image ? (
                      <div className="relative h-24 w-24 shrink-0">
                        <Image
                          src={accessory.image}
                          alt={accessory.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
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

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-base leading-7 text-[#4A5560]">
            {ETHOS_COMPATIBILITY_NOTE}
          </p>
          <Button asChild className="min-h-[52px] shrink-0">
            <Link href={quoteHref}>Cotizar o pedir asesoría</Link>
          </Button>
        </div>
      </div>
    </RestekProductPageShell>
  );
}
