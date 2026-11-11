// Verifica, SIN enviar ningún correo (no toca Resend, no requiere
// RESEND_API_KEY), que el asunto, el encabezado <h2> y la fila
// "TIPO DE SOLICITUD" del correo de /api/contacto son siempre coherentes
// entre sí para cada tipoSolicitud real del sitio, y que coinciden con la
// etiqueta esperada del formulario de origen que lo produce.
//
// Contexto del bug que esto previene: antes, "TIPO DE SOLICITUD" se
// inferia en route.ts a partir de `accion === "asesoria"` o de un substring
// ("ASESORÍA TÉCNICA") dentro del mensaje libre, lo que colapsaba a
// "Cotización de equipo" por defecto para CUALQUIER formulario que no
// pasara por ese único camino — incluyendo las 4 cards de servicio técnico,
// el formulario general del home con "Soporte técnico" seleccionado, el CTA
// rápido de /servicios, "Solicitar Ficha" en la ficha de producto y el modo
// "Asesoría de selección" de Restek. Este script carga en vivo (no duplica)
// las funciones reales de src/lib/contact-email-labels.ts — las mismas que
// usa route.ts — y las ejercita con datos de ejemplo.
//
// Nota técnica: src/lib/contact-email-labels.ts importa "./contact-schema"
// SIN extensión, como el resto de la app (resolución "bundler" de
// tsconfig.json). El ESM nativo de Node exige extensión en specifiers
// relativos, así que este script transpila ambos archivos a una carpeta
// temporal CON las extensiones corregidas y los importa desde ahí — no se
// toca ni se duplica el código fuente real. La carpeta temporal se crea
// dentro de scripts/ (no en el temp del sistema) para que "zod" siga
// resolviéndose vía node_modules del proyecto, y se borra al terminar.
//
// Uso: node scripts/check-tipo-solicitud-coherencia.ts
// Códigos de salida: 0 = todo coherente. 1 = se encontró una incoherencia.

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

function transpile(relativeSourcePath: string): string {
  const source = readFileSync(join(repoRoot, relativeSourcePath), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  // Única corrección necesaria: el import relativo sin extensión que
  // contact-email-labels.ts usa en la app real (resolución "bundler") no es
  // resoluble por el ESM nativo de Node — se le agrega ".mjs" solo en esta
  // copia transpilada efímera.
  return outputText.replace(
    /from "\.\/contact-schema"/,
    'from "./contact-schema.mjs"',
  );
}

const tmpDir = mkdtempSync(join(repoRoot, "scripts", ".tmp-tipo-solicitud-"));
let exported: typeof import("../src/lib/contact-email-labels.ts");
try {
  writeFileSync(join(tmpDir, "contact-schema.mjs"), transpile("src/lib/contact-schema.ts"));
  writeFileSync(join(tmpDir, "contact-email-labels.mjs"), transpile("src/lib/contact-email-labels.ts"));
  exported = await import(pathToFileURL(join(tmpDir, "contact-email-labels.mjs")).href);
} finally {
  rmSync(tmpDir, { recursive: true, force: true });
}

const {
  buildTipoSolicitudHeading,
  buildTipoSolicitudRow,
  buildTipoSolicitudSubject,
  TIPOS_SOLICITUD,
} = exported;

type TipoSolicitud = (typeof TIPOS_SOLICITUD)[number];

type Case = {
  description: string;
  tipoSolicitud: TipoSolicitud;
  marca?: string;
  origen?: string;
  expectedSubjectLabel: string;
};

// Un caso por cada formulario/entry-point real auditado, con el
// tipoSolicitud que ese formulario fija hoy (ver contact-client-page.tsx,
// contact-form.tsx, quote-section.tsx, service-inquiry-cta.tsx) y la
// etiqueta que un humano esperaría ver para ese origen.
const cases: Case[] = [
  {
    description: "Home: ContactForm general, tipoConsulta=cotizacion-equipo",
    tipoSolicitud: "cotizacion-equipo",
    expectedSubjectLabel: "Cotización",
  },
  {
    description: "Home: ContactForm general, tipoConsulta=proyecto-laboratorio",
    tipoSolicitud: "proyecto-laboratorio",
    expectedSubjectLabel: "Proyecto de Laboratorio",
  },
  {
    description: "Home: ContactForm general, tipoConsulta=soporte-tecnico",
    tipoSolicitud: "servicio-tecnico",
    expectedSubjectLabel: "Servicio Técnico",
  },
  {
    description: "Home: ContactForm general, tipoConsulta=otro",
    tipoSolicitud: "consulta-general",
    expectedSubjectLabel: "Consulta General",
  },
  {
    description: "/nosotros: QuoteSection (\"Solicita una cotización\")",
    tipoSolicitud: "cotizacion-equipo",
    expectedSubjectLabel: "Cotización",
  },
  {
    description: "/servicios: ServiceInquiryCta (CTA rápido de servicio técnico)",
    tipoSolicitud: "servicio-tecnico",
    expectedSubjectLabel: "Servicio Técnico",
  },
  {
    description: "/contacto/mantencion, /correctivo, /diagnostico, /capacitacion",
    tipoSolicitud: "servicio-tecnico",
    expectedSubjectLabel: "Servicio Técnico",
  },
  {
    description: "/contacto/proyectos",
    tipoSolicitud: "proyecto-laboratorio",
    expectedSubjectLabel: "Proyecto de Laboratorio",
  },
  {
    description: "/contacto/otras-consultas",
    tipoSolicitud: "consulta-general",
    expectedSubjectLabel: "Consulta General",
  },
  {
    description: "/contacto/ventas",
    tipoSolicitud: "cotizacion-equipo",
    expectedSubjectLabel: "Cotización",
  },
  {
    description: "Ficha de producto, botón \"Cotizar\" (accion=cotizar)",
    tipoSolicitud: "cotizacion-equipo",
    expectedSubjectLabel: "Cotización",
  },
  {
    description: "Ficha de producto, botón \"Asesoría\" (accion=asesoria)",
    tipoSolicitud: "asesoria-tecnica",
    expectedSubjectLabel: "Asesoría Técnica",
  },
  {
    description: "Ficha de producto, botón \"Solicitar Ficha\" (accion=ficha)",
    tipoSolicitud: "ficha-tecnica",
    expectedSubjectLabel: "Ficha Técnica",
  },
  {
    description: "Restek, modo=medidas (\"Cotización por medidas\")",
    tipoSolicitud: "cotizacion-equipo",
    marca: "Restek",
    origen: "Columnas capilares de sílice fundida",
    expectedSubjectLabel: "Cotización",
  },
  {
    description: "Restek, modo=asesoria (\"Asesoría de selección\")",
    tipoSolicitud: "asesoria-tecnica",
    marca: "Restek",
    origen: "Columnas capilares de sílice fundida",
    expectedSubjectLabel: "Asesoría Técnica",
  },
];

let failures = 0;

function fail(message: string) {
  failures += 1;
  console.error(`✘ ${message}`);
}

// 1) TIPOS_SOLICITUD y los casos de prueba deben cubrirse mutuamente: si se
//    agrega un tipo nuevo al enum sin agregar un caso aquí, o viceversa,
//    el script debe fallar en vez de pasar en silencio.
const typesCovered = new Set(cases.map((c) => c.tipoSolicitud));
for (const tipo of TIPOS_SOLICITUD) {
  if (!typesCovered.has(tipo)) {
    fail(`TIPOS_SOLICITUD tiene "${tipo}" pero ningún caso de prueba lo ejercita.`);
  }
}

// 2) Para cada caso: el asunto, el encabezado y la fila deben coincidir
//    entre sí (misma subjectLabel) y con la etiqueta esperada del
//    formulario de origen.
for (const c of cases) {
  const subject = buildTipoSolicitudSubject({
    tipoSolicitud: c.tipoSolicitud,
    destinationLabel: "Ventas",
    marca: c.marca,
    origen: c.origen,
  });
  const heading = buildTipoSolicitudHeading(c.tipoSolicitud);
  const row = buildTipoSolicitudRow(c.tipoSolicitud);

  if (!subject.includes(c.expectedSubjectLabel)) {
    fail(`[${c.description}] el asunto "${subject}" no contiene "${c.expectedSubjectLabel}".`);
  }
  if (!heading.includes(c.expectedSubjectLabel)) {
    fail(`[${c.description}] el encabezado "${heading}" no contiene "${c.expectedSubjectLabel}".`);
  }
  if (!row.label.toUpperCase().includes(c.expectedSubjectLabel.toUpperCase())) {
    fail(
      `[${c.description}] la fila "TIPO DE SOLICITUD" ("${row.label}") no corresponde a "${c.expectedSubjectLabel}".`,
    );
  }
}

// 3) Dos tipoSolicitud distintos nunca deben producir el mismo encabezado
//    (si colisionaran, dos categorías de correo serían indistinguibles en
//    el asunto/encabezado aunque la fila sea distinta).
const headingsByType = new Map<string, TipoSolicitud>();
for (const tipo of TIPOS_SOLICITUD) {
  const heading = buildTipoSolicitudHeading(tipo);
  const existing = headingsByType.get(heading);
  if (existing) {
    fail(`"${tipo}" y "${existing}" producen el mismo encabezado ("${heading}").`);
  } else {
    headingsByType.set(heading, tipo);
  }
}

if (failures > 0) {
  console.error(`\n✘ check:tipo-solicitud-coherencia — ${failures} incoherencia(s) encontrada(s).`);
  process.exit(1);
}

console.log(
  `✓ check:tipo-solicitud-coherencia — ${cases.length} formularios y ${TIPOS_SOLICITUD.length} tipos verificados, asunto/encabezado/fila coherentes en todos. No se envió ningún correo.`,
);
