// Serializador mínimo de objetos JS a literal TS legible (claves sin comillas
// cuando son identificadores válidos, strings vía JSON.stringify para
// escapar comillas/backslashes de forma segura). No es un formateador
// general — alcanza para los objetos Product que genera import-products.ts.

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export function toTsLiteral(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);

  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${padIn}${toTsLiteral(item, indent + 1)},`);
    return `[\n${items.join("\n")}\n${pad}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, v]) => {
      const keyStr = IDENT_RE.test(key) ? key : JSON.stringify(key);
      return `${padIn}${keyStr}: ${toTsLiteral(v, indent + 1)},`;
    });
    return `{\n${lines.join("\n")}\n${pad}}`;
  }

  throw new Error(`Valor no serializable: ${String(value)}`);
}
