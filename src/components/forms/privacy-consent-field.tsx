import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";

type PrivacyConsentFieldProps = {
  id: string;
  registration: UseFormRegisterReturn;
  error?: string;
  tone?: "light" | "dark";
};

export function PrivacyConsentField({
  id,
  registration,
  error,
  tone = "light",
}: PrivacyConsentFieldProps) {
  const isDark = tone === "dark";
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <div className="flex min-h-11 items-start gap-3">
        <input
          id={id}
          type="checkbox"
          {...registration}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE369]"
        />
        <label
          htmlFor={id}
          className={`cursor-pointer text-xs leading-relaxed ${
            isDark ? "text-white/80" : "text-slate-500"
          }`}
        >
          Autorizo a Del Carpio Ltda. a tratar los datos entregados
          exclusivamente para responder esta solicitud, de acuerdo con nuestra{" "}
          <Link
            href="/contacto/politica-privacidad"
            className={`font-semibold underline underline-offset-2 ${
              isDark
                ? "text-white hover:text-[#FBE369]"
                : "text-[#D6532B] hover:text-[#B8431E]"
            }`}
          >
            Política de privacidad
          </Link>
          .
        </label>
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className={
            isDark
              ? "text-xs font-semibold text-[#FBE369]"
              : "text-xs font-semibold text-red-700"
          }
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
