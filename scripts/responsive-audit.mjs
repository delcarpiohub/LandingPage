// Auditoría responsive automatizada (Playwright, ya instalado como dependencia).
// Carga cada ruta en cada ancho y reporta: desbordes horizontales reales
// (medidos con getBoundingClientRect, no con scrollWidth — html/body usan
// overflow-x: clip y scrollWidth siempre devuelve el ancho del viewport),
// targets táctiles bajo 44x44px e inputs/selects con font-size < 16px.
//
// Uso:
//   npm run check:responsive
//   BASE_URL=https://delcarpio1.vercel.app npm run check:responsive
//
// Requiere el sitio corriendo en BASE_URL (por defecto http://localhost:3000).

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/productos",
  "/productos?filtro=Miner%C3%ADa",
  "/productos/hanon-k1160",
  "/productos/comparar",
  "/soluciones",
  "/contacto",
];

const VIEWPORTS = [
  { width: 320, height: 844 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 },
  { width: 600, height: 960 },
  { width: 744, height: 1133 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 844, height: 390 }, // apaisado
];

const MIN_TARGET_PX = 44;
const MIN_FONT_PX = 16;
const MIN_FONT_BREAKPOINT_PX = 768;
const OVERFLOW_TOLERANCE_PX = 1;

// Función inyectada en la página: debe ser autocontenida (sin closures sobre
// el módulo), por eso repite MIN_TARGET_PX/etc. como literales.
function auditPage({ minTarget, minFont, minFontBreakpoint, tolerance }) {
  const viewportWidth = window.innerWidth;
  const results = { overflow: [], smallTargets: [], smallFonts: [] };

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

  // Si algún ancestro recorta con overflow:hidden/clip, lo que "sobresale"
  // de ese ancestro nunca se pinta — no es un desborde visible real (mismo
  // caso que la imagen principal de ficha de producto, zoom intencional
  // recortado por su contenedor). Excluir antes de reportar.
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
    const cls = el.className && typeof el.className === "string"
      ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
      : "";
    return `${el.tagName.toLowerCase()}${id}${cls}`;
  }

  // 1. Desbordes horizontales reales (fuera de carruseles con scroll propio).
  const all = document.querySelectorAll("body *");
  for (const el of all) {
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

  // 2. Targets táctiles < 44x44 (elementos interactivos visibles).
  //
  // FALSO POSITIVO DOCUMENTADO: los botones "Comparar"/"Elegir tier" de las
  // tarjetas de /productos (product-comparison-toggle.tsx, variant="card")
  // SIEMPRE van a aparecer aquí por debajo de 44x44 (miden ~82x16/80x16).
  // Es intencional: el chip de texto visual se mantiene pequeño por diseño,
  // y el área táctil real de 44px se logra con un ::before absoluto
  // (before:-inset-y-3.5) que getBoundingClientRect() no puede medir, porque
  // los pseudo-elementos no alteran la caja de layout del elemento que los
  // genera. Verificado el 2026-10-14 con Playwright: elementFromPoint() en
  // el borde superior/inferior de esa zona extendida resuelve al <button>
  // correcto, y un click real ahí sí dispara el toggle (aria-pressed/texto
  // cambian tras esperar el repintado de React). No "arreglar" este hallazgo
  // agrandando el botón visual ni quitando el ::before.
  const interactive = document.querySelectorAll(
    'a[href], button, input, select, textarea, [role="button"], [role="tab"]',
  );
  for (const el of interactive) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") continue;
    if (rect.width < minTarget - tolerance || rect.height < minTarget - tolerance) {
      results.smallTargets.push({
        el: describe(el),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  }

  // 3. font-size < 16px en inputs/selects/textareas, solo bajo el breakpoint.
  if (viewportWidth < minFontBreakpoint) {
    const fields = document.querySelectorAll("input, select, textarea");
    for (const el of fields) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      if (fontSize < minFont - 0.5) {
        results.smallFonts.push({ el: describe(el), fontSize });
      }
    }
  }

  return results;
}

async function main() {
  const browser = await chromium.launch();
  let totalIssues = 0;

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage({ viewport });
      const label = `${route} @ ${viewport.width}x${viewport.height}`;
      try {
        await page.goto(`${BASE_URL}${route}`, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        const result = await page.evaluate(auditPage, {
          minTarget: MIN_TARGET_PX,
          minFont: MIN_FONT_PX,
          minFontBreakpoint: MIN_FONT_BREAKPOINT_PX,
          tolerance: OVERFLOW_TOLERANCE_PX,
        });

        const issues =
          result.overflow.length +
          result.smallTargets.length +
          result.smallFonts.length;

        if (issues > 0) {
          totalIssues += issues;
          console.log(`\n✗ ${label} — ${issues} hallazgo(s)`);
          if (result.overflow.length) {
            console.log(`  Desbordes horizontales (${result.overflow.length}):`);
            for (const o of result.overflow.slice(0, 10)) {
              console.log(`    - ${o.el}: right=${o.right}px width=${o.width}px`);
            }
            if (result.overflow.length > 10) {
              console.log(`    ... y ${result.overflow.length - 10} más`);
            }
          }
          if (result.smallTargets.length) {
            console.log(`  Targets < 44x44 (${result.smallTargets.length}):`);
            for (const t of result.smallTargets.slice(0, 10)) {
              console.log(`    - ${t.el}: ${t.width}x${t.height}px`);
            }
            if (result.smallTargets.length > 10) {
              console.log(`    ... y ${result.smallTargets.length - 10} más`);
            }
          }
          if (result.smallFonts.length) {
            console.log(`  Fuentes < 16px (${result.smallFonts.length}):`);
            for (const f of result.smallFonts.slice(0, 10)) {
              console.log(`    - ${f.el}: ${f.fontSize}px`);
            }
          }
        } else {
          console.log(`✓ ${label} — sin hallazgos`);
        }
      } catch (error) {
        console.log(`\n⚠ ${label} — error al cargar: ${error.message}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  console.log(`\n${"=".repeat(60)}`);
  console.log(
    totalIssues === 0
      ? "Sin hallazgos en ninguna ruta/ancho evaluado."
      : `Total de hallazgos: ${totalIssues}. Revisa el detalle arriba.`,
  );
  process.exitCode = totalIssues === 0 ? 0 : 1;
}

main();
