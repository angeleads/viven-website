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

  // Construcción de cabeceras estándar
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Autenticación limpia con Fixie codificada en Base64
  // Credenciales extraídas de tu variable: fixie:LZxLWiFU0XdvX0b
  const fixieAuth = Buffer.from("fixie:LZxLWiFU0XdvX0b").toString("base64");
  headers["Proxy-Authorization"] = `Basic ${fixieAuth}`;

  // Forzamos a Next.js a enviar la petición directamente al proxy HTTP de Fixie.
  // Fixie leerá los encabezados y se encargará de hacer la petición real a Inmovilla
  const proxyTargetUrl = "http://ventoux.usefixie.com:80/apiweb/apiweb.php";
  
  // Le indicamos a Fixie cuál es el servidor real de destino al que debe redirigir el tráfico final
  headers["Host"] = "apiweb.inmovilla.com";

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: body.toString(),
    // Desactivamos la caché persistente para que siempre consulte datos reales en tiempo real
    cache: "no-store", 
  };

  // Hacemos el fetch directamente al túnel de Fixie
  const response = await fetch(proxyTargetUrl, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error HTTP de Inmovilla: ${response.status}`);
  }

  const text = await response.text();
  const cleanedText = text.trim();

  if (cleanedText.includes("IP NO VALIDADA")) {
    throw new Error(`Inmovilla rechazó la IP de origen. Respuesta: ${cleanedText}`);
  }

  try {
    return JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("Error parseando JSON de Inmovilla. Texto original recibido:", cleanedText.substring(0, 200));
    throw new Error(`Respuesta inesperada de la API: ${cleanedText.substring(0, 100)}`);
  }
}