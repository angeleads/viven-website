import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { Property } from "@/types/property";

export async function GET() {
  try {
    const response = await fetch(
      "https://procesos.apinmo.com/portal/kyeroagencias3/6926-kyero-xk3ouwyefacilitea.xml",
      { next: { revalidate: 3600 } } // Cachea el resultado por 1 hora
    );

    if (!response.ok) {
      throw new Error("Error al obtener el feed XML");
    }

    const xmlData = await response.text();
    
    // Configuración del parser para manejar correctamente estructuras de texto e imágenes
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: true,
      trimValues: true,
    });
    
    const jsonObj = parser.parse(xmlData);
    const rawProperties = jsonObj?.root?.property;

    if (!rawProperties) {
      return NextResponse.json([], { status: 200 });
    }

    // Asegurar que tratamos los datos como un array (por si viniera solo uno)
    const propertyList = Array.isArray(rawProperties) ? rawProperties : [rawProperties];

    // Mapeamos los campos del XML a nuestra interfaz Property
    const formattedProperties = propertyList.map((item: any) => {
      // Extraer la primera imagen del set o usar un placeholder
      let mainImage = "/placeholder.svg";
      if (item.images?.image) {
        const imgs = Array.isArray(item.images.image) ? item.images.image : [item.images.image];
        if (imgs[0]?.url) {
          mainImage = imgs[0].url;
        }
      }

      // Determinar la superficie (priorizar construida, si es 0 usar parcela/plot)
      const builtArea = Number(item.surface_area?.built) || 0;
      const plotArea = Number(item.surface_area?.plot) || 0;
      const finalArea = builtArea > 0 ? builtArea : plotArea;

      // Traducir o formatear tipos comunes para una mejor UI en español
      let propertyType = item.type || "Propiedad";
      if (propertyType === "urban plot") propertyType = "Terreno Urbano";

      // Crear un título descriptivo elegante si no viene un campo "title" directo
      const townName = item.town ? item.town : "";
      const locationName = item.location_detail ? `, ${item.location_detail}` : "";
      const title = propertyType + " en " + townName + locationName;

      return {
        id: String(item.id),
        title: title,
        location: `${item.province || ""}, ${item.town || ""}`,
        price: Number(item.price) || 0,
        priceFreq: item.price_freq || "N/A",
        image: mainImage,
        beds: Number(item.beds) || 0,
        baths: Number(item.baths) || 0,
        area: finalArea,
        type: propertyType,
      };
    });

    return NextResponse.json(formattedProperties, { status: 200 });
  } catch (error) {
    console.error("Error cargando propiedades reales:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}