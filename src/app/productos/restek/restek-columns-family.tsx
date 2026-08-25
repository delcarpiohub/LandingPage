"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { BrandCatalogNotice } from "@/components/products/brand-catalog-notice";

type RestekProductLine = "gc" | "lc" | "vials";

type RestekColumnsFamilyProps = {
  breadcrumbLabel: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    displayWidth?: number;
  };
  productLine: RestekProductLine;
  productName: string;
  knownPath: {
    title: string;
    description: string;
    action: string;
  };
  advisoryPath: {
    title: string;
    description: string;
    action: string;
  };
};

function buildQuoteHref({
  mode,
  productLine,
  productName,
}: {
  mode: "medidas" | "asesoria";
  productLine: RestekProductLine;
  productName: string;
}) {
  const params = new URLSearchParams({
    modo: mode,
    marca: "Restek",
    linea: productLine,
    producto: productName,
    origen: productName,
  });

  return `/contacto/cotizar?${params.toString()}`;
}

function JourneyCard({
  title,
  description,
  action,
  href,
  delay,
  reduceMotion,
}: {
  title: string;
  description: string;
  action: string;
  href: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : delay }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full min-h-56 flex-col rounded-2xl border border-[#707E83]/20 bg-white p-6 transition-colors hover:border-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] md:p-8"
      >
        <h2 className="font-display text-xl font-extrabold text-[#4A5560]">{title}</h2>
        <p className="mt-4 max-w-md text-base leading-7 text-[#647176]">{description}</p>
        <span className="mt-auto inline-flex w-fit rounded-lg bg-[#D6532B] px-5 py-3 font-display text-sm font-bold text-white transition-opacity group-hover:opacity-90 group-active:opacity-80">
          {action}
        </span>
      </Link>
    </motion.div>
  );
}

export function RestekColumnsFamily({
  breadcrumbLabel,
  title,
  description,
  image,
  productLine,
  productName,
  knownPath,
  advisoryPath,
}: RestekColumnsFamilyProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <header className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 -translate-y-2">
            <ol className="inline-flex min-w-0 flex-wrap items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#4A5560]">
              <li>
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#101820]"
                >
                  <ArrowLeft size={15} weight="bold" />
                  Productos
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="min-w-0 break-words text-[#101820]">{breadcrumbLabel}</li>
            </ol>
          </nav>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-[#4A5560] md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#647176]">{description}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 767px) 88vw, 500px"
            className={`h-auto w-full object-contain drop-shadow-xl ${image.displayWidth ? "max-w-96" : "max-w-[500px]"}`}
          />
        </div>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <JourneyCard
          {...knownPath}
          href={buildQuoteHref({ mode: "medidas", productLine, productName })}
          delay={0}
          reduceMotion={reduceMotion}
        />
        <JourneyCard
          {...advisoryPath}
          href={buildQuoteHref({ mode: "asesoria", productLine, productName })}
          delay={0.08}
          reduceMotion={reduceMotion}
        />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#707E83]/20 bg-white">
        <BrandCatalogNotice brand="Restek" currentProduct={productName} />
      </div>
    </section>
  );
}
