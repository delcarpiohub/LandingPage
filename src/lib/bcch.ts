// Dólar observado referencial (Pieza C, flag dolarReferencial en
// src/config/features.ts). Llamar SOLO desde Server Components o route
// handlers -- nunca desde un componente cliente. Credenciales desde
// variables de entorno, nunca hardcodeadas ni expuestas al navegador.
//
// Serie oficial: F073.TCO.PRE.Z.D (dólar observado) via API REST del Banco
// Central de Chile. Formato verificado en la documentación oficial
// (https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/documentacion_en.html):
// autenticación por token (no user/pass) en query param `token`, función
// GetSeries, respuesta JSON con Series.Obs[].{indexDateString, value,
// statusCode}.
if (typeof window !== "undefined") {
  throw new Error("src/lib/bcch.ts es server-only y no debe importarse en el cliente");
}

const BCCH_ENDPOINT = "https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx";
const SERIE_DOLAR_OBSERVADO = "F073.TCO.PRE.Z.D";
const MAX_ANTIGUEDAD_DIAS = 5;

export type UsdClpReferencial = {
  valor: number;
  fecha: string; // YYYY-MM-DD
};

type BcchObs = {
  indexDateString: string; // DD-MM-YYYY
  value: string;
  statusCode: string;
};

type BcchGetSeriesResponse = {
  Codigo?: number;
  Series?: {
    Obs?: BcchObs[];
  };
};

function parseObsDate(indexDateString: string): Date | null {
  const [d, m, y] = indexDateString.split("-").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatFirstLastDate(date: Date): string {
  return toIsoDate(date);
}

// Devuelve null ante cualquier fallo (sin credenciales, error de red, dato
// vencido) para que la pieza se oculte sin romper la página. Nunca lanza.
export async function getUsdClpReferencial(): Promise<UsdClpReferencial | null> {
  const token = process.env.BCCH_API_KEY;
  if (!token) {
    return null;
  }

  const hoy = new Date();
  const hace10Dias = new Date(hoy);
  hace10Dias.setDate(hoy.getDate() - 10);

  const url = new URL(BCCH_ENDPOINT);
  url.searchParams.set("token", token);
  url.searchParams.set("function", "GetSeries");
  url.searchParams.set("timeseries", SERIE_DOLAR_OBSERVADO);
  url.searchParams.set("firstdate", formatFirstLastDate(hace10Dias));
  url.searchParams.set("lastdate", formatFirstLastDate(hoy));

  let data: BcchGetSeriesResponse;
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) {
      return null;
    }
    data = await res.json();
  } catch {
    return null;
  }

  if (data.Codigo !== 0 || !data.Series?.Obs?.length) {
    return null;
  }

  const observacionesValidas = data.Series.Obs.filter((obs) => obs.statusCode === "OK");
  if (observacionesValidas.length === 0) {
    return null;
  }

  const ultima = observacionesValidas[observacionesValidas.length - 1];
  const fecha = parseObsDate(ultima.indexDateString);
  const valor = Number(ultima.value);
  if (!fecha || Number.isNaN(valor)) {
    return null;
  }

  const antiguedadDias = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
  if (antiguedadDias > MAX_ANTIGUEDAD_DIAS) {
    return null;
  }

  return { valor, fecha: toIsoDate(fecha) };
}
