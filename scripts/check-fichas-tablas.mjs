// Auditoría de tablas y specs de ficha de producto (prompt-tablas-fichas-movil.md,
// 2026-10-14). Recorre todas las fichas listadas en /sitemap.xml, prueba cada
// pestaña con contenido, y en 360/390/430/768/820px revisa:
//   1. elementos con desborde horizontal real (scrollWidth > clientWidth + 1)
//      fuera de carruseles declarados (overflow-x:auto/scroll propio, o
//      recortados por un ancestro con overflow:hidden/clip),
//   2. superposición label/valor dentro de las tablas de especificaciones,
//   3. <table> más ancha que su contenedor por debajo de 1024px (el
//      componente ResponsiveTable debería evitar esto siempre),
//   4. ancho útil del contenido de la tarjeta de specs a 390px (objetivo
//      >= 340px).
//
// Uso:
//   node scripts/check-fichas-tablas.mjs
//   BASE_URL=https://delcarpio1.vercel.app node scripts/check-fichas-tablas.mjs
//   LIMIT=10 node scripts/check-fichas-tablas.mjs   (solo probar N fichas, debug)
//
// Requiere el sitio corriendo en BASE_URL (por defecto http://localhost:3000)
// y expone /sitemap.xml para listar las rutas de producto.

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 6);
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : null;

const VIEWPORTS = [
  { width: 360, height: 900 },
  { width: 390, height: 900 },
  { width: 430, height: 900 },
  { width: 768, height: 1100 },
  { width: 820, height: 1180 },
];

const MIN_CONTENT_WIDTH_AT_390 = 340;
const OVERFLOW_TOLERANCE_PX = 1;

async function getProductRoutes() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]*\/productos\/[a-z0-9-]+)<\/loc>/g)];
  const routes = [...new Set(matches.map((m) => new URL(m[1]).pathname))].sort();
  return LIMIT ? routes.slice(0, LIMIT) : routes;
}

// Inyectada en la página. Autocontenida (sin closures sobre el módulo).
function auditPage({ tolerance, minContentWidth, checkContentWidth }) {
  const viewportWidth = window.innerWidth;
  const results = {
    overflow: [],
    specOverlap: [],
    tableTooWide: [],
    contentWidth: null,
  };

  function isScrollableAncestorOrSelf(el) {
    let node = el;
    while (node && node !== document.body) {
      const style = getComputedStyle(node);
      if (
        (style.overflowX === "auto" || style.overflowX === "scroll") &&
        node.scrollWidth > node.clientWidth + tolerance
      ) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function hasClippingAncestor(el) {
    let node = el.parentElement;
    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node);
      if (
        style.overflow === "hidden" ||
        style.overflow === "clip" ||
        style.overflowX === "hidden" ||
        style.overflowX === "clip"
      ) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function describe(el) {
    const id = el.id ? `#${el.id}` : "";
    const cls =
      el.className && typeof el.className === "string"
        ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
        : "";
    return `${el.tagName.toLowerCase()}${id}${cls}`;
  }

  // 1. Desbordes horizontales reales.
  for (const el of document.querySelectorAll("body *")) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.right > viewportWidth + tolerance) {
      if (isScrollableAncestorOrSelf(el) || hasClippingAncestor(el)) continue;
      const style = getComputedStyle(el);
      if (style.position === "fixed" || style.position === "sticky") continue;
      results.overflow.push({
        el: describe(el),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });
    }
  }

  // 2. Superposición label/valor dentro de SpecCell (fila con grid/flex de
  // dos columnas: el primer hijo es la etiqueta, el segundo el valor) y
  // dentro de las filas de ResponsiveTable convertidas en tarjeta.
  const specRows = document.querySelectorAll(
    "[data-spec-row], .dc-responsive-table tr",
  );
  for (const row of specRows) {
    const children = Array.from(row.children).filter(
      (c) => c.getBoundingClientRect().width > 0,
    );
    for (let i = 0; i < children.length - 1; i++) {
      const a = children[i].getBoundingClientRect();
      const b = children[i + 1].getBoundingClientRect();
      const overlapsHorizontally = a.right > b.left + tolerance && a.left < b.right;
      const overlapsVertically = a.top < b.bottom - tolerance && a.bottom > b.top + tolerance;
      if (overlapsHorizontally && overlapsVertically) {
        results.specOverlap.push({
          row: describe(row),
          a: describe(children[i]),
          b: describe(children[i + 1]),
        });
      }
    }
  }

  // 3. <table> más ancha que su contenedor (el ResponsiveTable no debe
  // producir una tabla con layout de tabla real por debajo de 1024px).
  if (viewportWidth < 1024) {
    for (const table of document.querySelectorAll("table")) {
      const tableRect = table.getBoundingClientRect();
      const container = table.parentElement;
      if (!container) continue;
      const containerRect = container.getBoundingClientRect();
      if (tableRect.width > containerRect.width + tolerance) {
        results.tableTooWide.push({
          table: describe(table),
          tableWidth: Math.round(tableRect.width),
          containerWidth: Math.round(containerRect.width),
        });
      }
    }
  }

  // 4. Ancho util del contenido de la tarjeta de specs (solo a 390px).
  if (checkContentWidth) {
    const card = document.querySelector(
      '[role="tabpanel"]#panel-especificaciones .overflow-hidden.border',
    );
    if (card) {
      const width = card.getBoundingClientRect().width;
      results.contentWidth = Math.round(width);
      if (width < minContentWidth - tolerance) {
        results.contentWidthFail = true;
      }
    }
  }

  return results;
}

async function auditRoute(browser, route) {
  const findings = [];
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      const acceptCookies = page.locator("text=Aceptar cookies");
      if (await acceptCookies.count()) {
        await acceptCookies.click().catch(() => {});
        await page.waitForTimeout(150);
      }

      const tabs = await page.locator('[role="tab"]').all();
      const tabIds =
        tabs.length > 0
          ? await Promise.all(tabs.map((t) => t.getAttribute("id")))
          : [null];

      for (const tabId of tabIds) {
        if (tabId) {
          await page
            .locator(`#${tabId}`)
            .click({ timeout: 5000 })
            .catch(() => {});
          await page.waitForTimeout(120);
        }

        const result = await page.evaluate(auditPage, {
          tolerance: OVERFLOW_TOLERANCE_PX,
          minContentWidth: MIN_CONTENT_WIDTH_AT_390,
          checkContentWidth: viewport.width === 390,
        });

        const issues =
          result.overflow.length +
          result.specOverlap.length +
          result.tableTooWide.length +
          (result.contentWidthFail ? 1 : 0);

        if (issues > 0) {
          findings.push({ viewport, tabId, result });
        }
      }
    } catch (error) {
      findings.push({ viewport, error: error.message });
    } finally {
      await page.close();
    }
  }
  return { route, findings };
}

async function main() {
  const routes = await getProductRoutes();
  console.log(`Fichas a revisar: ${routes.length}`);

  const browser = await chromium.launch();
  const queue = [...routes];
  const allResults = [];
  let completed = 0;

  async function worker() {
    while (queue.length > 0) {
      const route = queue.shift();
      if (!route) break;
      const result = await auditRoute(browser, route);
      allResults.push(result);
      completed += 1;
      if (completed % 10 === 0) {
        console.log(`  ...${completed}/${routes.length}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker()),
  );

  await browser.close();

  let totalIssues = 0;
  const withIssues = allResults.filter((r) => r.findings.length > 0);

  for (const { route, findings } of withIssues) {
    console.log(`\n✗ ${route}`);
    for (const f of findings) {
      if (f.error) {
        console.log(`  ⚠ @${f.viewport.width}px — error: ${f.error}`);
        totalIssues += 1;
        continue;
      }
      const label = f.tabId ? ` (pestaña ${f.tabId})` : "";
      console.log(`  @${f.viewport.width}px${label}:`);
      if (f.result.overflow.length) {
        console.log(`    Desbordes (${f.result.overflow.length}):`);
        for (const o of f.result.overflow.slice(0, 5)) {
          console.log(`      - ${o.el}: right=${o.right}px width=${o.width}px`);
        }
        totalIssues += f.result.overflow.length;
      }
      if (f.result.specOverlap.length) {
        console.log(`    Superposición label/valor (${f.result.specOverlap.length}):`);
        for (const o of f.result.specOverlap.slice(0, 5)) {
          console.log(`      - ${o.row}: ${o.a} se monta sobre ${o.b}`);
        }
        totalIssues += f.result.specOverlap.length;
      }
      if (f.result.tableTooWide.length) {
        console.log(`    Tabla mas ancha que su contenedor (${f.result.tableTooWide.length}):`);
        for (const o of f.result.tableTooWide.slice(0, 5)) {
          console.log(
            `      - ${o.table}: tabla=${o.tableWidth}px contenedor=${o.containerWidth}px`,
          );
        }
        totalIssues += f.result.tableTooWide.length;
      }
      if (f.result.contentWidthFail) {
        console.log(
          `    Ancho util de specs a 390px: ${f.result.contentWidth}px (objetivo >= ${MIN_CONTENT_WIDTH_AT_390}px)`,
        );
        totalIssues += 1;
      }
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Fichas revisadas: ${allResults.length}`);
  console.log(`Fichas con hallazgos: ${withIssues.length}`);
  console.log(
    totalIssues === 0
      ? "Sin hallazgos en ninguna ficha/ancho evaluado."
      : `Total de hallazgos: ${totalIssues}. Revisa el detalle arriba.`,
  );
  process.exitCode = totalIssues === 0 ? 0 : 1;
}

main();
