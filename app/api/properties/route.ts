import { NextResponse } from "next/server";
import { Property } from "@/types/property";

export async function GET() {
  try {
    const numagencia = "6926";
    const addnumagencia = "_244_ext";
    const password = "h8d??Aj#9";
    const idioma = "1";

    // Replicate the exact raw string query structure created by standard PHP urlencode
    const formBody = `numagencia=${encodeURIComponent(numagencia)}&addnumagencia=${encodeURIComponent(addnumagencia)}&password=${encodeURIComponent(password)}&idioma=${encodeURIComponent(idioma)}&proceso=listar_propiedades_disponibles&posinicial=1&numregistros=5000&where=&json=1`;

    // Testing the classic legacy production endpoint URL layout
    const response = await fetch("https://procesos.inmovilla.com/api/v1/propiedades/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Adding a standard client browser user-agent string to bypass legacy WAF/firewall blocks
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: formBody,
      cache: "no-store" // Disables Next.js default caching mechanics during development troubleshooting
    });

    if (!response.ok) {
      console.error(`Inmovilla endpoint connection failure with status: ${response.status}`);
      return NextResponse.json(
        { error: `CRM feed connectivity rejected with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Catch any structured internal error payload returned inside a successful 200 stream
    if (data && (data.error || data.mensaje || data.codigo === 401001 || data.status === "error")) {
      console.error("Inmovilla server-side validation error:", data);
      return NextResponse.json(
        { error: data.mensaje || "Inmovilla internal verification failure" },
        { status: 401 }
      );
    }

    // Safely map across standard response array structures
    const listaInmuebles = Array.isArray(data)
      ? data
      : (data.propiedades || data.listado || data.data || []);

    const formattedProperties: Property[] = listaInmuebles.map((d: any, index: number) => {
      const features: string[] = [];
      if (d.piscina_prop === 1 || d.piscina_com === 1) features.push("piscina");
      if (d.jardin === 1) features.push("jardín");
      if (d.terraza === 1) features.push("terraza");
      if (d.trastero === 1) features.push("trastero");

      return {
        id: String(d.cod_ofer || d.ref || index),
        reference: d.ref ? String(d.ref) : String(d.cod_ofer || index),
        title: d.tituloes || d.titulo || "Propiedad exclusiva",
        description: d.descripciones || d.descripcion || "",
        location: d.poblacion || "Sant Pere de Ribes",
        locationDetail: d.calle ? `${d.calle}, ${d.numero || ""}` : "",
        price: Number(d.precioinmo) || Number(d.precio) || 0,
        image: "/placeholder.svg?height=400&width=600",
        images: ["/placeholder.svg?height=400&width=600"],
        beds: Number(d.habitaciones) || 0,
        baths: Number(d.banyos) || 0,
        area: Number(d.m_cons) || 0,
        operationType: "Venta",
        date: d.fechaact || new Date().toISOString(),
        features: features,
        agency: "Inmobiliaria",
        agencyPhone: "+34 641 173 416",
        agencyEmail: "contacto@agencia.com"
      };
    });

    return NextResponse.json(formattedProperties);
  } catch (error: any) {
    console.error("Critical Next.js Local Route Error Exception:", error);
    return NextResponse.json({ error: error.message || "Route Execution Error" }, { status: 500 });
  }
}