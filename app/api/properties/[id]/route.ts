import { NextResponse } from "next/server";
import { Property } from "@/types/property";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const token = "6A6AEE65E14D04F0164418EA3C212A42";

  try {
    const res = await fetch(`https://procesos.apinmo.com/api/v1/propiedades/?cod_ofer=${id}`, {
      method: "GET",
      headers: {
        "token": token,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
    }

    const d = await res.json();

    // Mapeamos los campos exactamente igual que en la ruta general
    const features: string[] = [];
    if (d.piscina_prop === 1) features.push("piscina privada");
    if (d.jardin === 1) features.push("jardín");
    if (d.terraza === 1) features.push("terraza");
    if (d.trastero === 1) features.push("trastero");
    if (d.chimenea === 1) features.push("chimenea");
    if (d.arma_empo === 1) features.push("armarios empotrados");

    const mockImages = [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ];

    const propertyDetail: Property = {
      id: String(d.cod_ofer),
      reference: d.ref || String(d.cod_ofer),
      title: d.tituloes || "Propiedad exclusiva",
      description: d.descripciones || "",
      location: "Sant Pere de Ribes",
      locationDetail: d.calle ? `${d.calle}, ${d.numero || ""}` : "",
      price: Number(d.precioinmo) || Number(d.precio) || 0,
      image: mockImages[0],
      images: mockImages,
      beds: d.habitaciones || 0,
      baths: d.banyos || 0,
      area: d.m_cons || 0,
      operationType: d.precioalq > 0 ? "Alquiler" : "Venta",
      date: d.fechaact || "",
      features: features,
      agency: "Inmobiliaria Profesional",
      agencyPhone: "+34 641 173 416", // Número del agente extraído del feed de ejemplo
      agencyEmail: "contacto@agencia.com"
    };

    return NextResponse.json(propertyDetail);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}