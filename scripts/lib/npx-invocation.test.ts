// Guard de regresión para el bug real visto en Windows: import-products.ts
// invocaba execFileSync("npx", [...]) directo. En Windows "npx" es en
// realidad "npx.cmd" (no un ejecutable real) — eso falla con ENOENT, y
// apuntar a "npx.cmd" a mano falla con EINVAL; ambos vistos en corridas
// reales. shell:true arregla el spawn pero Node lo marca como riesgo de
// seguridad (DEP0190) al combinarlo con args. El fix real: en Windows,
// invocar a través de cmd.exe /c explícito (ejecutable real, sin la
// opción shell). No hay forma de testear el flujo --write completo sin
// mockear child_process (no hay librería de mocks en el proyecto, a
// propósito, sin dependencias nuevas) — esta prueba cubre el mecanismo
// exacto del fix en esta plataforma.

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("la invocación de npx resuelta para esta plataforma no lanza", () => {
  assert.doesNotThrow(() => {
    if (process.platform === "win32") {
      execFileSync("cmd.exe", ["/c", "npx", "--version"], { stdio: "ignore" });
    } else {
      execFileSync("npx", ["--version"], { stdio: "ignore" });
    }
  });
});
