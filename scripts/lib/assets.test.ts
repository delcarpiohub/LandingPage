// Prueba con el test runner nativo de Node (node:test) — sin dependencias
// nuevas, igual que el resto de scripts/. Uso: node --test scripts/lib/assets.test.ts

import { test } from "node:test";
import assert from "node:assert/strict";
import { isPdfUrl } from "./assets.ts";

test("isPdfUrl acepta una URL que termina en .pdf", () => {
  assert.equal(isPdfUrl("https://example.com/ficha.pdf"), true);
});

test("isPdfUrl acepta .pdf con query string", () => {
  assert.equal(isPdfUrl("https://example.com/ficha.pdf?v=2"), true);
});

test("isPdfUrl es insensible a mayúsculas", () => {
  assert.equal(isPdfUrl("https://example.com/FICHA.PDF"), true);
});

test("isPdfUrl rechaza un .xlsx (el bug original: la extensión local se hardcodeaba a pdf)", () => {
  assert.equal(isPdfUrl("https://example.com/ficha.xlsx"), false);
});

test("isPdfUrl rechaza una URL sin extensión", () => {
  assert.equal(isPdfUrl("https://example.com/ficha"), false);
});
