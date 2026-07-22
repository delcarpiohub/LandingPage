"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { ContactFormData, RestekUnknownField } from "@/lib/contact-schema";

type RestekMode = "medidas" | "asesoria";
type RestekProductLine = "gc" | "lc" | "vials";
type RestekFieldName =
  | "codigoRestek"
  | "faseEstacionaria"
  | "diametroInterno"
  | "longitudColumna"
  | "espesorPelicula"
  | "tamanoParticula"
  | "cantidad"
  | "equipoGC"
  | "sistemaLC"
  | "detector"
  | "metodoNorma"
  | "columnaActual"
  | "matrizMuestra"
  | "analitos"
  | "problemaResolver"
  | "tipoVialFiltro"
  | "materialMembrana"
  | "porosidadFiltro"
  | "tipoTapa"
  | "solventeFaseMovil"
  | "volumenMuestra"
  | "contenidoSolidos"
  | "observacionesRestek";

type TechnicalField = {
  name: RestekFieldName;
  label: string;
  placeholder: string;
  type?: "textarea";
  canBeUnknown?: boolean;
};

const gcMeasureFields: TechnicalField[] = [
  { name: "codigoRestek", label: "Número de parte", placeholder: "Ej. 12345", canBeUnknown: true },
  { name: "faseEstacionaria", label: "Fase estacionaria", placeholder: "Ej. Rxi-5Sil MS", canBeUnknown: true },
  { name: "diametroInterno", label: "Diámetro interno", placeholder: "Ej. 0,25 mm", canBeUnknown: true },
  { name: "longitudColumna", label: "Longitud de la columna", placeholder: "Ej. 30 m", canBeUnknown: true },
  { name: "cantidad", label: "Cantidad", placeholder: "Ej. 2 unidades", canBeUnknown: true },
  { name: "columnaActual", label: "Columna actual", placeholder: "Marca, familia o código si lo conoce", canBeUnknown: true },
  { name: "observacionesRestek", label: "Observaciones", placeholder: "Agregue cualquier antecedente útil", type: "textarea" },
];

const gcAdvisoryFields: TechnicalField[] = [
  { name: "matrizMuestra", label: "Matriz o tipo de muestra", placeholder: "Ej. agua, alimento, solvente", canBeUnknown: true },
  { name: "analitos", label: "Analitos o compuestos", placeholder: "¿Qué necesita separar o identificar?", type: "textarea", canBeUnknown: true },
  { name: "detector", label: "Detector disponible", placeholder: "Ej. FID, MS, ECD", canBeUnknown: true },
  { name: "columnaActual", label: "Columna utilizada actualmente", placeholder: "Marca, familia o código si lo conoce", canBeUnknown: true },
  { name: "problemaResolver", label: "Necesidad o problema a resolver", placeholder: "Describa el resultado que necesita obtener", type: "textarea", canBeUnknown: true },
  { name: "observacionesRestek", label: "Observaciones", placeholder: "Agregue cualquier antecedente útil", type: "textarea" },
];

const lcMeasureFields: TechnicalField[] = [
  { name: "codigoRestek", label: "Número de parte", placeholder: "Ej. 9634312", canBeUnknown: true },
  { name: "faseEstacionaria", label: "Familia o fase estacionaria", placeholder: "Ej. Raptor C18, Biphenyl o FluoroPhenyl", canBeUnknown: true },
  { name: "diametroInterno", label: "Diámetro interno", placeholder: "Ej. 2,1 mm o 4,6 mm", canBeUnknown: true },
  { name: "longitudColumna", label: "Longitud de la columna", placeholder: "Ej. 100 mm o 150 mm", canBeUnknown: true },
  { name: "tamanoParticula", label: "Tamaño de partícula", placeholder: "Ej. 1,8 µm, 2,7 µm, 3 µm o 5 µm", canBeUnknown: true },
  { name: "cantidad", label: "Cantidad", placeholder: "Ej. 2 unidades", canBeUnknown: true },
  { name: "columnaActual", label: "Columna actual o equivalente", placeholder: "Marca, familia o número de parte si lo conoce", canBeUnknown: true },
  { name: "observacionesRestek", label: "Observaciones", placeholder: "Agregue solo antecedentes necesarios para la cotización", type: "textarea" },
];

const lcAdvisoryFields: TechnicalField[] = [
  { name: "matrizMuestra", label: "Matriz o tipo de muestra", placeholder: "Ej. plasma, alimento, agua o principio activo", canBeUnknown: true },
  { name: "analitos", label: "Analitos o compuestos", placeholder: "¿Qué necesita separar, identificar o cuantificar?", type: "textarea", canBeUnknown: true },
  { name: "sistemaLC", label: "Sistema disponible", placeholder: "Ej. HPLC, UHPLC o LC-MS/MS", canBeUnknown: true },
  { name: "detector", label: "Detector disponible", placeholder: "Ej. UV/DAD, fluorescencia o MS", canBeUnknown: true },
  { name: "metodoNorma", label: "Método o condiciones conocidas", placeholder: "Método, fase móvil, pH u otra condición relevante", type: "textarea", canBeUnknown: true },
  { name: "columnaActual", label: "Columna utilizada actualmente", placeholder: "Marca, familia o número de parte si lo conoce", canBeUnknown: true },
  { name: "problemaResolver", label: "Resultado o problema a resolver", placeholder: "Describa brevemente la separación o mejora que necesita", type: "textarea", canBeUnknown: true },
];

const vialMeasureFields: TechnicalField[] = [
  { name: "codigoRestek", label: "Número de parte", placeholder: "Ej. 25863", canBeUnknown: true },
  { name: "tipoVialFiltro", label: "Formato del vial", placeholder: "Standard, nano, eXtreme o baja evaporación", canBeUnknown: true },
  { name: "materialMembrana", label: "Material de la membrana", placeholder: "PTFE, PVDF, PES o nylon", canBeUnknown: true },
  { name: "porosidadFiltro", label: "Porosidad", placeholder: "0,2 µm o 0,45 µm", canBeUnknown: true },
  { name: "tipoTapa", label: "Tipo de tapa", placeholder: "Estándar, precortada o baja evaporación", canBeUnknown: true },
  { name: "cantidad", label: "Cantidad", placeholder: "Ej. 2 cajas", canBeUnknown: true },
  { name: "observacionesRestek", label: "Observaciones", placeholder: "Agregue solo antecedentes necesarios para la cotización", type: "textarea" },
];

const vialAdvisoryFields: TechnicalField[] = [
  { name: "matrizMuestra", label: "Muestra o matriz", placeholder: "Ej. plasma, agua, alimento o extracto", canBeUnknown: true },
  { name: "solventeFaseMovil", label: "Solvente o fase móvil", placeholder: "Indique los solventes principales y su proporción si la conoce", canBeUnknown: true },
  { name: "volumenMuestra", label: "Volumen disponible", placeholder: "Ej. 250 µL, 500 µL o 1 mL", canBeUnknown: true },
  { name: "contenidoSolidos", label: "Contenido de partículas o sólidos", placeholder: "Bajo, medio, alto o porcentaje aproximado", canBeUnknown: true },
  { name: "sistemaLC", label: "Equipo o autosampler", placeholder: "Ej. HPLC, UHPLC o modelo del autosampler", canBeUnknown: true },
  { name: "problemaResolver", label: "Necesidad de preparación", placeholder: "Describa brevemente qué necesita filtrar o mejorar", type: "textarea", canBeUnknown: true },
  { name: "observacionesRestek", label: "Observaciones", placeholder: "Agregue cualquier antecedente útil", type: "textarea" },
];

const fieldsByProductLine: Record<RestekProductLine, Record<RestekMode, TechnicalField[]>> = {
  gc: {
    medidas: gcMeasureFields,
    asesoria: gcAdvisoryFields,
  },
  lc: {
    medidas: lcMeasureFields,
    asesoria: lcAdvisoryFields,
  },
  vials: {
    medidas: vialMeasureFields,
    asesoria: vialAdvisoryFields,
  },
};

const inputClass =
  "w-full rounded-[4px] border border-[#D2D6DC] bg-[#F4F6F9] px-4 text-[15px] text-slate-800 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:bg-[#EBEEF3] focus:border-[#D6532B] focus:bg-white focus:ring-2 focus:ring-[#D6532B]/10 disabled:cursor-not-allowed disabled:opacity-45";

export function RestekQuoteFields({
  mode,
  productLine,
  register,
  errors,
  unknownFields,
  onToggleUnknown,
}: {
  mode: RestekMode;
  productLine: RestekProductLine;
  register: UseFormRegister<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  unknownFields: string[];
  onToggleUnknown: (field: RestekUnknownField) => void;
}) {
  const fields = fieldsByProductLine[productLine][mode];

  return (
    <fieldset className="grid gap-6 border-y border-[#707E83]/20 py-7">
      <legend className="px-2 font-display text-lg font-extrabold text-[#4A5560]">
        {mode === "medidas" && productLine === "vials"
          ? "Datos de selección del vial con filtro"
          : mode === "medidas"
          ? `Datos técnicos de la columna ${productLine === "lc" ? "LC" : "GC"}`
          : "Contexto de la aplicación"}
      </legend>
      <p className="-mt-3 text-sm leading-6 text-[#647176]">
        Complete solo lo que conozca. Los campos técnicos son opcionales y nuestro equipo confirmará la configuración final.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
        {fields.map((field) => {
          const isUnknown = unknownFields.includes(field.name);
          const error = errors[field.name]?.message;
          const id = `restek-${field.name}`;

          return (
            <div
              key={field.name}
              className={field.type === "textarea" ? "flex flex-col gap-2 sm:col-span-2" : "flex flex-col gap-2"}
            >
              <label htmlFor={id} className="text-sm font-semibold text-slate-700">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  {...register(field.name)}
                  disabled={isUnknown}
                  className={`${inputClass} min-h-28 resize-y py-3`}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  id={id}
                  {...register(field.name)}
                  disabled={isUnknown}
                  className={`${inputClass} h-11`}
                  placeholder={field.placeholder}
                />
              )}
              {field.canBeUnknown ? (
                <label className="inline-flex w-fit cursor-pointer items-center gap-2 text-xs font-medium text-[#647176]">
                  <input
                    type="checkbox"
                    checked={isUnknown}
                    onChange={() => onToggleUnknown(field.name as RestekUnknownField)}
                    className="h-4 w-4 accent-[#D6532B]"
                  />
                  No lo sé, necesito asesoría
                </label>
              ) : null}
              {error ? <span className="text-sm font-semibold text-red-600">{String(error)}</span> : null}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
