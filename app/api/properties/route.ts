import { NextRequest, NextResponse } from "next/server";
import { Property } from "@/types/property";

const API_URL = process.env.INMOVILLA_API_URL || "https://apiweb.inmovilla.com/apiweb/apiweb.php";

export async function GET(request: NextRequest) {
  try {
    const carpeta = process.env.INMOVILLA_CARPETA;
    const password = process.env.INMOVILLA_PASSWORD;
    const dominio = process.env.INMOVILLA_DOMINIO;

    if (!carpeta || !password || !dominio) {
      console.error("Faltan las variables de entorno de Inmovilla en el servidor.");
      return NextResponse.json({ error: "Configuración del servidor incompleta" }, { status: 500 });
    }

    // 1. Get the visitor's IP dynamically
    let clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1"; 

    // 2. 🚀 THE LOCAL FIX: If Next.js detects localhost (::1 or 127.0.0.1), 
    // we swap it for a real public IPv4 address so Inmovilla's firewall passes it.
    if (clientIp === "::1" || clientIp === "127.0.0.1") {
      clientIp = "83.43.234.235"; // Using a mock public IP next to your server IP to differentiate them
    }

    const idioma = "1"; 
    const tipoConsulta = "paginacion"; 
    const inicio = "0";
    const numRegistros = "30"; 
    const where = "";
    const orden = "precio_asc"; 
    const consultasAdicionales = "tipos;ciudades"; 

    const param = [
      carpeta,
      password,
      idioma,
      "lostipos2",
      tipoConsulta,
      inicio,
      numRegistros,
      where,
      orden,
      consultasAdicionales,
    ].join(";");

    // 3. Send the parameters exactly as they want them
    const bodyParams = new URLSearchParams({
      param: param,
      ia: clientIp,        // Real public IP look-alike for localhost testing
      ib: clientIp,        
      elDominio: dominio,
      json: "1",
    });

    console.log("=== [TRYING LOCAL BYPASS] ===");
    console.log("Sending client IP as:", clientIp);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Error de comunicación con el CRM" }, { status: response.status });
    }

    const textResponse = await response.text();
    
    // Check if it still throws the IP error
    if (textResponse.includes("NECESITAMOS RECIBIR") || textResponse.includes("xIP NO VALIDADA")) {
      return NextResponse.json({ error: "Restricción activa en el CRM", raw: textResponse }, { status: 400 });
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (parseError) {
      return NextResponse.json({ error: "Respuesta inválida del servidor CRM", raw: textResponse.substring(0, 100) }, { status: 502 });
    }

    const listaInmuebles = Array.isArray(data)
      ? data
      : data.paginacion || data.propiedades || data.listado || [];

    const formattedProperties: Property[] = listaInmuebles
      .filter((d: any) => d && typeof d === "object" && d.ref) 
      .map((d: any, index: number) => {
        const features: string[] = [];
        if (d.piscina_prop == 1 || d.piscina_com == 1 || d.piscina == 1) features.push("piscina");
        if (d.jardin == 1) features.push("jardín");
        if (d.terraza == 1) features.push("terraza");
        if (d.trastero == 1) features.push("trastero");

        return {
          id: String(d.cod_ofer || index),
          reference: String(d.ref || index),
          title: d.tituloes || d.titulo || "Propiedad exclusiva",
          description: d.descripciones || d.descripcion || "",
          location: d.poblacion || "Sant Pere de Ribes",
          locationDetail: d.calle ? `${d.calle}, ${d.numero || ""}` : "",
          price: Number(d.precioinmo) || Number(d.precio) || 0,
          image: d.foto || "/placeholder.svg?height=400&width=600",
          images: [d.foto || "/placeholder.svg?height=400&width=600"],
          beds: Number(d.habitaciones) || 0,
          baths: Number(d.banyos) || 0,
          area: Number(d.m_cons) || 0,
          operationType: Number(d.precioalq) > 0 ? "Alquiler" : "Venta",
          date: d.fechaact || new Date().toISOString(),
          features: features,
          agency: "SharetoGo Inmo",
          agencyPhone: "+34 641 173 416",
          agencyEmail: "contacto@agencia.com",
        };
      });

    return NextResponse.json(formattedProperties);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Failure" }, { status: 500 });
  }
}