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
  const fixieUrl = process.env.FIXIE_URL; // Tu variable en Vercel

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

  // Configuración base de cabeceras estándar
  let targetUrl = API_URL;
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // MÈTODO SERVERLESS: Si existe FIXIE_URL, reescribimos el destino por HTTP nativo
  if (fixieUrl) {
    // Codificamos las credenciales de tu proxy en Base64 de manera limpia
    const fixieAuth = Buffer.from("fixie:LZxLWiFU0XdvX0b").toString("base64");
    
    // Inyectamos la cabecera Proxy obligatoria
    headers["Proxy-Authorization"] = `Basic ${fixieAuth}`;
    
    // Cambiamos el endpoint para apuntar directamente al túnel proxy de Fixie
    targetUrl = "http://ventoux.usefixie.com:80/apiweb/apiweb.php";
    
    // Le indicamos a Fixie a qué servidor real debe redirigir el tráfico final
    headers["Host"] = "apiweb.inmovilla.com";
  }

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: body.toString(),
    next: { revalidate: 60 },
  };

  const response = await fetch(targetUrl, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error HTTP de Inmovilla: ${response.status}`);
  }

  const text = await response.text();
  const cleanedText = text.trim();

  try {
    return JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("Error parseando JSON de Inmovilla. Texto original:", cleanedText.substring(0, 200));
    throw new Error(`Respuesta inesperada de la API: ${cleanedText.substring(0, 100)}`);
  }
}