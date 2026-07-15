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
  const password = "h8d??Aj#9";
  const dominio = process.env.INMOVILLA_DOMINIO!;
  const proxyUrl = process.env.FIXIE_URL;

  const primerTipo = consultas[0];
  const restoTipos = consultas.slice(1).join(";");

  const cleanIp = (userIp === "::1" || userIp === "127.0.0.1" || !userIp) 
    ? "79.158.253.134" 
    : userIp;

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

  console.log("Inmovilla request params (ORIGINAL):", param);

  const params = new URLSearchParams({
    param,
    ia: cleanIp,
    ib: cleanIp,
    elDominio: dominio,
    json: "1",
  });

  console.log("Inmovilla request params (CORREGIDO):", params.toString());

  const config: any = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  if (proxyUrl) {
    const agent = new HttpsProxyAgent(proxyUrl);
    config.httpsAgent = agent;
    config.proxy = false; 
  }

  console.log("proxyUrl:", proxyUrl);

  const response = await axios.post(API_URL, params.toString(), config);

  console.log('repsonse.status:', response.status);
  console.log('repsonse.data:', response.data);

  const data = response.data;
  const textContent = typeof data === "string" ? data.trim() : JSON.stringify(data);

  if (textContent.includes("ERROR VALIDACION AGENCIA")) {
    throw new Error(
      `Inmovilla rechazó las credenciales. Estructura enviada -> Carpeta: ${carpeta}, Dominio: ${dominio}. Respuesta CRM: ${textContent}`
    );
  }

  if (textContent.includes("IP NO VALIDADA")) {
    throw new Error(`Inmovilla rechazó la IP de origen. Respuesta: ${textContent}`);
  }

  try {
    return typeof data === "string" ? JSON.parse(textContent) : data;
  } catch (parseError) {
    console.error("Error parseando JSON de Inmovilla:", textContent.substring(0, 200), parseError);
    throw new Error(`Respuesta inesperada de la API: ${textContent.substring(0, 100)}`);
  }
}