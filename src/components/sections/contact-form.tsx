"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Indica tu nombre"),
  company: z.string().min(2, "Indica la empresa"),
  email: z.string().email("Ingresa un email valido"),
  need: z.string().min(12, "Describe brevemente la necesidad tecnica"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    console.info("Solicitud tecnica preparada", data);
  }

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-10 rounded-[2rem] bg-[var(--foreground)] p-6 text-white md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Contacto</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">
            Agenda una evaluacion tecnica inicial.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            Cuéntanos el proceso, criticidad o necesidad. La primera respuesta debe ordenar el problema, no vender por vender.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-[1.5rem] bg-white p-5 text-[var(--foreground)]">
          <Field label="Nombre" error={errors.name?.message}>
            <input {...register("name")} className="field" placeholder="Nombre y apellido" />
          </Field>
          <Field label="Empresa" error={errors.company?.message}>
            <input {...register("company")} className="field" placeholder="Empresa o planta" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input {...register("email")} className="field" placeholder="nombre@empresa.cl" />
          </Field>
          <Field label="Necesidad tecnica" error={errors.need?.message}>
            <textarea {...register("need")} className="field min-h-32 resize-none py-3" placeholder="Describe proceso, problema, urgencia o servicio requerido" />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            Enviar solicitud
            <PaperPlaneTilt size={17} weight="bold" />
          </Button>
          {isSubmitSuccessful ? (
            <p className="rounded-2xl bg-[var(--surface-muted)] p-4 text-sm font-medium text-[var(--foreground)]">
              Solicitud preparada. Falta conectar el formulario a email, CRM o ClickUp.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="text-sm font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
