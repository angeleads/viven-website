import axios from "axios";
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

  const carpeta = process.env.INMOVILLA_CARPETA!;
  const password = process.env.INMOVILLA_PASSWORD!;
  const dominio = process.env.INMOVILLA_DOMINIO!;
  
  // Recuperamos la URL del proxy de tu archivo de configuración (.env.local o Vercel)
  const proxyUrl = process.env.FIXIE_URL || process.env.HTTP_PROXY;

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

  const params = new URLSearchParams({
    param,
    ia: userIp,
    ib: userIp,
    elDominio: dominio,
    json: "1",
  });

  // Configuración base de la petición con Axios
  const config: any = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // SI EXISTE EL PROXY, LE FORZAMOS EL AGENTE DE RED REAL A AXIOS
  if (proxyUrl) {
    const agent = new HttpsProxyAgent(proxyUrl);
    config.httpsAgent = agent;
    config.proxy = false; // Desactivamos el túnel por defecto de Axios para usar el agente HttpsProxyAgent
  }

  // Realizamos la petición POST con Axios
  const response = await axios.post(API_URL, params.toString(), config);
  
  // Axios parsea automáticamente el JSON si el servidor responde con las cabeceras correctas,
  // pero Inmovilla a veces responde como texto/html. Manejamos ambos casos con seguridad:
  const data = response.data;
  const textContent = typeof data === "string" ? data.trim() : JSON.stringify(data);

  if (textContent.includes("IP NO VALIDADA")) {
    throw new Error(`Inmovilla rechazó la IP de origen. Respuesta: ${textContent}`);
  }

  try {
    return typeof data === "string" ? JSON.parse(textContent) : data;
  } catch (parseError) {
    console.error("Error parseando JSON. Texto recibido:", textContent.substring(0, 200));
    throw new Error(`Respuesta inesperada de la API: ${textContent.substring(0, 100)}`);
  }
}