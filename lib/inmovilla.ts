import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const API_URL = "https://apiweb.inmovilla.com/apiweb/apiweb.php";

export interface InmovillaConsulta {
  tipo: "paginacion" | "tipos" | "ciudades" | "ficha" | "provinciasofertas" | "destacadosestrella" | "zonas2" | string;
  inicio?: number;
  numRegistros?: number;
  where?: string;
  orden?: string;
}

interface QueryOptions {
  consultas: InmovillaConsulta[];
  idioma?: number;
  userIp: string;
}

export async function queryInmovilla(options: QueryOptions) {
  const { consultas, idioma = 1, userIp } = options;

  const carpeta = process.env.INMOVILLA_CARPETA!;
  const password = "h8d??Aj#9";
  const dominio = process.env.INMOVILLA_DOMINIO!;
  const proxyUrl = process.env.FIXIE_URL;

  const cleanIp = (userIp === "::1" || userIp === "127.0.0.1" || !userIp)
    ? "79.158.253.134"
    : userIp;

  // 1. Cabecera obligatoria según documentación de Inmovilla
  const cabecera = `${carpeta};${password};${idioma};lostipos2`;

  // 2. Construcción de los bloques de consulta (cada uno de 5 campos obligatorios)
  const bloquesConsultas = consultas
    .map((c) => {
      // registroinicial: 1 para paginación/ficha, 0 para tipos/ciudades
      const defaultInicio = (c.tipo === "paginacion" || c.tipo === "ficha") ? 1 : 0;
      const inicio = c.inicio !== undefined ? c.inicio : defaultInicio;
      const numRegistros = c.numRegistros !== undefined ? c.numRegistros : 20;
      const where = c.where || "";
      const orden = c.orden || "";

      return [c.tipo, String(inicio), String(numRegistros), where, orden].join(";");
    })
    .join(";");

  // Cadena param final: cabecera + bloques de consulta
  const param = `${cabecera};${bloquesConsultas}`;

  console.log("Inmovilla param string:", param);

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

  const response = await axios.post(API_URL, params.toString(), config);
  const data = response.data;
  const textContent = typeof data === "string" ? data.trim() : JSON.stringify(data);

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
    return typeof data === "string" ? JSON.parse(textContent) : data;
  } catch (parseError) {
    console.error("Respuesta no-JSON de Inmovilla:", textContent);
    throw new Error(`Respuesta no parseable de la API: ${textContent}`);
  }
}