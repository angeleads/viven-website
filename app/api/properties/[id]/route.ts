import { NextRequest, NextResponse } from "next/server";
import { queryInmovilla } from "@/lib/inmovilla";
import { Property } from "@/types/property";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Tipado asíncrono nativo de Next.js 15+
) {
  // 1. Desestructuramos el ID de forma asíncrona
  const { id } = await params;
  
  // 2. Extraemos la IP real del visitante para cumplir las exigencias de Inmovilla
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
    "0.0.0.0";

  try {
    // 3. Consultamos la ficha individual al CRM
    const data = await queryInmovilla({
      consultas: ["ficha"],
      where: `cod_ofer='${id}'`, // Filtro directo sobre la base de datos de Inmovilla
      userIp,
    });

    // Extraemos la respuesta limpia de la ficha (Inmovilla suele anidarla bajo la consulta o en array)
    const d = data?.ficha || (Array.isArray(data) ? data[0] : data);

    // Si el objeto devuelto no contiene identificadores válidos, devolvemos un 404 explícito
    if (!d || (!d.cod_ofer && !d.ref)) {
      return NextResponse.json({ error: "Propiedad no encontrada en el CRM" }, { status: 404 });
    }

    // 4. Mapeo dinámico de extras (características booleanas)
    const features: string[] = [];
    if (d.piscina_prop == 1 || d.piscina_com == 1 || d.piscina == 1) features.push("piscina");
    if (d.jardin == 1) features.push("jardín");
    if (d.terraza == 1) features.push("terraza");
    if (d.trastero == 1) features.push("trastero");
    if (d.chimenea == 1) features.push("chimenea");
    if (d.arma_empo == 1) features.push("armarios empotrados");

    // Reconstitución de imágenes del carrusel (puedes usar placeholders mientras ajustas el mapeo)
    const mockImages = [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ];

    // 5. Construcción de la respuesta estructurada bajo el tipo estricto 'Property'
    const propertyDetail: Property = {
      id: String(d.cod_ofer || id),
      reference: d.ref || String(d.cod_ofer || id),
      title: d.tituloes || d.titulo || "Propiedad exclusiva",
      description: d.descripciones || d.descripcion || "",
      location: d.poblacion || d.ciudad || "Sant Pere de Ribes",
      locationDetail: d.calle ? `${d.calle}, ${d.numero || ""}` : "",
      price: Number(d.precioinmo) || Number(d.precio) || 0,
      image: mockImages[0],
      images: mockImages,
      beds: Number(d.habitaciones) || 0,
      baths: Number(d.banyos) || 0,
      area: Number(d.m_cons) || 0,
      operationType: Number(d.precioalq) > 0 ? "Alquiler" : "Venta",
      date: d.fechaact || new Date().toISOString(),
      features: features,
      agency: "Viven Remax",
      agencyPhone: "+34 641 173 416", 
      agencyEmail: "hola@viven.es"
    };

    return NextResponse.json(propertyDetail);
  } catch (error: any) {
    console.error(`[Route Detail Error] Error en propiedad ${id}:`, error.message);
    return NextResponse.json(
      { error: "Error al conectar con la ficha del CRM", details: error.message }, 
      { status: 502 }
    );
  }
}