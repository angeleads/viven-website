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
  const password = "h8d??Aj#9"; // process.env.INMOVILLA_PASSWORD!;
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

  const bodyParams = new URLSearchParams({
      param: param,
      ia: "83.43.234.234", 
      ib: "83.43.234.234", 
      elDominio: dominio,
      json: "1",
    });

    // 👇 AÑADE ESTAS LÍNEAS AQUÍ PARA GENERAR EL LOG DE DEPURACIÓN 👇
    console.log("=== [DEBUG INMOVILLA LOG ENVIADO] ===");
    console.log("URL de destino:", API_URL);
    console.log("Método: POST");
    console.log("Content-Type: application/x-www-form-urlencoded");
    console.log("Cuerpo crudo (Payload):", bodyParams.toString());
    console.log("======================================");

  const response = await fetch(API_URL, {    
    method: "POST",    
    headers: { "Content-Type": "application/x-www-form-urlencoded" },    
    body: bodyParams.toString(),    
    next: { revalidate: 60 },  
  });   

  if (!response.ok) {    
    throw new Error(`Error HTTP: ${response.status}`);  
  }   

  const textResponse = await response.text();   
  
  // Añadimos solo un log temporal para ver qué responde el servidor en tu consola
  console.log("================ GUÍA OFICIAL RAW RESPONSE ================");
  console.log(textResponse);
  console.log("===========================================================");

  try {    
    return JSON.parse(textResponse);  
  } catch {    
    throw new Error(`Respuesta inesperada de la API: ${textResponse.substring(0, 100)}`);  
  } 
}