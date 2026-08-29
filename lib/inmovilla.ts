import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const API_URL = "https://apiweb.inmovilla.com/apiweb/apiweb.php";

type CacheEntry = {
  data: any;
  expiresAt: number;
};

const inmovillaResponseCache = new Map<string, CacheEntry>();
const inmovillaInFlightRequests = new Map<string, Promise<any>>();

function getConsultaTtlMs(tipo: string): number {
  switch (tipo) {
    case "ficha":
      return 5 * 60 * 1000; // 5 min
    case "paginacion":
      return 2 * 60 * 1000; // 2 min
    default:
      return 60 * 1000; // 1 min
  }
}

function clearExpiredCacheEntries() {
  const now = Date.now();
  for (const [key, entry] of inmovillaResponseCache.entries()) {
    if (entry.expiresAt <= now) {
      inmovillaResponseCache.delete(key);
    }
  }
}

export enum InmovillaIdioma {
  ESPANOL = 1,
  INGLES = 2,
  FRANCES = 3,
  CATALAN_VALENCIANO = 8,
}

export interface InmovillaConsulta {
  tipo: "paginacion" | "tipos" | "ciudades" | "ficha" | "provinciasofertas" | "destacadosestrella" | "zonas2" | string;
  inicio?: number;
  numRegistros?: number;
  where?: string;
  orden?: string;
}

interface QueryOptions {
  consultas: InmovillaConsulta[];
  idioma?: InmovillaIdioma;
  userIp: string;
}

export function parseInmovillaIdioma(value?: string | null): InmovillaIdioma {
  if (!value) return InmovillaIdioma.ESPANOL;

  const normalized = value.toLowerCase().trim();

  if (normalized === "1" || normalized === "es" || normalized === "espanol" || normalized === "español") {
    return InmovillaIdioma.ESPANOL;
  }

  if (normalized === "2" || normalized === "en" || normalized === "ingles" || normalized === "inglés") {
    return InmovillaIdioma.INGLES;
  }

  if (normalized === "3" || normalized === "fr" || normalized === "frances" || normalized === "francés") {
    return InmovillaIdioma.FRANCES;
  }

  if (
    normalized === "8" ||
    normalized === "ca" ||
    normalized === "val" ||
    normalized === "cat" ||
    normalized === "catalan" ||
    normalized === "catalán" ||
    normalized === "valenciano"
  ) {
    return InmovillaIdioma.CATALAN_VALENCIANO;
  }

  return InmovillaIdioma.ESPANOL;
}

export async function queryInmovilla(options: QueryOptions) {
  // 1. Extraemos el valor de idioma y aseguramos que se parsea si viene como string/número o toma el valor por defecto
  const { consultas, userIp } = options;
  const idioma = parseInmovillaIdioma(options.idioma ? String(options.idioma) : null);

  if (!consultas.length) {
    throw new Error("Debes enviar al menos una consulta a Inmovilla");
  }

  const carpeta = process.env.INMOVILLA_CARPETA!;
  const password = "h8d??Aj#9";
  const dominio = process.env.INMOVILLA_DOMINIO!;
  const proxyUrl = process.env.FIXIE_URL;

  const cleanIp = (userIp === "::1" || userIp === "127.0.0.1" || !userIp)
    ? "79.158.253.134"
    : userIp;

  const consulta = consultas[0];
  const defaultInicio =
    consulta.tipo === "paginacion" || consulta.tipo === "ficha" ? 1 : 0;
  const registroInicial =
    consulta.inicio !== undefined ? consulta.inicio : defaultInicio;
  const numRegistros =
    consulta.numRegistros !== undefined ? consulta.numRegistros : 20;
  const where = consulta.where || "";
  const orden = consulta.orden || "";

  // 2. El valor de idioma (1, 2, 3 o 8) se incluye en la cadena 'param'
  const param = [
    carpeta,
    password,
    String(idioma),
    "lostipos",
    consulta.tipo,
    String(registroInicial),
    String(numRegistros),
    where,
    orden,
  ].join(";");

  const cacheKey = `${dominio}::${param}`;
  const ttlMs = getConsultaTtlMs(consulta.tipo);

  clearExpiredCacheEntries();

  const cached = inmovillaResponseCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const inFlight = inmovillaInFlightRequests.get(cacheKey);
  if (inFlight) {
    return inFlight;
  }

  const params = new URLSearchParams({
    param,
    ia: cleanIp,
    ib: cleanIp,
    elDominio: dominio,
    json: "1",
  });

  const config: any = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (proxyUrl) {
    config.httpsAgent = new HttpsProxyAgent(proxyUrl);
    config.proxy = false;
  }

  const requestPromise = (async () => {
    const response = await axios.post(API_URL, params.toString(), config);
    const data = response.data;
    const textContent =
      typeof data === "string" ? data.trim() : JSON.stringify(data);

    if (textContent.includes("ERROR VALIDACION AGENCIA")) {
      throw new Error(`Error de validación en Inmovilla: ${textContent}`);
    }

    if (textContent.includes("IP NO VALIDADA")) {
      throw new Error(`IP no autorizada por Inmovilla: ${textContent}`);
    }

    if (textContent.includes("ERROR QUERY")) {
      throw new Error(`Inmovilla devolvió ERROR QUERY. Parámetro enviado: ${param}`);
    }

    try {
      const normalizedData =
        typeof data === "string" ? JSON.parse(textContent) : data;

      inmovillaResponseCache.set(cacheKey, {
        data: normalizedData,
        expiresAt: Date.now() + ttlMs,
      });

      return normalizedData;
    } catch (parseError) {
      console.error("Respuesta no-JSON de Inmovilla:", textContent);
      throw new Error(`Respuesta no parseable de la API: ${textContent}`);
    }
  })();

  inmovillaInFlightRequests.set(cacheKey, requestPromise);

  try {
    return await requestPromise;
  } finally {
    inmovillaInFlightRequests.delete(cacheKey);
  }
}