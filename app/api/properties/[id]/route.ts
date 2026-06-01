import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { Property } from "@/types/property";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      "https://procesos.apinmo.com/portal/kyeroagencias3/6926-kyero-xk3ouwyefacilitea.xml",
      { next: { revalidate: 1800 } } // Cache por 30 minutos para velocidad
    );

    if (!response.ok) throw new Error("Error fetching XML source");

    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: true,
      trimValues: true,
    });
    
    const jsonObj = parser.parse(xmlData);
    const rawProperties = jsonObj?.root?.property;

    if (!rawProperties) {
      return NextResponse.json({ error: "No properties found" }, { status: 404 });
    }

    const propertyList = Array.isArray(rawProperties) ? rawProperties : [rawProperties];
    
    // Buscar la propiedad exacta usando el ID de la URL
    const item = propertyList.find((p: any) => String(p.id) === id);

    if (!item) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Extraer array completo de imágenes
    let allImages: string[] = [];
    if (item.images?.image) {
      const imgs = Array.isArray(item.images.image) ? item.images.image : [item.images.image];
      allImages = imgs.map((img: any) => img.url).filter(Boolean);
    }
    const mainImage = allImages[0] || "/placeholder.svg";

    // Extraer array de características (features)
    let featuresList: string[] = [];
    if (item.features?.feature) {
      featuresList = Array.isArray(item.features.feature) 
        ? item.features.feature 
        : [item.features.feature];
    }

    // Limpieza de descripción de bloques CDATA
    let cleanDescription = item.desc?.es || "";
    if (typeof cleanDescription === "object") {
      cleanDescription = cleanDescription["#text"] || "";
    }

    // Traducir tipos para consistencia visual
    let propertyType = item.type || "Propiedad";
    if (propertyType === "urban plot") propertyType = "Terreno Urbano";

    const title = `${propertyType} en ${item.town || ""}${item.location_detail ? `, ${item.location_detail}` : ""}`;

    const formattedProperty: Property = {
      id: String(item.id),
      title: title,
      location: `${item.province || ""}, ${item.town || ""}`,
      province: item.province || "",
      town: item.town || "",
      locationDetail: item.location_detail,
      price: Number(item.price) || 0,
      image: mainImage,
      images: allImages.length > 0 ? allImages : [mainImage],
      beds: Number(item.beds) || 0,
      baths: Number(item.baths) || 0,
      area: Number(item.surface_area?.built) || Number(item.surface_area?.plot) || 0,
      plotArea: Number(item.surface_area?.plot) || 0,
      type: propertyType,
      operationType: item.operation_type === "For sale" ? "En Venta" : item.operation_type || "Disponible",
      reference: item.ref || "",
      agency: item.agencia || "Inmobiliaria",
      agencyPhone: item.telefono,
      agencyEmail: item.email,
      description: cleanDescription,
      features: featuresList,
    };

    return NextResponse.json(formattedProperty, { status: 200 });
  } catch (error) {
    console.error("Error loading specific property detail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}