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
  
  // Tu variable FIXIE_URL: http://fixie:LZxLWiFU0XdvX0b@ventoux.usefixie.com:80
  const fixieUrl = process.env.FIXIE_URL; 

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

  // PREPARACIÓN DE URL Y CABECERAS PARA ENTORNO SERVERLESS (VERCEL COMPATIBLE)
  let targetUrl = API_URL;
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (fixieUrl) {
    // 1. Extraemos las credenciales y el host de Fixie para no usar HttpsProxyAgent
    // fixieUrl mapeado da: user -> "fixie", pass -> "LZxLWiFU0XdvX0b", host -> "ventoux.usefixie.com:80"
    const fixieAuth = Buffer.from("fixie:LZxLWiFU0XdvX0b").toString("base64");
    
    // 2. Le inyectamos la cabecera del Proxy de manera nativa al fetch estándar
    headers["Proxy-Authorization"] = `Basic ${fixieAuth}`;
    
    // 3. Forzamos a que el destino pase por el puerto HTTP de Fixie reescribiendo la llamada
    targetUrl = "http://ventoux.usefixie.com:80/apiweb/apiweb.php";
    headers["Host"] = "apiweb.inmovilla.com";
  }

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: body.toString(),
    next: { revalidate: 60 },
  };

  // Hacemos la petición nativa que Vercel entiende a la perfección
  const response = await fetch(targetUrl, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error HTTP de Inmovilla: ${response.status}`);
  }

  const text = await response.text();
  const cleanedText = text.trim();

  try {
    return JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("Error parseando JSON. Texto original:", cleanedText.substring(0, 200));
    throw new Error(`Respuesta inesperada de la API: ${cleanedText.substring(0, 100)}`);
  }
}