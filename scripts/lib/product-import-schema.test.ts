// Prueba con el test runner nativo de Node (node:test), sin dependencias
// nuevas. Uso: node --test scripts/lib/product-import-schema.test.ts
//
// Cubre el split de specsBlock en parseComparedModels (tipo B): no puede
// usar "," a secas (rompe comas decimales como "8,85 kW") ni
// (?<!\d),(?!\d) (rompe "Número de carros=1,Rango=x", donde la coma está
// precedida por un dígito pero debe partir igual porque el lado derecho es
// una letra).

import { test } from "node:test";
import assert from "node:assert/strict";
import { parseComparedModels } from "./product-import-schema.ts";

function specsOf(specsBlock: string) {
  return parseComparedModels(`id|Label|${specsBlock}`)[0].specs;
}

test("coma decimal dentro de un valor no parte el par (8,85 kW)", () => {
  const specs = specsOf("Potencia total=8,85 kW,Capacidad=10 L");
  assert.equal(specs.length, 2);
  assert.deepEqual(specs[0], { key: "potencia-total", label: "Potencia total", value: "8,85 kW" });
  assert.deepEqual(specs[1], { key: "capacidad", label: "Capacidad", value: "10 L" });
});

test("coma seguida de letra SÍ parte el par, aunque el lado izquierdo sea un dígito", () => {
  const specs = specsOf("Número de carros=1,Rango=x");
  assert.equal(specs.length, 2);
  assert.deepEqual(specs[0], { key: "numero-de-carros", label: "Número de carros", value: "1" });
  assert.deepEqual(specs[1], { key: "rango", label: "Rango", value: "x" });
});

test("punto de miles en el valor no afecta el split por coma", () => {
  const specs = specsOf("Capacidad=1.350 L,Número=1");
  assert.equal(specs.length, 2);
  assert.deepEqual(specs[0], { key: "capacidad", label: "Capacidad", value: "1.350 L" });
  assert.deepEqual(specs[1], { key: "numero", label: "Número", value: "1" });
});
