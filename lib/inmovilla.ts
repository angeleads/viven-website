import { HttpsProxyAgent } from "https-proxy-agent";

const API_URL = "https://apiweb.inmovilla.com/apiweb/apiweb.php";

interface QueryOptions {
  consultas: string[];
  idioma?: number;
  inicio?: number;
  numRegistros?: number;
  where?: string;
  orden?: string;
  userIp: string;
}

export async function queryInmovilla(options: QueryOptions) {
  const {
    consultas,
    idioma = 1,
    inicio = 0,
    numRegistros = 20,
    where = "",
    orden = "",
    userIp,
  } = options;

  // Recuperación segura de credenciales del lado del servidor
  const carpeta = process.env.INMOVILLA_CARPETA!;
  const password = process.env.INMOVILLA_PASSWORD!;
  const dominio = process.env.INMOVILLA_DOMINIO!;
  const fixieUrl = process.env.FIXIE_URL; // Tu endpoint seguro de Fixie

  // Construcción del parámetro string separado por ";" exigido por Inmovilla
  const primerTipo = consultas[0];
  const restoTipos = consultas.slice(1).join(";");

  const param = [
    carpeta,
    password,
    idioma,
    "lostipos2",
    primerTipo,
    String(inicio),
    String(numRegistros),
    where,
    orden,
    restoTipos,
  ].join(";");

  const body = new URLSearchParams({
    param,
    ia: userIp,
    ib: userIp,
    elDominio: dominio,
    json: "1",
  });

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    // Revalidación cada 60 segundos para proteger los límites de peticiones gratuitos de Fixie
    next: { revalidate: 60 },
  };

  // Enrutamiento forzado a través de las IPs de Fixie (solo si la variable existe)
  if (fixieUrl) {
    (fetchOptions as any).agent = new HttpsProxyAgent(fixieUrl);
  }

  const response = await fetch(API_URL, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error HTTP de Inmovilla: ${response.status}`);
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Respuesta inesperada de la API: ${text.substring(0, 100)}`);
  }
}