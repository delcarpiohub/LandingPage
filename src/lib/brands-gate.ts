// Gate de UX (no de seguridad) para /marcas: solo se "desbloquea" al hacer
// clic en un logo de la franja de marcas del home (lab-photos.tsx). Es
// trivial de saltar desde devtools a propósito — el objetivo es el efecto de
// descubrimiento, no restringir contenido sensible.
const BRANDS_GATE_KEY = "dc-marcas-unlocked";

export function unlockBrandsPage() {
  try {
    sessionStorage.setItem(BRANDS_GATE_KEY, "1");
  } catch {
    // sessionStorage puede fallar en modo privado estricto; si eso ocurre,
    // /marcas simplemente redirige al home en vez de abrir — degradación
    // aceptable para un gate decorativo.
  }
}

export function hasBrandsGateAccess() {
  try {
    return sessionStorage.getItem(BRANDS_GATE_KEY) === "1";
  } catch {
    return false;
  }
}
