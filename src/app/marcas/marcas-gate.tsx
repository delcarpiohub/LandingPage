"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { MarcasGrid } from "@/components/marcas/marcas-grid";
import { hasBrandsGateAccess } from "@/lib/brands-gate";

// Gate de UX: esta página solo debe abrirse tras hacer clic en un logo de la
// franja de marcas del home (id="marcas" en lab-photos.tsx), que marca
// sessionStorage antes de navegar. Si alguien entra directo a /marcas (sin
// ese flag) se redirige al home en silencio — ver src/lib/brands-gate.ts
// para la razón de que no sea un mecanismo de seguridad real.
export function MarcasGate() {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "unlocked">("checking");

  useEffect(() => {
    // sessionStorage no existe en el render de servidor; no hay forma de
    // calcular este estado de forma síncrona sin desalinear la hidratación,
    // así que el flag "checking" -> "unlocked" es la excepción legítima al
    // patrón "no state en efectos".
    if (hasBrandsGateAccess()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("unlocked");
    } else {
      router.replace("/");
    }
  }, [router]);

  if (status === "checking") {
    return <div className="min-h-dvh bg-[var(--background)]" />;
  }

  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <Navigation />
      <main id="main-content">
        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            Marcas representadas
          </p>
          <h1 className="mt-5 text-center text-3xl leading-[1.03] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Representamos y damos soporte técnico a estas marcas en Chile.
          </h1>

          <div className="mt-14">
            <MarcasGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
