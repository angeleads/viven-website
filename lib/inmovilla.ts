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

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    next: { revalidate: 60 },
  };

  // Hacemos un fetch directo y limpio. Vercel se encargará de pasarlo por Fixie 
  // automáticamente gracias a las variables HTTP_PROXY / HTTPS_PROXY.
  const response = await fetch(API_URL, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error HTTP de Inmovilla: ${response.status}`);
  }

  const text = await response.text();
  const cleanedText = text.trim();

  try {
    return JSON.parse(cleanedText);
  } catch (parseError) {
    console.error("Error parseando JSON de Inmovilla. Texto recibido:", cleanedText.substring(0, 200));
    throw new Error(`Respuesta inesperada de la API: ${cleanedText.substring(0, 100)}`);
  }
}