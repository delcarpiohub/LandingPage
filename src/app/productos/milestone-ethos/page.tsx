import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import {
  ProductContactCta,
  productContactHref,
} from "@/components/products/product-contact-cta";
import {
  ProductHero,
  ProductHeroAnchorAction,
  ProductHeroBanner,
  ProductHeroBreadcrumb,
  ProductHeroDescription,
  ProductHeroHeadline,
  ProductHeroKicker,
  ProductHeroPrimaryAction,
} from "@/components/products/product-hero";
import {
  ETHOS_COMPATIBILITY_NOTE,
  ETHOS_FAMILY_PATH,
  ethosAccessories,
  ethosCommonAccessory,
  ethosComparisonRows,
  ethosFamily,
  ethosHeroFacts,
  ethosLeanRotors,
  ethosLeanWorkflows,
  ethosModels,
  ethosRotors,
} from "@/content/milestone-ethos";
import { getProductBySlug } from "@/lib/mock-products";

import { RestekProductPageShell } from "../restek/restek-product-page-shell";

const title = "Milestone ETHOS: EASY, UP y LEAN | Del Carpio";
const description =
  "Compare los sistemas de digestión por microondas Milestone ETHOS EASY, UP y LEAN: terminal, funciones, rotores y accesorios.";

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
  "bg-[#707E83]/10 px-4 py-4 text-left font-semibold first:rounded-l-lg last:rounded-r-lg";

const COMPARISON_ID = "ethos-comparativa";

/** Bloque de imagen del hero: un enlace por modelo a su ficha. */
function ModelCards() {
  return (
    <ul
      aria-label="Modelos"
      className="divide-y divide-[var(--border)] sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {ethosModels.map((model, index) => (
        <li
          key={model.slug}
          className="py-5 first:pt-0 last:pb-0 sm:px-2 sm:py-0"
        >
          <Link
            href={`/productos/${model.slug}`}
            aria-labelledby={`${model.slug}-nombre`}
            aria-describedby={`${model.slug}-linea ${model.slug}-datos`}
            className="group grid h-full grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] sm:flex sm:flex-col sm:items-stretch sm:text-center"
          >
            {/* 4:3 es la proporción de la foto más ancha (UP): así los tres
                equipos quedan a la misma altura en cualquier ancho. */}
            <div className="relative h-28 sm:aspect-[4/3] sm:h-auto">
              <Image
                src={model.image}
                alt={`Sistema de digestión por microondas Milestone ${model.name}`}
                fill
                sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 112px"
                className="object-contain object-bottom"
              />
            </div>
            <div className="min-w-0">
              <h3
                id={`${model.slug}-nombre`}
                className="font-display text-xl font-bold text-[#4A5560] underline decoration-[#D6532B] decoration-2 underline-offset-[6px] group-hover:text-[#D6532B] xl:text-2xl"
              >
                {model.name}
              </h3>
              <p
                id={`${model.slug}-linea`}
                className="mt-2 text-sm leading-6 text-[#4A5560] sm:mx-auto sm:min-h-12 sm:max-w-[26ch]"
              >
                {model.summary}
              </p>
              <ul
                id={`${model.slug}-datos`}
                className="mt-3 space-y-1 border-t border-[var(--border)] pt-3 text-[13px] font-semibold leading-5 text-[#4A5560]"
              >
                {ethosHeroFacts(index).map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  // La categoría sale de las fichas de la familia, no se repite aquí.
  const { category } = getProductBySlug(ethosModels[0].slug)!;

  return (
    <RestekProductPageShell
      banner={<ProductHeroBanner title={ethosFamily.name} />}
    >
      <ProductHero
        watermark={ethosFamily.brand}
        media={
          <Reveal delay={0.08} className="relative z-10 min-w-0">
            <ModelCards />
          </Reveal>
        }
      >
        <ProductHeroBreadcrumb
          category={category}
          model={ethosFamily.name}
          // Área táctil de 44 px también con el zoom 0.9, sin mover el texto.
          linkClassName="min-w-[49px] px-2.5 -mx-2.5 lg:py-4 lg:-my-4"
        />
        <ProductHeroKicker>
          {/*  : el "·" no puede quedar al comienzo de una línea. */}
          {`${ethosFamily.brand} · ${category}`}
        </ProductHeroKicker>
        <ProductHeroHeadline
          lead={ethosFamily.brand}
          accent={ethosFamily.model}
        />
        <ProductHeroDescription>{ethosFamily.lead}</ProductHeroDescription>
        <div className="mt-8 flex flex-wrap gap-3">
          <ProductHeroPrimaryAction
            href={productContactHref(ethosFamily.slug, "cotizar")}
          />
          <ProductHeroAnchorAction href={`#${COMPARISON_ID}`}>
            Ver comparativa
          </ProductHeroAnchorAction>
        </div>
      </ProductHero>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <section aria-labelledby={COMPARISON_ID}>
          {/* tabIndex: "Ver comparativa" deja el foco aquí. scroll-mt libra la
              cabecera fija. */}
          <h2
            id={COMPARISON_ID}
            tabIndex={-1}
            className={`${sectionTitle} w-fit scroll-mt-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]`}
          >
            Comparativa técnica
          </h2>
          {/* Bajo md la tabla se apila: la característica ocupa todo el ancho y
              cada valor lleva encima el nombre corto de su modelo; la cabecera
              queda solo para lectores de pantalla. Al cambiar el display hay
              que declarar los roles de tabla. */}
          <table
            role="table"
            className="mt-6 w-full table-fixed border-collapse text-left text-[13px] text-[#4A5560] max-[374px]:text-xs max-md:block max-md:border-t max-md:border-[var(--border)] md:text-sm"
          >
            <caption className="sr-only">
              Comparativa de Milestone ETHOS EASY, UP y LEAN
            </caption>
            <colgroup>
              <col className="w-[28%]" />
              {ethosModels.map((model) => (
                <col key={model.slug} className="w-[24%]" />
              ))}
            </colgroup>
            <thead role="rowgroup" className="max-md:sr-only">
              <tr role="row">
                <th role="columnheader" scope="col" className={headCell}>
                  Características
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
                  className="border-b border-[var(--border)] max-md:grid max-md:grid-cols-3 max-md:gap-x-2 max-md:px-3 max-md:py-3 max-[374px]:!px-1.5"
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
                      {/* aria-hidden: la columna ya anuncia el modelo. */}
                      <span
                        aria-hidden
                        className="block text-[11px] font-semibold uppercase tracking-[0.08em] md:hidden"
                      >
                        {ethosModels[index].name.replace("ETHOS ", "")}
                      </span>
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
            <div className="md:col-span-2 md:pr-8">
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
            <div className="md:border-l md:border-[var(--border)] md:pl-8">
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
              <h3 className={groupTitle}>ETHOS EASY y ETHOS UP</h3>
              <ul
                className={`${accessoryContent} grid gap-6 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-1 lg:grid-cols-2`}
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
          </div>
        </section>

        <p className="mt-10 border-t border-[var(--border)] pt-6 text-base leading-7 text-[#4A5560]">
          {ETHOS_COMPATIBILITY_NOTE}
        </p>
      </div>
      <ProductContactCta
        slug={ethosFamily.slug}
        //  : el "·" no puede quedar al comienzo de una línea.
        productName={`${ethosFamily.name} · EASY, UP y LEAN`}
      />
    </RestekProductPageShell>
  );
}
